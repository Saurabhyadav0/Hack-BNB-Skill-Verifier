import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle, Code, Shield, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI-Powered Decentralized
              <span className="block text-primary">Skill Verifier</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Prove your coding skills with AI-powered challenges and mint verifiable proof-of-skill NFTs on the
              blockchain.
            </p>
            <Link href="/challenges">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        {/* Problem → Solution → How it works */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Problem */}
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-destructive" />
                  </div>
                  <CardTitle>The Problem</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Traditional skill verification relies on centralized platforms and can be easily faked. Employers
                    struggle to trust coding assessments and certificates.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Solution */}
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Our Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    AI-powered code evaluation combined with blockchain verification creates tamper-proof skill
                    certificates that employers can trust.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* How it works */}
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-chart-2" />
                  </div>
                  <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Complete coding challenges, get AI-powered feedback, and mint proof-of-skill NFTs that serve as
                    verifiable credentials in your professional portfolio.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose SkillVerifier?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Experience the future of skill verification with cutting-edge AI and blockchain technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: "AI-Powered Grading",
                  desc: "Advanced AI evaluates your code for correctness, efficiency, and best practices.",
                },
                {
                  icon: Shield,
                  title: "Blockchain Verified",
                  desc: "Immutable proof-of-skill certificates stored on the blockchain.",
                },
                {
                  icon: Code,
                  title: "Real-World Challenges",
                  desc: "Practice with challenges that mirror actual development scenarios.",
                },
                {
                  icon: Zap,
                  title: "Instant Feedback",
                  desc: "Get immediate, detailed feedback to improve your coding skills.",
                },
              ].map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
