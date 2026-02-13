import { useNavigate } from "react-router-dom";
import lever1img from "../assets/images/lever1.png";
import lever2img from "../assets/images/lever2.png";
import bookimg from "../assets/images/book.png";
import { useEffect, useState } from "react";

export default function Room1() {
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
  // make event handler for each button to react to click
  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="game-clock">{timeText}</div>
        <div className="room1bkg">
          <img src={lever1img} className="btnlever1" onClick={() => navigate("/end-page")} />
          <img src={lever2img} className="btnlever2" onClick={() => navigate("/fail-page")} />
          <img src={bookimg} className="btnbook" onClick={() => navigate("/")} />
        </div>
        <button className="btnMenu" onClick={() => console.log("menu")} aria-label="Open menu">
          Menu
        </button>
      </div>
    </div>
  );
}
