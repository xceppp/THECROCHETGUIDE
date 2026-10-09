/**
 * Cookie / advertising consent for a static site.
 * EU/UK/EEA: opt-in before analytics or ads load.
 * US: notice + “do not sell or share” turns off personalized ads.
 */

export type ConsentRegion = "eu" | "us";

export type ConsentState = {
  version: number;
  region: ConsentRegion;
  decided: boolean;
  analytics: boolean;
  ads: boolean;
  personalizedAds: boolean;
  updatedAt: string;
};

export const CONSENT_KEY = "ce-consent";
export const CONSENT_VERSION = 1;

const US_TZ =
  /^(America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Adak|Boise|Detroit|Houston|Indianapolis|Juneau|Kentucky|Louisville|Menominee|Metlakatla|Nome|North_Dakota|Sitka|Yakutat|Puerto_Rico)|Pacific\/Honolulu)$/;

declare global {
  interface Window {
    dataLayer: unknown[];
    adsbygoogle: unknown[];
    ceOpenConsent?: () => void;
    ceGetConsent?: () => ConsentState | null;
    gtag?: (...args: unknown[]) => void;
    allConsentGranted?: () => void;
    allConsentDenied?: () => void;
    __tcfapi?: (
      command: string,
      version: number,
      callback: (data: { gdprApplies?: boolean }) => void,
    ) => void;
    googlefc?: {
      callbackQueue?: Array<Record<string, () => void>>;
      showRevocationMessage?: () => void;
    };
  }
}

function ensureGtag(): void {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
}

/** Accept all on the cookie banner. Grants every Consent Mode signal. */
export function allConsentGranted(): void {
  ensureGtag();
  window.gtag?.("consent", "update", {
    ad_user_data: "granted",
    ad_personalization: "granted",
    ad_storage: "granted",
    analytics_storage: "granted",
  });
}

/** Reject non-essential cookies. Denies every Consent Mode signal. */
export function allConsentDenied(): void {
  ensureGtag();
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

/**
 * Google's certified CMP sets gdprApplies from the visitor's location.
 * Returns true only when that signal says the European message applies.
 * If the message script is missing, resolves false so the site banner stays up.
 */
export function whenGoogleCmpKnown(timeoutMs = 2000): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (value: boolean) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    const ping = () => {
      const api = window.__tcfapi;
      if (typeof api !== "function") return false;
      api("ping", 2, (data) => finish(data?.gdprApplies === true));
      return true;
    };

    window.setTimeout(() => finish(false), timeoutMs);
    if (ping()) return;

    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.googlefc.callbackQueue.push({
      CONSENT_DATA_READY: () => {
        if (!ping()) finish(false);
      },
    });
  });
}

/** Reopens Google's European regulations message. No effect until that message is loaded. */
export function reopenGoogleConsent(): void {
  window.googlefc?.showRevocationMessage?.();
}

export function detectRegion(): ConsentRegion {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (US_TZ.test(tz)) return "us";
    if (tz.startsWith("Europe/") || tz === "Atlantic/Reykjavik") return "eu";
  } catch {
    /* ignore */
  }

  const langs = [
    ...(navigator.languages ?? []),
    navigator.language,
  ].filter(Boolean);

  for (const lang of langs) {
    const l = lang.toLowerCase();
    if (l === "en-us" || l.startsWith("en-us")) return "us";
    if (
      /^(en-gb|en-ie|fr|de|es|it|nl|pl|pt|sv|da|fi|cs|ro|hu|el|bg|hr|sk|sl|lt|lv|et|ga|mt|nb|nn|is)/.test(
        l,
      )
    ) {
      return "eu";
    }
  }

  // Safer default: require opt-in.
  return "eu";
}

export function defaultState(region: ConsentRegion): ConsentState {
  return {
    version: CONSENT_VERSION,
    region,
    decided: false,
    analytics: false,
    ads: false,
    personalizedAds: false,
    updatedAt: new Date().toISOString(),
  };
}

export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (!parsed || parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(state: ConsentState): void {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
}

export function acceptAll(region: ConsentRegion): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    region,
    decided: true,
    analytics: true,
    ads: true,
    personalizedAds: true,
    updatedAt: new Date().toISOString(),
  };
  writeConsent(state);
  return state;
}

export function rejectNonEssential(region: ConsentRegion): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    region,
    decided: true,
    analytics: false,
    ads: false,
    personalizedAds: false,
    updatedAt: new Date().toISOString(),
  };
  writeConsent(state);
  return state;
}

/** US “Do Not Sell or Share” — ads may still show non-personalized. */
export function usOptOutSale(region: ConsentRegion = "us"): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    region,
    decided: true,
    analytics: true,
    ads: true,
    personalizedAds: false,
    updatedAt: new Date().toISOString(),
  };
  writeConsent(state);
  return state;
}

function loadScript(src: string, attrs: Record<string, string> = {}): void {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const el = document.createElement("script");
  el.src = src;
  el.async = true;
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  document.head.appendChild(el);
}

export function applyConsent(
  state: ConsentState,
  options: { adsenseClient: string; gaId: string },
): void {
  const fullGrant = state.analytics && state.ads && state.personalizedAds;
  const fullDeny = !state.analytics && !state.ads && !state.personalizedAds;
  if (fullGrant) allConsentGranted();
  else if (fullDeny) allConsentDenied();

  if (state.analytics && options.gaId) {
    loadScript(
      `https://www.googletagmanager.com/gtag/js?id=${options.gaId}`,
    );
    ensureGtag();
    window.gtag?.("js", new Date());
    if (!fullGrant) {
      window.gtag?.("consent", "update", {
        ad_user_data: state.personalizedAds ? "granted" : "denied",
        ad_personalization: state.personalizedAds ? "granted" : "denied",
        ad_storage: state.ads ? "granted" : "denied",
        analytics_storage: "granted",
      });
    }
    window.gtag?.("config", options.gaId, {
      anonymize_ip: true,
    });
  }

  if (state.ads && options.adsenseClient) {
    type AdsByGoogle = unknown[] & { requestNonPersonalizedAds?: number };
    const adsQueue = (window.adsbygoogle || []) as AdsByGoogle;
    window.adsbygoogle = adsQueue;
    if (!state.personalizedAds) {
      adsQueue.requestNonPersonalizedAds = 1;
    }

    loadScript(
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${options.adsenseClient}`,
      { crossorigin: "anonymous" },
    );

    document.querySelectorAll("ins.adsbygoogle").forEach((node) => {
      if (node.getAttribute("data-adsbygoogle-status")) return;
      try {
        adsQueue.push({});
      } catch {
        /* ignore duplicate pushes */
      }
    });
  }
}
