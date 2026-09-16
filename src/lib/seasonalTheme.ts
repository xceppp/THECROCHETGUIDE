import { HALLOWEEN_THEME } from "../config";

/**
 * Whether the Halloween skin is active for this request.
 * `force` overrides the date window so you can preview or kill the theme
 * without waiting for the calendar.
 */
export function isHalloweenThemeActive(now = new Date()): boolean {
  const { force, start, end } = HALLOWEEN_THEME;

  if (force === true) return true;
  if (force === false) return false;

  const y = now.getFullYear();
  const startDate = new Date(y, start.month - 1, start.day, 0, 0, 0, 0);
  let endDate = new Date(y, end.month - 1, end.day, 23, 59, 59, 999);

  // Window can span the year boundary (e.g. Dec 15 – Jan 5). Ours does not,
  // but keep the math honest if the config is ever reused that way.
  if (endDate < startDate) {
    endDate = new Date(y + 1, end.month - 1, end.day, 23, 59, 59, 999);
  }

  return now >= startDate && now <= endDate;
}
