import React, { useState } from "react";
import Welcome from "./pages/Welcome";
import MethodSelection from "./pages/MethodSelection";
import Visualizer from "./pages/Visualizer";
import { solveKnightTour } from "./Api/knightApi";

export default function App() {
  const [currentView, setCurrentView] = useState("welcome"); // "welcome", "method", "visualizer"
  const [selectedMethod, setSelectedMethod] = useState("");
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [quit, setQuit] = useState(false);

  if (quit) {
    return (
      <div className="thank-you-screen">
        <div className="animated-bg"></div>
        <div className="thank-you-content">
          <div className="thank-you-icon">🎉</div>
          <h1 className="thank-you-title">Merci d'avoir joué !</h1>
          <p className="thank-you-message">
            Nous espérons que vous avez apprécié le Knight's Tour
          </p>
          <button 
            className="play-again-btn"
            onClick={() => {
              setQuit(false);
              setCurrentView("welcome");
              setSelectedMethod("");
            }}
          >
            Rejouer
          </button>
        </div>
      </div>
    );
  }

  // Fenêtre 1: Welcome
  if (currentView === "welcome") {
    return (
      <Welcome 
        onStart={() => setCurrentView("method")}
        onQuit={() => setQuit(true)}
      />
    );
  }

  // Fenêtre 2: Sélection de méthode
  if (currentView === "method") {
    return (
      <MethodSelection 
        onMethodSelect={(method) => {
          setSelectedMethod(method);
          setCurrentView("visualizer");
        }}
        onBack={() => setCurrentView("welcome")}
        onQuit={() => setQuit(true)}
        startX={startX}
        startY={startY}
        setStartX={setStartX}
        setStartY={setStartY}
      />
    );
  }

  // Fenêtre 3: Visualisation
  if (currentView === "visualizer") {
    return (
      <Visualizer 
        method={selectedMethod}
        startX={startX}
        startY={startY}
        onBack={() => setCurrentView("method")}
        onRestart={() => setCurrentView("welcome")}
        onQuit={() => setQuit(true)}
      />
    );
  }
}