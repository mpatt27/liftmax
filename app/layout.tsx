import type React from "react"
import "@/app/globals.css"
import "@/app/mobile.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

// Add viewport meta tag for better mobile rendering
export const metadata = {
  title: "Liftmax - Workout Tracker",
  description: "Track your workouts, build programs, and reach your fitness goals",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
