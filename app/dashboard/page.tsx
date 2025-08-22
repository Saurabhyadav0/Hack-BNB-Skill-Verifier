import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Award, TrendingUp, Target, CheckCircle, XCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

// Mock user data
const userStats = {
  totalChallenges: 20,
  completedChallenges: 12,
  averageScore: 78,
  nftsMinted: 7,
}

// History of challenge attempts (mixed easy/medium/hard)
const challengeAttempts = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    score: 90,
    status: "passed",
    nftMinted: true,
    attemptedAt: "2024-01-15",
    txHash: "0x1234...abcd",
  },
  {
    id: "2",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    score: 84,
    status: "passed",
    nftMinted: true,
    attemptedAt: "2024-01-14",
    txHash: "0x5678...efgh",
  },
  {
    id: "3",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    score: 55,
    status: "failed",
    nftMinted: false,
    attemptedAt: "2024-01-13",
    txHash: null,
  },
  {
    id: "4",
    title: "Valid Parentheses",
    difficulty: "Easy",
    score: 100,
    status: "passed",
    nftMinted: true,
    attemptedAt: "2024-01-12",
    txHash: "0x9abc...ijkl",
  },
  {
    id: "5",
    title: "Merge Intervals",
    difficulty: "Medium",
    score: 76,
    status: "passed",
    nftMinted: true,
    attemptedAt: "2024-01-11",
    txHash: "0xdef0...mnop",
  },
  {
    id: "6",
    title: "Regular Expression Matching",
    difficulty: "Hard",
    score: 48,
    status: "failed",
    nftMinted: false,
    attemptedAt: "2024-01-10",
    txHash: null,
  },
  {
    id: "7",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    score: 95,
    status: "passed",
    nftMinted: true,
    attemptedAt: "2024-01-09",
    txHash: "0x1111...qrst",
  },
  {
    id: "8",
    title: "Container With Most Water",
    difficulty: "Medium",
    score: 69,
    status: "failed",
    nftMinted: false,
    attemptedAt: "2024-01-08",
    txHash: null,
  },
  {
    id: "9",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    score: 82,
    status: "passed",
    nftMinted: true,
    attemptedAt: "2024-01-07",
    txHash: "0xabcd...wxyz",
  },
  {
    id: "10",
    title: "Climbing Stairs",
    difficulty: "Easy",
    score: 100,
    status: "passed",
    nftMinted: true,
    attemptedAt: "2024-01-06",
    txHash: "0x4444...yyyy",
  },
]

export default function DashboardPage() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "secondary"
      case "Medium":
        return "default"
      case "Hard":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    return status === "passed" ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Track your progress and view your skill verification achievements.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Challenges</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.totalChallenges}</div>
                <p className="text-xs text-muted-foreground">Attempted so far</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.completedChallenges}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((userStats.completedChallenges / userStats.totalChallenges) * 100)}% success rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.averageScore}</div>
                <Progress value={userStats.averageScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">NFTs Minted</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.nftsMinted}</div>
                <p className="text-xs text-muted-foreground">Proof-of-skill certificates</p>
              </CardContent>
            </Card>
          </div>

          {/* Challenge Attempts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Challenge History</CardTitle>
              <CardDescription>Your recent challenge attempts and results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Challenge</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>NFT</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {challengeAttempts.map((attempt) => (
                      <TableRow key={attempt.id}>
                        <TableCell className="font-medium">
                          <Link href={`/challenges/${attempt.id}`} className="hover:text-primary transition-colors">
                            {attempt.title}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getDifficultyColor(attempt.difficulty)}>{attempt.difficulty}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{attempt.score}</span>
                            <span className="text-muted-foreground text-sm">/100</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(attempt.status)}
                            <Badge variant={attempt.status === "passed" ? "default" : "destructive"}>
                              {attempt.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          {attempt.nftMinted ? (
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm text-green-600 font-medium">Minted</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not minted</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(attempt.attemptedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Link href={`/challenges/${attempt.id}`}>
                              <Button variant="outline" size="sm" className="bg-transparent">
                                Retry
                              </Button>
                            </Link>
                            {attempt.txHash && (
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
