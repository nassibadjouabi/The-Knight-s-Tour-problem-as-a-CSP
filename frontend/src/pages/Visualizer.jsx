"use client"

import { useEffect, useRef, useState } from "react"
import ChessBoard from "../components/ChessBoard"
import Controls from "../components/Controls"
import { validateTour } from "../utils/validateTour"

const SAMPLE_TOUR = [
  [0, 0],
  [1, 2],
  [2, 0],
  [3, 2],
  [4, 0],
  [5, 2],
  [6, 0],
  [7, 2],
  [6, 4],
  [7, 6],
  [5, 7],
  [7, 4],
  [6, 6],
  [4, 7],
  [2, 6],
  [0, 7],
  [1, 5],
  [0, 3],
  [1, 1],
  [2, 3],
  [3, 1],
  [4, 3],
  [5, 1],
  [6, 3],
  [7, 1],
  [5, 0],
  [3, 0],
  [1, 0],
  [0, 2],
  [2, 1],
  [4, 0],
  [6, 1],
  [7, 3],
  [6, 5],
  [4, 6],
  [2, 7],
  [0, 6],
  [1, 4],
  [3, 5],
  [5, 6],
  [7, 7],
  [6, 7],
  [4, 5],
  [2, 4],
  [0, 5],
  [1, 3],
  [3, 2],
  [5, 3],
  [7, 4],
  [6, 2],
  [4, 1],
  [2, 2],
  [0, 1],
  [1, 3],
  [3, 4],
  [5, 5],
  [7, 5],
  [6, 4],
  [5, 2],
  [4, 4],
  [3, 6],
  [2, 5],
  [1, 7],
  [0, 4],
].slice(0, 64)

export default function Visualizer({ apiUrl = "/api/tour", boardSize = 700, onQuit }) {
  const [tour, setTour] = useState([])
  const [index, setIndex] = useState(1)
  const [playing, setPlaying] = useState(false)
  const [finished, setFinished] = useState(false)
  const playRef = useRef(null)

  useEffect(() => {
    async function loadTour() {
      try {
        const res = await fetch(apiUrl)
        if (!res.ok) throw new Error("Backend not ready")
        const data = await res.json()
        if (data.tour) {
          validateTour(data.tour)
          setTour(data.tour)
        } else throw new Error("No tour field")
      } catch (e) {
        console.warn("Using fallback tour:", e.message)
        setTour(SAMPLE_TOUR)
      }
    }
    loadTour()
    return () => clearInterval(playRef.current)
  }, [apiUrl])

  useEffect(() => {
    if (playing) {
      playRef.current = setInterval(() => {
        setIndex((i) => {
          if (i >= 64) {
            clearInterval(playRef.current)
            setPlaying(false)
            setFinished(true)
            return 64
          }
          return i + 1
        })
      }, 300)
    } else if (playRef.current) clearInterval(playRef.current)
    return () => clearInterval(playRef.current)
  }, [playing])

  const handlePrev = () => setIndex((i) => Math.max(1, i - 1))
  const handleNext = () => setIndex((i) => Math.min(64, i + 1))
  const handlePlayToggle = () => setPlaying((p) => !p)

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        
        .bg-animated {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(99,102,241,0.15), transparent 15%),
            radial-gradient(circle at 80% 80%, rgba(16,185,129,0.12), transparent 15%),
            radial-gradient(circle at 40% 80%, rgba(139,92,246,0.08), transparent 20%),
            linear-gradient(135deg, #0f172a 0%, #020617 50%, #0a0e27 100%);
          animation: bgShift 15s ease-in-out infinite;
          z-index: -1;
        }
        
        @keyframes bgShift {
          0% { filter: hue-rotate(0deg) saturate(0.95); }
          50% { filter: hue-rotate(15deg) saturate(1.1); }
          100% { filter: hue-rotate(0deg) saturate(0.95); }
        }
        
        .viz-container {
          font-family: 'Orbitron', system-ui;
          color: #e2e8f0;
          width: 100%;
          height: 100%;
        }
        
        .glass-card {
          background: linear-gradient(135deg, rgba(15,23,42,0.7), rgba(2,6,23,0.5));
          border: 1px solid rgba(148,163,184,0.1);
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 60px rgba(2,6,23,0.4), inset 0 1px 1px rgba(148,163,184,0.1);
          border-radius: 16px;
        }
        
        .board-container {
          padding: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .title {
          font-size: 26px;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 28px;
          color: #e0e7ff;
          text-shadow: 0 0 20px rgba(99,102,241,0.3);
        }
        
        .stat-label {
          font-size: 12px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }
        
        .stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #f0f9ff;
          margin-bottom: 18px;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(99,102,241,0.3);
          width: 100%;
          font-family: 'Orbitron', system-ui;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99,102,241,0.4);
        }
        
        .modal-backdrop {
          background: radial-gradient(circle at center, rgba(2,6,23,0.8), rgba(2,6,23,0.95));
          backdrop-filter: blur(8px);
        }
        
        .modal-content {
          background: linear-gradient(135deg, rgba(15,23,42,0.95), rgba(2,6,23,0.85));
          border: 1.5px solid rgba(148,163,184,0.15);
          box-shadow: 0 25px 80px rgba(2,6,23,0.6), inset 0 1px 1px rgba(148,163,184,0.1);
        }
        
        .hint-text {
          font-size: 11px;
          color: #64748b;
          margin-top: 18px;
          line-height: 1.5;
          letter-spacing: 0.5px;
        }
        
        /* Layout optimization - flex for perfect centering, no scrolling needed */
        .main-layout {
          display: flex;
          gap: 48px;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 20px;
        }
        
        .board-wrapper {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Panel height fixed to fit viewport without scrolling */
        .panel-wrapper {
          flex-shrink: 0;
          width: 380px;
          max-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
        }
        
        .panel-content {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 0;
          flex: 1;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(99,102,241,0.3) transparent;
        }
        
        .panel-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .panel-content::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .panel-content::-webkit-scrollbar-thumb {
          background: rgba(99,102,241,0.3);
          border-radius: 3px;
        }
        
        .stats-section {
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(148,163,184,0.1);
        }
        
        .controls-section {
          margin-bottom: 24px;
        }
        
        .exit-button {
          margin-top: auto;
          padding-top: 16px;
        }
      `}</style>

      <div className="bg-animated" aria-hidden="true" />

      <div className="viz-container relative flex items-center justify-center">
        <div className="main-layout">
          <div className="board-wrapper">
            <div className="glass-card board-container" style={{ width: boardSize + 100, height: boardSize + 100 }}>
              <div style={{ width: boardSize, height: boardSize }}>
                <ChessBoard tour={tour} currentStep={index} boardSize={boardSize} />
              </div>
            </div>
          </div>

          <div className="panel-wrapper">
            <div className="glass-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div className="panel-content">
                <div className="title">Knight's Tour</div>

                {/* Stats Section */}
                <div className="stats-section">
                  <div className="stat-label">Current Step</div>
                  <div className="stat-value">{index} / 64</div>

                  <div className="stat-label">Total Moves</div>
                  <div className="stat-value">{tour.length || 0}</div>

                  <div className="stat-label">Current Position</div>
                  <div style={{ fontSize: 16, color: "#cbd5e1", fontFamily: "monospace" }}>
                    [{(tour[index - 1] || ["-", "-"]).join(", ")}]
                  </div>
                </div>

                {/* Controls Section */}
                <div className="controls-section">
                  <Controls
                    onPrev={handlePrev}
                    onNext={handleNext}
                    onPlayToggle={handlePlayToggle}
                    playing={playing}
                    onExport={() => alert("Export PNG not implemented")}
                    onQuit={onQuit}
                  />
                </div>

                {/* Hint */}
                <div className="hint-text">
                  Press <strong>Play</strong> to animate. Use arrows for steps.
                </div>

                {/* Exit Button */}
                <div className="exit-button">
                  <button className="btn-primary" onClick={() => onQuit()}>
                    Exit Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {finished && (
        <div className="modal-backdrop fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-content p-12 rounded-2xl text-center" style={{ maxWidth: 450 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
            <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: "#e0e7ff" }}>Tour Complete!</h3>
            <p style={{ color: "#cbd5e1", marginBottom: 8, fontSize: 15 }}>
              You've successfully completed the Knight's Tour
            </p>
            <p style={{ color: "#94a3b8", marginBottom: 24, fontSize: 13 }}>
              Final move count: <strong style={{ color: "#f0f9ff" }}>{tour.length}</strong>
            </p>
            <p style={{ color: "#94a3b8", marginBottom: 24, fontSize: 13 }}>
              Last position:{" "}
              <strong style={{ color: "#f0f9ff", fontFamily: "monospace" }}>
                [{tour[tour.length - 1]?.join(", ")}]
              </strong>
            </p>
            <button className="btn-primary" onClick={() => onQuit()} style={{ marginBottom: 0 }}>
              Exit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
