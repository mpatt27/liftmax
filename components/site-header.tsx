import Link from "next/link"
import { Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Dumbbell className="h-5 w-5 md:h-6 md:w-6" />
          <span>Liftmax</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/programs" className="text-sm font-medium hover:text-primary transition-colors">
            Programs
          </Link>
          <Link href="/exercises" className="text-sm font-medium hover:text-primary transition-colors">
            Exercises
          </Link>
          <Button variant="ghost">Sign Out</Button>
        </nav>
        <MobileNav />
      </div>
    </header>
  )
}
