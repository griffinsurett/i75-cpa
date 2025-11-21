// src/components/LoopComponents/AccordionItem.tsx
import type { ReactNode } from "react";

export interface AccordionItemProps {
  id: string;
  title: string;
  description?: string;
  children?: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function AccordionItem({
  id,
  title,
  description,
  children,
  isExpanded,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border border-surface rounded-lg overflow-hidden">
      <button
        type="button"
        className="flex items-center justify-between p-4 bg-text/5 cursor-pointer hover:bg-text/5-100 transition-colors w-full text-left"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`${id}-content`}
      >
        <div className="flex items-center gap-3 flex-1">
          <span className="text-text font-medium text-xl">
            {isExpanded ? "−" : "+"}
          </span>
          <div className="flex-1">
            <h3 className="font-semibold text-heading">{title}</h3>
          </div>
        </div>
      </button>

      {isExpanded && children && (
        <div id={`${id}-content`} className="p-6 bg-bg border-t border-bg">
          <div className="prose prose-surface max-w-none">{children}</div>
        </div>
      )}
    </div>
  );
}
