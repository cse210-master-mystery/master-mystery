import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import lever1img from "../assets/images/room1/lever1.png";
import lever2img from "../assets/images/room1/lever2.png";
import case1img from "../assets/images/room1/case1.png";
import case2img from "../assets/images/room1/case2.png";
import doorimg from "../assets/images/room1/door.png";
import bookimg from "../assets/images/room1/book.png";
import Keypad from "../components/keypad/keypad";

const CASE1_START_PRESSURE = 5;
const CASE1_TARGET_PRESSURE = 503;
const CASE1_RANDOM_MIN = 20;
const CASE1_RANDOM_MAX = 90;
const CASE1_RANDOM_STEP = 10;

function getRandomPressureIncrease() {
  const choices = Math.floor((CASE1_RANDOM_MAX - CASE1_RANDOM_MIN) / CASE1_RANDOM_STEP) + 1;
  const pick = Math.floor(Math.random() * choices);
  return CASE1_RANDOM_MIN + pick * CASE1_RANDOM_STEP;
}

export default function Room1() {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());
  const [case1Pressure, setCase1Pressure] = useState(CASE1_START_PRESSURE);
  const [isCase1Melted, setIsCase1Melted] = useState(false);
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
    if (case1Pressure >= CASE1_TARGET_PRESSURE) {
      setIsCase1Melted(true);
    }
  };

  const hasReachedCase1Target = case1Pressure >= CASE1_TARGET_PRESSURE;

  const handleCase1LeverClick = () => {
    setCase1Pressure((currentPressure) => {
      if (currentPressure >= CASE1_TARGET_PRESSURE) {
        return currentPressure;
      }

      const remaining = CASE1_TARGET_PRESSURE - currentPressure;
      const addedPressure = remaining <= CASE1_RANDOM_MAX ? remaining : getRandomPressureIncrease();

      return currentPressure + addedPressure;
    });
  };
  // make event handler for each button to react to click
  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="game-clock">{timeText}</div>
        <div className="room1bkg">
          <img src={lever1img} className="btnlever1" onClick={handleCase1LeverClick} />
          <img src={lever2img} className="btnlever2" onClick={() => setShowKeypad(true)} />
          <div className="case1PressurePlaque" aria-live="polite">
            Pressure: {case1Pressure} atm
          </div>
          <img
            src={isCase1Melted ? case2img : case1img}
            className="imgcase1"
            alt="Case 1 container"
          />
          <img
            src={isCase1Melted ? case2img : case1img}
            className="imgcase2"
            alt="Case 1 container"
          />
          {isCase1Melted && <img src={doorimg} className="btndoor" alt="Exit door" />}
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
