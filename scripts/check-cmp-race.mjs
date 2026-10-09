import {
  allConsentGranted,
  applyConsent,
  reopenGoogleConsent,
  shouldApplySavedConsent,
  usRegulationApplies,
  whenGoogleCmpKnown,
} from "../src/scripts/consent.ts";

const saved = {
  version: 1,
  region: "us",
  decided: true,
  analytics: true,
  ads: true,
  personalizedAds: true,
  updatedAt: "2026-10-09T00:00:00.000Z",
};

function freshWindow() {
  globalThis.window = {
    __ceGoogleCmp: false,
    __tcfapi: undefined,
    googlefc: undefined,
    dataLayer: [],
    gtag: undefined,
    setTimeout: globalThis.setTimeout.bind(globalThis),
    clearTimeout: globalThis.clearTimeout.bind(globalThis),
  };
  globalThis.document = {
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    createElement() {
      return { setAttribute() {}, src: "", async: false };
    },
    head: { appendChild() {} },
  };
}

function consentUpdates() {
  return (window.dataLayer ?? []).filter(
    (entry) => Array.isArray(entry) && entry[0] === "consent" && entry[1] === "update",
  );
}

function assert(name, condition) {
  if (!condition) {
    console.error("FAIL " + name);
    process.exitCode = 1;
    return;
  }
  console.log("PASS " + name);
}

function setUs(status) {
  window.googlefc = window.googlefc || {};
  window.googlefc.usstatesoptout = {
    InitialUsStatesOptOutStatusEnum: { DOES_NOT_APPLY: 0 },
    getInitialUsStatesOptOutStatus: () => status,
  };
}

function flush(key) {
  const queue = window.googlefc?.callbackQueue ?? [];
  for (const item of queue) item[key]?.();
}

freshWindow();
const fastStart = Date.now();
window.__tcfapi = (_command, _version, callback) => {
  callback({ gdprApplies: true });
};
const fast = await whenGoogleCmpKnown();
assert(
  "US applicability is separate from opt-out state",
  usRegulationApplies(1, 0) === true &&
    usRegulationApplies(2, 0) === true &&
    usRegulationApplies(0, 0) === false &&
    usRegulationApplies(undefined, 0) === null,
);

assert(
  "fast European CMP keeps Google and ignores saved consent",
  fast === "google" &&
    Date.now() - fastStart < 500 &&
    shouldApplySavedConsent(fast, saved, false) === false,
);

freshWindow();
setUs(0);
window.__tcfapi = (_command, _version, callback) => {
  callback({ gdprApplies: false });
};
const neitherStart = Date.now();
const neither = await whenGoogleCmpKnown();
const neitherMs = Date.now() - neitherStart;
assert(
  "no European and no US-state message keeps the site banner",
  neither === "site" &&
    neitherMs >= 1400 &&
    neitherMs < 2500 &&
    shouldApplySavedConsent(neither, saved, false) === true &&
    shouldApplySavedConsent(neither, null, false) === false,
);

window.dataLayer = [];
applyConsent(saved, { adsenseClient: "ca-pub-test", gaId: "G-TEST" });
const applied = consentUpdates();
let siteLateProceeds = 0;
window.googlefc.controlledMessagingFunction({
  proceed(allow) {
    if (allow === true) siteLateProceeds += 1;
  },
});
const afterLateHook = consentUpdates();
const lastUpdate = afterLateHook[afterLateHook.length - 1];
allConsentGranted();
assert(
  "late Google message clears an already-applied site consent decision",
  applied.length === 1 &&
    applied[0][2].analytics_storage === "granted" &&
    siteLateProceeds === 1 &&
    afterLateHook.length === 2 &&
    lastUpdate[2].analytics_storage === "denied" &&
    lastUpdate[2].ad_storage === "denied" &&
    lastUpdate[2].ad_user_data === "denied" &&
    lastUpdate[2].ad_personalization === "denied" &&
    window.__ceGoogleCmp === true &&
    shouldApplySavedConsent(neither, saved, false) === false &&
    consentUpdates().length === 2,
);

freshWindow();
window.__tcfapi = (_command, _version, callback) => {
  setTimeout(() => callback({ gdprApplies: true }), 3000);
};
const delayedStart = Date.now();
const delayed = await whenGoogleCmpKnown();
const delayedMs = Date.now() - delayedStart;
assert(
  "European answer at 3s still wins over a 2s cutoff",
  delayed === "google" &&
    delayedMs >= 2800 &&
    delayedMs < 5000 &&
    shouldApplySavedConsent(delayed, saved, false) === false,
);

freshWindow();
const latePromise = whenGoogleCmpKnown();
setTimeout(() => {
  window.__tcfapi = (_command, _version, callback) => {
    callback({ gdprApplies: true });
  };
  flush("CONSENT_API_READY");
}, 2500);
const lateStart = Date.now();
const late = await latePromise;
const lateMs = Date.now() - lateStart;
assert(
  "European CMP that appears at 2.5s is not marked unavailable",
  late === "google" &&
    lateMs >= 2300 &&
    lateMs < 4500 &&
    shouldApplySavedConsent(late, saved, false) === false,
);

freshWindow();
let proceeds = 0;
window.googlefc = {
  callbackQueue: [],
  controlledMessagingFunction(message) {
    message.proceed(true);
    proceeds += 1;
  },
};
window.__tcfapi = (_command, _version, callback) => {
  callback({ gdprApplies: false });
};
setUs(0);
const messagePromise = whenGoogleCmpKnown();
setTimeout(() => {
  window.googlefc.controlledMessagingFunction({
    proceed() {},
  });
}, 400);
const messageOwned = await messagePromise;
assert(
  "message hook calls proceed(true) once and Google keeps priority",
  messageOwned === "google" &&
    proceeds === 1 &&
    shouldApplySavedConsent(messageOwned, saved, false) === false,
);

freshWindow();
window.__tcfapi = (_command, _version, callback) => {
  callback({ gdprApplies: false });
};
const usPromise = whenGoogleCmpKnown();
setTimeout(() => {
  setUs(1);
  flush("INITIAL_US_STATES_OPT_OUT_DATA_READY");
}, 3000);
const usStart = Date.now();
const usOwned = await usPromise;
const usMs = Date.now() - usStart;
assert(
  "delayed US state opt-out status gives Google priority",
  usOwned === "google" &&
    usMs >= 2800 &&
    usMs < 5000 &&
    window.__ceGoogleCmpKind === "us" &&
    shouldApplySavedConsent(usOwned, saved, false) === false,
);

freshWindow();
window.__tcfapi = (_command, _version, callback) => {
  callback({ gdprApplies: false });
};
setUs(2);
const optedOut = await whenGoogleCmpKnown();
window.dataLayer = [];
allConsentGranted();
applyConsent(saved, { adsenseClient: "ca-pub-test", gaId: "G-TEST" });
const optedUpdates = (window.dataLayer ?? []).filter(
  (entry) => Array.isArray(entry) && entry[0] === "consent" && entry[1] === "update",
);
assert(
  "US opted-out status is not overwritten by saved accept-all",
  optedOut === "google" && window.__ceGoogleCmpKind === "us" && optedUpdates.length === 0,
);

freshWindow();
const absentStart = Date.now();
const absent = await whenGoogleCmpKnown();
const absentMs = Date.now() - absentStart;
let lateProceeds = 0;
window.googlefc.controlledMessagingFunction({
  proceed(allow) {
    if (allow === true) lateProceeds += 1;
  },
});
window.dataLayer = [];
applyConsent(saved, { adsenseClient: "ca-pub-test", gaId: "G-TEST" });
const lateUpdates = (window.dataLayer ?? []).filter(
  (entry) => Array.isArray(entry) && entry[0] === "consent" && entry[1] === "update",
);
assert(
  "unavailable CMP does not write consent and a late message still wins",
  absent === "unavailable" &&
    absentMs >= 7500 &&
    absentMs < 9500 &&
    shouldApplySavedConsent(absent, saved, false) === false &&
    lateProceeds === 1 &&
    lateUpdates.length === 0,
);

freshWindow();
window.__ceGoogleCmpKind = "eu";
let euReopened = false;
let usReopened = false;
window.googlefc = {
  showRevocationMessage() {
    euReopened = true;
  },
  usstatesoptout: {
    openConfirmationDialog() {
      usReopened = true;
    },
  },
};
reopenGoogleConsent();
window.__ceGoogleCmpKind = "us";
reopenGoogleConsent();
assert(
  "cookie settings reopen the European or US Google interface",
  euReopened && usReopened,
);

freshWindow();
const googleUpdates = [];
window.gtag = (...args) => {
  googleUpdates.push(args);
};
window.__ceGoogleCmp = true;
window.dataLayer = [];
allConsentGranted();
applyConsent(saved, { adsenseClient: "ca-pub-test", gaId: "G-TEST" });
window.gtag("consent", "update", { analytics_storage: "granted" });
const bannerUpdates = (window.dataLayer ?? []).filter(
  (entry) => Array.isArray(entry) && entry[0] === "consent" && entry[1] === "update",
);
assert(
  "custom banner does not write over Google, and Google can still update consent",
  bannerUpdates.length === 0 &&
    googleUpdates.length === 1 &&
    googleUpdates[0][0] === "consent" &&
    googleUpdates[0][1] === "update",
);

if (process.exitCode) console.error("cmp checks failed");
else console.log("all cmp checks passed");
