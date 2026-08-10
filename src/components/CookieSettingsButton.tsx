"use client";

import { openCookieSettings } from "@/components/GoogleAnalytics";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-xs text-[#7a5e4a] underline-offset-4 transition-colors hover:text-[#3D3027] hover:underline"
    >
      Cookie settings
    </button>
  );
}
