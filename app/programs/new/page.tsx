"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dumbbell, Plus, Save, Trash } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ExerciseSelector } from "@/components/exercise-selector"

export default function NewProgramPage() {
  const router = useRouter()
  const [workouts, setWorkouts] = useState([{ name: "Day 1", exercises: [] }])

  const addWorkout = () => {
    setWorkouts([...workouts, { name: `Day ${workouts.length + 1}`, exercises: [] }])
  }

  const removeWorkout = (index: number) => {
    setWorkouts(workouts.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would save the program to the database here
    router.push("/programs")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <Dumbbell className="h-6 w-6" />
            <span>Liftmax</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href="/programs" className="text-sm font-medium text-primary">
              Programs
            </Link>
            <Link href="/exercises" className="text-sm font-medium hover:text-primary">
              Exercises
            </Link>
            <Button variant="ghost">Sign Out</Button>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Create New Program</h1>
              <p className="text-gray-500">Design a custom workout program</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Program Details</CardTitle>
                  <CardDescription>Basic information about your workout program</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Program Name</Label>
                      <Input id="name" placeholder="e.g., 5x5 Strength Program" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goal">Primary Goal</Label>
                      <Select defaultValue="strength">
                        <SelectTrigger id="goal">
                          <SelectValue placeholder="Select a goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="strength">Strength</SelectItem>
                          <SelectItem value="hypertrophy">Muscle Growth</SelectItem>
                          <SelectItem value="endurance">Endurance</SelectItem>
                          <SelectItem value="weight-loss">Weight Loss</SelectItem>
                          <SelectItem value="general">General Fitness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (weeks)</Label>
                      <Input id="duration" type="number" min="1" max="52" defaultValue="8" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Workouts per Week</Label>
                      <Input id="frequency" type="number" min="1" max="7" defaultValue="4" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Experience Level</Label>
                      <Select defaultValue="intermediate">
                        <SelectTrigger id="level">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your program and its benefits"
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {workouts.map((workout, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Input
                          value={workout.name}
                          onChange={(e) => {
                            const newWorkouts = [...workouts]
                            newWorkouts[index].name = e.target.value
                            setWorkouts(newWorkouts)
                          }}
                          className="w-40 h-7 px-2 py-1 text-lg font-semibold"
                        />
                      </CardTitle>
                      <CardDescription>Add exercises for this workout day</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => removeWorkout(index)}
                      className="text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove workout</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <ExerciseSelector
                      exercises={workout.exercises}
                      onChange={(exercises) => {
                        const newWorkouts = [...workouts]
                        newWorkouts[index].exercises = exercises
                        setWorkouts(newWorkouts)
                      }}
                    />
                  </CardContent>
                </Card>
              ))}

              <Button type="button" variant="outline" className="w-full" onClick={addWorkout}>
                <Plus className="mr-2 h-4 w-4" /> Add Workout Day
              </Button>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" asChild>
                <Link href="/programs">Cancel</Link>
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Program
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
