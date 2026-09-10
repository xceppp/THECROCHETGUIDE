import { getCollection, type CollectionEntry } from "astro:content";
import { LEARNING_PATH } from "../config";

export type PathStep = {
  /** 1-based position across the whole path, not within the stage. */
  number: number;
  stage: string;
  post: CollectionEntry<"posts">;
};

export type PathStage = {
  stage: string;
  blurb: string;
  steps: PathStep[];
};

/**
 * Resolves the slug lists in LEARNING_PATH against the posts that actually
 * exist. A slug pointing at a missing or draft post is skipped rather than
 * throwing, so removing an article never breaks the build — but step numbers
 * stay contiguous, so the reader never sees a gap.
 */
async function resolve(): Promise<PathStage[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const bySlug = new Map(posts.map((post) => [post.id, post]));

  let counter = 0;
  const stages: PathStage[] = [];

  for (const group of LEARNING_PATH) {
    const steps: PathStep[] = [];
    for (const slug of group.slugs) {
      const post = bySlug.get(slug);
      if (!post) continue;
      counter += 1;
      steps.push({ number: counter, stage: group.stage, post });
    }
    if (steps.length > 0) {
      stages.push({ stage: group.stage, blurb: group.blurb, steps });
    }
  }

  return stages;
}

export async function getPathStages(): Promise<PathStage[]> {
  return resolve();
}

/** Every step in order, ignoring stage boundaries. */
export async function getPathSteps(): Promise<PathStep[]> {
  const stages = await resolve();
  return stages.flatMap((stage) => stage.steps);
}

export type StepPosition = {
  number: number;
  total: number;
  stage: string;
  previous: CollectionEntry<"posts"> | null;
  next: CollectionEntry<"posts"> | null;
};

/**
 * Where a given article sits in the path, or null if it is not part of it.
 */
export async function getStepPosition(
  slug: string,
): Promise<StepPosition | null> {
  const steps = await getPathSteps();
  const index = steps.findIndex((step) => step.post.id === slug);
  if (index === -1) return null;

  return {
    number: steps[index].number,
    total: steps.length,
    stage: steps[index].stage,
    previous: index > 0 ? steps[index - 1].post : null,
    next: index < steps.length - 1 ? steps[index + 1].post : null,
  };
}
