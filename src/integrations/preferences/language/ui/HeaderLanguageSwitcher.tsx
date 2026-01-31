// src/integrations/preferences/language/ui/HeaderLanguageSwitcher.tsx
/**
 * Compact Language Switcher for Header
 *
 * A minimal language dropdown that fits the header design.
 * Shows globe icon + language code, expands to full dropdown on click.
 */

import { useState, useRef, useEffect } from "react";
import { useLanguageSwitcher } from "../core/hooks/useLanguageSwitcher";
import Button from "@/components/Button/Button";

export default function HeaderLanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    currentLanguage,
    supportedLanguages,
    hasFunctionalConsent,
    requiresConsent,
    changeLanguage,
    openConsentModal,
  } = useLanguageSwitcher();

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleLanguageChange = (code: string) => {
    const result = changeLanguage(code);
    if (!result.success && result.error) {
      alert(result.error);
      return;
    }
    setIsOpen(false);
  };

  const handleOpenConsent = () => {
    openConsentModal();
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative h-full flex items-center">
      <Button
        variant="hoverUnderline"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-light-primary"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Choose language"
        title={
          hasFunctionalConsent
            ? "Choose language"
            : "Enable functional cookies to change language"
        }
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.6 9h16.8M3.6 15h16.8"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9Z"
          />
        </svg>
        <span className="hidden lg:inline uppercase notranslate">
          {currentLanguage.code.split("-")[0]}
        </span>
        <svg
          className={`w-4 h-4 transition-transform menu-arrow menu-arrow--down ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute right-0 left-auto sm:left-0 sm:right-auto top-full w-max max-w-[90vw] bg-primary text-light-primary z-50 border-2 border-light-primary shadow-none overflow-hidden">
          {requiresConsent && (
            <button
              type="button"
              onClick={handleOpenConsent}
              className="w-full px-3 py-2 text-left text-xs bg-light-primary/10 border-b border-light-primary/30 hover:bg-light-primary/20 transition"
            >
              <span className="block text-light-primary/80">
                Enable cookies to switch languages.
              </span>
              <span className="block mt-1 font-semibold text-light-primary uppercase tracking-wide">
                Manage consent
              </span>
            </button>
          )}

          <div className="max-h-64 overflow-y-auto">
            {supportedLanguages.map((language) => {
              const isActive = language.code === currentLanguage.code;
              const isDisabled = requiresConsent && language.code !== "en";
              return (
                <button
                  key={language.code}
                  type="button"
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm lg:text-base transition-colors whitespace-nowrap font-normal ${
                    isActive
                      ? "bg-light-primary/20 text-light-primary font-medium"
                      : "text-light-primary hover:text-light-primary/90"
                  } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                  onClick={() => handleLanguageChange(language.code)}
                  disabled={isDisabled}
                >
                  {language.flag && (
                    <span className="text-lg" aria-hidden="true">
                      {language.flag}
                    </span>
                  )}
                  <span className="flex-1 text-left notranslate">
                    {language.nativeName}
                  </span>
                  {isActive && (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-light-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
