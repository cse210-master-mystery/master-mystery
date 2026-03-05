import React from "react";
import { useMenuModalClose } from "../buttons/MenuButton";
import "./GameMenuContent.css";

export interface GameMenuContentProps {
  /** When true, show "Resume"; otherwise show "Pause". */
  isPaused?: boolean;
  /** Called when Pause/Resume is clicked. Menu closes after. */
  onTogglePause?: () => void;
  /** Called when Return to Home is clicked. Menu closes after. */
  onReturnHome?: () => void;
}

/**
 * Menu content with Pause/Resume and Return to Home.
 * Use inside MenuButton so closeModal is available.
 */
const GameMenuContent: React.FC<GameMenuContentProps> = ({
  isPaused = false,
  onTogglePause,
  onReturnHome,
}) => {
  const closeModal = useMenuModalClose();

  const handleTogglePause = () => {
    onTogglePause?.();
    closeModal();
  };

  const handleReturnHome = () => {
    onReturnHome?.();
    closeModal();
  };

  return (
    <div className="game-menu-content">
      <h2 className="game-menu-title">Menu</h2>
      <div className="game-menu-actions">
        {onTogglePause != null && (
          <button
            type="button"
            className="game-menu-btn"
            onClick={handleTogglePause}
            aria-label={isPaused ? "Resume game" : "Pause game"}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}
        {onReturnHome != null && (
          <button
            type="button"
            className="game-menu-btn"
            onClick={handleReturnHome}
            aria-label="Return to home page"
          >
            Return to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default GameMenuContent;
