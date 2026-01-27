// src/components/Button/variants/BorderPrimaryButton.tsx
import { ButtonBase, type ButtonProps } from "../Button";
import { renderButtonIcon } from "../utils";

export default function BorderPrimaryButton({
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses =
    "rounded-xl uppercase font-bold h4 border-2 border-primary bg-transparent text-primary hover:pulseGlow";

  return (
    <ButtonBase
      {...props}
      className={`${variantClasses} ${className}`}
      leftIcon={renderButtonIcon(leftIcon, props.size)}
      rightIcon={renderButtonIcon(rightIcon, props.size)}
    />
  );
}
