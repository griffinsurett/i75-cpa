// src/components/Button/variants/BorderWhiteButton.tsx
import { ButtonBase, type ButtonProps } from "../Button";
import { renderButtonIcon } from "../utils";
import ArrowIcon from "../ArrowIcon";

export default function BorderWhiteButton({
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses =
    "rounded-xl uppercase font-bold h4 border-2 border-light-primary bg-transparent text-light-primary hover:border-light-primary hover:bg-transparent hover:pulseGlow";
  const resolvedLeftIcon =
    leftIcon ??
    ArrowIcon({
      hoverOnly: false,
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
