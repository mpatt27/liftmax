"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash, Plus, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

interface ExerciseCardProps {
  exercise: Exercise
  onUpdate: (exercise: Exercise) => void
  onRemove: () => void
}

export function ExerciseCard({ exercise, onUpdate, onRemove }: ExerciseCardProps) {
  const [showSuggestion, setShowSuggestion] = useState(false)

  const handleSetChange = (index: number, field: "weight" | "reps", value: number) => {
    const newSets = [...exercise.sets]
    newSets[index] = { ...newSets[index], [field]: value }
    onUpdate({ ...exercise, sets: newSets })
  }

  const handleSetCompletion = (index: number, completed: boolean) => {
    const newSets = [...exercise.sets]
    newSets[index] = { ...newSets[index], completed }
    onUpdate({ ...exercise, sets: newSets })
  }

  const addSet = () => {
    const lastSet = exercise.sets[exercise.sets.length - 1]
    const newSet = { weight: lastSet?.weight || 0, reps: lastSet?.reps || 0, completed: false }
    onUpdate({ ...exercise, sets: [...exercise.sets, newSet] })
  }

  const removeSet = (index: number) => {
    if (exercise.sets.length > 1) {
      const newSets = exercise.sets.filter((_, i) => i !== index)
      onUpdate({ ...exercise, sets: newSets })
    }
  }

  const useSuggestedWeight = () => {
    const newSets = exercise.sets.map((set) => ({
      ...set,
      weight: exercise.suggestedWeight,
    }))
    onUpdate({ ...exercise, sets: newSets })
    setShowSuggestion(false)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <Label htmlFor={`exercise-${exercise.id}`} className="sr-only">
                Exercise Name
              </Label>
              <Select
                value={exercise.name || undefined}
                onValueChange={(value) => onUpdate({ ...exercise, name: value })}
              >
                <SelectTrigger id={`exercise-${exercise.id}`} className="w-full">
                  <SelectValue placeholder="Select an exercise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bench-press">Bench Press</SelectItem>
                  <SelectItem value="squat">Squat</SelectItem>
                  <SelectItem value="deadlift">Deadlift</SelectItem>
                  <SelectItem value="overhead-press">Overhead Press</SelectItem>
                  <SelectItem value="barbell-row">Barbell Row</SelectItem>
                  <SelectItem value="pull-up">Pull-up</SelectItem>
                  <SelectItem value="dumbbell-curl">Dumbbell Curl</SelectItem>
                  <SelectItem value="tricep-extension">Tricep Extension</SelectItem>
                  <SelectItem value="leg-press">Leg Press</SelectItem>
                  <SelectItem value="lat-pulldown">Lat Pulldown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              {exercise.suggestedWeight > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={() => setShowSuggestion(!showSuggestion)}
                      >
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Weight suggestion</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Suggested weight based on your previous workouts</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <Button variant="outline" size="icon" type="button" onClick={onRemove}>
                <Trash className="h-4 w-4" />
                <span className="sr-only">Remove exercise</span>
              </Button>
            </div>
          </div>

          {showSuggestion && exercise.suggestedWeight > 0 && (
            <div className="bg-muted p-3 rounded-md text-sm">
              <p>
                Suggested weight: <strong>{exercise.suggestedWeight} lbs</strong> (based on your previous workouts)
              </p>
              <Button size="sm" variant="outline" className="mt-2" onClick={useSuggestedWeight}>
                Use Suggested Weight
              </Button>
            </div>
          )}

          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2 text-xs md:text-sm font-medium text-gray-500">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Weight</div>
              <div className="col-span-4">Reps</div>
              <div className="col-span-2">Done</div>
              <div className="col-span-1"></div>
            </div>

            {exercise.sets.map((set, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-1 text-xs md:text-sm font-medium">{index + 1}</div>
                <div className="col-span-4">
                  <Input
                    type="number"
                    min="0"
                    step="2.5"
                    value={set.weight}
                    onChange={(e) => handleSetChange(index, "weight", Number.parseFloat(e.target.value) || 0)}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="col-span-4">
                  <Input
                    type="number"
                    min="0"
                    value={set.reps}
                    onChange={(e) => handleSetChange(index, "reps", Number.parseInt(e.target.value) || 0)}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="col-span-2 flex justify-center">
                  <input
                    type="checkbox"
                    checked={set.completed}
                    onChange={(e) => handleSetCompletion(index, e.target.checked)}
                    className="h-4 w-4"
                  />
                </div>
                <div className="col-span-1">
                  {exercise.sets.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => removeSet(index)}
                      className="h-8 w-8"
                    >
                      <Trash className="h-3 w-3" />
                      <span className="sr-only">Remove set</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Button type="button" variant="outline" size="sm" className="w-full mt-2" onClick={addSet}>
              <Plus className="mr-2 h-3 w-3" /> Add Set
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
