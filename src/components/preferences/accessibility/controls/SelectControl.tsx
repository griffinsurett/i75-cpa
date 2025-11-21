// src/components/accessibility/controls/SelectControl.tsx

interface SelectOption {
  value: string;
  label: string;
}

interface SelectControlProps {
  label: string;
  description?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export default function SelectControl({
  label,
  description,
  value,
  options,
  onChange,
}: SelectControlProps) {
  return (
    <div className="mb-6">
      <label className="block font-semibold text-heading mb-2">{label}</label>
      {description && <p className="text-sm text-text mb-3">{description}</p>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-text/10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
