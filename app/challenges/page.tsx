import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChallengeCard } from "@/components/challenge-card"

// Real LeetCode-style challenges (mixed difficulty)
const challenges = [
  {
    id: "1",
    title: "Two Sum",
    description: "Given an array of integers, return indices of the two numbers such that they add up to a target.",
    difficulty: "Easy",
    estimatedTime: "20 min",
    tags: ["Array", "Hash Map"],
  },
  {
    id: "2",
    title: "Longest Palindromic Substring",
    description: "Given a string s, return the longest palindromic substring in s.",
    difficulty: "Medium",
    estimatedTime: "35 min",
    tags: ["String", "Dynamic Programming", "Two Pointers"],
  },
  {
    id: "3",
    title: "Median of Two Sorted Arrays",
    description: "Find the median of two sorted arrays with an O(log(m+n)) solution.",
    difficulty: "Hard",
    estimatedTime: "50 min",
    tags: ["Binary Search", "Array", "Divide and Conquer"],
  },
  {
    id: "4",
    title: "Valid Parentheses",
    description: "Given a string containing only brackets, determine if it is valid.",
    difficulty: "Easy",
    estimatedTime: "15 min",
    tags: ["Stack", "String"],
  },
  {
    id: "5",
    title: "Merge Intervals",
    description: "Given intervals, merge all overlapping intervals.",
    difficulty: "Medium",
    estimatedTime: "30 min",
    tags: ["Array", "Sorting"],
  },
  {
    id: "6",
    title: "Regular Expression Matching",
    description: "Implement regex matching with support for '.' and '*'.",
    difficulty: "Hard",
    estimatedTime: "60 min",
    tags: ["String", "Dynamic Programming"],
  },
  {
    id: "7",
    title: "Best Time to Buy and Sell Stock",
    description: "Find the maximum profit from a single buy and sell operation.",
    difficulty: "Easy",
    estimatedTime: "15 min",
    tags: ["Array", "Dynamic Programming"],
  },
  {
    id: "8",
    title: "Container With Most Water",
    description: "Find two lines that together contain the most water.",
    difficulty: "Medium",
    estimatedTime: "25 min",
    tags: ["Two Pointers", "Greedy"],
  },
  {
    id: "9",
    title: "Trapping Rain Water",
    description: "Calculate how much rainwater can be trapped between bars.",
    difficulty: "Hard",
    estimatedTime: "50 min",
    tags: ["Array", "Two Pointers", "Dynamic Programming"],
  },
  {
    id: "10",
    title: "Climbing Stairs",
    description: "Count distinct ways to climb to the top when you can climb 1 or 2 steps.",
    difficulty: "Easy",
    estimatedTime: "15 min",
    tags: ["Dynamic Programming"],
  },
  {
    id: "11",
    title: "Group Anagrams",
    description: "Group words that are anagrams of each other.",
    difficulty: "Medium",
    estimatedTime: "30 min",
    tags: ["Hash Map", "Sorting"],
  },
  {
    id: "12",
    title: "Word Ladder",
    description: "Find the shortest transformation sequence from beginWord to endWord.",
    difficulty: "Hard",
    estimatedTime: "60 min",
    tags: ["Graph", "BFS"],
  },
  {
    id: "13",
    title: "Linked List Cycle",
    description: "Detect if a linked list has a cycle.",
    difficulty: "Easy",
    estimatedTime: "20 min",
    tags: ["Linked List", "Two Pointers"],
  },
  {
    id: "14",
    title: "Product of Array Except Self",
    description: "Return an array such that output[i] is product of all numbers except nums[i].",
    difficulty: "Medium",
    estimatedTime: "25 min",
    tags: ["Array", "Prefix Sum"],
  },
  {
    id: "15",
    title: "Minimum Window Substring",
    description: "Given two strings s and t, return the minimum window in s which contains all characters of t.",
    difficulty: "Hard",
    estimatedTime: "55 min",
    tags: ["String", "Hash Map", "Sliding Window"],
  },
  {
    id: "16",
    title: "Course Schedule",
    description: "Given prerequisites, determine if all courses can be finished.",
    difficulty: "Medium",
    estimatedTime: "30 min",
    tags: ["Graph", "Topological Sort"],
  },
  {
    id: "17",
    title: "Merge k Sorted Lists",
    description: "Merge k sorted linked lists into one sorted list.",
    difficulty: "Hard",
    estimatedTime: "45 min",
    tags: ["Linked List", "Heap", "Divide and Conquer"],
  },
  {
    id: "18",
    title: "Search in Rotated Sorted Array",
    description: "Search a target in rotated sorted array using O(log n) time.",
    difficulty: "Medium",
    estimatedTime: "25 min",
    tags: ["Array", "Binary Search"],
  },
  {
    id: "19",
    title: "LRU Cache",
    description: "Design and implement an LRU cache.",
    difficulty: "Hard",
    estimatedTime: "50 min",
    tags: ["Hash Map", "Linked List", "Design"],
  },
  {
    id: "20",
    title: "Subsets",
    description: "Return all possible subsets (the power set).",
    difficulty: "Medium",
    estimatedTime: "25 min",
    tags: ["Backtracking", "Array"],
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
