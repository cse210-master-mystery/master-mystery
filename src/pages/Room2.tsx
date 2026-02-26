import { useNavigate } from "react-router-dom";
import { handleButtonEvent } from "../eventHandlers";
import { useReducer, useState } from "react";
import Popup from "../components/popups/popup";
import particlemovment from "../assets/images/room2/particlemovmnt.png";
import energylvls from "../assets/images/room2/energylvls.png";
import controlconsole from "../assets/images/room2/controlconsole.png";
import plasmaplaque from "../assets/images/room2/plasmaplaque.png";
import magnet from "../assets/images/room2/magnet.png";
import energymeter from "../assets/images/room2/energymeter.png";
import dectivationpzzle from "../assets/images/room2/dectivationpzzle.png";
import movePoster from "../assets/images/room2/particlemove.png";
import relativeEnergy from "../assets/images/room2/relativeenergy.png";
import doorimg from "../assets/images/room1/door.png";
import Timer from "../components/timer/timer";
import HintButton from "../components/buttons/HintButton";
import MenuButton from "../components/buttons/MenuButton";
import { room2Events, initialRoom2State } from "../room2Events";
import { getRoom2Hint } from "../room2Hints";

export default function Room2() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(room2Events, initialRoom2State);
  const [showPopup, setShowPopup] = useState<string | null>(null);

  const handleTimerExpire = () => {
    navigate("/");
  };

  const handleConsoleClick = () => {
    alert("Console is locked.");
  };

  const handleMagnetClick = () => {
    alert("Move plasma only after unlocking console.");
  };

  const handleEnergyMeterClick = () => {
    alert("Energy meter is not implemented.");
  };

  const handleDeactivationPuzzleClick = () => {
    alert("Deactivation puzzle is not implemented.");
  };

  // make event handler for each button to react to click
  return (
    <div className="wrapper">
      <div className="game-scale">
        <Timer initialSeconds={900} onExpire={handleTimerExpire} />
        <div className="room2bkg">
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
          <img src={controlconsole} className="controlconsole" onClick={handleConsoleClick} />
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
          <img
            src={magnet}
            className="magnet"
            onClick={() => {
              handleMagnetClick;
            }}
          />
          <img
            src={energymeter}
            className="energymeter"
            onClick={() => {
              handleEnergyMeterClick;
            }}
          />
          <img
            src={dectivationpzzle}
            className="dectivationpzzle"
            onClick={() => {
              handleDeactivationPuzzleClick;
            }}
          />
          {showPopup && <Popup imageSrc={showPopup} onClose={() => setShowPopup(null)} />}
          {state.consoleLocked ? "LOCKED" : "ENTER CODE"}
          {/* uncomment line below and delete ` {true && ( ` once puzzles work */}
          {/* {state.doorUnlocked && (   */}
            {true && (
            <img
              src={doorimg}
              className="btndoor"
              alt="Exit door"
              onClick={() => navigate("/end-page")}
            />
          )}
        </div>
        <div className="menu-button">
          <MenuButton />
        </div>
        <div className="hint-button">
          <HintButton hint={getRoom2Hint(state.progress)} />
        </div>
      </div>
    </div>
  );
}
