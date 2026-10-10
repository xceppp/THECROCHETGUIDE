/** US single crochet into a chain, starting in the second chain. */
export function singleCrochetFromChain(chains: number): number {
  return chains - 1;
}

/** One repeat uses `oldPer` existing stitches and makes `newPer` stitches. */
export function repeatTotals(oldPer: number, newPer: number, times: number): {
  oldStitches: number;
  newStitches: number;
} {
  return { oldStitches: oldPer * times, newStitches: newPer * times };
}

export function changeCount(count: number, action: "up" | "down" | "reset"): number {
  const safe = Number.isInteger(count) && count > 0 ? count : 0;
  if (action === "reset") return 0;
  if (action === "down") return Math.max(0, safe - 1);
  return safe + 1;
}
