// Controls.jsx
import React from 'react';

export default function Controls({ onPrev, onNext, onPlayToggle, playing, onExport }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
      <button onClick={onPrev}>Prev</button>
      <button onClick={onNext}>Next</button>
      <button onClick={onPlayToggle}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={onExport}>Export PNG</button>
    </div>
  );
}
