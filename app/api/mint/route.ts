import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { challengeId, score } = await request.json()

    // Validate that score is passing
    if (score < 70) {
      return NextResponse.json({ error: "Score must be 70 or higher to mint NFT" }, { status: 400 })
    }

    // Simulate blockchain transaction delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate mock transaction hash
    const generateTxHash = () => {
      const chars = "0123456789abcdef"
      let hash = "0x"
      for (let i = 0; i < 64; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)]
      }
      return hash
    }

    const txHash = generateTxHash()

    // Mock NFT metadata
    const nftMetadata = {
      name: `SkillVerifier Certificate #${challengeId}`,
      description: `Proof-of-skill NFT for completing coding challenge with score ${score}/100`,
      attributes: [
        {
          trait_type: "Challenge ID",
          value: challengeId,
        },
        {
          trait_type: "Score",
          value: score,
        },
        {
          trait_type: "Difficulty",
          value: challengeId === "1" ? "Easy" : challengeId === "2" ? "Medium" : "Hard",
        },
        {
          trait_type: "Minted Date",
          value: new Date().toISOString().split("T")[0],
        },
      ],
    }

    return NextResponse.json({
      tx: txHash,
      tokenId: Math.floor(Math.random() * 10000) + 1,
      metadata: nftMetadata,
      explorerUrl: `https://etherscan.io/tx/${txHash}`,
      openseaUrl: `https://opensea.io/assets/ethereum/0x1234567890123456789012345678901234567890/${Math.floor(Math.random() * 10000) + 1}`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in mint API:", error)
    return NextResponse.json({ error: "Failed to mint NFT" }, { status: 500 })
  }
}
