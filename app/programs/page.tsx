"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Filter programs based on active tab
  const filteredPrograms =
    activeTab === "all" ? programs : programs.filter((program) => program.goal.toLowerCase() === activeTab)

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Workout Programs</h1>
              <p className="text-gray-500">Create and manage your workout programs</p>
            </div>
            <Button asChild>
              <Link href="/programs/new">
                <Plus className="mr-2 h-4 w-4" /> Create Program
              </Link>
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="strength">Strength</TabsTrigger>
              <TabsTrigger value="muscle growth">Muscle</TabsTrigger>
              <TabsTrigger value="general fitness">Fitness</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPrograms.map((program) => (
                  <Card key={program.id}>
                    <CardHeader>
                      <CardTitle>{program.name}</CardTitle>
                      <CardDescription>{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Goal:</span>
                          <span className="text-sm font-medium">{program.goal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Workouts:</span>
                          <span className="text-sm font-medium">{program.workouts} per week</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Duration:</span>
                          <span className="text-sm font-medium">{program.duration} weeks</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/programs/${program.id}`}>View Details</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/programs/${program.id}/start`}>Start Program</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

const programs = [
  {
    id: "1",
    name: "Strength Builder",
    description: "Focus on building strength with compound movements",
    goal: "Strength",
    workouts: 4,
    duration: 12,
  },
  {
    id: "2",
    name: "Hypertrophy Program",
    description: "Maximize muscle growth with high volume training",
    goal: "Muscle Growth",
    workouts: 5,
    duration: 8,
  },
  {
    id: "3",
    name: "Full Body Conditioning",
    description: "Improve overall fitness and conditioning",
    goal: "General Fitness",
    workouts: 3,
    duration: 6,
  },
  {
    id: "4",
    name: "Upper/Lower Split",
    description: "Alternate between upper and lower body workouts",
    goal: "Balanced Development",
    workouts: 4,
    duration: 10,
  },
  {
    id: "5",
    name: "Push/Pull/Legs",
    description: "Classic PPL split for balanced development",
    goal: "Muscle Growth",
    workouts: 6,
    duration: 12,
  },
]
