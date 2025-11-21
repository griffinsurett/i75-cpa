// src/components/accessibility/controls/ButtonGroupControl.tsx

import Button from "@/components/Button/Button";

interface ButtonGroupOption {
  value: string;
  label: string;
}

interface ButtonGroupControlProps {
  label: string;
  description?: string;
  value: string;
  options: ButtonGroupOption[];
  onChange: (value: string) => void;
}

export default function ButtonGroupControl({
  label,
  description,
  value,
  options,
  onChange,
}: ButtonGroupControlProps) {
  return (
    <div className="mb-6">
      <label className="block font-semibold text-heading mb-2">{label}</label>
      {description && <p className="text-sm text-text mb-3">{description}</p>}
      <div className="flex gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            variant="primary"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
