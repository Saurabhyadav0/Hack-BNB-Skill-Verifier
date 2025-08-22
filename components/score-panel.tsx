"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MintButton } from "@/components/mint-button"
import { CheckCircle, XCircle, Clock, Award } from "lucide-react"

interface ScoreResult {
  score: number
  feedback: string
  passed: boolean
  timestamp?: string
}

interface ScorePanelProps {
  challengeId: string
}

export function ScorePanel({ challengeId }: ScorePanelProps) {
  const [result, setResult] = useState<ScoreResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleCodeSubmitted = (event: CustomEvent) => {
      setResult(event.detail)
      setIsLoading(false)
    }

    window.addEventListener("codeSubmitted", handleCodeSubmitted as EventListener)

    return () => {
      window.removeEventListener("codeSubmitted", handleCodeSubmitted as EventListener)
    }
  }, [])

  if (!result && !isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Waiting for Submission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Submit your code to receive AI-powered feedback and scoring.</CardDescription>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evaluating...</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Our AI is analyzing your code. This may take a few moments.</CardDescription>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {result?.passed ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          Evaluation Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Score:</span>
          <Badge variant={result?.passed ? "default" : "secondary"} className="text-lg px-3 py-1">
            {result?.score}/100
          </Badge>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={result?.passed ? "default" : "destructive"}>{result?.passed ? "Passed" : "Failed"}</Badge>
        </div>

        {/* Feedback */}
        <div>
          <h4 className="text-sm font-medium mb-2">AI Feedback:</h4>
          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{result?.feedback}</p>
        </div>

        {/* Mint NFT Button */}
        {result?.passed && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Congratulations! You passed!</span>
            </div>
            <MintButton challengeId={challengeId} score={result.score} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
