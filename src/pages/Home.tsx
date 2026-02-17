import { useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";
import HintButton from "../components/buttons/HintButton";
import MenuButton from "../components/buttons/MenuButton";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="home">
          <div className="center">
            <h1 className="title">Matter Mystery</h1>

            <Button className="btnStart" onClick={() => navigate("/room1")}>
              Start
            </Button>
          </div>

          <div className="menu-button">
            <MenuButton />
          </div>

          <div className="hint-button">
            <HintButton hint="..." />
          </div>
        </div>
      </div>
    </div>
  );
}
