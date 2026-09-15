# UAE Autonomous Command Center — v0.16.0

Extract the ZIP and open **index.html** in Edge or Chrome. Keep the full folder structure beside it.

Slides 01–09 preserve the approved v0.15.6 presentation. Slide 10 is now the interactive dashboard gateway and includes the complete dashboard v0.2.9 package.

## Slide 10 — Interactive Command Center

The final slide presents three optimized dashboard views and two clear actions:

- **View Dashboard** opens the dashboard above the presentation in a full-screen overlay.
- **Launch Dashboard** opens the dashboard in a separate resizable browser window.

The embedded dashboard is lazy-loaded only after an action is selected, so its maps and operational modules do not consume presentation resources beforehand. Closing the overlay unloads it and releases its map resources.

The dashboard itself runs locally. Its real ArcGIS 3D buildings, elevation, imagery and street services require access to the Esri endpoints already verified on the target corporate network.

## Slide 09 — Government Implementation Roadmap

This release starts from **v0.15.4 government-value** and adds the final slide before the demo chapter. Slides 01–08 retain their existing content, interactions, styling and animation.

The new Roadmap slide explains how government can move from mandate to national operations through four controlled phases:

1. **Mandate & Governance** — accountable program structure, human authority and data boundaries.
2. **Controlled Pilot & Evidence** — limited pilot area, measured baselines and operator supervision.
3. **Cross-Entity Expansion** — common SOPs, shared tasking and joint exercises.
4. **National Operations** — 24/7 operations, continuity paths and audit/improvement cadence.

The slide advances automatically while still allowing direct phase selection, keyboard navigation and pause/resume. It uses distinct day/night imagery per phase, SVG route overlays, animated callouts and a CSS 3D implementation core. All wording is bilingual and framed as proposed implementation controls for discussion, not as approved targets or achieved results.

Video/Higgsfield integration remains deferred and is not fused into this package.

## v0.16.0 presentation integration

This release keeps the v0.15.6 slide content unchanged and completes the presentation-to-dashboard handoff:

- The slide-edge controls are narrow at rest and expand only on hover, reducing content obstruction.
- In Arabic mode, the visual navigation direction is RTL: the next slide control appears on the left and the previous slide control appears on the right.
- The final slide uses bilingual copy, dark/light styling, responsive layouts and reduced-motion behavior.
- Three user-supplied command-center references are optimized as local WebP previews.
- The dashboard remains a separate folder inside the package, making it easy to update independently.

## Layout repair inherited from v0.15.x

The content slide styles restore a definite, stage-sized root for completed slides. Shared layout rules keep the presentation inside one viewport, with compact layouts using contained scroll areas where needed.

The intro, navigation, logos, local fonts, local GSAP bundle and retained intro Three.js bundle remain unchanged.

## Verification status

Owned JavaScript syntax, package references, dashboard integration, local media limits and navigation sizing checks passed. Direct local-file or local-http browser navigation is blocked by this workspace administrator policy, so this package does not claim a direct `file:///` pixel pass inside the workspace. See [docs/VALIDATION.md](docs/VALIDATION.md) for the exact scope and limitation.

## Editing

| Change                                      | Location                                                     |
| ------------------------------------------- | ------------------------------------------------------------ |
| Bilingual slide wording                     | assets/config/slides/                                        |
| Strategic Value behavior and styling        | assets/scripts/slides/08-value.js, assets/styles/slides/08-value.css |
| Roadmap behavior and styling                | assets/scripts/slides/09-roadmap.js, assets/styles/slides/09-roadmap.css |
| Dashboard gateway behavior and styling      | assets/scripts/slides/10-demo.js, assets/styles/slides/10-demo.css       |
| Embedded interactive dashboard              | dashboard/                                                                |
| Shared content viewport and scrolling rules | assets/styles/content-layout.css                             |
| Responsive lifecycle helpers                | assets/scripts/core/content-layout.js                        |
| Scene paths                                 | assets/config/media.js                                       |
| Images, brands, fonts and libraries         | assets/images/, assets/brand/, assets/fonts/, assets/vendor/ |

Keep `content-layout.css` after the slide 02–07 styles, keep `08-value.css` after `content-layout.css`, and keep `09-roadmap.css` after `08-value.css`. Do not remove the slide height/position constraints or make photo dimensions depend on narrative length. Author-owned files are readable UTF-8; ordinary text, CSS and controller edits need no build.
