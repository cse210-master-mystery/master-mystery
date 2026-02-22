import { useNavigate } from "react-router-dom";
import { useState } from "react";
import particlemovment from "../assets/images/room2/particlemovmnt.png";
import energylvls from "../assets/images/room2/energylvls.png";
import controlconsole from "../assets/images/room2/controlconsole.png";
import plasmaplaque from "../assets/images/room2/plasmaplaque.png";
import magnet from "../assets/images/room2/magnet.png";
import energymeter from "../assets/images/room2/energymeter.png";
import dectivationpzzle from "../assets/images/room2/dectivationpzzle.png";
import Keypad from "../components/keypad/keypad";

export default function Room2() {
  const navigate = useNavigate();
  const [showKeypad, setShowKeypad] = useState(false);

  const handleCorrectCode = () => {
    setShowKeypad(false);
  };

  // make event handler for each button to react to click
  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="room2bkg">
          <img
            src={particlemovment}
            className="particlemovment"
            onClick={() => navigate("/end-page")}
          />
          <img src={energylvls} className="energylvls" onClick={() => navigate("/end-page")} />
          <img
            src={controlconsole}
            className="controlconsole"
            onClick={() => setShowKeypad(true)}
          />
          {showKeypad && (
            <Keypad onSuccess={handleCorrectCode} onClose={() => setShowKeypad(false)} />
          )}
          <img src={plasmaplaque} className="plasmaplaque" onClick={() => navigate("/end-page")} />
          <img src={magnet} className="magnet" onClick={() => navigate("/end-page")} />
          <img src={energymeter} className="energymeter" onClick={() => navigate("/end-page")} />
          <img
            src={dectivationpzzle}
            className="dectivationpzzle"
            onClick={() => navigate("/end-page")}
          />
        </div>
        <button className="btnMenu" onClick={() => console.log("menu")} aria-label="Open menu">
          Menu
        </button>
      </div>
    </div>
  );
}
