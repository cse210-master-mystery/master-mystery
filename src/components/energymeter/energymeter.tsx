import Modal from "../modal/Modal";
import "./energymeter.css";

interface EnergyMeterProps {
  isOpen: boolean;
  energy: number; // 0-100
  onClose: () => void;
}

export default function EnergyMeter({ isOpen, energy, onClose }: EnergyMeterProps) {
  const level = energy < 33 ? "LOW" : energy < 66 ? "MEDIUM" : "HIGH";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={`energy-meter energy-meter--${level.toLowerCase()}`}>
        <h2 className="energy-meter__title">{level} ENERGY</h2>

        <div
          className="energy-meter__bar"
          role="progressbar"
          aria-label="Current energy level"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={energy}
        >
          <div className="energy-meter__fill" style={{ width: `${energy}%` }} />
        </div>

        <p className="energy-meter__value">{energy}%</p>
        <button type="button" className="energy-meter__close" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
