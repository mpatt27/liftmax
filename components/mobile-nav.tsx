"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dumbbell, Menu, X } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/programs", label: "Programs" },
    { href: "/exercises", label: "Exercises" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[350px] pt-10">
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-8">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2" onClick={() => setOpen(false)}>
              <Dumbbell className="h-6 w-6" />
              <span>Liftmax</span>
            </Link>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-col gap-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-lg font-medium p-2 rounded-md ${
                  pathname === route.href ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
                onClick={() => setOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-6">
            <Button className="w-full" variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
