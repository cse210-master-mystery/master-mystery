import menuPng from "../assets/images/menu.png";
import Button from "../components/buttons/Buttons";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="home">
          <div className="center">
            <h1 className="title">Matter Mystery</h1>

        {/* <button className="btnStart" onClick={() => console.log("start")}>
          Start
        </button> */}
        <Button variant="start" onClick={() => console.log("start")}>
          Start
        </Button>
        <Button variant="round" onClick={() => console.log("round")}>
          Round
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
