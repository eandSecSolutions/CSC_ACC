# Slide 05 — Intelligence design brief

## Executive message

AI-assisted operations should make information easier to assess and action easier to review. Show the evidence, the mission constraints and the reason for a recommendation. Keep uncertainty and human authority visible.

## Visual approach

A distinctive mission-analysis room provides a cinematic operating context, with a matched day/night photograph. This uses an intimate analyst/table view, distinct from slide 04's wide operations floor. Screen-light sweeps and restrained particles add atmosphere while content remains readable.

Use 2D where it explains the mechanism: a signal trend, evidence-quality ribbon, comparable asset cards and structured recommendation. There is no value in a decorative rotating brain or synthetic model on top of the photograph. The existing intro retains spatial 3D aircraft motion.

## Interaction model

| View      | Interaction                                                                     | Intended understanding                                                                       |
| --------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Observe   | Introduce an inspection alert; inspect evidence quality                         | A signal prompts investigation and does not itself establish a diagnosis                     |
| Compare   | Inspect the aircraft and rover cards; change suitable-aircraft availability     | Capability and current assignment matter as well as availability                             |
| Recommend | Change evidence freshness; inspect reasons; request evidence or prepare a draft | An explainable proposal must remain conditional on the input quality and mission constraints |

This sequence uses a deterministic illustrative rule: an alert, current camera evidence and an available suitable aircraft are all required before a draft can be prepared. Busy or ground-only assets are not silently substituted. Preparing a draft sends no command; further operator checks and authorization remain explicit.

## Layout and lifecycle

The photograph and evidence ribbon retain fixed geometry between tabs and states. Detailed text scrolls in the console; actions remain in its footer. English/Arabic copy shares the same photo geometry, while the global shell remains physically fixed. Pause, hidden-tab suspension, reduced motion and cleanup apply to all effects.

All assets, fonts and runtime libraries remain local. No live AI endpoint, network map, telemetry feed or dispatch integration is implied by this illustrative presentation.

## v0.13.0 refinement

A persistent input dependency dock now shows the three required conditions and their shared result. Each input can be inspected or changed directly, so the audience can trace a held recommendation to the missing condition. Suitability reasoning now reflects when UAV-021 is unavailable. Preparing a valid recommendation opens a structured operator review package with the proposed task, supporting inputs and remaining checks. Changing an input invalidates the package. The photograph stays fixed across tabs; the chain uses 2D SVG/HTML and a small valid-state flow particle.
