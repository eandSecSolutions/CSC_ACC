# Asset sources and reuse

| Asset                                                  | Source and handling                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets/brand/csc-transparent.png`                     | Exact transparent `presentation/assets/brand/csc-source.png` from NSUTM v31, 437 × 115 pixels. The NSUTM logo source register identifies it as the source-provided Cyber Security Council combined wordmark/emblem. Original colors and proportions retained. No image generation, color recoloring or background removal was applied to this asset. |
| `assets/brand/eand-mark.svg`, `eand.svg`               | Existing e& vectors retained from the prior UAE ACC package.                                                                                                                                                                                                                                                                                         |
| `assets/images/intro/hero-day.webp`, `hero-night.webp` | Existing generated concept artwork retained from UAE ACC v0.7.0. They depict a proposed setting, not a verified built facility. Arabic uses a runtime reflection of the same composition.                                                                                                                                                            |
| `assets/images/loading/command-hall.webp`              | Existing generated command-hall concept from v0.7.0, retained for the loader.                                                                                                                                                                                                                                                                        |
| Lucide icons                                           | Local Lucide Static 1.45.0 assets. Original source SVGs are in `assets/vendor/lucide`; the runtime lookup is in `assets/scripts/core/icons.js`. ISC license in `assets/vendor/LUCIDE-LICENSE.txt`.                                                                                                                                                   |
| Three.js                                               | 0.186.0, MIT. The local drone bundle includes the renderer and the necessary addons. License in `assets/vendor/THREE-LICENSE.txt`.                                                                                                                                                                                                                   |
| GSAP                                                   | 3.15.0, retained local distribution. Original notice is preserved in the bundle; see `assets/vendor/GSAP-NOTICE.txt`.                                                                                                                                                                                                                                |
| Manrope and Arabic fonts                               | Existing local fonts and original OFL notices retained under `assets/fonts`.                                                                                                                                                                                                                                                                         |
| Vision scene artwork                                   | Six new locally packaged generated WebP images in `assets/images/vision/`, created for v0.9.0. Three night environments and three corresponding daylight edits. Exact prompts: `IMAGE-PROMPTS.md`. Illustrations of a proposed capability, not verified existing facilities or live operational maps.                                                |

The CSS and JavaScript animate light, water and traffic over the photographic intro. Those effects are not baked into the still image. Header logos are separate assets and never take part in the Arabic scene reflection.

## v0.10.0 additions

- Eight generated domain photographs: `assets/images/domains/{air,land,sea,mobility}-{night,day}.webp`. Each day image was edited from its night partner to retain composition. Original dimensions: 1672 × 941; WebP quality 88. Exact prompts are in IMAGE-PROMPTS.md. These are illustrative proposed operations, not verified existing facilities or real mission data.
- The Vision 3D overlay source and its compiled code were removed. The intro Three.js renderer is retained.
- New domain effects and mission diagrams are authored Canvas/SVG code. They use the existing local GSAP and Lucide distribution; car-front and user-round were added from the same local Lucide source package with its existing ISC license.

## v0.11.0 additions

- Command Center night photograph and matched daylight edit: `assets/images/center/floor-night.webp` and `floor-day.webp`, generated for this release, 1672 × 941, WebP quality 89. They are conceptual operations-room illustrations, not an existing verified facility. Exact built-in generation/edit prompts are in IMAGE-PROMPTS.md.
- Vision signal diagrams, dual response tracks, Command Center operating chain and alternate-connection diagram are authored SVG/HTML. They use the existing licensed Lucide assets and local GSAP; no new icon pack or runtime framework is introduced.
- Command Center reuses the existing local Canvas atmosphere renderer with separate photo-aligned configuration. The intro remains the only slide with a Three.js asset renderer.

## v0.12.0 additions

- Intelligence mission-analysis scene and matched daylight edit: `assets/images/intelligence/suite-night.webp` and `suite-day.webp`, 1672 × 941, WebP quality 89. Built-in generation/edit prompts are recorded in IMAGE-PROMPTS.md. These depict a conceptual workplace, not a verified existing facility.
- Domains direction markers, timeline controls, and Intelligence telemetry/status interfaces are code-native SVG/HTML. Existing local Lucide icons, GSAP and Canvas are reused. No new runtime library is required.
- All four Domains image pairs are retained. The original intro remains the only active Three.js model scene.

## v0.13.0 additions

- Response coastal-campus night photograph and exact-composition daylight edit: `assets/images/response/campus-night.webp` and `campus-day.webp`, 1672 × 941, WebP quality 89. Generated with the built-in image tool for this release; exact prompts are in IMAGE-PROMPTS.md. These illustrate a proposed setting, not a verified facility.
- Response's routes, maneuver tokens, gates and decision record, plus Intelligence's dependency dock, are authored SVG/HTML using the existing local Lucide distribution and GSAP. Photo effects reuse the existing Canvas renderer with separate coordinates.
- The new content slides do not add WebGL or a further framework. The retained intro remains the only active Three.js model scene.

## v0.14.0 additions

- Governance night photograph and matched daylight edit: `assets/images/governance/review-night.webp` and `review-day.webp`, 1672 × 941, WebP quality 89. Generated using the built-in image tool. Exact prompts are in IMAGE-PROMPTS.md. The scene depicts a proposed oversight setting, not a verified existing facility.
- The authorization checkpoints, flow marker and record use authored HTML/SVG plus the existing licensed Lucide lookup and GSAP. Canvas atmosphere reuses the existing renderer with separate light/screen coordinates.
- Response retains its existing day/night scene pair. No new framework or WebGL scene was introduced.

## v0.15.1 additions

- Strategic Value ecosystem daylight scene and matched night edit: `assets/images/value/ecosystem-day.webp` and `ecosystem-night.webp`, 1920 × 1080, WebP quality 84. Generated using the built-in image tool. Exact prompts are recorded in `IMAGE-PROMPTS.md`.
- The scene illustrates a proposed UAE autonomous-operations ecosystem. It does not represent a verified facility, deployment or performance result.
- Slide 08 uses authored HTML and CSS with the existing local Lucide assets. No runtime library, hosted asset or network dependency was added.

## v0.15.4 additions

- Eight generated government-value photographs in `assets/images/value/government/`: matched day/night pairs for Safety, Efficiency, Resilience and National Capability. Original geometry is 1672 × 941; final runtime files are local WebP quality 86.
- The photographs illustrate proposed operating settings. They do not show verified facilities, live missions or achieved performance.
- Day scenes were generated separately for each government benefit. Each night scene was edited from its day partner to preserve camera, people, infrastructure and autonomous-asset positions.
- Slide 08 adds code-native 2D explanatory routes and a CSS 3D command core. It reuses the local Lucide and GSAP distributions and adds no hosted asset, external request or runtime framework.

## v0.15.5 additions

- Eight generated roadmap photographs in `assets/images/roadmap/`: matched day/night pairs for Mandate & Governance, Controlled Pilot & Evidence, Cross-Entity Expansion and National Operations. Source PNGs were recovered from the Autonomous Command Center library workspace and converted to local WebP runtime files at 1500 × 844.
- The roadmap photographs are concept imagery for a proposed implementation journey. They do not show verified facilities, live missions, approved governance decisions or achieved operational performance.
- Slide 09 adds code-native SVG route overlays, animated callouts, manual phase controls and a CSS 3D implementation core. It reuses the local Lucide and GSAP distributions and adds no hosted asset, external request or runtime framework.

## v0.16.0 additions

- Three user-supplied dashboard mockups were resized to 1280 × 853 and optimized as local WebP preview imagery under `assets/images/demo/`.
- The complete dashboard v0.2.9 is packaged under `dashboard/`. It is loaded only after the user selects an overlay or separate-window action.
- The dashboard uses the ArcGIS Maps SDK and Esri public map, imagery, terrain and 3D-building services when those endpoints are reachable. Its authored UI, optimized imagery and local fallback assets remain packaged with the presentation.
