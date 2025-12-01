export default function Welcome({ onStart, onQuit }) {
  return (
 <div className="welcome-container">
      {/* GIF comme fond */}
      <div className="gif-background">
        <img 
          src="/knight-tour-bg.gif"  // Chemin depuis le dossier public
          alt="Animated knight tour background"
          className="gif-bg-image"
        />
        <div className="gif-overlay"></div>
      </div>
        
      <div className="welcome-content">
        <div className="welcome-card">
          <div className="knight-icon">♞</div>
          <h1 className="welcome-title">Knight's Tour</h1>
          
          
          
          

          <div className="welcome-buttons">
            <button className="start-button" onClick={onStart}>
              Commencer l'Aventure
              <span className="button-arrow">→</span>
            </button>
            <button className="quit-button" onClick={onQuit}>
              Quitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}