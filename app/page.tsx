import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Dumbbell, LineChart, ListChecks, Target } from "lucide-react"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4 md:px-6 flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6">
              Track Your Fitness Journey
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-2xl">
              Build custom workout programs, track your progress, and get intelligent weight suggestions to reach your
              fitness goals faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Smart Workout Tracking</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our intelligent system helps you build effective workout programs and suggests optimal weights based on
                your goals and progress.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: <ListChecks className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
                  title: "Custom Programs",
                  description:
                    "Create personalized workout programs tailored to your specific fitness goals and schedule.",
                },
                {
                  icon: <LineChart className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
                  title: "Progress Tracking",
                  description: "Track your performance over time with detailed metrics and visual progress charts.",
                },
                {
                  icon: <Target className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
                  title: "Weight Suggestions",
                  description: "Get intelligent weight recommendations based on your previous performance and goals.",
                },
              ].map((feature, index) => (
                <div key={index} className="border rounded-lg p-5 md:p-6 hover:shadow-md transition-shadow">
                  <div className="mb-4 flex justify-center md:justify-start">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-center md:text-left">{feature.title}</h3>
                  <p className="text-gray-600 text-center md:text-left">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Follow these simple steps to start optimizing your workouts and reaching your fitness goals.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  step: "1",
                  title: "Set Your Goals",
                  description:
                    "Define your fitness objectives, whether it's building muscle, losing weight, or improving strength.",
                },
                {
                  step: "2",
                  title: "Create a Program",
                  description: "Build a custom workout program or choose from our pre-designed templates.",
                },
                {
                  step: "3",
                  title: "Track Workouts",
                  description: "Log your exercises, sets, reps, and weights after each workout session.",
                },
                {
                  step: "4",
                  title: "Follow Suggestions",
                  description: "Use our intelligent weight suggestions to optimize your progress over time.",
                },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg md:text-xl font-bold mb-3 md:mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="bg-primary text-white rounded-xl p-6 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Workouts?</h2>
                <p className="text-primary-foreground mb-6 md:mb-8">
                  Join thousands of fitness enthusiasts who are optimizing their training with Liftmax's intelligent
                  workout tracking system.
                </p>
                <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                  Start Tracking Now <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 text-lg font-bold mb-4">
                <Dumbbell className="h-5 w-5" />
                <span>Liftmax</span>
              </div>
              <p className="text-gray-400 text-sm">Your intelligent workout companion.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 md:mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 text-sm hover:text-white">
                    Workout Programs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 text-sm hover:text-white">
                    Progress Tracking
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 text-sm hover:text-white">
                    Weight Suggestions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 md:mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 text-sm hover:text-white">
                    Exercise Library
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 text-sm hover:text-white">
                    Fitness Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 text-sm hover:text-white">
                    Support Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 md:mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 text-sm hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 text-sm hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>© 2023 Liftmax. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
