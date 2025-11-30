"use client"

export default function Controls({ onPrev, onNext, onPlayToggle, playing }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
      <button
        onClick={onPrev}
        style={{
          background: "linear-gradient(135deg, #6366f1, #4f46e5)",
          color: "white",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "13px",
          transition: "all 0.2s ease",
          flex: "1",
          minWidth: "70px",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
      >
        ← Prev
      </button>

      <button
        onClick={onNext}
        style={{
          background: "linear-gradient(135deg, #6366f1, #4f46e5)",
          color: "white",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "13px",
          transition: "all 0.2s ease",
          flex: "1",
          minWidth: "70px",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
      >
        Next →
      </button>

      <button
        onClick={onPlayToggle}
        style={{
          background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
          color: "white",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "13px",
          transition: "all 0.2s ease",
          flex: "1",
          minWidth: "70px",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
      >
        {playing ? "⏸ Pause" : "▶ Play"}
      </button>
    </div>
  )
}