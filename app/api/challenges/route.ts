import { NextResponse } from "next/server"

// Mock challenges data - could be moved to a database later
const challenges = [
  {
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
    testCases: [
      {
        input: [5, 12, 8, 12, 3, 15, 8, 20],
        expected: [12, 15, 20],
      },
      {
        input: [1, 2, 3, 4, 5],
        expected: [],
      },
      {
        input: [10, 15, 10, 20, 25],
        expected: [10, 15, 20, 25],
      },
    ],
  },
  {
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
    testCases: [
      {
        input: "TreeNode(1, null, TreeNode(2, TreeNode(3), null))",
        expected: {
          inorder: [1, 3, 2],
          preorder: [1, 2, 3],
          postorder: [3, 2, 1],
        },
      },
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
