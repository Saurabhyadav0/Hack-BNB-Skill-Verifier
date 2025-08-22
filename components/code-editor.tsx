"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Loader2, Play } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center bg-muted rounded-lg">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  ),
})

interface CodeEditorProps {
  challengeId: string
  initialCode: string
}

export function CodeEditor({ challengeId, initialCode }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [language, setLanguage] = useState<string>("javascript")

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challengeId,
          code,
          language,
        }),
      })

      const result = await response.json()

      // Dispatch custom event to update score panel
      window.dispatchEvent(
        new CustomEvent("codeSubmitted", {
          detail: result,
        }),
      )
    } catch (error) {
      console.error("Error submitting code:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Language</div>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="java">Java</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <MonacoEditor
          height="400px"
          defaultLanguage={language === "typescript" ? "typescript" : "javascript"}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
          }}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isSubmitting} size="lg">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Submit Solution
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
