"use client"

import { useEffect, useRef } from "react"

interface ChessBoardProps {
  tour: number[][]
  currentStep: number
  boardSize: number
}

export default function ChessBoard({ tour, currentStep, boardSize }: ChessBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || tour.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const squareSize = boardSize / 8
    const padding = 10
    const lineWidth = 2

    // Clear canvas
    ctx.fillStyle = "#1e293b"
    ctx.fillRect(0, 0, boardSize, boardSize)

    // Draw checkerboard
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const x = col * squareSize
        const y = row * squareSize

        // Alternate colors
        if ((row + col) % 2 === 0) {
          ctx.fillStyle = "#334155"
        } else {
          ctx.fillStyle = "#0f172a"
        }
        ctx.fillRect(x, y, squareSize, squareSize)
      }
    }

    // Draw grid
    ctx.strokeStyle = "rgba(148,163,184,0.2)"
    ctx.lineWidth = 1
    for (let i = 0; i <= 8; i++) {
      const pos = i * squareSize
      ctx.beginPath()
      ctx.moveTo(pos, 0)
      ctx.lineTo(pos, boardSize)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, pos)
      ctx.lineTo(boardSize, pos)
      ctx.stroke()
    }

    // Draw path line
    if (tour.length > 1 && currentStep > 1) {
      ctx.strokeStyle = "rgba(99,102,241,0.4)"
      ctx.lineWidth = 2
      ctx.beginPath()

      const startPos = tour[0]
      ctx.moveTo(startPos[1] * squareSize + squareSize / 2, startPos[0] * squareSize + squareSize / 2)

      for (let i = 1; i < Math.min(currentStep, tour.length); i++) {
        const pos = tour[i]
        ctx.lineTo(pos[1] * squareSize + squareSize / 2, pos[0] * squareSize + squareSize / 2)
      }
      ctx.stroke()
    }

    // Draw visited squares
    for (let i = 0; i < Math.min(currentStep, tour.length); i++) {
      const [row, col] = tour[i]
      const x = col * squareSize
      const y = row * squareSize

      // Heat map color (from blue to green)
      const progress = i / Math.min(currentStep, tour.length - 1)
      const hue = 200 - progress * 120 // Blue to Green
      ctx.fillStyle = `hsl(${hue}, 70%, 50%)`
      ctx.fillRect(x + padding, y + padding, squareSize - 2 * padding, squareSize - 2 * padding)
    }

    // Draw current knight position
    if (currentStep > 0 && currentStep <= tour.length) {
      const [row, col] = tour[currentStep - 1]
      const x = col * squareSize + squareSize / 2
      const y = row * squareSize + squareSize / 2

      // Draw knight piece
      const knightSize = squareSize / 3
      ctx.fillStyle = "#fbbf24"
      ctx.beginPath()
      ctx.arc(x, y, knightSize, 0, Math.PI * 2)
      ctx.fill()

      // Draw border
      ctx.strokeStyle = "#f59e0b"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw glow effect
      ctx.shadowColor = "rgba(251, 191, 36, 0.6)"
      ctx.shadowBlur = 15
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.beginPath()
      ctx.arc(x, y, knightSize + 2, 0, Math.PI * 2)
      ctx.stroke()
      ctx.shadowColor = "transparent"
    }
  }, [tour, currentStep, boardSize])

  return (
    <canvas
      ref={canvasRef}
      width={boardSize}
      height={boardSize}
      style={{
        display: "block",
        borderRadius: "8px",
        backgroundColor: "#1e293b",
      }}
    />
  )
}
