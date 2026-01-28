// src/components/Button/Button.tsx
/**
 * Button Component System
 *
 * Polymorphic button component that renders as either <button> or <a> based on props.
 * Supports multiple variants with consistent API.
 */

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, Ref } from "react";
import PrimaryButton from "./variants/PrimaryButton";
import SecondaryButton from "./variants/SecondaryButton";
import LinkButton from "./variants/LinkButton";
import TertiaryButton from "./variants/TertiaryButton";
import UnderlineButton from "./variants/UnderlineButton";
import HoverUnderlineButton from "./variants/HoverUnderlineButton";

export type ButtonSize = "sm" | "md" | "lg";

export interface BaseButtonProps {
  leftIcon?: string | ReactNode;
  rightIcon?: string | ReactNode;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const ButtonBase = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(( { href, className = "", leftIcon, rightIcon, size = "md", children, ...props }, ref) => {
  const normalizedSize = size ?? "md";
  const sizeClass =
    normalizedSize === "sm" ? "btn-sm" : normalizedSize === "lg" ? "btn-lg" : "btn-md";
  const baseClasses = `btn-base group hover:pulseGlow ${sizeClass} ${className}`.trim();

  if (href) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a ref={ref as Ref<HTMLAnchorElement>} href={href} className={baseClasses} {...anchorProps}>
        {leftIcon}
        {children}
        {rightIcon}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button ref={ref as Ref<HTMLButtonElement>} className={baseClasses} {...buttonProps}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
});

ButtonBase.displayName = "ButtonBase";

const VARIANT_MAP = {
  primary: PrimaryButton,
  secondary: SecondaryButton,
  link: LinkButton,
  tertiary: TertiaryButton,
  underline: UnderlineButton,
  hoverUnderline: HoverUnderlineButton,
};

export type ButtonVariant = keyof typeof VARIANT_MAP;

export type ButtonComponentProps = ButtonProps & {
  variant?: ButtonVariant;
};

export default function Button({ variant = "primary", ...props }: ButtonComponentProps) {
  const VariantComponent = VARIANT_MAP[variant] || PrimaryButton;
  return <VariantComponent {...props} />;
}
