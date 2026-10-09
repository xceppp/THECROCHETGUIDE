# Pinterest plan, October 9, 2026

This folder is a planning set for the 65 live articles on https://www.crochetexplained.com/. It does not change the site.

| File | What it is |
| --- | --- |
| `01-inventory.csv` | Every live article, URL, keyword, level, images, HTTP status |
| `02-ranked-scores.csv` | Same articles sorted by opportunity score |
| `03-top-20.md` | The first articles to promote |
| `04-boards.md` | Primary and secondary boards |
| `05-pin-concepts.csv` | Two pin concepts for every article |
| `06-calendar.csv` | October 9 through November 7, 2026 |
| `07-tracking-template.csv` | Blank metrics for the scheduled pins |
| `08-research-limitations.md` | What was verified, inferred, or unavailable |
| `build-plan.mjs` | The scoring inputs. Rerun with `node planning/pinterest/build-plan.mjs` |

Bands: A publish first, B within 7 days, C within 30 days, D not on this calendar.

The calendar schedules 108 pins, at most 6 a day. The two concepts for one article are at least 6 days apart. Band D stays in the pin file and off the calendar.

Outbound CTR = outbound clicks / impressions × 100. Leave CTR blank when impressions are 0.
