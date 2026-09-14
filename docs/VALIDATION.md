# v0.15.6 verification — Government Implementation Roadmap

## Scope

- The release starts from the v0.15.4 government-value archive.
- Slide 09 is added as the final slide before the demo chapter.
- Slides 01–08 are preserved from v0.15.4.
- Video/Higgsfield integration remains deferred.
- Roadmap wording identifies proposed implementation controls only. It makes no achieved-result or approved-target claim.

## Completed checks

- All owned JavaScript parses with Node.
- Slide 09 config is registered as ready in the deck order.
- Every referenced roadmap day/night image exists locally under `assets/images/roadmap/`.
- Roadmap media paths are included in the app preload list.
- The renderer produces four government implementation phases in both English and Arabic.
- Manual selection activates all four phases and updates the active scene, selected controls, detailed outcome card, counter and live-region text.
- The pause/resume button toggles the slide sequence state and pauses the roadmap animations while retaining direct phase selection.
- Keyboard traversal for phase buttons supports arrows plus Home/End and respects RTL direction for horizontal keys.
- Dark, light and Arabic rendering were captured through an inline browser harness.
- Visible-boundary checks passed at 1920×1080, 1366×768, 1280×720, 1024×768, 900×700, 768×1024 and 430×932 viewport sizes.
- The backdrop is clipped inside the slide root to avoid false page-width expansion.
- SVG routes and node coordinates use one 1000 × 560 coordinate system, so drawn endpoints remain attached to their intended points as the scene scales.
- The runtime source contains no added external request. Fonts, icons, images, GSAP and the retained intro Three.js bundle remain local.
- The final archive receives a clean project root and contains no QA scripts, generated source PNGs or dependency folders.

## Browser-test limitation

Direct `file:///` and local-http navigation in the available Chromium workspace is explicitly blocked by administrator policy (`ERR_BLOCKED_BY_ADMINISTRATOR`). The release was therefore tested with an inline browser harness that loads the same authored CSS/JS and local roadmap imagery without navigating to a local URL.

This release does not claim a direct local-file pixel pass inside the workspace. Actual Edge or Chrome fullscreen behavior and GPU animation smoothness should still be judged on the delivery device.
