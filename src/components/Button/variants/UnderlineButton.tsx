// src/components/Button/variants/UnderlineButton.tsx
import { ButtonBase, type ButtonProps } from "../Button";
import { renderButtonIcon } from "../utils";

export default function UnderlineButton({
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses =
    "p-0 underline text-base lg:text-xl text-center bg-transparent uppercase font-bold";

  return (
    <ButtonBase
      {...props}
      className={`${variantClasses} ${className}`}
      leftIcon={renderButtonIcon(leftIcon, props.size)}
      rightIcon={renderButtonIcon(rightIcon, props.size)}
    />
  );
}
