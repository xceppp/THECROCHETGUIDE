# Image technical validation

No new image files were written in this pass, so there is no new file to checksum.

Checks that apply to the pictures already on the site:

- Diagrams are hand-written SVG files in `public/diagrams/` (17 files), referenced from article figures with a caption that starts with "Diagram."
- Article photos are stored under `src/assets/articles/` and rendered through Astro's image pipeline.
- Captions on project pages identify illustrations, not photographs of a measured sample, where the article says the object has not been made in yarn.

Uncertainty: this pass did not open every existing illustration and re-judge stitch accuracy by eye. That review is still open. A diagram already on a technique page was not treated as a failure just because a project page does not repeat it.
