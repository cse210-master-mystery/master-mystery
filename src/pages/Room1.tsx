import { useNavigate } from "react-router-dom";
import { useState } from "react";
import lever1img from "../assets/images/room1/lever1.png";
import lever2img from "../assets/images/room1/lever2.png";
import bookimg from "../assets/images/room1/book.png";
import Keypad from "../components/keypad/keypad";
import Timer from "../components/timer/timer";
import HintButton from "../components/buttons/HintButton";
import MenuButton from "../components/buttons/MenuButton";

export default function Room1() {
  const navigate = useNavigate();
  const [showKeypad, setShowKeypad] = useState(false);

  const handleCorrectCode = () => {
    setShowKeypad(false);
  };
  const handleTimerExpire = () => {
    navigate("/");
  };
  return (
    <div className="wrapper">
      <div className="game-scale">
        <Timer initialSeconds={15} onExpire={handleTimerExpire} />
        <div className="room1bkg">
          <img src={lever1img} className="btnlever1" onClick={() => navigate("/end-page")} />
          <img src={lever2img} className="btnlever2" onClick={() => setShowKeypad(true)} />
          <img src={bookimg} className="btnbook" onClick={() => navigate("/room2")} />
          {showKeypad && (
            <Keypad onSuccess={handleCorrectCode} onClose={() => setShowKeypad(false)} />
          )}
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
