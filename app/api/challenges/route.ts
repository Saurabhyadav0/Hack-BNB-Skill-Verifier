import { NextResponse } from "next/server"

// Mock challenges data - could be moved to a database later
const challenges = [
  {
    id: "1",
    title: "Remove Duplicates, Filter, and Sort",
    description: "Given an integer array, remove duplicates, filter out values < 10, and return sorted ascending.",
    difficulty: "Easy",
    estimatedTime: "20 min",
    tags: ["Arrays", "Hashing", "Sorting"],
    prompt: `Implement function processArray(numbers: number[]): number[] that:
1) Removes duplicates
2) Filters out values < 10
3) Sorts ascending

Example:
Input: [5, 12, 8, 12, 3, 15, 8, 20]
Output: [12, 15, 20]`,
    starterCode: `function processArray(numbers) {
  // TODO: remove duplicates, filter < 10, sort ascending
}

// Example
// console.log(processArray([5, 12, 8, 12, 3, 15, 8, 20]));`,
    testCases: [
      { input: [5, 12, 8, 12, 3, 15, 8, 20], expected: [12, 15, 20] },
      { input: [1, 2, 3, 4, 5], expected: [] },
      { input: [10, 15, 10, 20, 25], expected: [10, 15, 20, 25] },
    ],
  },
  {
    id: "2",
    title: "Binary Tree Traversals",
    description: "Implement inorder, preorder, and postorder traversals for a binary tree.",
    difficulty: "Medium",
    estimatedTime: "40 min",
    tags: ["Trees", "Recursion"],
    prompt: `Given class TreeNode { val; left; right; }, implement:
inorderTraversal(root), preorderTraversal(root), postorderTraversal(root).
Each returns an array of visited values.`,
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inorderTraversal(root) {}
function preorderTraversal(root) {}
function postorderTraversal(root) {}
`,
    testCases: [
      { input: "TreeNode(1, null, TreeNode(2, TreeNode(3), null))", expected: { inorder: [1,3,2], preorder: [1,2,3], postorder: [3,2,1] } },
    ],
  },
]

export async function GET() {
  return NextResponse.json(challenges)
}

export async function POST() {
  // Could be used for creating new challenges
  return NextResponse.json({ message: "Challenge creation not implemented" }, { status: 501 })
}
