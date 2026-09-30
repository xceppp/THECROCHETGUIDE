import { OCCASION_THEME_FORCE } from "../config";
import {
  getActiveOccasion,
  OCCASIONS,
  type Occasion,
  type ThemeId,
} from "./occasions";

/**
 * Resolves which occasion (if any) owns the current request.
 * `OCCASION_THEME_FORCE` in config overrides the calendar for previews.
 */
export function resolveSeasonalOccasion(now = new Date()): Occasion | null {
  if (OCCASION_THEME_FORCE === false) return null;

  if (typeof OCCASION_THEME_FORCE === "string") {
    return OCCASIONS.find((o) => o.id === OCCASION_THEME_FORCE) ?? null;
  }

  return getActiveOccasion(now);
}

export function getThemeId(now = new Date()): ThemeId {
  return resolveSeasonalOccasion(now)?.theme ?? "default";
}

/** Body class for the active skin, or empty string for the default palette. */
export function getThemeClass(now = new Date()): string {
  const theme = getThemeId(now);
  return theme === "default" ? "" : `theme-${theme}`;
}

/** @deprecated Prefer resolveSeasonalOccasion / getThemeId. */
export function isHalloweenThemeActive(now = new Date()): boolean {
  return getThemeId(now) === "halloween";
}
