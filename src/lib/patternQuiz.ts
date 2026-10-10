export type PatternQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  why: string;
};

export const PATTERN_QUESTIONS: PatternQuestion[] = [
  {
    prompt: "In US terms, what is sc?",
    options: ["The short, dense stitch", "The tall stitch UK patterns call a treble", "A slip stitch"],
    answer: 0,
    why: "US single crochet is the short stitch. A UK pattern calls that same stitch a double crochet.",
  },
  {
    prompt: "A row ends with (10 sc). What does that mean?",
    options: ["Make 10 more single crochets", "You should have 10 finished single crochets", "Chain 10"],
    answer: 1,
    why: "The number in parentheses is a checkpoint. It is not another instruction to work.",
  },
  {
    prompt:
      "Chain 11. Single crochet in the second chain from the hook and in each chain across. How many single crochets?",
    options: ["11", "10", "9"],
    answer: 1,
    why: "Eleven chains, skip the one nearest the hook. 11 minus 1 is 10. The loop on the hook is not an extra stitch.",
  },
  {
    prompt:
      "[sc in next st, 2 sc in next st] 3 times uses how many old stitches, and makes how many new ones?",
    options: ["Uses 6 and makes 9", "Uses 9 and makes 6", "Uses 3 and makes 3"],
    answer: 0,
    why: "Each repeat uses 2 old stitches and makes 3. Three repeats use 6 and make 9.",
  },
  {
    prompt: "On the single-crochet practice rows on this site, does the chain-1 count as a stitch?",
    options: ["No. It is only height.", "Yes. Always, in every pattern.", "Only on the first row."],
    answer: 0,
    why: "For those practice rows the chain-1 does not count. Another designer's pattern may say its turning chain does. Read that note.",
  },
];

export function explainAnswer(question: PatternQuestion, chosen: number | null): string {
  if (chosen === null || !Number.isInteger(chosen)) return "Choose an answer first.";
  const correct = chosen === question.answer;
  return `${correct ? "That matches." : "Not this one."} ${question.why}`;
}

export function scoreQuiz(answers: Array<number | null>): {
  answered: number;
  correct: number;
  complete: boolean;
  text: string;
} {
  let answered = 0;
  let correct = 0;
  PATTERN_QUESTIONS.forEach((question, index) => {
    const chosen = answers[index];
    if (chosen === null || chosen === undefined) return;
    answered += 1;
    if (chosen === question.answer) correct += 1;
  });
  const complete = answered === PATTERN_QUESTIONS.length;
  return {
    answered,
    correct,
    complete,
    text: complete
      ? `${correct} of ${PATTERN_QUESTIONS.length} match. The note under each question is the reason.`
      : `Answer every question first. ${answered} of ${PATTERN_QUESTIONS.length} are marked.`,
  };
}
