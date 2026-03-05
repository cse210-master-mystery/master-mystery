import React from "react";
import { useMenuModalClose } from "../buttons/MenuButton";
import "./GameMenuContent.css";

export interface GameMenuContentProps {
  /** Called when Return to Home is clicked. Menu closes after. */
  onReturnHome?: () => void;
}

/**
 * Menu content. Timer is paused while menu is open (handled by parent).
 * Use inside MenuButton so closeModal is available.
 */
const GameMenuContent: React.FC<GameMenuContentProps> = ({ onReturnHome }) => {
  const closeModal = useMenuModalClose();

  const handleReturnHome = () => {
    onReturnHome?.();
    closeModal();
  };

  return (
    <div className="game-menu-content">
      <h2 className="game-menu-title">Menu</h2>
      <div className="game-menu-actions">
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
