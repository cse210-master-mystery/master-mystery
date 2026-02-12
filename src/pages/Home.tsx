import menuPng from "../assets/images/menu.png";
import { useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="home">
          <div className="center">
            <h1 className="title">Matter Mystery</h1>

            <Button variant="start" onClick={() => navigate("/Room1")}>
              Start
            </Button>
          </div>

          <button className="menuBtn" onClick={() => console.log("menu")} aria-label="Open menu">
            <img src={menuPng} alt="" draggable={false} />
          </button>
        </div>
      </div>
    </div>
  );
}
