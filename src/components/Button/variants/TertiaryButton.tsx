// src/components/Button/variants/TertiaryButton.tsx
/**
 * Tertiary Button Variant
 *
 * i75 tertiary button style.
 */

import { ButtonBase, type ButtonProps } from "../Button";
import { renderButtonIcon } from "../utils";
import ArrowIcon from "../ArrowIcon";

export default function TertiaryButton({
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses =
    "rounded-xl uppercase font-bold h4 bg-light-primary text-primary hover:text-light-primary hover:bg-primary hover:border-primary hover:pulseGlow";
  const resolvedLeftIcon =
    leftIcon ??
    ArrowIcon({
      hoverOnly: true,
      position: "left",
      imgClassName: "w-4 h-6 px-2 transition-all duration-600 ease-in-out",
    });

  return (
    <ButtonBase
      {...props}
      className={`${variantClasses} ${className}`}
      leftIcon={renderButtonIcon(resolvedLeftIcon, props.size)}
      rightIcon={renderButtonIcon(rightIcon, props.size)}
    />
  );
}
