import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Storyline.css";
import Button from "../../components/buttons/Button";

const storySlides = [
  {
    text: "During a school tour of a secret underground containment vault, a mad scientist demonstrates an experiment that stores matter at extreme energy levels.",
    effect: "fade",
  },
  {
    text: "The system overloads, shrinking you to particle size and trapping you inside the experiment chambers.",
    effect: "vibrate",
  },
  {
    text: "Solve the puzzles to escape! You have 15 minutes to find your way out, or else…",
    effect: "urgent",
  },
];

export default function Storyline() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const currentSlide = storySlides[index];

  const handleNext = () => {
    if (index < storySlides.length - 1) {
      setIndex(index + 1);
    } else {
      navigate("/room1");
    }
  };

  return (
    <div className={`story-page-wrapper`}>
      <div key={index} className={`story-card-size story-card-${currentSlide.effect}`}>
        <p className="story-text">{currentSlide.text}</p>

        <Button fontSize="clamp(16px, calc(4 * var(--unit)), 200px)" onClick={handleNext}>
          {index === storySlides.length - 1 ? "READY" : "NEXT"}
        </Button>
      </div>
    </div>
  );
}
