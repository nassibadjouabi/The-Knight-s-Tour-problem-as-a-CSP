export default function ChessBoard({
  tour = [],
  currentStep = 0,
  boardSize = 240,
  showNumbers = true,
  invertY = false,
}) {
  const cell = boardSize / 8
  const visited = new Map()

  // Build visited map
  for (let i = 0; i < Math.min(currentStep, tour.length); i++) {
    const [r, c] = tour[i]
    visited.set(`${r},${c}`, i + 1)
  }

  const y = (r) => (invertY ? (7 - r) * cell : r * cell)

  const light = "#f0d9b5"
  const dark = "#b58863"

  return (
    <svg
      width={boardSize}
      height={boardSize}
      viewBox={`0 0 ${boardSize} ${boardSize}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <defs>
        <style>{`
          .num { font-family: 'Arial', sans-serif; font-size: ${Math.round(cell * 0.35)}px; fill: #333; font-weight: bold; pointer-events: none; }
          .knight-icon { font-family: 'Arial', sans-serif; font-size: ${Math.round(cell * 0.7)}px; pointer-events: none; font-weight: bold; }
        `}</style>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Chessboard squares */}
      {Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 8 }).map((__, c) => {
          const isLight = (r + c) % 2 === 0
          return (
            <rect
              key={`sq-${r}-${c}`}
              x={c * cell}
              y={y(r)}
              width={cell}
              height={cell}
              fill={isLight ? light : dark}
              stroke="#999"
              strokeWidth="0.5"
            />
          )
        }),
      )}

      {/* Visited squares with gradient overlay */}
      {Array.from(visited.entries()).map(([k, idx]) => {
        const [r, c] = k.split(",").map(Number)
        const alpha = 0.05 + (idx / 64) * 0.25
        return (
          <rect
            key={"shade" + k}
            x={c * cell}
            y={y(r)}
            width={cell}
            height={cell}
            fill={`rgba(34, 197, 94, ${alpha})`}
          />
        )
      })}

      {/* Move numbers */}
      {showNumbers &&
        Array.from(visited.entries()).map(([k, idx]) => {
          const [r, c] = k.split(",").map(Number)
          return (
            <text
              key={"n" + k}
              x={c * cell + cell / 2}
              y={y(r) + cell / 2 + Math.round(cell * 0.12)}
              textAnchor="middle"
              className="num"
            >
              {idx}
            </text>
          )
        })}

      {/* Knight piece with glow effect */}
      {currentStep > 0 &&
        currentStep <= tour.length &&
        (() => {
          const [kr, kc] = tour[currentStep - 1]
          const cx = kc * cell + cell / 2
          const cy = y(kr) + cell / 2
          return (
            <g filter="url(#glow)" key="knight">
              <circle cx={cx} cy={cy} r={cell * 0.38} fill="#FFD700" opacity="0.95" />
              <circle cx={cx} cy={cy} r={cell * 0.32} fill="#FFC700" opacity="0.7" />
              <text
                x={cx}
                y={cy + Math.round(cell * 0.18)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="knight-icon"
                fill="#1a1a1a"
              >
                ♞
              </text>
            </g>
          )
        })()}
    </svg>
  )
}
