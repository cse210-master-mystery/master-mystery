import { useNavigate } from "react-router-dom";
import { handleButtonEvent } from "../eventHandlers";
import { useEffect, useReducer, useRef, useState } from "react";
import Popup from "../components/popups/popup";
import DeactivationPuzzle from "../components/deactivation-puzzle/DeactivationPuzzle";
import particlemovment from "../assets/images/room2/particlemovmnt.png";
import energylvls from "../assets/images/room2/energylvls.png";
import controlconsole from "../assets/images/room2/controlconsole.png";
import plasmaplaque from "../assets/images/room2/plasmaplaque.png";
import magnet from "../assets/images/room2/magnet.png";
import energymeter from "../assets/images/room2/energymeter.png";
import dectivationpzzle from "../assets/images/room2/dectivationpzzle.png";
import Keypad from "../components/keypad/keypad";
import movePoster from "../assets/images/room2/particlemove.png";
import relativeEnergy from "../assets/images/room2/relativeenergy.png";
import Timer from "../components/timer/timer";
import HintButton from "../components/buttons/HintButton";
import MenuButton from "../components/buttons/MenuButton";
import GameMenuContent from "../components/menu/GameMenuContent";
import door from "../assets/images/room2/door.png";
import EnergyMeter from "../components/energymeter/energymeter";
import { room2Events, initialRoom2State } from "../room2Events";
import { getRoom2Hint } from "../room2Hints";

export default function Room2() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(room2Events, initialRoom2State);
  const [showPopup, setShowPopup] = useState<string | null>(null);

  const [showDeactivation, setShowDeactivation] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [showEnergyMeter, setShowEnergyMeter] = useState(false);
  const [energy, setEnergy] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const revealTimerRef = useRef<number | null>(null);
  const handleTimerExpire = () => {
    navigate("/");
  };
  const [showKeypad, setShowKeypad] = useState(false);

  useEffect(() => {
    return () => {
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
      }
    };
  }, []);

  const handleCorrectCode = () => {
    handleButtonEvent("room2", {
      dispatch,
      action: { type: "UNLOCK_CONSOLE" },
    });
    setShowKeypad(false);
  };

  const handleMagnetClick = () => {
    if (!state.progress.consoleUnlocked) {
      alert("Unlock the control console before moving plasma.");
      return;
    }

    if (state.progress.doorRevealed || revealTimerRef.current !== null) {
      return;
    }

    handleButtonEvent("room2", {
      dispatch,
      action: { type: "USE_MAGNET" },
    });

    revealTimerRef.current = window.setTimeout(() => {
      handleButtonEvent("room2", {
        dispatch,
        action: { type: "REVEAL_DOOR" },
      });
      revealTimerRef.current = null;
    }, 650);
  };

  const generateEnergy = () => {
    if (puzzleSolved) {
      return 10; // low energy
    }

    const levels = [50, 90]; // medium or high
    return levels[Math.floor(Math.random() * levels.length)];
  };

  const handleDeactivationSuccess = () => {
    handleButtonEvent("room2", {
      dispatch,
      action: { type: "SOLVE_PUZZLE" },
    });
    setPuzzleSolved(true);
    setShowDeactivation(false);
  };

  return (
    <div className="wrapper">
      <div className="game-scale">
        <Timer initialSeconds={900} onExpire={handleTimerExpire} paused={menuOpen} />
        <div className="room2bkg">
          {/* Overlay layer between background and interactive components(e.g. plasma) */}
          <div className="room2-overlay" />

          <img
            src={particlemovment}
            className="particlemovment"
            onClick={() => {
              handleButtonEvent("room2", {
                dispatch,
                action: { type: "VIEW_PARTICLE_POSTER" },
              });
              setShowPopup(movePoster);
            }}
          />
          <img
            src={energylvls}
            className="energylvls"
            onClick={() => {
              handleButtonEvent("room2", {
                dispatch,
                action: { type: "VIEW_ENERGY_POSTER" },
              });
              setShowPopup(relativeEnergy);
            }}
          />
          {/* mark consoleUnlocked: true when solved ny seting action to UNLOCK_CONSOLE */}
          <img
            src={controlconsole}
            className="controlconsole"
            onClick={() =>
              puzzleSolved ? setShowKeypad(true) : alert("Solve puzzle to unlock control console.")
            }
          />
          {showKeypad && (
            <Keypad onSuccess={handleCorrectCode} onClose={() => setShowKeypad(false)} />
          )}
          {/*onClick={() => {
              handleButtonEvent("room2", {
                dispatch,
                action: { type: "UNLOCK_CONSOLE" },
              });
              handleConsoleClick();
            }}
          />*/}
          <img
            src={plasmaplaque}
            className="plasmaplaque"
            onClick={() => {
              handleButtonEvent("room2", {
                dispatch,
                action: { type: "VIEW_PLAQUE" },
              });
              setShowPopup(plasmaplaque);
            }}
          />
          {/* use action REVEAL_DOOR when the magnet moves to reveal the door and it becomes clickable*/}
          {!state.progress.doorRevealed && (
            <div
              className={`magnet-shell ${state.progress.consoleUnlocked ? "magnet-shell--ready" : ""}`}
              onClick={handleMagnetClick}
            >
              <img src={magnet} className="magnet" alt="Magnet" />
            </div>
          )}
          {state.progress.consoleUnlocked && !state.progress.doorRevealed && (
            <div className="magnet-prompt" role="status" aria-live="polite">
              Console unlocked. Click the magnet to move plasma.
            </div>
          )}
          {/* energy level switches to low when puzzleSolved: true */}
          {/* use action "SET_ENERGY_LEVEL" in room 2 events to set the energy level logic */}
          <img
            src={energymeter}
            className="energymeter"
            onClick={() => {
              setEnergy(generateEnergy());
              setShowEnergyMeter(true);
            }}
          />
          <EnergyMeter
            isOpen={showEnergyMeter}
            energy={energy}
            onClose={() => setShowEnergyMeter(false)}
          />
          {/* mark puzzleSolved: true when solved ny seting action to "SOLVE_PUZZLE" */}
          <img
            src={dectivationpzzle}
            className={`dectivationpzzle ${puzzleSolved ? "dectivationpzzle--solved" : ""}`}
            onClick={() => {
              if (!puzzleSolved) {
                setShowDeactivation(true);
              }
            }}
            data-testid="dectivationpzzle"
          />
          {state.progress.doorRevealed && (
            <img
              src={door}
              className="door door--revealed"
              alt="Exit door"
              onClick={() => handleButtonEvent("navigate", "/end-page", navigate)}
            />
          )}
          {showPopup && <Popup imageSrc={showPopup} onClose={() => setShowPopup(null)} />}
          {showDeactivation && (
            <DeactivationPuzzle
              onSuccess={handleDeactivationSuccess}
              onClose={() => setShowDeactivation(false)}
            />
          )}
        </div>
        <div className="menu-button">
          <MenuButton onOpenChange={setMenuOpen}>
            <GameMenuContent onReturnHome={() => navigate("/")} />
          </MenuButton>
        </div>
        <div className="hint-button">
          <HintButton hint={getRoom2Hint(state.progress)} />
        </div>
      </div>
    </div>
  );
}
