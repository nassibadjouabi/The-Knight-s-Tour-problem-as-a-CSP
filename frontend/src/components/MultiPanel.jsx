import React from 'react';

const colors = ['#f0d9b5', '#b58863']; // couleurs type échiquier
const numberColors = ['#f2f2f2', '#555']; // couleur du texte selon fond

export default function MultiPanel({ tour, snapshots, boardSize = 400, invertY = false }) {
  const size = boardSize / 8;

  const getNumberColor = (row, col) => {
    const isLight = (row + col) % 2 === 0;
    return numberColors[isLight ? 1 : 0];
  };

  const renderCell = (row, col, index) => {
    const numIndex = tour.findIndex(([x, y]) => x === col && y === row);
    const number = numIndex >= 0 && numIndex < index ? numIndex + 1 : null;
    return (
      <div
        key={`${row}-${col}`}
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors[(row + col) % 2],
          border: '1px solid #555',
          boxSizing: 'border-box',
          fontWeight: 'bold',
          fontSize: size * 0.4,
          color: number ? getNumberColor(row, col) : 'transparent',
          transition: 'background-color 0.2s, color 0.2s',
          position: 'relative'
        }}
      >
        {number}
        {/* render knight */}
        {number === index && (
          <div
            style={{
              position: 'absolute',
              fontSize: size * 0.6,
              pointerEvents: 'none',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            ♞
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'repeat(8, 1fr)',
        width: boardSize,
        height: boardSize,
        margin: '0 auto', // centrer
        transform: invertY ? 'scaleY(-1)' : 'none'
      }}
    >
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) =>
          renderCell(row, col, snapshots[snapshots.length - 1])
        )
      )}
    </div>
  );
}
