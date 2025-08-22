import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Code } from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: string
  estimatedTime: string
  tags: string[]
}

interface ChallengeCardProps {
  challenge: Challenge
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "secondary"
      case "Medium":
        return "default"
      case "Hard":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{challenge.title}</CardTitle>
          <Badge variant={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
        </div>
        <CardDescription className="text-base line-clamp-3">{challenge.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {challenge.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {challenge.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{challenge.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Time estimate */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{challenge.estimatedTime}</span>
          </div>
        </div>

        {/* Action button */}
        <Link href={`/challenges/${challenge.id}`} className="mt-6">
          <Button className="w-full">
            <Code className="h-4 w-4 mr-2" />
            Start Challenge
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
