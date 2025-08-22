import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { challengeId, code } = await request.json()

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock AI evaluation logic based on code content and challenge
    const mockEvaluations = {
      "1": {
        // Array Manipulation challenge
        keywords: ["filter", "sort", "unique", "Set", "Array.from"],
        maxScore: 100,
      },
      "2": {
        // Binary Tree Traversal challenge
        keywords: ["recursion", "left", "right", "push", "TreeNode"],
        maxScore: 100,
      },
    }

    const evaluation = mockEvaluations[challengeId as keyof typeof mockEvaluations] || mockEvaluations["1"]

    // Simple scoring based on keyword presence and code quality indicators
    let score = 40 // Base score
    let feedback = "Your solution shows basic understanding. "

    // Check for keywords
    const keywordMatches = evaluation.keywords.filter((keyword) =>
      code.toLowerCase().includes(keyword.toLowerCase()),
    ).length

    score += (keywordMatches / evaluation.keywords.length) * 40

    // Check for good practices
    if (code.includes("//") || code.includes("/*")) {
      score += 5
      feedback += "Good use of comments. "
    }

    if (code.includes("const ") || code.includes("let ")) {
      score += 5
      feedback += "Proper variable declarations. "
    }

    if (code.includes("return")) {
      score += 10
      feedback += "Function returns a value correctly. "
    }

    // Add some randomness to make it more realistic
    const randomAdjustment = Math.floor(Math.random() * 21) - 10 // -10 to +10
    score = Math.max(0, Math.min(100, Math.floor(score + randomAdjustment)))

    const passed = score >= 70

    // Generate contextual feedback based on score
    if (score >= 90) {
      feedback = "Excellent solution! Your code demonstrates strong algorithmic thinking and follows best practices. "
    } else if (score >= 80) {
      feedback = "Great work! Your solution is solid with room for minor optimizations. "
    } else if (score >= 70) {
      feedback = "Good solution! Your code works correctly but could benefit from some improvements. "
    } else if (score >= 50) {
      feedback = "Your solution shows understanding but has some issues. Consider edge cases and optimization. "
    } else {
      feedback = "Your solution needs significant improvements. Review the problem requirements and try again. "
    }

    // Add specific feedback based on challenge
    if (challengeId === "1") {
      if (code.includes("Set")) {
        feedback += "Great use of Set for removing duplicates! "
      }
      if (code.includes("sort")) {
        feedback += "Proper sorting implementation. "
      }
      if (!code.includes("filter")) {
        feedback += "Consider using filter() for cleaner code. "
      }
    } else if (challengeId === "2") {
      if (code.includes("recursion") || (code.includes("left") && code.includes("right"))) {
        feedback += "Good recursive approach for tree traversal! "
      }
      if (!code.includes("push")) {
        feedback += "Make sure to collect results in an array. "
      }
    }

    return NextResponse.json({
      score,
      feedback: feedback.trim(),
      passed,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in grade API:", error)
    return NextResponse.json({ error: "Failed to evaluate code" }, { status: 500 })
  }
}
