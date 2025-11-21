// src/components/Button/variants/GhostButton.tsx
/**
 * Ghost Button Variant
 *
 * Transparent button that shows background on hover.
 * Used for tertiary actions or when subtle interaction is needed.
 */

import { ButtonBase, type ButtonProps } from "../Button";
import { renderButtonIcon } from "../utils";

export default function GhostButton({
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: ButtonProps) {
  // Transparent with hover effect
  const variantClasses =
    "bg-transparent text-bg hover:text-heading hover:bg-text/5-100 focus:ring-surface-500";

  return (
    <ButtonBase
      {...props}
      className={`${variantClasses} ${className}`}
      leftIcon={renderButtonIcon(leftIcon, props.size)}
      rightIcon={renderButtonIcon(rightIcon, props.size)}
    />
  );
}
