import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChallengeCard } from "@/components/challenge-card"

// Mock challenges data
const challenges = [
  {
    id: "1",
    title: "Array Manipulation",
    description: "Implement efficient algorithms for common array operations like sorting, searching, and filtering.",
    difficulty: "Easy",
    estimatedTime: "30 min",
    tags: ["JavaScript", "Arrays", "Algorithms"],
  },
  {
    id: "2",
    title: "Binary Tree Traversal",
    description:
      "Write functions to traverse binary trees using different methods: in-order, pre-order, and post-order.",
    difficulty: "Medium",
    estimatedTime: "45 min",
    tags: ["Data Structures", "Trees", "Recursion"],
  },
  {
    id: "3",
    title: "API Rate Limiter",
    description: "Design and implement a rate limiting system for API endpoints with configurable limits.",
    difficulty: "Hard",
    estimatedTime: "60 min",
    tags: ["System Design", "APIs", "Performance"],
  },
  {
    id: "4",
    title: "React Component Optimization",
    description: "Optimize React components for performance using memoization and proper state management.",
    difficulty: "Medium",
    estimatedTime: "40 min",
    tags: ["React", "Performance", "Frontend"],
  },
  {
    id: "5",
    title: "Database Query Optimization",
    description: "Write efficient SQL queries and optimize database performance for large datasets.",
    difficulty: "Hard",
    estimatedTime: "50 min",
    tags: ["SQL", "Database", "Performance"],
  },
  {
    id: "6",
    title: "String Pattern Matching",
    description: "Implement pattern matching algorithms like KMP or Boyer-Moore for string searching.",
    difficulty: "Medium",
    estimatedTime: "35 min",
    tags: ["Algorithms", "Strings", "Pattern Matching"],
  },
]

export default function ChallengesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Coding Challenges</h1>
            <p className="text-muted-foreground text-lg">
              Test your skills with AI-powered coding challenges and earn verifiable proof-of-skill NFTs.
            </p>
          </div>

          {/* Challenges Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
