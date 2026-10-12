/**
 * Lightweight SEO helpers for article JSON-LD. Keep parsing conservative —
 * bad structured data is worse than missing structured data.
 */

export type FaqItem = { question: string; answer: string };
export type HowToStep = { name: string; text: string };

/** Pull Q&A pairs from a "## Frequently asked" section. */
export function extractFaqItems(body: string | undefined): FaqItem[] {
  if (!body) return [];

  const section = body.match(
    /##\s+Frequently asked\s*\n([\s\S]*?)(?=\n##\s+[^#]|$)/i,
  );
  if (!section) return [];

  const chunk = section[1];
  const items: FaqItem[] = [];
  const questionRe =
    /(?:###\s+(.+)|^\*\*([^*]+)\*\*)\s*\n?([\s\S]*?)(?=\n###\s+|\n\*\*[^*]+\*\*|\n##\s+|$)/gm;
  let match: RegExpExecArray | null;

  while ((match = questionRe.exec(chunk)) !== null) {
    const question = cleanInline(match[1] || match[2] || "");
    const answer = cleanBlock(match[3] || "");
    if (question && answer) items.push({ question, answer });
  }

  return items;
}

/** Pull "## Step N" or "### Step N" blocks for HowTo schema. */
export function extractHowToSteps(body: string | undefined): HowToStep[] {
  if (!body) return [];

  const steps: HowToStep[] = [];
  const stepRe =
    /^#{2,3}\s+((?:Step|Stage)\s+\d+[^\n]*)\n([\s\S]*?)(?=\n#{2,3}\s+|$)/gim;
  let match: RegExpExecArray | null;

  while ((match = stepRe.exec(body)) !== null) {
    const name = cleanInline(match[1]);
    const text = cleanBlock(match[2]);
    if (name && text) steps.push({ name, text });
  }

  return steps;
}

export function faqPageSchema(items: FaqItem[]) {
  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function cleanInline(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanBlock(value: string): string {
  return value
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<\/?[^>]+>/g, "")
    .replace(/^>\s?/gm, "")
    .replace(/^#+\s+/gm, "")
    .replace(/[*_`]/g, "")
    .replace(/\n{2,}/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 5000);
}
