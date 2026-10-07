/**
 * Publishing calendar for Crochet Explained.
 *
 * Celebration windows drive the site skin and homepage spotlight.
 * Observance days stay on the calendar with quiet copy — no festive chrome —
 * so the site never looks like it is dressing up a serious day.
 */

export type OccasionKind =
  | "celebration"
  | "international"
  | "religious"
  | "observance";

/** CSS body class suffix: `theme-${ThemeId}` when not `default`. */
export type ThemeId =
  | "default"
  | "teachers"
  | "food"
  | "halloween"
  | "all-saints"
  | "children"
  | "observance"
  | "christmas"
  | "newyear";

export type Occasion = {
  id: string;
  name: string;
  kind: OccasionKind;
  /** Month/day window, inclusive. May span the year boundary. */
  start: { month: number; day: number };
  end: { month: number; day: number };
  /** Peak date shown on the calendar strip. */
  peak: { month: number; day: number };
  theme: ThemeId;
  /** When two windows overlap, higher wins. */
  priority: number;
  /** Article tag to spotlight, if content exists. */
  contentTag?: string;
  eyebrow: string;
  headline: string;
  blurb: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** Short label for the homepage calendar list. */
  calendarNote: string;
};

/**
 * Ordered for display. Windows are tuned so the big craft seasons
 * (Halloween, Christmas, New Year) get the longest skins.
 */
export const OCCASIONS: Occasion[] = [
  {
    id: "teachers",
    name: "World Teachers’ Day",
    kind: "international",
    start: { month: 10, day: 1 },
    end: { month: 10, day: 8 },
    peak: { month: 10, day: 5 },
    theme: "teachers",
    priority: 40,
    eyebrow: "October 5",
    headline: "Teacher gifts, explained simply",
    blurb:
      "A small handmade piece beats a mug with a slogan. Start with a clean beginner project you can finish in a weekend.",
    primaryCta: { label: "Browse tutorials", href: "/tutorials/" },
    secondaryCta: { label: "Start the course", href: "/start-here/" },
    calendarNote: "Handmade thank-you projects",
  },
  {
    id: "food",
    name: "World Food Day",
    kind: "international",
    start: { month: 10, day: 12 },
    end: { month: 10, day: 19 },
    peak: { month: 10, day: 16 },
    theme: "food",
    priority: 40,
    eyebrow: "October 16",
    headline: "Kitchen crochet that earns its keep",
    blurb:
      "Dishcloths, coasters, and cotton yarn — the practical projects that teach tension without needing a costume palette.",
    primaryCta: { label: "Hooks and yarn", href: "/gear/" },
    secondaryCta: { label: "Basic stitches", href: "/basic-crochet-stitches/" },
    calendarNote: "Cotton projects for the kitchen",
  },
  {
    id: "halloween",
    name: "Halloween",
    kind: "celebration",
    start: { month: 10, day: 20 },
    end: { month: 11, day: 2 },
    peak: { month: 10, day: 31 },
    theme: "halloween",
    priority: 90,
    contentTag: "halloween",
    eyebrow: "Halloween season",
    headline: "Halloween crochet, explained slowly",
    blurb:
      "Start with the orange ghost card wallet — flap, button, tiny ghost — then pumpkins, bats, and spiders taught as real techniques.",
    primaryCta: {
      label: "Make the Halloween card wallet",
      href: "/halloween-crochet-card-wallet/",
    },
    secondaryCta: { label: "More Halloween tutorials", href: "/tutorials/" },
    calendarNote: "Seasonal amigurumi and colorwork",
  },
  {
    id: "all-saints",
    name: "All Saints’ Day",
    kind: "religious",
    start: { month: 11, day: 1 },
    end: { month: 11, day: 1 },
    peak: { month: 11, day: 1 },
    theme: "all-saints",
    priority: 50,
    eyebrow: "November 1",
    headline: "Quiet work for a quiet day",
    blurb:
      "A reserved palette and a simple motif. Good day for finishing ends and blocking, not for rushing a costume piece.",
    primaryCta: {
      label: "Finishing and blocking",
      href: "/weaving-in-ends-and-blocking/",
    },
    secondaryCta: { label: "Browse tutorials", href: "/tutorials/" },
    calendarNote: "Calm finishing day",
  },
  {
    id: "children",
    name: "World Children’s Day",
    kind: "international",
    start: { month: 11, day: 17 },
    end: { month: 11, day: 23 },
    peak: { month: 11, day: 20 },
    theme: "children",
    priority: 40,
    eyebrow: "November 20",
    headline: "Small projects for small hands to receive",
    blurb:
      "Soft shapes, safe finishes, and beginner amigurumi — make something a child can actually hold.",
    primaryCta: { label: "Browse tutorials", href: "/tutorials/" },
    secondaryCta: { label: "Start the course", href: "/start-here/" },
    calendarNote: "Soft beginner toys and gifts",
  },
  {
    id: "end-violence",
    name: "Day for the Elimination of Violence against Women",
    kind: "observance",
    start: { month: 11, day: 24 },
    end: { month: 11, day: 26 },
    peak: { month: 11, day: 25 },
    theme: "observance",
    priority: 30,
    eyebrow: "November 25",
    headline: "A quiet day on the calendar",
    blurb:
      "We keep the site in its normal voice today. If you are here to learn, the course is still open.",
    primaryCta: { label: "Start the course", href: "/start-here/" },
    secondaryCta: { label: "Browse tutorials", href: "/tutorials/" },
    calendarNote: "Observance — no seasonal skin",
  },
  {
    id: "aids",
    name: "World AIDS Day",
    kind: "observance",
    start: { month: 11, day: 30 },
    end: { month: 12, day: 1 },
    peak: { month: 12, day: 1 },
    theme: "observance",
    priority: 30,
    eyebrow: "December 1",
    headline: "A quiet day on the calendar",
    blurb:
      "No themed projects for this date. The charts and tutorials stay available as usual.",
    primaryCta: { label: "Jump to the charts", href: "/charts/" },
    secondaryCta: { label: "Start the course", href: "/start-here/" },
    calendarNote: "Observance — no seasonal skin",
  },
  {
    id: "disabilities",
    name: "International Day of Persons with Disabilities",
    kind: "observance",
    start: { month: 12, day: 2 },
    end: { month: 12, day: 4 },
    peak: { month: 12, day: 3 },
    theme: "observance",
    priority: 35,
    eyebrow: "December 3",
    headline: "Crochet that fits more hands",
    blurb:
      "Left-handed guidance, clearer abbreviations, and honest notes about hand strain — the accessibility work is in the writing, not in a costume palette.",
    primaryCta: { label: "Left-handed crochet", href: "/left-handed-crochet/" },
    secondaryCta: { label: "Hooks and yarn", href: "/gear/" },
    calendarNote: "Clearer instructions, better tools",
  },
  {
    id: "human-rights",
    name: "Human Rights Day",
    kind: "observance",
    start: { month: 12, day: 9 },
    end: { month: 12, day: 11 },
    peak: { month: 12, day: 10 },
    theme: "observance",
    priority: 30,
    eyebrow: "December 10",
    headline: "A quiet day on the calendar",
    blurb:
      "The site stays in its normal layout. Free tutorials remain free — that is the only point we make today.",
    primaryCta: { label: "Free patterns", href: "/free-patterns/" },
    secondaryCta: { label: "Start the course", href: "/start-here/" },
    calendarNote: "Observance — no seasonal skin",
  },
  {
    id: "christmas",
    name: "Christmas Day",
    kind: "celebration",
    // Open early: Pinterest Christmas crochet peaks weeks before Dec 25.
    start: { month: 11, day: 15 },
    end: { month: 12, day: 26 },
    peak: { month: 12, day: 25 },
    theme: "christmas",
    priority: 90,
    contentTag: "christmas",
    eyebrow: "Christmas season",
    headline: "Christmas crochet, explained slowly",
    blurb:
      "Start with a flat snowflake, then trees, gnomes, and Santa — with the stiffening and yarn choices that decide whether the piece looks finished.",
    primaryCta: {
      label: "Crochet a snowflake",
      href: "/how-to-crochet-a-snowflake/",
    },
    secondaryCta: {
      label: "More Christmas tutorials",
      href: "/tutorials/",
    },
    calendarNote: "Ornaments, gnomes, and trees",
  },
  {
    id: "newyear",
    name: "New Year’s Day",
    kind: "celebration",
    start: { month: 12, day: 27 },
    end: { month: 1, day: 3 },
    peak: { month: 1, day: 1 },
    theme: "newyear",
    priority: 80,
    eyebrow: "New Year",
    headline: "Start the year with stitches that stick",
    blurb:
      "A clean reset: the course from yarn choice to gauge, so January projects actually fit.",
    primaryCta: { label: "Start the course", href: "/start-here/" },
    secondaryCta: { label: "Crochet gauge", href: "/crochet-gauge/" },
    calendarNote: "Course reset and gauge",
  },
];

function windowBounds(
  startYear: number,
  start: { month: number; day: number },
  end: { month: number; day: number },
): { startDate: Date; endDate: Date } {
  const startDate = new Date(startYear, start.month - 1, start.day, 0, 0, 0, 0);
  let endDate = new Date(startYear, end.month - 1, end.day, 23, 59, 59, 999);
  if (endDate < startDate) {
    endDate = new Date(startYear + 1, end.month - 1, end.day, 23, 59, 59, 999);
  }
  return { startDate, endDate };
}

/** Year in which this occasion's window starts for the season containing `now`. */
function startYearFor(now: Date, occasion: Occasion): number {
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();

  // New Year window: Dec 27 – Jan 3. In early January, the window started last year.
  if (occasion.start.month > occasion.end.month) {
    return m === 1 && d <= occasion.end.day ? y - 1 : y;
  }

  // In early January, autumn dates belong to the season that just ended.
  if (m === 1 && d <= 3 && occasion.start.month >= 10) {
    return y - 1;
  }

  return y;
}

function inWindow(now: Date, occasion: Occasion): boolean {
  const { startDate, endDate } = windowBounds(
    startYearFor(now, occasion),
    occasion.start,
    occasion.end,
  );
  return now >= startDate && now <= endDate;
}

export function getActiveOccasion(now = new Date()): Occasion | null {
  const hits = OCCASIONS.filter((o) => inWindow(now, o));
  if (hits.length === 0) return null;
  return hits.reduce((best, o) => (o.priority > best.priority ? o : best));
}

export type CalendarEntry = {
  occasion: Occasion;
  peakDate: Date;
  status: "active" | "upcoming" | "past";
};

/**
 * Occasions for the current publishing season (autumn through New Year),
 * with past entries dropped so the homepage stays forward-looking.
 */
export function getSeasonCalendar(now = new Date()): CalendarEntry[] {
  return OCCASIONS.map((occasion) => {
    const startYear = startYearFor(now, occasion);
    const { startDate, endDate } = windowBounds(
      startYear,
      occasion.start,
      occasion.end,
    );
    const peakDate = new Date(
      occasion.peak.month === 1 && occasion.start.month === 12
        ? startYear + 1
        : startYear,
      occasion.peak.month - 1,
      occasion.peak.day,
      12,
      0,
      0,
      0,
    );

    let status: CalendarEntry["status"] = "upcoming";
    if (now >= startDate && now <= endDate) status = "active";
    else if (now > endDate) status = "past";

    return { occasion, peakDate, status };
  })
    .filter((entry) => entry.status !== "past")
    .sort((a, b) => a.peakDate.getTime() - b.peakDate.getTime());
}

export function formatPeakDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
