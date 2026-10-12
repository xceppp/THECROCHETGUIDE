# Crochet Explained — revised article package

This is a first technical and instructional revision pass over the **64 published articles** in the uploaded working-tree export. All 64 source files were changed. The 10 drafts are preserved separately and were not audited or rewritten. No website was deployed.

The original export reported commit a4adb8ee7adb2060fbe81d114ea2d56c60d5373f with uncommitted working-tree changes. These revisions are based on those uploaded files, not on a clean checkout or a later production snapshot.

## What is included

- `src/content/posts/`: all 64 revised published Markdown files, preserving filenames, titles, publication dates, and slugs.
- `src/assets/`: the supplied article assets, unchanged.
- `public/`: supplied public assets plus six new construction diagrams and corrections to selected older diagrams.
- `reports/ARTICLE_AUDIT.csv`: a record for every revised article, with change descriptions and original/revised SHA-256 hashes.
- `reports/ALL_REVISED_ARTICLES.md`: a readable compilation of the revised bodies.
- `reports/AUDIT_REPORT.md`: findings, remaining limitations, and recommended physical testing.
- `reports/ARITHMETIC_CHECKS.json` and `VALIDATION.json`: actual checks performed, without claims of complete mathematical or physical validation.
- `DRAFTS_UNCHANGED/`: the original ten drafts outside the replacement published-post directory.

## Apply to the existing repository

1. Compare the current repository files against the original hashes in the audit CSV. The export included uncommitted edits; if files have changed since export, merge deliberately rather than overwrite newer work.
2. Copy or merge `src/content/posts/`, `src/assets/`, and `public/` into the existing project. Do not replace unrelated repository files or delete assets that other pages use. The package is a content overlay, not a complete Astro application.
3. Keep the original content schema, author configuration, components, routing, homepage configuration, and deployment settings unless an actual integration issue requires a change.
4. Run the repository's normal build and check the revised pages in the real template, especially image captions, progress tracking, and table rendering. The original template adds its own sample/illustration disclosure to some patterns; check for duplicate wording.
5. Review the remaining image and sample issues in the audit report before promoting a page as a physically tested pattern. No title, caption, or marketing claim should say “tested” based only on this package.

The ten drafts do not become published as a side effect of applying this overlay. Their directory is archival only.

## Verification completed

64 revised files have valid YAML frontmatter and preserve their title and publication date. All referenced local assets resolve. All 180 SVG files parse as XML. Six new diagrams were rendered and visually inspected. Thirty-three explicit arithmetic checks passed. These checks cover selected increase/decrease families and revised critical counts; they do **not** prove every line or variation works in yarn.

A full site build could not be run because the supplied export does not contain the complete application, dependencies, and project files. No finished object was crocheted, washed, fitted, or load-tested during this revision. Original concept photos were sampled visually; a complete photo-to-pattern review is still pending.
