import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CodeEditor } from "@/components/code-editor"
import { ScorePanel } from "@/components/score-panel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, Code } from "lucide-react"

// Mock challenge data
const getChallengeById = (id: string) => {
  const challenges = {
    "1": {
      id: "1",
      title: "Median of Two Sorted Arrays",
      description:
        "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
      difficulty: "Hard",
      estimatedTime: "45 min",
      tags: ["Array", "Binary Search", "Divide and Conquer"],
      prompt: `You are given two sorted arrays nums1 and nums2 of size m and n respectively. 
Return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000

Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000`,
      starterCode: `function findMedianSortedArrays(nums1, nums2) {
  // Your code here
}

// Test cases
console.log(findMedianSortedArrays([1,3], [2])); // Expected: 2
console.log(findMedianSortedArrays([1,2], [3,4])); // Expected: 2.5`,
    },
    "2": {
      id: "2",
      title: "Longest Palindromic Substring",
      description:
        "Given a string s, return the longest palindromic substring in s.",
      difficulty: "Medium",
      estimatedTime: "35 min",
      tags: ["Two Pointers", "String", "Dynamic Programming"],
      prompt: `A palindrome is a string that reads the same forward and backward.
Given a string s, return the longest palindromic substring in s.

Example 1:
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.

Example 2:
Input: s = "cbbd"
Output: "bb"

Constraints:
- 1 <= s.length <= 1000
- s consists of only digits and English letters.`,
      starterCode: `function longestPalindrome(s) {
  // Your code here
}

// Test cases
console.log(longestPalindrome("babad")); // Expected: "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // Expected: "bb"`,
    },
  }

  return challenges[id as keyof typeof challenges] || challenges["1"]
}

export default function ChallengePage({ params }: { params: { id: string } }) {
  const challenge = getChallengeById(params.id)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Challenge Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
                <p className="text-muted-foreground text-lg">{challenge.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    challenge.difficulty === "Easy"
                      ? "secondary"
                      : challenge.difficulty === "Medium"
                        ? "default"
                        : "destructive"
                  }
                >
                  {challenge.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {challenge.estimatedTime}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {challenge.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Challenge Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Problem Description */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Challenge Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">{challenge.prompt}</pre>
                  </div>
                </CardContent>
              </Card>

              {/* Score Panel */}
              <ScorePanel challengeId={challenge.id} />
            </div>

            {/* Right Column - Code Editor */}
            <div>
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Code Editor
                  </CardTitle>
                  <CardDescription>
                    Write your solution below and click submit to get AI-powered feedback.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <CodeEditor challengeId={challenge.id} initialCode={challenge.starterCode} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
