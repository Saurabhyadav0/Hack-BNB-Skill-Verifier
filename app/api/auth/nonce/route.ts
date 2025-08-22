import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
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

console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(process.env.SUPABASE_SERVICE_ROLE_KEY);
export async function POST(request: NextRequest) {
    try {
        const { wallet_address } = await request.json()

        if (!wallet_address) {
            return NextResponse.json(
                { error: "Wallet address is required" },
                { status: 400 }
            )
        }

        const normalizedAddress = wallet_address.toLowerCase()
        const nonce = crypto.randomBytes(16).toString("hex")

        // Ensure a user row exists, update or insert
        const { data, error } = await supabase
            .from("users")
            .upsert(
                { wallet_address: normalizedAddress, nonce },
                { onConflict: "wallet_address" } // 👈 important
            )
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ nonce: data.nonce, user: data })
    } catch (error) {
        console.error("Nonce error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
