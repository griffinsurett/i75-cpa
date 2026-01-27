// src/components/Button/variants/GhostButton.tsx
/**
 * Ghost Button Variant
 *
 * i75 ghost-style button (transparent).
 */

import { ButtonBase, type ButtonProps } from "../Button";
import { renderButtonIcon } from "../utils";

export default function GhostButton({
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses =
    "rounded-xl uppercase font-bold border-2 border-light-primary bg-transparent text-light-primary hover:border-light-primary hover:bg-transparent hover:pulseGlow";

  return (
    <ButtonBase
      {...props}
      className={`${variantClasses} ${className}`}
      leftIcon={renderButtonIcon(leftIcon, props.size)}
      rightIcon={renderButtonIcon(rightIcon, props.size)}
    />
  );
}
