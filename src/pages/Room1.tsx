import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import lever1img from "../assets/images/room1/lever1.png";
import lever2img from "../assets/images/room1/lever2.png";
import bookimg from "../assets/images/room1/book.png";
import Keypad from "../components/keypad/keypad";
import MenuButton from "../components/buttons/MenuButton";
import HintButton from "../components/buttons/HintButton";
import Modal from "../components/modal/Modal";

export default function Room1() {
  const navigate = useNavigate();

  // 15 minutes countdown
  const [remaining, setRemaining] = useState(15 * 60);
  const [showKeypad, setShowKeypad] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  // when countdown ends, show message
  useEffect(() => {
    if (remaining === 0) {
      setTimeUp(true);
    }
  }, [remaining]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  const timeText = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const handleCorrectCode = () => {
    setShowKeypad(false);
  };
  // make event handler for each button to react to click
  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="game-clock">{timeText}</div>
        <div className="menu-button">
          <MenuButton />
        </div>
        <div className="hint-button">
          <HintButton hint="This is a hint for room 1." />
        </div>
        <div className="room1bkg">
          <img src={lever1img} className="btnlever1" onClick={() => navigate("/end-page")} />
          <img src={lever2img} className="btnlever2" onClick={() => setShowKeypad(true)} />
          <img src={bookimg} className="btnbook" onClick={() => navigate("/room2")} />
          {showKeypad && (
            <Keypad onSuccess={handleCorrectCode} onClose={() => setShowKeypad(false)} />
          )}
        </div>

        <Modal isOpen={timeUp} onClose={() => navigate("/")}>
          <p>You are running out of time.</p>
          <button type="button" onClick={() => navigate("/")}>
            Return to Home
          </button>
        </Modal>
      </div>
    </div>
  );
}
