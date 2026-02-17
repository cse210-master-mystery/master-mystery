import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import lever1img from "../assets/images/room1/lever1.png";
import lever2img from "../assets/images/room1/lever2.png";
import bookimg from "../assets/images/room1/book.png";
import Keypad from "../components/keypad/keypad";

export default function Room1() {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());
  const [showKeypad, setShowKeypad] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeText = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCorrectCode = () => {
    setShowKeypad(false);
  };
  // make event handler for each button to react to click
  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="game-clock">{timeText}</div>
        <div className="room1bkg">
          <img src={lever1img} className="btnlever1" onClick={() => navigate("/end-page")} />
          <img src={lever2img} className="btnlever2" onClick={() => setShowKeypad(true)} />
          <img src={bookimg} className="btnbook" onClick={() => navigate("/room2")} />
          {showKeypad && (
            <Keypad onSuccess={handleCorrectCode} onClose={() => setShowKeypad(false)} />
          )}
        </div>
        <button className="btnMenu" onClick={() => console.log("menu")} aria-label="Open menu">
          Menu
        </button>
      </div>
    </div>
  );
}
