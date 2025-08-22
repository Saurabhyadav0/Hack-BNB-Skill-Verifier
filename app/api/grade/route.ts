import { type NextRequest, NextResponse } from "next/server"
import vm from "vm"
import { prisma } from "@/lib/prisma"

async function fetchChallenge(challengeId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/challenges`, {
    cache: "no-store",
  })
  const list = await res.json()
  return list.find((c: any) => c.id === challengeId)
}

function runHiddenTests(challengeId: string, userCode: string): { passed: boolean; details: string[] } {
  const results: string[] = []
  let passed = true

  const context = vm.createContext({ console: { log: () => {} } })

  try {
    if (challengeId === "1") {
      const harness = `
        ${userCode}
        if (typeof processArray !== 'function') { throw new Error('processArray not defined'); }
        globalThis.__exports = { processArray };
      `
      const script = new vm.Script(harness, { filename: "sandbox.js" })
      script.runInContext(context, { timeout: 2000 })
      const mod: any = (context as any).__exports
      const tests = [
        { input: [5, 12, 8, 12, 3, 15, 8, 20], expected: [12, 15, 20] },
        { input: [1, 2, 3, 4, 5], expected: [] },
        { input: [10, 15, 10, 20, 25], expected: [10, 15, 20, 25] },
      ]
      for (const t of tests) {
        const out = mod.processArray(t.input)
        const ok = JSON.stringify(out) === JSON.stringify(t.expected)
        results.push(`input=${JSON.stringify(t.input)} ok=${ok}`)
        if (!ok) passed = false
      }
    } else if (challengeId === "2") {
      const harness = `
        ${userCode}
        if (typeof TreeNode !== 'function' || typeof inorderTraversal !== 'function' || typeof preorderTraversal !== 'function' || typeof postorderTraversal !== 'function') { throw new Error('required functions not defined'); }
        globalThis.__exports = { TreeNode, inorderTraversal, preorderTraversal, postorderTraversal };
      `
      const script = new vm.Script(harness, { filename: "sandbox.js" })
      script.runInContext(context, { timeout: 2000 })
      const mod: any = (context as any).__exports
      const root = new mod.TreeNode(1, null, new mod.TreeNode(2, new mod.TreeNode(3), null))
      const expected = { inorder: [1, 3, 2], preorder: [1, 2, 3], postorder: [3, 2, 1] }
      const res1 = JSON.stringify(mod.inorderTraversal(root)) === JSON.stringify(expected.inorder)
      const res2 = JSON.stringify(mod.preorderTraversal(root)) === JSON.stringify(expected.preorder)
      const res3 = JSON.stringify(mod.postorderTraversal(root)) === JSON.stringify(expected.postorder)
      results.push(`inorder=${res1} preorder=${res2} postorder=${res3}`)
      passed = res1 && res2 && res3
    } else {
      results.push("Unknown challenge; no tests executed")
      passed = false
    }
  } catch (e: any) {
    results.push(`runtime_error: ${e?.message || String(e)}`)
    passed = false
  }

  return { passed, details: results }
}

async function scoreEfficiencyWithLLM(code: string, challengeTitle: string): Promise<{ efficiency: number; feedback: string }> {
  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY
  if (!apiKey) {
    // Fallback heuristic: length and presence of common patterns
    const base = 50 + Math.min(30, Math.max(0, 30 - Math.floor(code.length / 50)))
    const bonus = ["map(", "filter(", "reduce(", "Set(", "for ("].some(k => code.includes(k)) ? 10 : 0
    return { efficiency: Math.min(100, base + bonus), feedback: "Heuristic efficiency score (no LLM key provided)." }
  }

  try {
    // Groq-like or OpenAI compatible
    const endpoint = process.env.GROQ_API_KEY ? "https://api.groq.com/openai/v1/chat/completions" : "https://api.openai.com/v1/chat/completions"
    const model = process.env.GROQ_API_KEY ? "llama-3.1-8b-instant" : "gpt-4o-mini"
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are an expert code reviewer. Score efficiency, time and space complexity on a 0-40 scale, give brief feedback." },
          { role: "user", content: `Challenge: ${challengeTitle}\nCode:\n\n${code}\n\nReturn JSON: {"efficiency": number(0-40), "feedback": string}` },
        ],
        temperature: 0.2,
      }),
    })
    const json: any = await res.json()
    const content = json.choices?.[0]?.message?.content || "{\"efficiency\": 20, \"feedback\": \"Default\"}"
    const parsed = JSON.parse(content)
    const efficiency = Math.max(0, Math.min(40, Number(parsed.efficiency) || 20))
    return { efficiency, feedback: String(parsed.feedback || "") }
  } catch {
    return { efficiency: 20, feedback: "LLM scoring failed; defaulted to 20." }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { challengeId, code, language } = await request.json()

    // Fetch challenge meta for title
    const challenge = await fetchChallenge(String(challengeId)).catch(() => null)

    // Run hidden tests in a sandbox
    let tests = { passed: false, details: ["language not supported for execution"] as string[] }
    if (!language || ["javascript", "typescript"].includes(String(language))) {
      tests = runHiddenTests(String(challengeId), String(code || ""))
    }

    // Correctness base (0-60)
    const correctness = tests.passed ? 60 : 20

    // LLM efficiency (0-40)
    const llm = await scoreEfficiencyWithLLM(String(code || ""), challenge?.title || `Challenge ${challengeId}`)

    const total = Math.max(0, Math.min(100, correctness + llm.efficiency))
    const passed = total >= 80

    const feedback = [
      tests.passed ? "All required tests passed." : `Some tests failed. Details: ${tests.details.join("; ")}`,
      `Efficiency score: ${llm.efficiency}/40. ${llm.feedback}`,
      `Total score: ${total}/100`,
    ].join(" \n")

    // Persist submission
    await prisma.submissions.create({
      data: {
        user_id: null,
        challenge_id: String(challengeId),
        code: String(code || ""),
        language: String(language || "javascript"),
        passed,
        score: total,
        efficiency: llm.efficiency,
        feedback,
      },
    })

    return NextResponse.json({
      score: total,
      feedback,
      passed,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in grade API:", error)
    return NextResponse.json({ error: "Failed to evaluate code" }, { status: 500 })
  }
}
