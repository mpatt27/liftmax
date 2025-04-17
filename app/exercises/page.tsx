"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { SiteHeader } from "@/components/site-header"

export default function ExercisesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter exercises based on active tab and search query
  const filteredExercises = exercises
    .filter((exercise) => activeTab === "all" || exercise.category.toLowerCase() === activeTab.toLowerCase())
    .filter(
      (exercise) =>
        searchQuery === "" ||
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.targetMuscles.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Exercise Library</h1>
              <p className="text-gray-500">Browse and search for exercises to add to your workouts</p>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search exercises..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="compound">Compound</TabsTrigger>
              <TabsTrigger value="isolation">Isolation</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredExercises.map((exercise) => (
                  <Card key={exercise.id}>
                    <CardHeader>
                      <CardTitle>{exercise.name}</CardTitle>
                      <CardDescription>{exercise.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">{exercise.description}</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Target Muscles:</span>
                          <span className="text-sm font-medium">{exercise.targetMuscles}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Equipment:</span>
                          <span className="text-sm font-medium">{exercise.equipment}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
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

const exercises = [
  {
    id: "1",
    name: "Bench Press",
    category: "Compound",
    description: "A compound exercise that targets the chest, shoulders, and triceps.",
    targetMuscles: "Chest, Shoulders, Triceps",
    equipment: "Barbell, Bench",
  },
  {
    id: "2",
    name: "Squat",
    category: "Compound",
    description: "A fundamental lower body exercise that targets multiple muscle groups.",
    targetMuscles: "Quadriceps, Hamstrings, Glutes",
    equipment: "Barbell, Squat Rack",
  },
  {
    id: "3",
    name: "Deadlift",
    category: "Compound",
    description: "A powerful full-body exercise that builds overall strength.",
    targetMuscles: "Lower Back, Hamstrings, Glutes",
    equipment: "Barbell",
  },
  {
    id: "4",
    name: "Overhead Press",
    category: "Compound",
    description: "A shoulder-focused exercise that also engages the upper body.",
    targetMuscles: "Shoulders, Triceps",
    equipment: "Barbell",
  },
  {
    id: "5",
    name: "Pull-up",
    category: "Compound",
    description: "A bodyweight exercise that targets the upper back and arms.",
    targetMuscles: "Lats, Biceps, Upper Back",
    equipment: "Pull-up Bar",
  },
  {
    id: "6",
    name: "Dumbbell Curl",
    category: "Isolation",
    description: "An isolation exercise that targets the biceps.",
    targetMuscles: "Biceps",
    equipment: "Dumbbells",
  },
]
