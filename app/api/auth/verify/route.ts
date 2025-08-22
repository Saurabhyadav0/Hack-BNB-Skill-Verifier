import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { ethers } from "ethers"
import crypto from "crypto"


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
)

export async function POST(request: NextRequest) {
    try {
        const { wallet_address, signature } = await request.json()

        if (!wallet_address || !signature) {
            return NextResponse.json({ error: "Wallet address and signature required" }, { status: 400 })
        }

        // Fetch user & nonce
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("wallet_address", wallet_address.toLowerCase())
            .single()

        if (error || !user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Recover address from signature
        const recovered = ethers.verifyMessage(user.nonce, signature)

        if (recovered.toLowerCase() !== wallet_address.toLowerCase()) {
            return NextResponse.json({ error: "Signature verification failed" }, { status: 401 })
        }

        // Reset nonce to prevent replay attacks
        const newNonce = crypto.randomBytes(16).toString("hex")
        await supabase
            .from("users")
            .update({ nonce: newNonce })
            .eq("wallet_address", wallet_address.toLowerCase())

        // ✅ Auth success
        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                wallet_address: user.wallet_address,
                created_at: user.created_at,
            },
        })
    } catch (error) {
        console.error("Verify error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
