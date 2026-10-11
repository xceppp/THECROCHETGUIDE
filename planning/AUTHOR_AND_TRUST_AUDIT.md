# Author and trust audit

Date: 2026-10-11. Scope: every public page that names a person, describes who
runs the site, or says what has been tested.

## Owner decisions this audit follows

| Question | Owner answer | Where it is applied |
| --- | --- | --- |
| Public name | M. Amine | `SITE.author.name` in `src/config.ts` |
| Does the publisher crochet the samples? | No. Describe him as publisher and editor who checks instructions, not a maker. | Author page, About, author box, disclosures |
| Publication dates | Use first-commit dates. The earlier site was public. | `planning/PUBLICATION_DATE_AUDIT.csv` |
| Contact email | Answer given was `crochetexplained.com`, which is a domain, not an address | **Unresolved.** See below. |

Not confirmed, so not published: a pronoun, a photo, a location, a crochet
history, a motive for starting the site, any qualification.

## Changes made

| Page or component | Before | After |
| --- | --- | --- |
| `src/config.ts` | Crochet Explained Editorial Team | `M. Amine`, role "Publisher and editor", `url: /author/amine/`, a bio that only states what he does |
| `/author/amine/` (new) | none | ProfilePage + Person schema, monogram instead of a photo, what he does, what he does not claim, how to report an error, every published article by category |
| `/about/` | Third-person team voice | First person. What the site teaches, how instructions are checked, what has and has not been tested, publishing history, what the site will not do, how it earns money |
| Article byline | Team name | "Published by M. Amine" linking to the profile, with published and updated dates |
| Author box | Generic | Links to the profile and shows the role. Links read "How pages are checked" and "Found an error? Report it" |
| BlogPosting JSON-LD | Organization as author | Person (`M. Amine`, jobTitle, profile URL). Publisher stays the Organization |
| `/disclosures/` | No publisher section | Adds "Who publishes this site, and what is tested" |
| `/contact/` | Team voice | First person ("reach me, M. Amine") |
| `/privacy-us/`, `/privacy-eu/` | No named publisher | "It is published by M. Amine." Local storage list now includes project-step ticks |
| Footer | none | "Published and edited by M. Amine" |
| `AGENTS.md` | Editorial Team status | Owner constraints: no maker claims, no pronoun, no fictional byline |

## Checks run

- Searched `src/` for the old fictional byline, "Editorial Team", "certified",
  "years of experience", "our team", and first-person crochet history. The
  only hit is the About page sentence that says he is *not* a certified
  designer.
- "We" and "our" remain only in `/privacy-us/`, `/privacy-eu/` and `/terms/`,
  where they refer to the site as the data controller. That is normal legal
  usage and does not imply a team.
- Every pattern page with counts carries a near-top statement that it was
  checked on paper and not test-crocheted. 49 of 51 project pages pass the
  automated check in `scripts/quality-matrix.mjs`. The other two
  (`/basic-crochet-stitches/`, `/how-to-read-a-crochet-pattern/`) contain
  practice swatches, not designed projects.
- Four project pages were missing that statement and now have it:
  `/how-to-crochet-a-snowflake/`, `/halloween-granny-square-variations/`,
  `/christmas-granny-square-variations/`, and the card wallet (it already had
  one; the checker's pattern was widened to find it).
- Template note on every `patterns` page with `howTo`: "Stitch counts on this
  page were checked on paper; the project has not been made in yarn by this
  site, and any picture of a finished piece is an illustration."

## Unresolved, needs the owner

1. **Email.** `SITE.email` still holds `thecrochetguiide@gmail.com`, the value
   that was there before. The owner's answer, `crochetexplained.com`, is not
   an address. Before applying to AdSense, confirm a real inbox (for example
   an address at the custom domain once mail is set up) and put it in
   `src/config.ts`. Do not invent one.
2. **Social URLs.** `SOCIALS` still holds placeholder handles.
3. **AI writing tools.** The author page says AI tools help draft text. Keep
   that sentence if it stays true; remove it only if the workflow changes.
