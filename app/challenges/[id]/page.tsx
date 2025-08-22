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
      title: "Array Manipulation",
      description: "Implement efficient algorithms for common array operations like sorting, searching, and filtering.",
      difficulty: "Easy",
      estimatedTime: "30 min",
      tags: ["JavaScript", "Arrays", "Algorithms"],
      prompt: `Write a function that takes an array of numbers and returns a new array with the following transformations:
1. Remove all duplicate numbers
2. Sort the array in ascending order
3. Filter out numbers less than 10

Example:
Input: [5, 12, 8, 12, 3, 15, 8, 20]
Output: [12, 15, 20]

Your function should be named 'processArray' and take one parameter 'numbers'.`,
      starterCode: `function processArray(numbers) {
  // Your code here
  
}

// Test your function
console.log(processArray([5, 12, 8, 12, 3, 15, 8, 20]));`,
    },
    "2": {
      id: "2",
      title: "Binary Tree Traversal",
      description:
        "Write functions to traverse binary trees using different methods: in-order, pre-order, and post-order.",
      difficulty: "Medium",
      estimatedTime: "45 min",
      tags: ["Data Structures", "Trees", "Recursion"],
      prompt: `Implement three binary tree traversal methods for the given TreeNode structure:

1. inorderTraversal(root) - Left, Root, Right
2. preorderTraversal(root) - Root, Left, Right  
3. postorderTraversal(root) - Left, Right, Root

Each function should return an array of node values in the correct order.`,
      starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inorderTraversal(root) {
  // Your code here
}

function preorderTraversal(root) {
  // Your code here
}

function postorderTraversal(root) {
  // Your code here
}

// Test with sample tree
const root = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));
console.log("Inorder:", inorderTraversal(root));`,
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
