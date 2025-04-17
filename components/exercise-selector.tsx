"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash, Plus } from "lucide-react"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  restTime: number
}

interface ExerciseSelectorProps {
  exercises: Exercise[]
  onChange: (exercises: Exercise[]) => void
}

export function ExerciseSelector({ exercises, onChange }: ExerciseSelectorProps) {
  const addExercise = () => {
    onChange([
      ...exercises,
      {
        id: `temp-${exercises.length}`,
        name: "",
        sets: 3,
        reps: 10,
        restTime: 60,
      },
    ])
  }

  const removeExercise = (index: number) => {
    onChange(exercises.filter((_, i) => i !== index))
  }

  const updateExercise = (index: number, field: keyof Exercise, value: any) => {
    const newExercises = [...exercises]
    newExercises[index] = { ...newExercises[index], [field]: value }
    onChange(newExercises)
  }

  return (
    <div className="space-y-4">
      {exercises.length > 0 ? (
        exercises.map((exercise, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor={`exercise-${index}`}>Exercise</Label>
              <Select
                value={exercise.name || undefined}
                onValueChange={(value) => updateExercise(index, "name", value)}
              >
                <SelectTrigger id={`exercise-${index}`}>
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
            <div className="col-span-4 md:col-span-2">
              <Label htmlFor={`sets-${index}`}>Sets</Label>
              <Input
                id={`sets-${index}`}
                type="number"
                min="1"
                value={exercise.sets}
                onChange={(e) => updateExercise(index, "sets", Number.parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="col-span-4 md:col-span-2">
              <Label htmlFor={`reps-${index}`}>Reps</Label>
              <Input
                id={`reps-${index}`}
                type="number"
                min="1"
                value={exercise.reps}
                onChange={(e) => updateExercise(index, "reps", Number.parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="col-span-4 md:col-span-3">
              <Label htmlFor={`rest-${index}`}>Rest (seconds)</Label>
              <Input
                id={`rest-${index}`}
                type="number"
                min="0"
                step="15"
                value={exercise.restTime}
                onChange={(e) => updateExercise(index, "restTime", Number.parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="col-span-12 md:col-span-1 flex justify-end">
              <Button variant="ghost" size="icon" type="button" onClick={() => removeExercise(index)}>
                <Trash className="h-4 w-4" />
                <span className="sr-only">Remove exercise</span>
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No exercises added yet</p>
        </div>
      )}
      <Button type="button" variant="outline" className="w-full" onClick={addExercise}>
        <Plus className="mr-2 h-4 w-4" /> Add Exercise
      </Button>
    </div>
  )
}
