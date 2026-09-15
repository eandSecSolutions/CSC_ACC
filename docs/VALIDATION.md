# v0.16.0 verification — Presentation and dashboard integration

## Scope

- The release starts from the exact v0.15.6 RTL-navigation archive.
- Slides 01–09 and their existing content are preserved.
- Slide 10 is completed as the dashboard gateway.
- Dashboard v0.2.9 is packaged locally under `dashboard/`.
- Video/Higgsfield integration remains deferred.
- Roadmap wording identifies proposed implementation controls only. It makes no achieved-result or approved-target claim.

## Completed checks

- All owned JavaScript parses with Node.
- Slide 10 config is registered as ready in the deck order.
- Both dashboard actions are present: overlay view and separate-window launch.
- The dashboard iframe starts blank, loads only on request and is unloaded on close.
- The embedded dashboard version is v0.2.9 and its required local files are present.
- All three dashboard preview images exist, are WebP and remain below 300 KB each.
- Slide 10 contains English and Arabic labels for its title, summary, capabilities, actions and overlay controls.
- The final slide includes dark/light, compact-height, tablet, mobile and reduced-motion rules.
- Slide-edge controls are substantially narrower at rest and expand on hover.
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
- The final archive receives a clean project root and contains no dependency folders or unoptimized source screenshots.

## Browser-test limitation

Direct `file:///` and local-http navigation in the available Chromium workspace is explicitly blocked by administrator policy (`ERR_BLOCKED_BY_ADMINISTRATOR`). The release was therefore tested with an inline browser harness that loads the same authored CSS/JS and local roadmap imagery without navigating to a local URL.

This release does not claim a direct local-file pixel pass inside the workspace. Actual Edge or Chrome fullscreen behavior, popup policy and ArcGIS connectivity should still be confirmed on the delivery device.
