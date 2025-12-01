"use client"
import { useState } from "react"

export default function MethodSelection({ onMethodSelect, onBack, onQuit }) {
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  
  const methods = [
    {
      id: 'heuristic',
      name: 'Méthode Heuristique',
      description: 'Utilise MRV + LCV pour un chemin optimal',
      color: '#10b981'
    },
    {
      id: 'blind', // Changez 'noheuristic' en 'blind' pour matcher votre API
      name: 'Méthode Classique (non heuristique)',
      description: 'Approche backtracking traditionnelle',
      color: '#6366f1'
    }
  ];

  const handleMethodSelect = (methodId) => {
    // Passer tous les paramètres à la fonction parent
    onMethodSelect(methodId, startX, startY)
  }

  return (
    <div className="method-selection-container">
      {/* GIF comme fond */}
      <div className="gif-background">
        <img 
          src="/knight-tour-bg.gif"
          alt="Animated knight tour background" 
          className="gif-bg-image"
        />
        <div className="gif-overlay"></div>
      </div>

      <div className="method-content">
        <div className="method-header">
          <button className="back-button" onClick={onBack}>
            ← Retour
          </button>
          <h1 className="method-title">Choisissez Votre Stratégie</h1>
          <p className="method-subtitle">
            Sélectionnez un algorithme pour résoudre le Knight's Tour
          </p>
        </div>

        {/* AJOUT: Sélecteur de position de départ */}
        <div className="start-position-selector">
          <h3 className="position-title">Position de Départ</h3>
          <div className="position-inputs">
            <div className="input-group">
              <label className="input-label">Ligne (0-7)</label>
              <input
                type="number"
                min="0"
                max="7"
                value={startX}
                onChange={(e) => setStartX(parseInt(e.target.value) || 0)}
                className="position-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Colonne (0-7)</label>
              <input
                type="number"
                min="0"
                max="7"
                value={startY}
                onChange={(e) => setStartY(parseInt(e.target.value) || 0)}
                className="position-input"
              />
            </div>
          </div>
          <div className="position-hint">
            Position actuelle: [{startX}, {startY}]
          </div>
        </div>

        <div className="methods-grid">
          {methods.map((method) => (
            <div 
              key={method.id}
              className="method-card"
              onClick={() => handleMethodSelect(method.id)}
            >
              <div 
                className="method-icon"
                style={{ backgroundColor: `${method.color}20`, color: method.color }}
              >
                {method.id === 'heuristic' ? '⚡' : '♞'}
              </div>
              <h3 className="method-name">{method.name}</h3>
              <p className="method-description">{method.description}</p>
              <div className="method-select">
                Sélectionner →
              </div>
            </div>
          ))}
        </div>

        <div className="method-footer">
          <button className="quit-btn" onClick={onQuit}>
            Quitter
          </button>
        </div>
      </div>

      <style jsx>{`
        .method-selection-container {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 23, 42, 0.9);
          z-index: 50;
        }

        .gif-background {
          position: absolute;
          inset: 0;
          z-index: -1;
        }

        .gif-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gif-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
        }

        .method-content {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(2, 6, 23, 0.8));
          border: 1px solid rgba(148, 163, 184, 0.2);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 40px;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .method-header {
          text-align: center;
          margin-bottom: 40px;
          position: relative;
        }

        .back-button {
          position: absolute;
          left: 0;
          top: 0;
          background: rgba(148, 163, 184, 0.1);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #e2e8f0;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background: rgba(148, 163, 184, 0.2);
        }

        .method-title {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #e2e8f0, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 12px;
        }

        .method-subtitle {
          color: #94a3b8;
          font-size: 1.1rem;
        }

        /* NOUVEAU: Styles pour le sélecteur de position */
        .start-position-selector {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 32px;
        }

        .position-title {
          color: #e2e8f0;
          font-size: 1.2rem;
          margin-bottom: 16px;
          text-align: center;
        }

        .position-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 12px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-label {
          color: #94a3b8;
          font-size: 0.9rem;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .position-input {
          background: rgba(2, 6, 23, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.3);
          border-radius: 8px;
          padding: 12px;
          color: #e2e8f0;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .position-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        .position-hint {
          color: #64748b;
          font-size: 0.9rem;
          text-align: center;
          font-family: monospace;
        }

        .methods-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .method-card {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.6), rgba(2, 6, 23, 0.4));
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 16px;
          padding: 32px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .method-card:hover {
          transform: translateY(-4px);
          border-color: rgba(148, 163, 184, 0.3);
          box-shadow: 0 20px 40px rgba(2, 6, 23, 0.4);
        }

        .method-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .method-name {
          color: #e2e8f0;
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .method-description {
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .method-select {
          color: #6366f1;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .method-card:hover .method-select {
          transform: translateX(4px);
        }

        .method-footer {
          text-align: center;
        }

        .quit-btn {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          padding: 12px 32px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .quit-btn:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        @media (max-width: 768px) {
          .methods-grid {
            grid-template-columns: 1fr;
          }
          
          .position-inputs {
            grid-template-columns: 1fr;
          }
          
          .method-content {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}