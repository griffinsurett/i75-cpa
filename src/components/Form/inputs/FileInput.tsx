// src/components/Form/inputs/FileInput.tsx
/**
 * File Input Component
 * Styled file upload with label support
 */

import type { InputHTMLAttributes } from "react";

interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string;
  label?: string;
  accept?: string;
  helperText?: string;

  // Styling
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperClassName?: string;

  // Control visibility
  showLabel?: boolean;
}

export default function FileInput({
  name,
  label,
  required = false,
  accept,
  helperText,
  containerClassName = "mb-4",
  labelClassName = "block text-sm font-medium text-text mb-1",
  inputClassName = "w-full p-2 bg-transparent border-0 rounded-md ring-3 ring-white focus:outline-none focus:ring-3 focus:ring-MainDark file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-light-primary file:text-primary hover:file:bg-light-primary/90 file:cursor-pointer",
  helperClassName = "text-sm text-text/60 mt-1",
  showLabel = true,
  ...inputProps
}: FileInputProps) {
  return (
    <div className={containerClassName}>
      {showLabel && label && (
        <label htmlFor={name} className={labelClassName}>
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      <input
        id={name}
        name={name}
        type="file"
        className={inputClassName}
        required={required}
        accept={accept}
        {...inputProps}
      />

      {helperText && (
        <p className={helperClassName}>{helperText}</p>
      )}
    </div>
  );
}
