// src/components/Button/ArrowIcon.tsx
import type { ReactNode } from "react";
import StraightArrow from "@/assets/i75/straight-arrow.png";

export interface ArrowIconProps {
  position?: "left" | "right";
  hoverOnly?: boolean;
  animate?: boolean;
  className?: string;
  imgClassName?: string;
  src?: string;
}

export default function ArrowIcon({
  position = "left",
  hoverOnly = false,
  animate = false,
  className = "",
  imgClassName = "w-4 h-6 transition-all duration-600 ease-in-out",
  src,
}: ArrowIconProps): ReactNode {
  let containerClasses = "";

  if (hoverOnly) {
    containerClasses = animate
      ? position === "right"
        ? "hidden transform -translate-x-4 transition-all duration-300 ease-in-out group-hover:inline-flex group-hover:ml-2 group-hover:translate-x-0"
        : "hidden transform translate-x-4 transition-all duration-300 ease-in-out group-hover:inline-flex group-hover:mr-2 group-hover:translate-x-0"
      : position === "right"
      ? "hidden transition-all duration-300 ease-in-out group-hover:inline-flex group-hover:ml-2"
      : "hidden transition-all duration-300 ease-in-out group-hover:inline-flex group-hover:mr-2";
  } else {
    containerClasses = position === "right" ? "ml-2 inline-flex" : "inline-flex";
  }

  const baseIconClasses = "h-4 w-auto";
  const iconClasses = `${baseIconClasses} ${imgClassName}`.trim();
  const arrowSrc =
    typeof StraightArrow === "string"
      ? StraightArrow
      : (StraightArrow as { src?: string }).src;
  const finalSrc = src || arrowSrc;

  return (
    <span className={`${containerClasses} ${className}`.trim()}>
      <img src={finalSrc} alt="" className={iconClasses} loading="lazy" />
    </span>
  );
}
