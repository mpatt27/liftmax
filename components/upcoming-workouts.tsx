"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays, ChevronLeft, ChevronRight, Dumbbell } from "lucide-react"
import { useState } from "react"

export function UpcomingWorkouts() {
  const [weekStart, setWeekStart] = useState(getStartOfWeek(new Date()))

  // Mock workout schedule data
  const workoutSchedule = [
    {
      id: "1",
      date: addDays(weekStart, 0), // Monday
      name: "Upper Body",
      exercises: ["Bench Press", "Overhead Press", "Barbell Row", "Pull-ups"],
    },
    {
      id: "2",
      date: addDays(weekStart, 1), // Tuesday
      name: "Lower Body",
      exercises: ["Squat", "Deadlift", "Leg Press", "Calf Raises"],
    },
    {
      id: "3",
      date: addDays(weekStart, 3), // Thursday
      name: "Push Day",
      exercises: ["Bench Press", "Incline Press", "Shoulder Press", "Tricep Extensions"],
    },
    {
      id: "4",
      date: addDays(weekStart, 4), // Friday
      name: "Pull Day",
      exercises: ["Deadlift", "Barbell Row", "Pull-ups", "Bicep Curls"],
    },
  ]

  const previousWeek = () => {
    setWeekStart(addDays(weekStart, -7))
  }

  const nextWeek = () => {
    setWeekStart(addDays(weekStart, 7))
  }

  // Generate array of 7 days starting from weekStart
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  // Helper functions for date manipulation
  function getStartOfWeek(date: Date): Date {
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Adjust for Sunday
    return new Date(date.setDate(diff))
  }

  function addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  function formatDate(date: Date, format: string): string {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]
    const monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][date.getMonth()]

    if (format === "EEE") return dayName
    if (format === "d") return day.toString()
    if (format === "MMMM d, yyyy") return `${monthName} ${day}, ${year}`
    if (format === "EEEE, MMMM d") return `${dayName}day, ${monthName} ${day}`

    return date.toDateString()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium">Week of {formatDate(weekStart, "MMMM d, yyyy")}</h3>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={previousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {weekDays.map((day, index) => {
          const dayWorkouts = workoutSchedule.filter((workout) => workout.date.toDateString() === day.toDateString())
          const dayName = formatDate(day, "EEE")
          const dayNumber = formatDate(day, "d")
          const isToday = day.toDateString() === new Date().toDateString()

          return (
            <div
              key={index}
              className={`border rounded-md p-1 md:p-2 text-center ${isToday ? "bg-primary/10 border-primary" : ""}`}
            >
              <div className="text-xs md:text-sm font-medium">{dayName}</div>
              <div className={`text-lg md:text-xl ${isToday ? "text-primary font-bold" : ""}`}>{dayNumber}</div>
              {dayWorkouts.length > 0 ? (
                <div className="mt-1 md:mt-2">
                  <div className="flex items-center justify-center gap-1 text-xs font-medium text-primary">
                    <Dumbbell className="h-3 w-3" />
                    <span className="hidden xs:inline">
                      {dayWorkouts.length} workout{dayWorkouts.length > 1 ? "s" : ""}
                    </span>
                    <span className="xs:hidden">{dayWorkouts.length}</span>
                  </div>
                </div>
              ) : (
                <div className="mt-1 md:mt-2 text-xs text-gray-400">Rest</div>
              )}
            </div>
          )
        })}
      </div>

      <div className="space-y-4 mt-6">
        {workoutSchedule.map((workout) => (
          <Card key={workout.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-semibold">{workout.name}</h4>
                  <p className="text-sm text-gray-500">{formatDate(workout.date, "EEEE, MMMM d")}</p>
                </div>
                <Button size="sm" variant="outline">
                  Start
                </Button>
              </div>
              <div className="overflow-x-auto -mx-4 px-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Exercise</TableHead>
                      <TableHead className="text-right">Sets</TableHead>
                      <TableHead className="text-right">Reps</TableHead>
                      <TableHead className="text-right">Last Weight</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workout.exercises.map((exercise, index) => (
                      <TableRow key={index}>
                        <TableCell>{exercise}</TableCell>
                        <TableCell className="text-right">4</TableCell>
                        <TableCell className="text-right">8-12</TableCell>
                        <TableCell className="text-right">{Math.floor(Math.random() * 10) * 5 + 100} lbs</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
