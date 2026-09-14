# Editing guide

The v0.12.0 structure follows the NSUTM v31 separation of editable configuration, slide behaviour and slide styles. This package keeps all supporting files under `assets`, gives every slide a numbered content file, and keeps each English field next to its Arabic counterpart.

## Content is the first place to edit

Use a text editor such as VS Code or Notepad. Save files as UTF-8. Only change the text between the quotes for ordinary wording edits. Keep field names, IDs, braces, commas and the final semicolon. Refresh `index.html` after saving; use Ctrl+F5 if the previous wording remains.

For example, inside `assets/config/slides/02-vision.js`:

```js
title: {
  en: "One center. One operational picture.",
  ar: "مركز واحد. رؤية موحّدة للعمليات.",
},
```

The same pair is used by the slide, its contents entry and accessible navigation labels. The shorter navigation label is the separate `navLabel` field.

| Number | Content file under `assets/config/slides/` | Current purpose                                                                     |
| ------ | ------------------------------------------ | ----------------------------------------------------------------------------------- |
| 01     | `01-intro.js`                              | Intro title, subtitle, buttons, scene controls and drone labels                     |
| 02     | `02-vision.js`                             | Complete Vision narrative, domains, three tabs, response steps and authority levels |
| 03     | `03-domains.js`                            | Complete air, land, sea and mobility scenes, briefs and scenarios                   |
| 04     | `04-command-center.js`                     | Complete operations floor, alert walkthrough and continuity example                 |
| 05     | `05-intelligence.js`                       | Complete evidence, asset comparison and recommendation workflow                     |
| 06     | `06-response.js`                           | Planned response chapter                                                            |
| 07     | `07-governance.js`                         | Planned governance chapter                                                          |
| 08     | `08-value.js`                              | Planned strategic-value chapter                                                     |
| 09     | `09-roadmap.js`                            | Planned roadmap chapter                                                             |
| 10     | `10-demo.js`                               | Planned demonstration chapter                                                       |

“Planned” files contain the existing chapter narrative and animation brief. They do not imply that the complete operational animation has been built. The contents panel labels these slides as in preparation.

## Intro edits

In `01-intro.js`, `country`, `titleLines` and `subtitle` control the main copy. Each `titleLines` array entry is a separate displayed line. `title` supplies the contents entry and loading-screen title.

`ui` holds the Begin button, scene controls and simulation caption. `hud` holds drone identifiers and status wording. Keep the `{altitude}` and `{speed}` placeholders in the HUD statistics template; the scene inserts the illustrative values at runtime. Changing these fields does **not** require rebuilding the drone engine.

A line break inside a quoted string uses `\n`. To place a double quote inside a double-quoted string, write `\"`. Arabic guillemets such as «اعتماد الإرسال» need no escaping.

## Vision edits

In `02-vision.js`:

| Field                                   | What it changes                                                    |
| --------------------------------------- | ------------------------------------------------------------------ |
| `title`, `summary`, `eyebrow`, `footer` | Always-visible slide copy                                          |
| `domains`                               | Four clickable operating-domain labels and information readouts    |
| `tabs[0]`                               | Unified picture headline, lead, three numbered points and takeaway |
| `tabs[1].steps`                         | Detect, assess, approve, dispatch and learn narrative              |
| `tabs[2].levels`                        | Three authority levels, examples and explanations                  |
| `ui`                                    | Diagram labels, playback controls and approval button              |

Keep the existing four domains, three tabs, five response steps and three authority levels for text-only edits. Their order corresponds to the scene interactions and scenario states. Adding or removing one is a layout/behaviour change and requires updating `assets/scripts/slides/02-vision.js` too.

The response is an illustrative inspection scenario. The local clock stops at the approval step and the facility inspection sweep and mission progress advance only after the presenter approves. The reduced-motion setting shows the approval step without animation; approval then shows the documented outcome. Replay resets the approval state.

## Arabic writing standard

Write for the intended meaning, rather than matching English word for word. Use professional, simple wording suitable for business discussion. Keep sentences concise, use familiar verbs, and avoid stiff terminology where a practical phrase is clearer. Review both versions together so responsibility, permission and operational meaning stay consistent.

For example, “Turn an alert into an approved response” is expressed as «من التنبيه إلى استجابة معتمدة». Do not expand a short English heading into a long Arabic paragraph.

The slide body follows the selected language. The header, logos, controls and footer retain their physical positions. The intro photograph and its scene effects are intentionally reflected for Arabic so the content area remains clear; the logos are never reflected.

## Layout, styling and media

| File or folder                               | Responsibility                                                              |
| -------------------------------------------- | --------------------------------------------------------------------------- |
| `index.html`                                 | Fixed shell, dialogs and ordered local script/style references              |
| `assets/config/deck.js`                      | Categories, slide order, minimum loader duration and motion choices         |
| `assets/config/interface.js`                 | Shared UI translations                                                      |
| `assets/config/media.js`                     | Document-relative image paths                                               |
| `assets/scripts/core/app.js`                 | Navigation, language, theme, dialogs and loading coordinator                |
| `assets/scripts/core/scene-scope.js`         | Disposal of listeners and animation work when a slide closes                |
| `assets/scripts/core/icons.js`               | Local Lucide SVG lookup used by categories, controls and focus points       |
| `assets/scripts/slides/01-intro.js`          | Intro markup                                                                |
| `assets/scripts/slides/02-vision.js`         | Vision markup, focus points, GSAP transitions and local scenario controller |
| `assets/scripts/slides/placeholder.js`       | Shared renderer for chapters still in preparation                           |
| `assets/scripts/scenes/intro-harbour.js`     | Water, skyline shimmer, light timing and intro scene lifecycle              |
| `assets/scripts/scenes/vision-atmosphere.js` | Vision particles, water, glow, turn signal and display-light effects        |
| `assets/styles/base.css`                     | Fonts, theme variables and viewport foundation                              |
| `assets/styles/shell.css`                    | Header, navigation, transparent logos, footer and dialogs                   |
| `assets/styles/loading.css`                  | Opening scene and progress display                                          |
| `assets/styles/slides/01-intro.css`          | Intro layout, day/night states and Arabic composition                       |
| `assets/styles/slides/02-vision.css`         | Vision image stage, glass narrative, focus points and responsive rules      |
| `assets/styles/slides/placeholders.css`      | Planned chapter styling                                                     |
| `assets/scripts/three-source/`               | Readable intro drone model, flight motion and renderer sources              |
| `assets/vendor/`                             | Ready-to-run libraries, the built drone engine and original icon SVGs       |
| `assets/development/`                        | Optional developer-only drone build tools                                   |

Root files are limited to `index.html` and this package's README. Documentation lives in `docs`. Human-edited JavaScript uses indentation and section comments; HTML template strings are formatted as markup. Vendor bundles remain minified to keep the download small and are not the place to edit content.

For logo size or background, search for `#cscBrand` in `assets/styles/shell.css`. It has one base definition and explicit narrow-screen adjustments. The transparent PNG uses its original combined wordmark/emblem, without a colored plate or a blending workaround.

Keep media files local. If you rename an intro image, update `assets/config/media.js`. If you rename the loading image, also update the early preload image in `index.html`. Replacing composition can require realigning light points, the water mask and traffic; retaining the same aspect ratio alone does not align them.

## Optional: rebuild the Three.js engine

This section is only for developers changing geometry or drone flight behaviour. Opening the deck and editing content, ordinary JavaScript or CSS do not require Node or npm.

Edit the readable files in `assets/scripts/three-source/`. On a development machine with Node and npm, run:

```sh
cd assets/development
npm install
npm run build:drone-engine
```

The pinned Three.js and esbuild dependencies rebuild `assets/vendor/drone-engine.min.js`. The renderer reads intro HUD wording from the content file at runtime. After a rebuild, distribute the package with the updated bundle; do not include the developer `node_modules` folder. The presentation still runs offline with no build or installation on the presenting computer.

When changing slide behaviour, preserve its `destroy()` lifecycle, pause behaviour and keyboard handling. The main document stays fixed to the viewport; longer detail uses the styled internal content area.

## Vision imagery and effects

The six new images are in `assets/images/vision/`. Each scene has a `-night.webp` and `-day.webp` file. Their matching camera geometry allows crossfading while keeping focus points and light effects aligned. `assets/config/media.js` maps the pairs under `ACCAssets.vision`.

In `02-vision.js`, `scenes` uses coordinates between 0 and 1, measured from the top-left of the complete artwork. `focus` positions the clickable points; `lights` positions small glows; `water` defines the protected water region; `screens` identifies monitor-light areas. The scene always fits the complete 16:9 composition, including the foreground. The blurred surrounding image fills any extra space on unusual viewport shapes.

Vision places its narrative beside the image, so Arabic reverses the content layout while preserving the scene's internal geometry. The intro continues to use its separate, reflected Arabic composition. Do not mirror the header or the logos.

For an artwork change, keep each day/night pair aligned and review the focus points and effect coordinates. Scene descriptions and the exact generation/edit prompts are recorded in `IMAGE-PROMPTS.md`.

The existing local Three.js bundle supports the intro only. Vision uses photographic assets and a lightweight effect canvas. The obsolete Vision model source was removed. Rebuild the bundle only when changing the remaining intro 3D source.

## Domains content and scenarios

All new slide content is in `assets/config/slides/03-domains.js`:

| Field                                   | Purpose                                                                               |
| --------------------------------------- | ------------------------------------------------------------------------------------- |
| `title`, `summary`, `eyebrow`, `footer` | Always-visible slide wording                                                          |
| `ui`                                    | Shared instructions, controls, phase labels and diagram legends                       |
| `domains[]`                             | Four records in the order Air, Land, Sea, Mobility                                    |
| `label`, `tagline`, `title`, `lead`     | Navigation and mission introduction                                                   |
| `assets`, `mission`, `control`, `value` | Briefing rows and executive benefit                                                   |
| `scenario.stages[]`                     | Challenge, decision and outcome explanations                                          |
| `scenario.review`, `scenario.action`    | Explicit review and decision button labels                                            |
| `scenario.automatic`                    | Distinguishes the taxi's local policy response from operator-approved mission changes |
| `focus`                                 | Scene focus center as normalized x/y coordinates                                      |
| `lights`                                | Normalized x/y coordinates and a named light color                                    |

Keep the four domain IDs and three scenario stages for copy-only edits. Policy changes, new domains or different maneuvers require controller changes too; changing text alone does not change the motion paths.

`assets/scripts/slides/03-domains.js` owns the stable markup, tab selection, scenario state machine and GSAP transitions. `pose()` and `route()` define the illustrative inset paths. The taxi path deliberately remains stopped through progress 0.55; pedestrian clearance happens first. These are unitless illustrative coordinates, not operational flight levels, clearances or live telemetry.

`assets/scripts/scenes/domains-atmosphere.js` draws sparse particles, photographic light blooms and clipped water reflections. It shares the slide's lifecycle and pauses with the presentation. `assets/styles/slides/03-domains.css` owns the layout and visual styling.

## Keep the image canvas stable

Completed content slides use fixed stage grids. Vision reserves an identical dock and action-bar height on every tab. Domains reserves one identical phase dock. The narrative is in a separate panel and cannot contribute a minimum size to the image stage. The full photograph is fitted inside its viewport; the blurred surround fills spare space on unusual screen shapes.

Do not change the dock height based on the selected tab. The `domain-world` and `vision-world` elements use the same contained 16:9 coordinate space as their light effects. Switching scenes changes opacity and content, not image dimensions. Rapid tab changes kill superseded GSAP transitions.

The image geometry stays physically the same for English and Arabic on Vision and Domains because the narrative is beside the image. The header and footer remain LTR containers. Only the intro has a separate reflected Arabic composition.

## Editing the new media

The eight files in `assets/images/domains/` are the four `-night.webp` / `-day.webp` pairs. Paths are registered under `ACCAssets.domains` in `assets/config/media.js`. Keep paired framing and recheck the corresponding focus/light coordinates after replacing an image. The photographs supply context; they are not moving video or live 3D. The separate control view animates the mission maneuver and is labelled as illustrative.

All author-owned files are formatted for direct editing. Vendor libraries remain minified and licensed in assets/vendor. No extra animation framework was added because local GSAP, Canvas and SVG cover the new behavior.

## Vision 2D explanations — v0.11.0

The `signalDiagram()` and `paintDiagram()` functions in `assets/scripts/slides/02-vision.js` draw and animate the shared-information view and two response tracks. Their captions are in `ui` inside the slide's content file. Diagram positions are unitless, illustrative coordinates; they are not the photographic vehicle positions. The response tracks read the existing approval state and cannot move before it is granted. At completion, the asset glyphs give way to record-confirmation glyphs.

These explanatory diagrams live in the scrollable narrative panel. The image stage's fixed grid and persistent action bar are unchanged. Light and water effects still use the complete photo's contained coordinate space.

## Command Center — slide 04

All text and photo coordinates are in `assets/config/slides/04-command-center.js`:

| Field                                   | What to edit                                                |
| --------------------------------------- | ----------------------------------------------------------- |
| `title`, `eyebrow`, `summary`, `footer` | Always-visible slide copy                                   |
| `ui`                                    | Instructions, buttons, connection labels and status wording |
| `views[]`                               | Three tab labels, introductions and executive takeaways     |
| `zones[]`                               | Room hotspot coordinates, roles and outcomes                |
| `nodes[]`                               | Five connected capabilities under the image                 |
| `traceSteps[]`                          | Six alert-to-action explanations                            |
| `continuity[]`                          | Four connectivity states and policy explanations            |
| `atmosphere`                            | Photo-aligned screen rectangles and architectural lights    |

Keep three views, three zones, five capability nodes, six trace steps and four continuity states for copy-only changes. Changing their number or semantics also requires updating the controller.

`assets/scripts/slides/04-command-center.js` owns the markup, explicit state machines, SVG movement, tab and hotspot behavior. `traceState()` holds at human approval. `continuityState()` holds at alternate-connection review. The moving dots explain information/coordination flow; no live networks or systems are accessed.

`assets/styles/slides/04-command-center.css` defines the fixed image stage, operating chain, room hotspots and detailed console. It reuses shared colors and console primitives from slide 03's stylesheet. The room uses the existing Canvas atmosphere renderer in `assets/scripts/scenes/vision-atmosphere.js`, configured by slide 04's own coordinates. No additional library or build step is needed.

The two new photographs are `assets/images/center/floor-night.webp` and `floor-day.webp`, mapped under `ACCAssets.center` in `assets/config/media.js`. Use aligned day/night compositions and review all hotspot/screen coordinates after replacing an image.

In Arabic, the logical capability chain reads from right to left. Room geometry, logos and global control positions remain fixed. Long explanatory text scrolls within its own panel; the overall presentation remains a fixed viewport.

## Domains timeline and enlarged control view — v0.12.0

The timeline is available after the scenario's decision action. Its value is illustrative maneuver progress, not elapsed real-world flight time. Dragging stops execution and displays the chosen point; **Continue the sequence** resumes from it. Replay clears authorization. Changing domains or returning to the brief clears the scenario and enlarged mode.

The range control is disabled before the decision, and its handler also checks authorization. Keyboard input stays within the range control instead of changing slides. The map expansion changes the console presentation, not the photo's stage grid. Escape returns to the normal console.

Labels for `scrub`, `scrubLocked`, `resumeSequence`, `expand` and `collapse` live in slide 03's `ui` object. SVG direction markers derive from the existing path tangent; no additional model or asset file is needed.

## Intelligence — slide 05

`assets/config/slides/05-intelligence.js` holds all English/Arabic content:

| Field                                   | Purpose                                                            |
| --------------------------------------- | ------------------------------------------------------------------ |
| `title`, `eyebrow`, `summary`, `footer` | Permanent slide copy                                               |
| `views[]`                               | Observe, Compare and Recommend labels and introductions            |
| `ui`                                    | Scenario actions, status labels, evidence quality and instructions |
| `facts[]`                               | Telemetry, visual evidence and mission-context explanations        |
| `assets[]`                              | Three illustrative assets, capabilities and selection reasons      |
| `proposal`                              | Proposed action, rationale and unresolved operational checks       |
| `atmosphere`                            | Screen rectangles and light positions aligned to the photograph    |

`assets/scripts/slides/05-intelligence.js` defines the local state machine and SVG trend. `assess(alert, fresh, available)` returns `noalert`, `insufficient`, `noasset` or `eligible`. It is a deterministic example, not an AI model invocation. Do not turn these statuses into confidence percentages.

A proposal is eligible only when the alert exists, camera evidence is current and the suitable aircraft is available. Preparing it creates an in-memory draft state only. Any evidence/availability change invalidates that state. Requesting more evidence marks camera evidence as awaiting refresh. No dispatch, external request or persistent operational record is sent.

The asset buttons inspect suitability reasons; they do not silently substitute an unsuitable asset into the proposal. The sample proposal specifically uses UAV-021 for the aerial check and considers UGV-008 as complementary ground follow-up.

`assets/styles/slides/05-intelligence.css` owns the photographic stage, evidence ribbon, comparison cards and recommendation layout. It uses shared console/tab primitives from slides 03 and 04. The existing Vision Canvas atmosphere renderer is reused with slide 05's separate coordinates.

New artwork is `assets/images/intelligence/suite-night.webp` and `suite-day.webp`, registered under `ACCAssets.intelligence`. Maintain matching framing and realign screen/light coordinates if replacing the images. Logical state remains visible without animation; reduced motion renders the trend's final state immediately.

## Intelligence decision chain — v0.13.0

The three cards beneath the photograph are interactive inputs. The signal card introduces the alert or returns to Observe; the evidence and aircraft cards toggle their respective conditions. The original footer controls remain available. The result strip shows the shared assessment, and its small particle advances only when all three conditions are satisfied. This is an input dependency view, not a model confidence score.

`ui.chain`, `chainHint`, `alertShort`, `freshShort`, `assetShort`, `held` and `review` control the new dock wording. `ui.draft*` controls the review package; `ui.noAssetReason` explains the unavailable condition without contradicting the scenario. The package is visible only after preparation with valid inputs. An input change invalidates it. The persistent dock's height must not depend on the selected tab.

## Response — slide 06

| Content field                           | Purpose                                                            |
| --------------------------------------- | ------------------------------------------------------------------ |
| `title`, `eyebrow`, `summary`, `footer` | Always-visible slide copy                                          |
| `views[]`                               | Three tab labels, headings and introductions                       |
| `ui`                                    | Buttons, statuses, map labels, findings and decision-record labels |
| `roles[]`                               | Aircraft, ground robot and operator explanations                   |
| `atmosphere`                            | Photo-aligned light points and screen rectangles, normalized 0–1   |

The complete paired copy is in `assets/config/slides/06-response.js`. The controller is `assets/scripts/slides/06-response.js` and the stylesheet is `assets/styles/slides/06-response.css`. Shared console and tab primitives come from slides 03–05; keep that CSS order in index.html.

The route arrays `AIR`, `GROUND_IN`, `DIRECT` and `ALTERNATE` use the SVG's 900 × 250 coordinate space. `pose()` interpolates position and heading, while `advance()` enforces dispatch and route approval. Keep the detour's start aligned with the inbound endpoint and update obstruction/labels when changing route geometry. Duration is an illustrative animation scale, not a promised response time.

The two scene files are under `assets/images/response/`, registered as `ACCAssets.response`. Matching camera geometry keeps the Canvas lights aligned between themes. The narrative sits beside the image, so Arabic does not require reflecting this physical site. Logos and global controls keep their original positions.

The scenario resets on a new mount, including language switching. Tabs and theme changes preserve it. In reduced motion, explicit dispatch and route approval actions display the next held or arrived state directly. Neither tab navigation nor elapsed time bypasses approval or evidence review.

## Response refinement — v0.14.0

The expand control fills the existing photographic stage with the 2D coordination view; it does not change the underlying photo sizing inputs. The narrative and action controls remain accessible. Escape collapses the view and returns focus to the expansion button.

The new `manualHold` state stops operational progress independently of the animation pause. The operator must approve resumption, after which the original route-change gate still applies. The local record tracks holds and approved resumptions. Copy is in slide 06's `ui.manualhold`, `holdMission`, `resumeMission`, `manualHint`, `expand`, `collapse` and `holdRecord`.

## Governance — slide 07

| Field in 07-governance.js               | Purpose                                                          |
| --------------------------------------- | ---------------------------------------------------------------- |
| `title`, `eyebrow`, `summary`, `footer` | Permanent slide text                                             |
| `views[]`                               | Three operating modes, tasks and authority rules                 |
| `checks[]`                              | Four checkpoint labels and explanatory text                      |
| `ui`                                    | Action controls, input states, status messages and record labels |
| `atmosphere`                            | Normalized photo-aligned screen and light coordinates            |

The controller uses `idle`, `checking`, `blocked`, `approval`, `executing`, `complete` and `revoked` states. A failed input cannot lead to execution. Human-mode approval remains separate from successful identity/scope checks. Input changes invalidate any previous authority, and restored inputs require fresh evaluation. Changing modes resets the exercise; selecting a checkpoint preserves it.

The logical chain uses CSS grid direction plus a reflected SVG flow in Arabic. Do not reflect the photo or global chrome. Keep the fixed dock height identical between operating modes. Retain the local script/CSS dependency order in index.html: the new slide reuses existing shared primitives from slides 03–05.

Scene assets are `assets/images/governance/review-night.webp` and `review-day.webp`. Maintain matching geometry and realign `atmosphere` coordinates after replacing imagery. Exact built-in image prompts are in IMAGE-PROMPTS.md.

## Shared content layout contract — v0.15.0

`assets/styles/content-layout.css` is the last stylesheet in index.html. It applies only to the completed content slides, not the intro or global chrome. Keep the content roots absolutely positioned with definite 100% width/height and zero min-height. A relative root with auto height breaks grid containment and can clip the entire page at the stage boundary.

`assets/scripts/core/content-layout.js` attaches only to slides 02–07. It uses the actual stage bounds to select `content-flow` and `content-stacked` layouts. Heading/navigation measurements help detect limited space. ResizeObserver watches the stage and these heading/navigation elements. The policy depends on available space, never a particular tab's narrative length, so changing copy does not resize the photograph.

Normal desktop mode gives the narrative its own visible scroll track and allows unusually long action areas to scroll. Compact mode puts the scene and expanded narrative in one workspace scroller. Narrow layouts stack them. Very short landscape windows use the slide as the contained scroller. The outer document never becomes a series of vertically scrolling slides.

The helper labels/focus-enables scroll regions and routes scrolling keys to an overflowing ancestor. It preserves native tab/range behavior, prevents the current tab from acting as a hidden reset command, resets content scroll on a changed tab and restores focus when a clicked control is recreated. Its observers are disposed with the slide.

All six scene controllers fit positive real image viewport dimensions. They return early for zero sizes instead of assuming a default image viewport. Do not reintroduce the 1000×563 fallback: a hidden or transitional viewport is not evidence that those dimensions are correct.

Keep the original per-slide aspect framing, expanded-view rules and data/approval logic intact. The original intro files and global chrome styling are unchanged in this release.
