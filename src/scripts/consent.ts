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
    /** Set when Google's European or US state message will be shown. */
    __ceGoogleCmp?: boolean;
    /** eu: European opt-in message. us: state privacy applies, separate from opt-out. */
    __ceGoogleCmpKind?: "eu" | "us";
    __ceCmpOutcome?: "google" | "site" | "unavailable";
    /** True after this page has pushed its own Consent Mode update. */
    __ceSiteConsentApplied?: boolean;
    __ceCmpPromise?: Promise<"google" | "site" | "unavailable">;
    __gpp?: (command: string, callback: (data: unknown, success: boolean) => void) => void;
    googlefc?: {
      callbackQueue?: Array<Record<string, () => void>>;
      showRevocationMessage?: () => void;
      controlledMessagingFunction?: (message: {
        proceed: (allow: boolean) => void;
      }) => void;
      usstatesoptout?: {
        getInitialUsStatesOptOutStatus?: () => number;
        InitialUsStatesOptOutStatusEnum?: { DOES_NOT_APPLY: number };
        openConfirmationDialog?: (callback: (optedOut: boolean) => void) => void;
      };
    };
  }
}

const CMP_ABSENT_MS = 8000;
const CMP_ANSWER_MS = 8000;
const CMP_NEGATIVE_GRACE_MS = 1500;

function allowGoogleMessage(message: { proceed?: (allow: boolean) => void } | (() => void)): void {
  window.__ceGoogleCmp = true;
  if (typeof message === "function") {
    message();
    return;
  }
  message?.proceed?.(true);
}

export type CmpOutcome = "google" | "site" | "unavailable";

/**
 * US state status: DOES_NOT_APPLY means the rules do not cover this visitor.
 * Any other reported status means they apply, whether or not the visitor has
 * opted out. Opt-out is Google's signal to record, not a reason to hide its message.
 */
export function usRegulationApplies(
  status: number | undefined,
  doesNotApply: number | undefined,
): boolean | null {
  if (typeof status !== "number" || typeof doesNotApply !== "number") return null;
  return status !== doesNotApply;
}

export function googleCmpHasPriority(): boolean {
  return window.__ceGoogleCmp === true;
}

const claimListeners = new Set<() => void>();

export function onGoogleCmpClaimed(listener: () => void): void {
  claimListeners.add(listener);
  if (googleCmpHasPriority()) listener();
}

function claimGoogle(kind?: "eu" | "us"): void {
  releaseSiteConsentToGoogle();
  window.__ceGoogleCmp = true;
  window.__ceCmpOutcome = "google";
  if (kind === "eu") window.__ceGoogleCmpKind = "eu";
  else if (kind === "us" && window.__ceGoogleCmpKind !== "eu") window.__ceGoogleCmpKind = "us";
  for (const listener of claimListeners) listener();
}

function noteSiteConsentWrite(): void {
  window.__ceSiteConsentApplied = true;
}

/** Drop a site consent write so a late Google message starts from the default deny. */
function releaseSiteConsentToGoogle(): void {
  if (!window.__ceSiteConsentApplied) return;
  window.__ceSiteConsentApplied = false;
  ensureGtag();
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
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
  if (googleCmpHasPriority()) return;
  ensureGtag();
  window.gtag?.("consent", "update", {
    ad_user_data: "granted",
    ad_personalization: "granted",
    ad_storage: "granted",
    analytics_storage: "granted",
  });
  noteSiteConsentWrite();
}

/** Reject non-essential cookies. Denies every Consent Mode signal. */
export function allConsentDenied(): void {
  if (googleCmpHasPriority()) return;
  ensureGtag();
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  noteSiteConsentWrite();
}

/**
 * "google" when the European opt-in or a US state privacy message applies.
 * "site" when both signals say those messages do not apply.
 * "unavailable" only after CMP_ABSENT_MS with no answer. That timeout does not
 * grant or deny storage; a later Google signal can still claim the page.
 */
export function whenGoogleCmpKnown(): Promise<CmpOutcome> {
  if (googleCmpHasPriority()) return Promise.resolve("google");
  if (window.__ceCmpOutcome) return Promise.resolve(window.__ceCmpOutcome);
  if (!window.__ceCmpPromise) window.__ceCmpPromise = watchGoogleCmp();
  return window.__ceCmpPromise;
}

function watchGoogleCmp(): Promise<CmpOutcome> {
  return new Promise((resolve) => {
    let settled = false;
    let pingStarted = false;
    let euApplies: boolean | null = null;
    let usApplies: boolean | null = null;
    let negativeGrace: number | undefined;
    const finish = (outcome: CmpOutcome) => {
      if (settled) return;
      settled = true;
      if (negativeGrace !== undefined) window.clearTimeout(negativeGrace);
      if (outcome === "google") claimGoogle(window.__ceGoogleCmpKind);
      else window.__ceCmpOutcome = outcome;
      resolve(outcome);
    };

    const consider = () => {
      if (settled) return;
      if (googleCmpHasPriority() || euApplies === true || usApplies === true) {
        finish("google");
        return;
      }
      if (euApplies === false && usApplies === false && negativeGrace === undefined) {
        negativeGrace = window.setTimeout(
          () => finish(googleCmpHasPriority() ? "google" : "site"),
          CMP_NEGATIVE_GRACE_MS,
        );
      }
    };

    const ping = () => {
      if (googleCmpHasPriority()) {
        finish("google");
        return true;
      }
      const api = window.__tcfapi;
      if (typeof api !== "function") return false;
      if (pingStarted) return true;
      pingStarted = true;
      api("ping", 2, (data) => {
        euApplies = data?.gdprApplies === true;
        if (euApplies) claimGoogle("eu");
        consider();
      });
      window.setTimeout(() => {
        if (settled) return;
        if (googleCmpHasPriority() || euApplies === true || usApplies === true) finish("google");
        else if (euApplies === false && usApplies === false) return;
        else finish("unavailable");
      }, CMP_ANSWER_MS);
      return true;
    };

    const readUsState = () => {
      const us = window.googlefc?.usstatesoptout;
      const applicable = usRegulationApplies(
        us?.getInitialUsStatesOptOutStatus?.(),
        us?.InitialUsStatesOptOutStatusEnum?.DOES_NOT_APPLY,
      );
      if (applicable === null) return;
      usApplies = applicable;
      if (applicable) claimGoogle("us");
      consider();
    };

    window.googlefc = window.googlefc || {};
    const previous = window.googlefc.controlledMessagingFunction;
    window.googlefc.controlledMessagingFunction = (message) => {
      if (usApplies === true) claimGoogle("us");
      else if (euApplies === true) claimGoogle("eu");
      else claimGoogle(window.__ceGoogleCmpKind);
      finish("google");
      if (typeof previous === "function") previous(message);
      else allowGoogleMessage(message);
    };
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.googlefc.callbackQueue.push({
      CONSENT_API_READY: () => {
        ping();
      },
      CONSENT_DATA_READY: () => {
        ping();
      },
      INITIAL_US_STATES_OPT_OUT_DATA_READY: () => {
        readUsState();
      },
    });

    if (googleCmpHasPriority()) {
      finish("google");
      return;
    }
    ping();
    readUsState();

    window.setTimeout(() => {
      if (settled || googleCmpHasPriority()) return;
      if (ping()) return;
      finish("unavailable");
    }, CMP_ABSENT_MS);
  });
}

/** Saved site consent is applied only after Google reports both messages do not apply. */
export function shouldApplySavedConsent(
  outcome: CmpOutcome,
  saved: ConsentState | null,
  forceOpen = false,
): boolean {
  if (forceOpen || googleCmpHasPriority() || outcome !== "site") return false;
  return Boolean(saved?.decided);
}

/** What the site banner should do once Google's CMP has answered. */
export function consentUiAction(
  googleOwns: boolean,
  saved: ConsentState | null,
  forceOpen = false,
): "google" | "apply-saved" | "show" {
  if (googleOwns || googleCmpHasPriority()) return "google";
  if (saved?.decided && !forceOpen) return "apply-saved";
  return "show";
}

/**
 * European visitors get Google's EU revocation message.
 * US state visitors get the opt-out confirmation dialog.
 * Switzerland uses the European message, so it follows the EU path.
 */
export function reopenGoogleConsent(): void {
  if (window.__ceGoogleCmpKind === "us") {
    window.googlefc?.usstatesoptout?.openConfirmationDialog?.(() => {});
    return;
  }
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
  if (googleCmpHasPriority()) return;
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
      noteSiteConsentWrite();
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
