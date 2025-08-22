"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Award, ExternalLink } from "lucide-react"

interface MintButtonProps {
  challengeId: string
  score: number
}

export function MintButton({ challengeId, score }: MintButtonProps) {
  const [isMinting, setIsMinting] = useState(false)
  const [mintResult, setMintResult] = useState<{ tx: string } | null>(null)

  const handleMint = async () => {
    setIsMinting(true)

    try {
      const response = await fetch("/api/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challengeId,
          score,
        }),
      })

      const result = await response.json()
      setMintResult(result)
    } catch (error) {
      console.error("Error minting NFT:", error)
    } finally {
      setIsMinting(false)
    }
  }

  if (mintResult) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-green-500">
            <Award className="h-3 w-3 mr-1" />
            NFT Minted!
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Transaction Hash:</p>
          <code className="text-xs bg-muted p-2 rounded block mt-1 break-all">{mintResult.tx}</code>
        </div>
        <Button variant="outline" size="sm" className="w-full bg-transparent">
          <ExternalLink className="h-4 w-4 mr-2" />
          View on Explorer
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={handleMint}
      disabled={isMinting}
      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
    >
      {isMinting ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Minting NFT...
        </>
      ) : (
        <>
          <Award className="h-4 w-4 mr-2" />
          Mint Proof-of-Skill NFT
        </>
      )}
    </Button>
  )
}
