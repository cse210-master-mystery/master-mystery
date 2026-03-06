interface EnergyMeterProps {
  energy: number; // 0–100
  onClose: () => void;
}

export default function EnergyMeter({ energy, onClose }: EnergyMeterProps) {
  const level = energy < 33 ? "LOW" : energy < 66 ? "MEDIUM" : "HIGH";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{level} ENERGY</h2>

        <div className="energy-bar">
          <div className="energy-fill" style={{ width: `${energy}%` }} />
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
