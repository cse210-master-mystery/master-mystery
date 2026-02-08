import { useNavigate } from "react-router-dom";
import lever1img from "../assets/images/lever1.png";

export default function Room1() {
        const navigate = useNavigate();
        return (
            <div className="wrapper">
                <div className="game-scale">
                    <div className="room1bkg">
                    <img
                        src={lever1img}
                        className="btnlever1"
                        onClick={() => navigate("/master-mystery")}
                    />
                </div>
            </div>
        </div>
        );
  }
  