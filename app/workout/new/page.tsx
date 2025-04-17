"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ExerciseCard } from "@/components/exercise-card"
import { SiteHeader } from "@/components/site-header"

export default function NewWorkoutPage() {
  const router = useRouter()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("details")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would save the workout to the database here
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Start New Workout</h1>
              <p className="text-gray-500">Track your exercises and progress</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="details">Workout Details</TabsTrigger>
                <TabsTrigger value="exercises">Exercises</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Workout Details</CardTitle>
                    <CardDescription>Basic information about your workout</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Workout Name</Label>
                        <Input id="name" placeholder="e.g., Upper Body Day" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="program">Program (Optional)</Label>
                        <Select onValueChange={setSelectedProgram}>
                          <SelectTrigger id="program">
                            <SelectValue placeholder="Select a program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Strength Builder</SelectItem>
                            <SelectItem value="2">Hypertrophy Program</SelectItem>
                            <SelectItem value="3">Full Body Conditioning</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button type="button" onClick={() => setActiveTab("exercises")}>
                        Next: Add Exercises
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="exercises" className="space-y-6 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Exercises</CardTitle>
                    <CardDescription>Add exercises to your workout</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {exercises.length > 0 ? (
                        exercises.map((exercise, index) => (
                          <ExerciseCard
                            key={index}
                            exercise={exercise}
                            onUpdate={(updatedExercise) => {
                              const newExercises = [...exercises]
                              newExercises[index] = updatedExercise
                              setExercises(newExercises)
                            }}
                            onRemove={() => {
                              setExercises(exercises.filter((_, i) => i !== index))
                            }}
                          />
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No exercises added yet</p>
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setExercises([
                            ...exercises,
                            {
                              id: `temp-${exercises.length}`,
                              name: "",
                              sets: [{ weight: 0, reps: 0, completed: false }],
                              previousWeight: 0,
                              suggestedWeight: 0,
                            },
                          ])
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Exercise
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <Button type="submit" disabled={exercises.length === 0}>
                <Save className="mr-2 h-4 w-4" /> Save Workout
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

interface Exercise {
  id: string
  name: string
  sets: Array<{
    weight: number
    reps: number
    completed: boolean
  }>
  previousWeight: number
  suggestedWeight: number
}
