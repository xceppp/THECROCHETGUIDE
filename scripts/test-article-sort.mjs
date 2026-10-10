import assert from "node:assert/strict";
import {
  articleMatchesQuery,
  parseArticleSort,
  sortArticles,
} from "../src/lib/articleSort.ts";

const items = [
  { slug: "older", published: 10 },
  { slug: "newer", published: 30 },
  { slug: "middle", published: 20 },
];

assert.deepEqual(
  sortArticles(items, "newest", {}).map((item) => item.slug),
  ["newer", "middle", "older"],
);
assert.deepEqual(
  sortArticles(items, "oldest", {}).map((item) => item.slug),
  ["older", "middle", "newer"],
);
assert.deepEqual(
  sortArticles(items, "read", { older: 2, middle: 2, newer: 1 }).map((item) => item.slug),
  ["middle", "older", "newer"],
);
assert.deepEqual(
  sortArticles(items, "read", {}).map((item) => item.slug),
  ["newer", "middle", "older"],
);
assert.equal(parseArticleSort("nope"), "newest");
assert.equal(parseArticleSort("oldest"), "oldest");
assert.equal(articleMatchesQuery("How to crochet a stocking", "stocking"), true);
assert.equal(articleMatchesQuery("How to crochet a stocking", "tree skirt"), false);
assert.equal(articleMatchesQuery("How to crochet a stocking", ""), true);

console.log("article sort ok");
