"use client";

import { openCookieSettings } from "@/components/GoogleAnalytics";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-xs text-[#C7BFB4] underline-offset-4 transition-colors hover:text-[#E8833A] hover:underline"
    >
      Cookie settings
    </button>
  );
}
