import { motion } from "framer-motion";

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}

const Stepper = ({ label, value, min, max, step = 1, unit, onChange }: Props) => {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="text-xs uppercase text-muted-foreground">{label}</span>

        <motion.span
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-lg font-semibold text-primary"
        >
          {value} {unit}
        </motion.span>
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
className="w-full h-2 rounded-full appearance-none bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400"        />

        {/* Floating bubble */}
        <motion.div
          className="absolute -top-8 px-2 py-1 text-xs bg-primary text-white rounded shadow"
          style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
          animate={{ y: [5, 0], opacity: [0, 1] }}
        >
          {value}
        </motion.div>
      </div>
    </div>
  );
};

export default Stepper;