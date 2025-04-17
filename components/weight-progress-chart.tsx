"use client"

import { useEffect, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function WeightProgressChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock data for the chart
  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
    datasets: [
      {
        label: "Bench Press",
        data: [135, 145, 155, 155, 165, 175, 175, 185],
        color: "#3b82f6",
      },
      {
        label: "Squat",
        data: [185, 195, 205, 215, 225, 235, 245, 255],
        color: "#ef4444",
      },
      {
        label: "Deadlift",
        data: [225, 235, 245, 255, 265, 275, 285, 295],
        color: "#10b981",
      },
    ],
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set dimensions
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 2
    ctx.stroke()

    // Calculate scales
    const xScale = chartWidth / (chartData.labels.length - 1)
    const maxValue = Math.max(...chartData.datasets.flatMap((dataset) => dataset.data))
    const yScale = chartHeight / maxValue

    // Draw grid lines and labels
    ctx.font = "12px sans-serif"
    ctx.fillStyle = "#6b7280"
    ctx.textAlign = "right"

    // Y-axis grid lines and labels
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - (i * chartHeight) / 5
      const value = Math.round((i * maxValue) / 5)

      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.strokeStyle = "#f3f4f6"
      ctx.stroke()

      ctx.fillText(value.toString(), padding - 10, y + 4)
    }

    // X-axis labels
    ctx.textAlign = "center"
    chartData.labels.forEach((label, i) => {
      const x = padding + i * xScale
      ctx.fillText(label, x, height - padding + 20)
    })

    // Draw datasets
    chartData.datasets.forEach((dataset) => {
      ctx.beginPath()
      dataset.data.forEach((value, i) => {
        const x = padding + i * xScale
        const y = height - padding - value * yScale
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.strokeStyle = dataset.color
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw points
      dataset.data.forEach((value, i) => {
        const x = padding + i * xScale
        const y = height - padding - value * yScale
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fillStyle = dataset.color
        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.stroke()
      })
    })

    // Draw legend
    const legendX = width - padding - 150
    const legendY = padding + 20
    chartData.datasets.forEach((dataset, i) => {
      const y = legendY + i * 25

      // Line
      ctx.beginPath()
      ctx.moveTo(legendX, y)
      ctx.lineTo(legendX + 20, y)
      ctx.strokeStyle = dataset.color
      ctx.lineWidth = 3
      ctx.stroke()

      // Point
      ctx.beginPath()
      ctx.arc(legendX + 10, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = dataset.color
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Text
      ctx.fillStyle = "#374151"
      ctx.textAlign = "left"
      ctx.fillText(dataset.label, legendX + 30, y + 4)
    })
  }, [])

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <Select defaultValue="3months">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 relative">
        <canvas ref={canvasRef} width="800" height="400" className="w-full h-full" />
      </div>
    </div>
  )
}
