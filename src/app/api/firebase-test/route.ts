import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/admin";

export async function GET() {
    try {
        const snapshot = await db.collection("articles").limit(1).get();

        return NextResponse.json({
            success: true,
            exists: !snapshot.empty,
        });
    } catch (error) {
        console.error("Firebase error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Firebase connection failed",
            },
            { status: 500 }
        );
    }
}