// src/integrations/preferences/ui/consent/components/CookieConsentBanner.tsx
/**
 * Cookie Consent Banner (Default UI)
 *
 * Initial consent prompt that appears for first-time visitors.
 * Loads eagerly on first user interaction via client:firstInteraction.
 *
 * After consent is given, enables scripts via scriptManager.
 */

import { useState, useEffect, useTransition, lazy, Suspense } from "react";
import { useCookieStorage } from "@/hooks/useCookieStorage";
import { enableConsentedScripts } from "@/integrations/preferences/consent/core/scripts/scriptManager";
import Modal from "@/components/Modal";
import type { CookieConsent } from "@/integrations/preferences/consent/core/types";
import Button from "@/components/Button/Button";
import ArrowIcon from "@/components/Button/ArrowIcon";

const CookiePreferencesModal = lazy(() => import("./CookiePreferencesModal"));

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { setCookie } = useCookieStorage();

  useEffect(() => {
    // Check if consent already exists (returning user)
    if (document.cookie.includes("cookie-consent=")) {
      // Enable consented scripts for returning users
      enableConsentedScripts();
      return;
    }

    // New user - show banner
    setShowBanner(true);
  }, []);

  const handleAcceptAll = () => {
    const consent: CookieConsent = {
      necessary: true,
      functional: true,
      performance: true,
      targeting: true,
      timestamp: Date.now(),
    };

    // Save consent
    setCookie("cookie-consent", JSON.stringify(consent), { expires: 365 });

    // Enable all consented scripts immediately
    enableConsentedScripts();

    // Dispatch custom event for cross-tab/component sync
    window.dispatchEvent(new Event("consent-changed"));

    startTransition(() => {
      setShowBanner(false);
    });
  };

  const handleRejectAll = () => {
    const consent: CookieConsent = {
      necessary: true,
      functional: false,
      performance: false,
      targeting: false,
      timestamp: Date.now(),
    };

    // Save minimal consent
    setCookie("cookie-consent", JSON.stringify(consent), { expires: 365 });

    // Enable only necessary scripts (if any)
    enableConsentedScripts();

    // Dispatch custom event
    window.dispatchEvent(new Event("consent-changed"));

    startTransition(() => {
      setShowBanner(false);
    });
  };

  const handleOpenSettings = () => {
    startTransition(() => {
      setShowModal(true);
    });
  };

  return (
    <>
      <Modal
        isOpen={showBanner}
        onClose={() => setShowBanner(false)}
        closeButton={false}
        position="bottom"
        className="w-full max-w-none bg-transparent border-0 p-0 shadow-none outline-none focus:outline-none focus-visible:outline-none"
        overlayClass="bg-transparent pointer-events-none"
        allowScroll={true}
        ssr={false}
        ariaLabel="Cookie consent banner"
      >
        <div className="group text-left transition-all duration-300">
          <div className="w-full box-border rounded-2xl px-6 py-5 shadow-xl bg-primary text-light-primary ring-3 ring-inset ring-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 text-center md:text-left">
                <span className="text-3xl" role="img" aria-label="Cookie">
                  🍪
                </span>
                <p className="text-sm sm:text-base md:text-lg text-light-primary/90 leading-relaxed">
                  We use cookies to improve your browsing experience and for
                  marketing purposes.{" "}
                  <Button
                    variant="hoverUnderline"
                    onClick={handleOpenSettings}
                    type="button"
                    className="text-sm sm:text-base md:text-lg text-light-primary"
                  >
                    Manage preferences
                  </Button>
                </p>
              </div>

              <div className="flex flex-col md:flex-row w-full md:w-auto gap-3 items-stretch md:items-center md:justify-end md:ml-6">
                <Button
                  variant="secondary"
                  onClick={handleAcceptAll}
                  className="w-full md:w-auto"
                  type="button"
                  size="md"
                  disabled={isPending}
                  leftIcon={ArrowIcon({ hoverOnly: false, position: "left" })}
                >
                  Accept All
                </Button>
                <Button
                  variant="underline"
                  onClick={handleRejectAll}
                  className="w-full md:w-auto text-light-primary text-center"
                  type="button"
                  size="md"
                  disabled={isPending}
                >
                  Decline Cookies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {showModal && (
        <Suspense fallback={null}>
          <CookiePreferencesModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        </Suspense>
      )}
    </>
  );
}
