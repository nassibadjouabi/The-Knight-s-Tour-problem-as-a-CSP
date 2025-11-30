import React, { useState } from "react";
import Visualizer from "./pages/Visualizer";

export default function App() {
  const [started, setStarted] = useState(false);
  const [quit, setQuit] = useState(false);

  if (quit) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold">Merci d’avoir joué !</h1>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-pink-500 text-white">
        <h1 className="text-4xl font-bold mb-8">Knight's Tour</h1>
        <div className="space-x-4">
          <button
            className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-200 transition"
            onClick={() => setStarted(true)}
          >
            Start
          </button>
          <button
            className="px-6 py-3 bg-red-500 font-bold rounded-lg hover:bg-red-600 transition"
            onClick={() => setQuit(true)}
          >
            Quit
          </button>
        </div>
      </div>
    );
  }

  return <Visualizer onQuit={() => setQuit(true)} />;
}
