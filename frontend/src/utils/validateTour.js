// validateTour.js
export function validateTour(tour) {
  if (!Array.isArray(tour)) throw new Error("Tour must be an array");
  if (tour.length !== 64) throw new Error("Tour must contain 64 moves");

  const seen = new Set();
  for (let i = 0; i < tour.length; i++) {
    const pos = tour[i];
    if (!Array.isArray(pos) || pos.length !== 2) throw new Error(`Invalid position at index ${i}`);
    const [r, c] = pos;
    if (!Number.isInteger(r) || !Number.isInteger(c)) throw new Error(`Non-integer coordinates at index ${i}`);
    if (r < 0 || r > 7 || c < 0 || c > 7) throw new Error(`Out of range position at index ${i}`);
    seen.add(JSON.stringify(pos));
    if (i > 0) {
      const [pr, pc] = tour[i - 1];
      const dr = Math.abs(pr - r), dc = Math.abs(pc - c);
      if (!((dr === 1 && dc === 2) || (dr === 2 && dc === 1))) {
        throw new Error(`Invalid knight move between index ${i-1} and ${i}`);
      }
    }
  }
  if (seen.size !== 64) throw new Error("Tour contains duplicate squares");
  return true;
}
