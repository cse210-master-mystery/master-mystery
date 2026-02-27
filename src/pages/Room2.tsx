import { useNavigate } from "react-router-dom";
import { handleButtonEvent } from "../eventHandlers";
import { useState } from "react";
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
import Timer from "../components/timer/timer";
import HintButton from "../components/buttons/HintButton";
import MenuButton from "../components/buttons/MenuButton";
import door from "../assets/images/room2/door.png";

export default function Room2() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const handleTimerExpire = () => {
    navigate("/");
  };

  // make event handler for each button to react to click
  return (
    <div className="wrapper">
      <div className="game-scale">
        <Timer initialSeconds={900} onExpire={handleTimerExpire} />
        <div className="room2bkg">
          {/* Overlay layer between background and interactive components(e.g. plasma) */}
          <div className="room2-overlay" />

          <img
            src={particlemovment}
            className="particlemovment"
            onClick={() => setShowPopup(movePoster)}
          />
          <img
            src={energylvls}
            className="energylvls"
            onClick={() => setShowPopup(relativeEnergy)}
          />
          <img
            src={controlconsole}
            className="controlconsole"
            onClick={() => handleButtonEvent("navigate", "/end-page", navigate)}
          />
          <img
            src={plasmaplaque}
            className="plasmaplaque"
            onClick={() => handleButtonEvent("navigate", "/end-page", navigate)}
          />
          <img
            src={magnet}
            className="magnet"
            onClick={() => handleButtonEvent("navigate", "/end-page", navigate)}
          />
          <img
            src={energymeter}
            className="energymeter"
            onClick={() => handleButtonEvent("navigate", "/end-page", navigate)}
          />
          <img
            src={dectivationpzzle}
            className="dectivationpzzle"
            onClick={() => handleButtonEvent("navigate", "/end-page", navigate)}
          />
          <img
            src={door}
            className="door"
            onClick={() => handleButtonEvent("navigate", "/end-page", navigate)}
          />
          {showPopup && <Popup imageSrc={showPopup} onClose={() => setShowPopup(null)} />}
        </div>
        <div className="menu-button">
          <MenuButton />
        </div>
        <div className="hint-button">
          <HintButton hint="..." />
        </div>
      </div>
    </div>
  );
}
