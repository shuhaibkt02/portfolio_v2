export interface BlogSection {
    type: "paragraph" | "heading" | "subheading" | "code" | "callout" | "list" | "quote";
    content?: string;
    items?: string[];
    language?: string;
    variant?: "info" | "warning" | "tip" | "danger";
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverGradient: string; // Sleek Tailwind gradient for reliable high-end visual banner
    publishedAt: string;
    readTime: string;
    category: string;
    tags: string[];
    featured?: boolean;
    likeCount: number; // Default: 0 in static data; hydrated from Firestore at runtime
    bannerSnippet?: {
        label: string;
        codeLines: { text: string; color?: string }[];
    };
    author: {
        name: string;
        role: string;
    };
    sections: BlogSection[];
}

/**
 * Server-enriched type returned to pages after Firestore hydration.
 * Keeps static article content and live engagement data conceptually separate.
 */
export interface BlogPostWithEngagement extends BlogPost {
    likeCount: number; // Real-time value from Firestore, overrides the static default
}

export const blogPosts: BlogPost[] = [
    {
        id: "building-flutter-auth-clean-architecture",
        slug: "building-flutter-auth-clean-architecture",
        title: "Building Flutter Auth with Clean Architecture — From Reasoning to Tests",
        excerpt: "Instead of copying folder templates, learn why Clean Architecture exists by starting with a naive Firebase login and solving real engineering pain points: swapping backends, isolating failures, and unit testing in under 100ms.",
        coverGradient: "from-purple-600 via-indigo-900 to-zinc-950",
        publishedAt: "Aug 14, 2026",
        readTime: "8 min read",
        category: "Flutter & Architecture",
        tags: ["Flutter", "Clean Architecture", "Testing", "Firebase", "REST API", "Dart"],
        featured: true,
        likeCount: 0,
        bannerSnippet: {
            label: "ARCHITECTURE GUIDE",
            codeLines: [
                { text: "Domain (Pure Dart Contract)", color: "text-flutter-blue font-semibold" },
                { text: "  ↓ LoginUseCase (AND logic)", color: "text-emerald-400" },
                { text: "  ↓ AuthRepositoryImpl", color: "text-purple-300" },
                { text: "  ↓ Firebase / REST Data", color: "text-amber-400" }
            ]
        },
        author: {
            name: "Shuhaib KT",
            role: "Flutter & Mobile Engineer"
        },
        sections: [
            {
                type: "paragraph",
                content: "Most architecture tutorials start with a finished diagram: 'Clean Architecture has Presentation, Domain, and Data layers. Here is what each folder means.' But in production engineering, architecture isn't created by copying folder structures—it is forced upon us by real problems."
            },
            {
                type: "paragraph",
                content: "In this post, we will build a complete Flutter authentication flow by starting with a naive Firebase implementation, encountering friction as requirements change, and asking: What happens if Firebase changes? How do we swap backends? How do we test this without hitting live servers? Each question will force us to introduce another clean boundary."
            },
            {
                type: "heading",
                content: "1. The Problem First: Starting Naively"
            },
            {
                type: "paragraph",
                content: "When starting a new Flutter project, the fastest way to build login is calling Firebase directly inside your UI widget:"
            },
            {
                type: "code",
                language: "dart",
                content: `// Naive implementation directly inside Flutter Widget
onPressed: () async {
  try {
    final credential = await FirebaseAuth.instance.signInWithEmailAndPassword(
      email: emailController.text,
      password: passwordController.text,
    );
    Navigator.pushReplacementNamed(context, '/home');
  } on FirebaseAuthException catch (e) {
    if (e.code == 'invalid-credential') {
      showToast('Invalid credentials provided');
    }
  }
}`
            },
            {
                type: "paragraph",
                content: "While this works for a weekend prototype, it creates severe production friction as your app grows:"
            },
            {
                type: "list",
                items: [
                    "Tight Coupling: Your UI widget is directly bound to Firebase SDK internals.",
                    "Backend Migration Nightmare: If your team migrates to a custom Node.js/Go REST API (Dio) or Supabase next year, you have to rewrite half your UI widgets.",
                    "Leaky Abstractions: Firebase-specific error strings ('invalid-credential') contaminate your UI presentation layer.",
                    "Impossible to Unit Test: You cannot unit test login logic without initializing native Firebase apps and running real network requests."
                ]
            },
            {
                type: "heading",
                content: "2. Defining the Domain Contract"
            },
            {
                type: "paragraph",
                content: "To decouple business rules from infrastructure details, we create a pure Dart Domain layer containing no Flutter or third-party SDK dependencies:"
            },
            {
                type: "code",
                language: "text",
                content: `Domain Layer Structure
├── Entity           (Core business objects like User)
├── Value Objects    (Encapsulated primitives like Email & Password)
├── Failures         (Pure business error representations)
├── Repository       (Abstract interface contracts)
└── UseCases         (Executable application operations)`
            },
            {
                type: "callout",
                variant: "info",
                content: "Why does the Domain layer own the Repository interface? According to the Dependency Inversion Principle, high-level business rules should not depend on low-level database details. Both must depend on abstractions defined by the business domain."
            },
            {
                type: "heading",
                content: "3. Value Objects: Preventing Invalid State"
            },
            {
                type: "paragraph",
                content: "Instead of passing raw `String` variables into business logic, we encapsulate validation rules into self-validating Value Objects. A string like `'invalid-email'` should never even reach a use case or network request:"
            },
            {
                type: "code",
                language: "dart",
                content: `class Email {
  final String value;
  private Email._(this.value);

  static Result<Email, EmailFailure> create(String input) {
    if (input.isEmpty) return Result.failure(EmailFailure.empty());
    if (!RegExp(r'^[^@]+@[^@]+\\.[^@]+$').hasMatch(input)) {
      return Result.failure(EmailFailure.invalidFormat());
    }
    return Result.success(Email._(input));
  }
}`
            },
            {
                type: "heading",
                content: "4. UseCase: Orchestrating Business Validation"
            },
            {
                type: "paragraph",
                content: "The `LoginUseCase` coordinates inputs and enforces validation sequencing before calling the repository contract:"
            },
            {
                type: "code",
                language: "dart",
                content: `class LoginUseCase {
  final AuthenticationRepository repository;
  LoginUseCase(this.repository);

  Future<Result<User, AuthenticationFailure>> execute(String rawEmail, String rawPassword) async {
    final emailResult = Email.create(rawEmail);
    final passwordResult = Password.create(rawPassword);

    // AND reasoning: Both Email and Password MUST be valid before hitting repository
    if (emailResult.isFailure) return Result.failure(AuthenticationFailure.invalidEmail());
    if (passwordResult.isFailure) return Result.failure(AuthenticationFailure.invalidPassword());

    return await repository.login(
      email: emailResult.value,
      password: passwordResult.value,
    );
  }
}`
            },
            {
                type: "heading",
                content: "5. Data Layer & Dependency Inversion"
            },
            {
                type: "paragraph",
                content: "Now we build the Data layer adapters that implement the Domain contract. Contrast how easy it is to swap a Firebase SDK with a REST API backend:"
            },
            {
                type: "code",
                language: "text",
                content: `                ┌────────────────────────────────────────┐
                │        Domain Layer (Pure Dart)        │
                │         AuthenticationRepository       │
                └───────────────────▲────────────────────┘
                                    │ (Implements Contract)
                ┌───────────────────┴────────────────────┐
                │         Data Layer (Adapters)          │
                │     AuthenticationRepositoryImpl       │
                └───────┬────────────────────────┬───────┘
                        │                        │
       ┌────────────────┴──────┐       ┌─────────┴──────────────┐
       │ FirebaseDataSource    │  OR   │ RestApiDataSource      │
       │ (FirebaseAuth SDK)    │       │ (Dio / HTTP Client)    │
       └───────────────────────┘       └────────────────────────┘`
            },
            {
                type: "heading",
                content: "6. DTO Model vs Domain Entity"
            },
            {
                type: "paragraph",
                content: "Backend APIs return specific JSON schemas or SDK user objects (`FirebaseUser` or HTTP JSON map). We deserialize payloads into a `UserModel` in the data layer and map it to a pure `User` domain entity:"
            },
            {
                type: "code",
                language: "dart",
                content: `// Data Layer Model
class UserModel {
  final String uid;
  final String email;
  UserModel({required this.uid, required this.email});

  User toDomain() => User(id: uid, email: email);
}`
            },
            {
                type: "heading",
                content: "7. Exception → Failure Mapping"
            },
            {
                type: "paragraph",
                content: "Firebase throws `FirebaseAuthException` with code `'invalid-credential'`, while REST APIs return `HTTP 401 Unauthorized`. Neither string codes nor HTTP status numbers belong in Domain or UI code. The repository maps infrastructure exceptions into clean domain failures:"
            },
            {
                type: "code",
                language: "dart",
                content: `// Repository Implementation Exception Mapping
try {
  final userModel = await remoteDataSource.login(email, password);
  return Result.success(userModel.toDomain());
} on FirebaseAuthException catch (e) {
  if (e.code == 'invalid-credential') {
    return Result.failure(AuthenticationFailure.invalidCredentials());
  }
  return Result.failure(AuthenticationFailure.serverError());
} on DioException catch (e) { // Easily handles REST API status 401
  if (e.response?.statusCode == 401) {
    return Result.failure(AuthenticationFailure.invalidCredentials());
  }
  return Result.failure(AuthenticationFailure.networkError());
}`
            },
            {
                type: "heading",
                content: "8. Testing the Architecture without Live Backends"
            },
            {
                type: "paragraph",
                content: "Because our domain rules and use cases depend on pure Dart interfaces, we can write unit tests that execute in under 100ms using a `FakeAuthenticationRepository` without initializing Firebase or spinning up servers:"
            },
            {
                type: "code",
                language: "dart",
                content: `void main() {
  test('should return invalidEmail failure when email input is malformed', () async {
    final fakeRepo = FakeAuthenticationRepository();
    final useCase = LoginUseCase(fakeRepo);

    final result = await useCase.execute('invalid-email-string', 'Password123!');

    expect(result.isFailure, true);
    expect(fakeRepo.wasLoginCalled, false); // Proves network wasn't even touched!
  });
}`
            },
            {
                type: "heading",
                content: "9. Repository Unit Tests with Remote Data Source Fakes"
            },
            {
                type: "paragraph",
                content: "Next, we test that `AuthenticationRepositoryImpl` correctly transforms raw network exceptions into domain failures:"
            },
            {
                type: "code",
                language: "dart",
                content: `test('should map invalid-credential exception to AuthenticationFailure.invalidCredentials', () async {
  final fakeDataSource = FakeRemoteDataSource(shouldThrowInvalidCredentials: true);
  final repo = AuthenticationRepositoryImpl(fakeDataSource);

  final result = await repo.login(validEmail, validPassword);

  expect(result.failure, isA<InvalidCredentialsFailure>());
});`
            },
            {
                type: "heading",
                content: "10. CI/CD Integration & Engineering Summary"
            },
            {
                type: "paragraph",
                content: "By decoupling each layer, your CI/CD pipeline runs hundreds of unit tests in seconds on every `git push`, blocking invalid code before it ever reaches staging or production builds."
            },
            {
                type: "quote",
                content: "Architecture isn't about memorizing folder structures. It's about building software where every boundary is justified by a real problem—making code easy to change, resilient to backend shifts, and effortless to test."
            }
        ]
    },
    {
        id: "securing-flutter-apps-obfuscation",
        slug: "securing-flutter-apps-code-obfuscation",
        title: "Securing Flutter Apps: The Complete Guide to Code Obfuscation",
        excerpt: "If someone decompiles your Flutter app binary, your business logic and method signatures are exposed. Here is what obfuscation is, why you need it, how to build it, and where it applies.",
        coverGradient: "from-blue-600 via-indigo-900 to-zinc-950",
        publishedAt: "Feb 26, 2024",
        readTime: "5 min read",
        category: "Flutter & Security",
        tags: ["Flutter", "Security", "Android", "iOS", "DevOps"],
        featured: false,
        likeCount: 0,
        bannerSnippet: {
            label: "SECURITY GUIDE",
            codeLines: [
                { text: "$ flutter build apk \\", color: "text-flutter-blue font-semibold" },
                { text: "--obfuscate \\", color: "text-emerald-400" },
                { text: "--split-debug-info=symbols", color: "text-purple-300" }
            ]
        },
        author: {
            name: "Shuhaib KT",
            role: "Flutter & Mobile Engineer"
        },
        sections: [
            {
                type: "paragraph",
                content: "When you ship a production mobile application, you aren't just sending executable bytecode to app stores—you're releasing a compiled binary into the wild. Without explicit protection, anyone equipped with popular reverse-engineering tools like JADX, Ghidra, or IDA Pro can open your app package, inspect class hierarchies, read method signatures, and analyze your proprietary algorithms."
            },
            {
                type: "paragraph",
                content: "That’s precisely where code obfuscation enters your build pipeline. In this guide, we'll answer the four fundamental questions every Flutter developer must ask: WHAT obfuscation is, WHY you need it, HOW to implement it, and WHERE to apply and test it safely."
            },
            {
                type: "heading",
                content: "1. WHAT is Flutter Code Obfuscation?"
            },
            {
                type: "paragraph",
                content: "Code obfuscation is the process of modifying your compiled Dart bytecode so that human-readable identifiers—such as class names, function signatures, variable names, and line numbers—are replaced with random, meaningless symbol strings like `a`, `b1`, or `x9`."
            },
            {
                type: "callout",
                variant: "info",
                content: "Important Clarification: Obfuscation is NOT encryption. It does not hide raw hardcoded API keys or secret strings inside your code; rather, it transforms the structural blueprint of your app into an unreadable labyrinth for human analysts."
            },
            {
                type: "heading",
                content: "2. WHY Do You Need It in Production?"
            },
            {
                type: "paragraph",
                content: "Flutter apps compile Dart code into native AOT (Ahead-of-Time) machine code. While AOT binaries are harder to decompile than interpreted Java or JavaScript, Dart AOT binaries still embed symbol metadata for runtime reflection and stack traces."
            },
            {
                type: "list",
                items: [
                    "Protect Intellectual Property: Prevents competitors from inspecting your internal core features or proprietary business algorithms.",
                    "Raise the Barrier for Attackers: Impedes security researchers and malicious actors attempting to find client-side vulnerabilities.",
                    "Shrink Binary Footprint: Stripping debug symbols and replacing long function names with 1-2 character tokens marginally reduces final APK/IPA size.",
                    "Maintain Security Compliance: Essential for financial, healthcare, and enterprise sales compliance audits."
                ]
            },
            {
                type: "heading",
                content: "3. HOW Do You Set It Up in Flutter?"
            },
            {
                type: "paragraph",
                content: "Flutter makes obfuscation straightforward by integrating two primary flags into the release build CLI: `--obfuscate` and `--split-debug-info`."
            },
            {
                type: "list",
                items: [
                    "--obfuscate: Tells the Dart compiler to replace all symbol names with randomized characters.",
                    "--split-debug-info=<directory>: Strips debug symbol mapping from the output binary and saves it in a separate folder. You NEED this mapping to symbolicate future crash reports."
                ]
            },
            {
                type: "subheading",
                content: "Standard Release APK Build Command:"
            },
            {
                type: "code",
                language: "bash",
                content: "flutter build apk --obfuscate --split-debug-info=build/app/outputs/symbols"
            },
            {
                type: "subheading",
                content: "Optimized Android Build (ABI Splitting):"
            },
            {
                type: "paragraph",
                content: "To minimize total download size for user devices alongside obfuscation, split your APK by architecture target:"
            },
            {
                type: "code",
                language: "bash",
                content: "flutter build apk --release --split-per-abi --obfuscate --split-debug-info=build/app/outputs/symbols"
            },
            {
                type: "subheading",
                content: "Building an Obfuscated iOS App Bundle:"
            },
            {
                type: "code",
                language: "bash",
                content: "flutter build ipa --obfuscate --split-debug-info=build/ios/symbols"
            },
            {
                type: "heading",
                content: "4. WHERE Does It Apply & Where Can It Break Things?"
            },
            {
                type: "paragraph",
                content: "Obfuscation applies across all major Flutter release targets: Android (APK/AAB), iOS (IPA), and macOS desktop. However, because symbol names are altered at build time, there are critical places where obfuscation can break existing code logic."
            },
            {
                type: "callout",
                variant: "warning",
                content: "Critical Caveat: Never rely on string-matching class or type names in production code! Operations like `foo.runtimeType.toString() == 'Foo'` will silently fail in obfuscated binaries because 'Foo' gets renamed to 'a4'."
            },
            {
                type: "list",
                items: [
                    "Avoid Type Name Strings: Refactor JSON serializers or dynamic factory patterns that rely on stringified class names.",
                    "Store Symbol Mapping Files: Always commit or archive the generated debug symbol folder for each app version. Without it, stack traces from Sentry or Firebase Crashlytics will only show unreadable lines.",
                    "Symbolize Stack Traces: Use `flutter symbolize -i <crash_log> -d build/app/outputs/symbols` to translate crash traces back into human-readable code."
                ]
            },
            {
                type: "quote",
                content: "Obfuscation is your app's first line of defense. By combining obfuscated binaries with safe coding practices and secure symbol management, you keep your production code lean, fast, and protected."
            }
        ]
    },
    {
        id: "offline-first-flutter-rest-api-architecture",
        slug: "offline-first-flutter-rest-api-architecture",
        title: "Architecting Offline-First Mobile Apps with Flutter & REST APIs",
        excerpt: "Discover how to build high-performance enterprise mobile apps using Hive local database persistence and exponential backoff retry queues over REST APIs.",
        coverGradient: "from-cyan-600 via-sky-900 to-zinc-950",
        publishedAt: "Aug 10, 2026",
        readTime: "6 min read",
        category: "Architecture & REST APIs",
        tags: ["Flutter", "REST API", "Clean Architecture", "Hive", "Offline-First"],
        featured: false,
        likeCount: 0,
        bannerSnippet: {
            label: "REST API & SYNC",
            codeLines: [
                { text: "Hive Box -> Local Write", color: "text-flutter-blue font-semibold" },
                { text: "Retry Queue -> Exponential Backoff", color: "text-emerald-400" },
                { text: "REST API Sync Worker", color: "text-purple-300" }
            ]
        },
        author: {
            name: "Shuhaib KT",
            role: "Flutter & Mobile Engineer"
        },
        sections: [
            {
                type: "paragraph",
                content: "Building enterprise mobile applications for real-world field environments requires handling unpredictable networks and offline dead zones. Standard API calls that rely on continuous HTTP connectivity fail sales reps when they move between remote stores and underground locations."
            },
            {
                type: "heading",
                content: "The Offline-First Principle"
            },
            {
                type: "paragraph",
                content: "An offline-first architecture treats local storage as the primary source of truth for the user interface. Every write action (creating sales orders, checking out shops, logging expenses) saves instantly to a fast local database like Hive or SQLite, while a deferred background sync worker processes requests to backend REST APIs when network connectivity is available."
            },
            {
                type: "subheading",
                content: "Core Pillars of a Resilient Sync System"
            },
            {
                type: "list",
                items: [
                    "Atomic Hive Storage: Save user transactions locally in milliseconds before firing any network calls.",
                    "Deferred Sync Queue: Queue pending HTTP requests with retry counters and exponential backoff strategies.",
                    "Deterministic Client Keys: Generate client-side UUIDs to prevent duplicate record insertion during network timeouts."
                ]
            },
            {
                type: "code",
                language: "dart",
                content: `// Fire-and-forget offline write in Hive
Future<void> saveOrderLocally(OrderModel order) async {
  final box = await Hive.openBox<OrderModel>('pending_orders');
  await box.put(order.id, order);
  
  // Trigger background REST API sync queue
  SyncWorker.enqueue(order.toRestPayload());
}`
            },
            {
                type: "callout",
                variant: "tip",
                content: "Pro-tip: Combine instant local UI validation with deferred REST server verification so users can continue work uninterrupted even in 0-bar signal areas."
            }
        ]
    }
];

export function getAllBlogs(): BlogPost[] {
    return blogPosts;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedBlog(): BlogPost {
    return blogPosts.find((post) => post.featured) || blogPosts[0];
}
