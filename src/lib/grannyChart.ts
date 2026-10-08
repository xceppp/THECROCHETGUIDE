/** Chart data for the classic granny written on the two variation pages. */

export const grannyRoundOne = {
  label: "Rnd 1",
  stitches: [
    "dc", "dc", "dc", "ch", "ch",
    "dc", "dc", "dc", "ch", "ch",
    "dc", "dc", "dc", "ch", "ch",
    "dc", "dc", "dc", "ch", "ch",
    "slst",
  ],
} as const;

export const grannyRoundTwo = {
  label: "Rnd 2",
  stitches: [
    "dc", "dc", "dc", "ch", "ch", "dc", "dc", "dc", "ch",
    "dc", "dc", "dc", "ch", "ch", "dc", "dc", "dc", "ch",
    "dc", "dc", "dc", "ch", "ch", "dc", "dc", "dc", "ch",
    "dc", "dc", "dc", "ch", "ch", "dc", "dc", "dc", "ch",
    "slst",
  ],
} as const;

/** Checked against the arrays above, not against a crocheted square. */
export const stitchCounts = {
  round1: { dc: 12, ch: 8, slst: 1, clusters: 4, corners: 4 },
  round2: { dc: 24, ch: 12, slst: 1, cornerGroups: 4 },
};
