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
  totalChallenges: 12,
  completedChallenges: 8,
  averageScore: 78,
  nftsMinted: 5,
}

const challengeAttempts = [
  {
    id: "1",
    title: "Array Manipulation",
    difficulty: "Easy",
    score: 85,
    status: "passed",
    nftMinted: true,
    attemptedAt: "2024-01-15",
    txHash: "0x1234...abcd",
  },
  {
    id: "2",
    title: "Binary Tree Traversal",
    difficulty: "Medium",
    score: 92,
    status: "passed",
    nftMinted: true,
    attemptedAt: "2024-01-14",
    txHash: "0x5678...efgh",
  },
  {
    id: "3",
    title: "API Rate Limiter",
    difficulty: "Hard",
    score: 45,
    status: "failed",
    nftMinted: false,
    attemptedAt: "2024-01-13",
    txHash: null,
  },
  {
    id: "4",
    title: "React Component Optimization",
    difficulty: "Medium",
    score: 88,
    status: "passed",
    nftMinted: true,
    attemptedAt: "2024-01-12",
    txHash: "0x9abc...ijkl",
  },
  {
    id: "5",
    title: "Database Query Optimization",
    difficulty: "Hard",
    score: 76,
    status: "passed",
    nftMinted: true,
    attemptedAt: "2024-01-11",
    txHash: "0xdef0...mnop",
  },
  {
    id: "6",
    title: "String Pattern Matching",
    difficulty: "Medium",
    score: 62,
    status: "failed",
    nftMinted: false,
    attemptedAt: "2024-01-10",
    txHash: null,
  },
  {
    id: "7",
    title: "Graph Algorithms",
    difficulty: "Hard",
    score: 94,
    status: "passed",
    nftMinted: true,
    attemptedAt: "2024-01-09",
    txHash: "0x1111...qrst",
  },
  {
    id: "8",
    title: "Dynamic Programming",
    difficulty: "Medium",
    score: 71,
    status: "passed",
    nftMinted: false,
    attemptedAt: "2024-01-08",
    txHash: null,
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

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Ready for More Challenges?</CardTitle>
                <CardDescription>Continue improving your skills and earning more proof-of-skill NFTs.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/challenges">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse Challenges
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
