export function validateTour(tour) {
  if (!Array.isArray(tour)) {
    throw new Error("Tour must be an array")
  }

  if (tour.length !== 64) {
    throw new Error(`Tour must have exactly 64 moves, got ${tour.length}`)
  }

  const visited = new Set()

  for (let i = 0; i < tour.length; i++) {
    const [x, y] = tour[i]

    if (!Array.isArray(tour[i]) || tour[i].length !== 2) {
      throw new Error(`Invalid position at index ${i}: expected [x, y]`)
    }

    if (typeof x !== "number" || typeof y !== "number") {
      throw new Error(`Invalid coordinates at index ${i}: must be numbers`)
    }

    if (x < 0 || x > 7 || y < 0 || y > 7) {
      throw new Error(`Invalid position at index ${i}: [${x}, ${y}] out of bounds`)
    }

    const key = `${x},${y}`
    if (visited.has(key)) {
      throw new Error(`Duplicate position at index ${i}: [${x}, ${y}] already visited`)
    }

    visited.add(key)
  }

  return true
}
