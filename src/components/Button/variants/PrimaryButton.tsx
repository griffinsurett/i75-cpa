// src/components/Button/variants/PrimaryButton.tsx
/**
 * Primary Button Variant
 *
 * i75 primary button style.
 * Used for primary actions like form submissions, main CTAs.
 */

import { ButtonBase, type ButtonProps } from "../Button";
import { renderButtonIcon } from "../utils";
import ArrowIcon from "../ArrowIcon";

/**
 * Primary button with blue background and white text
 */
export default function PrimaryButton({
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses =
    "rounded-xl uppercase font-bold h4 border-2 border-primary bg-primary text-light-primary hover:border-light-primary hover:bg-transparent hover:pulseGlow";
  const resolvedLeftIcon =
    leftIcon ??
    ArrowIcon({
      hoverOnly: true,
      position: "left",
      imgClassName: "w-4 h-6 transition-all duration-600 ease-in-out",
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
