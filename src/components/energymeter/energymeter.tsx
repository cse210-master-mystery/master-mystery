interface EnergyMeterProps {
  energy: number; // 0–100
}

export default function EnergyMeter({ energy = 50 }: EnergyMeterProps) {
  const getLevel = () => {
    if (energy < 33) return "low";
    if (energy < 66) return "medium";
    return "high";
  };

  const level = getLevel();

  const color = level === "low" ? "#ff6b6b" : level === "medium" ? "#ffd93d" : "#6bcf63";

  return (
    <div className="energy-container">
      <div className="energy-label">{level.toUpperCase()} ENERGY</div>

      <div className="energy-bar">
        <div className="energy-fill" style={{ width: `${energy}%`, background: color }} />
      </div>
    </div>
  );
}
