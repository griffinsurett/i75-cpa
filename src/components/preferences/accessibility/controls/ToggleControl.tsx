// src/components/accessibility/controls/ToggleControl.tsx

interface ToggleControlProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ToggleControl({
  label,
  description,
  checked,
  onChange,
}: ToggleControlProps) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-surface last:border-b-0">
      <div className="flex-1 pr-4">
        <label className="font-semibold text-heading cursor-pointer">
          {label}
        </label>
        {description && <p className="text-sm text-text mt-1">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          checked ? "bg-primary" : "bg-text/10"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-bg transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
