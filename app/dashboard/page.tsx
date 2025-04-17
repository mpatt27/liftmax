"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Dumbbell, Plus, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import { WorkoutHistory } from "@/components/workout-history"
import { WeightProgressChart } from "@/components/weight-progress-chart"
import { UpcomingWorkouts } from "@/components/upcoming-workouts"
import { SiteHeader } from "@/components/site-header"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-gray-500">Track your fitness progress and upcoming workouts</p>
            </div>
            <div className="flex gap-3">
              <Button asChild size="sm" className="w-full md:w-auto">
                <Link href="/workout/new">
                  <Plus className="mr-2 h-4 w-4" /> Start Workout
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full md:w-auto">
                <Link href="/programs/new">Create Program</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
                <Dumbbell className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-gray-500">+3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Streak</CardTitle>
                <TrendingUp className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 days</div>
                <p className="text-xs text-gray-500">Keep it up!</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Weight Lifted</CardTitle>
                <Target className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,320 lbs</div>
                <p className="text-xs text-gray-500">This week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Next Workout</CardTitle>
                <CalendarDays className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Today</div>
                <p className="text-xs text-gray-500">Upper Body</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Workouts</CardTitle>
                  <CardDescription>Your workout history for the past 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <WorkoutHistory />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="progress" className="space-y-6 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Progress</CardTitle>
                  <CardDescription>Track your lifting progress over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <WeightProgressChart />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="schedule" className="space-y-6 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Workouts</CardTitle>
                  <CardDescription>Your scheduled workouts for the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingWorkouts />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
