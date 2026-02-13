import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/buttons/Button";
import HintButton from "../components/buttons/HintButton";

export default function Home() {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeText = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="game-clock">{timeText}</div>
        <div className="home">
          <div className="center">
            <h1 className="title">Matter Mystery</h1>

            <Button className="btnStart" onClick={() => navigate("/room1")}>
              Start
            </Button>
          </div>

          <button className="btnMenu" onClick={() => console.log("menu")} aria-label="Open menu">
            Menu
          </button>
          <HintButton hint="This is a hint for the home page." />
        </div>
      </div>
    </div>
  );
}
