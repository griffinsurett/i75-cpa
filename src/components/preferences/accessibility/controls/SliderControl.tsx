// src/components/accessibility/controls/SliderControl.tsx

interface SliderControlProps {
  label: string;
  description?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}

export default function SliderControl({
  label,
  description,
  value,
  min,
  max,
  step,
  suffix = "",
  onChange,
}: SliderControlProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-2">
        <label className="font-semibold text-heading">{label}</label>
        <span className="text-sm font-mono text-text">
          {value}
          {suffix}
        </span>
      </div>
      {description && <p className="text-sm text-text mb-3">{description}</p>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-text/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-xs text-text mt-1">
        <span>
          {min}
          {suffix}
        </span>
        <span>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );
}
