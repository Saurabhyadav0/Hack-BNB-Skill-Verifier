import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { prisma } from "@/lib/prisma"

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

        // Upsert user by wallet_address, returning the nonce
        const user = await prisma.users.upsert({
            where: { wallet_address: normalizedAddress },
            update: { nonce },
            create: { wallet_address: normalizedAddress, nonce }
        })

        return NextResponse.json({ nonce: user.nonce })
    } catch (error) {
        console.error("Nonce error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
