import { type NextRequest, NextResponse } from "next/server"

// Mock user database (in production, this would be your actual database)
const mockUsers = new Map<string, { id: string; wallet_address: string; created_at: string }>()

export async function POST(request: NextRequest) {
  try {
    const { wallet_address } = await request.json()

    if (!wallet_address) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
    }

    // Validate wallet address format (basic Ethereum address validation)
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
    if (!ethAddressRegex.test(wallet_address)) {
      return NextResponse.json({ error: "Invalid wallet address format" }, { status: 400 })
    }

    // Check if user already exists
    let user = mockUsers.get(wallet_address.toLowerCase())

    if (!user) {
      // Create new user
      user = {
        id: crypto.randomUUID(),
        wallet_address: wallet_address.toLowerCase(),
        created_at: new Date().toISOString(),
      }
      mockUsers.set(wallet_address.toLowerCase(), user)
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        wallet_address: user.wallet_address,
        created_at: user.created_at,
      },
    })
  } catch (error) {
    console.error("Wallet auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const wallet_address = searchParams.get("wallet_address")

  if (!wallet_address) {
    return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
  }

  const user = mockUsers.get(wallet_address.toLowerCase())

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      wallet_address: user.wallet_address,
      created_at: user.created_at,
    },
  })
}
