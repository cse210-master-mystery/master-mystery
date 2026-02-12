import { useNavigate } from "react-router-dom";
import lever1img from "../assets/images/lever1.png";
import lever2img from "../assets/images/lever2.png";
import bookimg from "../assets/images/book.png";

export default function Room1() {
  const navigate = useNavigate();
  // make event handler for each button to react to click
  return (
    <div className="wrapper">
      <div className="game-scale">
        <div className="room1bkg">
          <img src={lever1img} className="btnlever1" onClick={() => navigate("/master-mystery")} />
          <img src={lever2img} className="btnlever2" onClick={() => navigate("/master-mystery")} />
          <img src={bookimg} className="btnbook" onClick={() => navigate("/master-mystery")} />
        </div>
      </div>
    </div>
  );
}
