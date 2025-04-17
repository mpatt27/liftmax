"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function WorkoutHistory() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<Date>(new Date())

  // Mock workout data
  const workouts = [
    {
      id: "1",
      date: new Date(2023, 6, 1),
      name: "Upper Body",
      duration: 65,
      exercises: [
        { name: "Bench Press", sets: 4, weight: 185, reps: 8 },
        { name: "Barbell Row", sets: 4, weight: 155, reps: 10 },
        { name: "Overhead Press", sets: 3, weight: 115, reps: 8 },
      ],
    },
    {
      id: "2",
      date: new Date(2023, 6, 3),
      name: "Lower Body",
      duration: 75,
      exercises: [
        { name: "Squat", sets: 5, weight: 225, reps: 5 },
        { name: "Deadlift", sets: 3, weight: 275, reps: 5 },
        { name: "Leg Press", sets: 3, weight: 360, reps: 10 },
      ],
    },
  ]

  // Filter workouts for the selected date
  const selectedWorkouts = workouts.filter((workout) => date && workout.date.toDateString() === date.toDateString())

  // Function to check if a date has workouts
  const hasWorkout = (day: Date) => {
    return workouts.some((workout) => workout.date.toDateString() === day.toDateString())
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })
  }

  // Update the calendar view to be more mobile-friendly
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Calendar</h3>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newMonth = new Date(month)
                  newMonth.setMonth(newMonth.getMonth() - 1)
                  setMonth(newMonth)
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="min-w-[120px]">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={month} onSelect={(date) => date && setMonth(date)} initialFocus />
                </PopoverContent>
              </Popover>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newMonth = new Date(month)
                  newMonth.setMonth(newMonth.getMonth() + 1)
                  setMonth(newMonth)
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            month={month}
            onMonthChange={setMonth}
            className="rounded-md border w-full"
            modifiers={{
              workout: (date) => hasWorkout(date),
            }}
            modifiersClassNames={{
              workout: "bg-primary/10 font-bold text-primary",
            }}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="font-medium mb-2">{date ? formatDate(date) : "Select a date"}</h3>
          {selectedWorkouts.length > 0 ? (
            <div className="space-y-4">
              {selectedWorkouts.map((workout) => (
                <Card key={workout.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{workout.name}</h4>
                        <p className="text-sm text-gray-500">
                          {workout.duration} minutes • {workout.exercises.length} exercises
                        </p>
                      </div>
                      <Badge>{formatTime(workout.date)}</Badge>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Exercise</TableHead>
                            <TableHead className="text-right">Sets</TableHead>
                            <TableHead className="text-right">Weight</TableHead>
                            <TableHead className="text-right">Reps</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {workout.exercises.map((exercise, index) => (
                            <TableRow key={index}>
                              <TableCell>{exercise.name}</TableCell>
                              <TableCell className="text-right">{exercise.sets}</TableCell>
                              <TableCell className="text-right">{exercise.weight} lbs</TableCell>
                              <TableCell className="text-right">{exercise.reps}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px] md:h-[300px] border rounded-md">
              <p className="text-gray-500">No workouts on this date</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
