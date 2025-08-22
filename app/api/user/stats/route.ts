import { NextResponse } from "next/server"

// Mock user statistics - in a real app, this would come from a database
export async function GET() {
  // Simulate database query delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const userStats = {
    totalChallenges: 12,
    completedChallenges: 8,
    averageScore: 78,
    nftsMinted: 5,
    recentActivity: [
      {
        type: "challenge_completed",
        challengeTitle: "Array Manipulation",
        score: 85,
        timestamp: "2024-01-15T10:30:00Z",
      },
      {
        type: "nft_minted",
        challengeTitle: "Binary Tree Traversal",
        timestamp: "2024-01-14T15:45:00Z",
      },
      {
        type: "challenge_failed",
        challengeTitle: "API Rate Limiter",
        score: 45,
        timestamp: "2024-01-13T09:20:00Z",
      },
    ],
    skillDistribution: {
      JavaScript: 85,
      "Data Structures": 78,
      Algorithms: 82,
      "System Design": 65,
      React: 88,
      Database: 72,
    },
  }

  return NextResponse.json(userStats)
}
