import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import type { ButtonProps } from "../Button";
import { renderButtonIcon } from "../utils";

export default function HoverUnderlineButton({
  href,
  className = "",
  leftIcon,
  rightIcon,
  size,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = `inline-flex items-center gap-2 bg-transparent text-current normal-case font-semibold no-underline hover:underline underline-offset-4 transition-colors duration-200 ${className}`.trim();

  if (href) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={baseClasses} {...anchorProps}>
        {renderButtonIcon(leftIcon, size)}
        {children}
        {renderButtonIcon(rightIcon, size)}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} className={baseClasses} {...buttonProps}>
      {renderButtonIcon(leftIcon, size)}
      {children}
      {renderButtonIcon(rightIcon, size)}
    </button>
  );
}
