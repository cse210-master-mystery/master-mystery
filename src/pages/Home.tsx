import menuPng from "../assets/images/menu.png";
import { useNavigate } from "react-router-dom";
import HintButton from "../components/buttons/HintButton";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="home">
          <div className="center">
            <h1 className="title">Matter Mystery</h1>

            <button className="btnStart" onClick={() => navigate("/Room1")}>
              Start
            </button>
          </div>

          <button className="menuBtn" onClick={() => console.log("menu")} aria-label="Open menu">
            <img src={menuPng} alt="" draggable={false} />
          </button>
          <HintButton hint="Welcome to Matter Mystery! Click 'Start' to begin your adventure. Explore the rooms, find clues, and solve puzzles to uncover the mystery. Good luck!" />
        </div>
      </div>
    </div>
  );
}
