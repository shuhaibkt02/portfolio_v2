import { signInAnonymously } from "firebase/auth";
import { auth } from "./client";

export async function ensureAnonymousUser() {
    if (auth.currentUser) {
        return auth.currentUser;
    }

    const credential = await signInAnonymously(auth);

    return credential.user;
}