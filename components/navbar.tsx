"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from "lucide-react"
import { WalletButton } from "./wallet-button"

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">SkillVerifier</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/challenges" className="text-foreground/80 hover:text-foreground transition-colors">
              Challenges
            </Link>
            <Link href="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
              <Moon className="h-4 w-4" />
            </div>

            <WalletButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
