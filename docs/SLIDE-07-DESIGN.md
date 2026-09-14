# Slide 07 — Governance

## Executive purpose

Autonomy remains bounded by verified identity, mission scope and the authority required for the specific action. Governance is demonstrated through conditions that visibly permit, hold or stop an action.

## Visual concept

A secure mission-review room places human oversight at the center of the story. The matched night and daylight photographs share camera, people, room geometry and skyline. The still artwork is complemented by restrained Canvas screen sweeps, light blooms and particles. The authorization sequence is code-native 2D, with four selectable checkpoints and a moving progress marker. No additional 3D renderer is needed for this logical relationship.

The photo stage and checkpoint dock keep the same dimensions in all three modes. Selecting a checkpoint changes only the adjacent explanation. A local decision record accumulates the request, checks, authority decision and result. Long content uses the existing styled internal scroll areas. On narrow screens the workspace scrolls internally while the overall deck remains one viewport.

## Three operating examples

| Mode           | Bounded task                              | Authority requirement after identity/scope checks      |
| -------------- | ----------------------------------------- | ------------------------------------------------------ |
| Policy-based   | Routine camera sweep in the assigned zone | The illustrative pre-approved policy permits execution |
| Supervised     | Assisted inspection                       | The operator explicitly accepts supervision            |
| Approval-based | Critical inspection step                  | The operator explicitly approves the individual action |

These are proposed operating examples, not regulatory compliance claims or a connected authorization service. The input switches simulate validation outcomes; they do not authenticate anyone.

## Interaction and gates

- Evaluate the request to animate identity, scope and authority checks.
- An invalid identity blocks at the first checkpoint. An out-of-scope request blocks at the second, even with a valid identity.
- Supervised and approval-based modes wait indefinitely for their corresponding human action. Time passing or selecting a checkpoint never grants authority.
- Withdraw authority during checking, pending approval or execution to stop the example. A fresh evaluation is needed afterward.
- Changing an input invalidates prior authority and resets action progress. Restoring a valid input does not restart the action.
- Changing operating mode starts an independent example, explicitly noted on the slide. Theme changes and checkpoint selection preserve the current example; language switching/navigation remount and reset it.
- The record uses illustrative sequence numbers and remains in memory only. The latest 20 entries are retained to keep this example bounded.

The checking and execution durations are presentation timing, not measured operational latency. Reduced motion resolves each animation after an explicit action, preserving the human gates. Pause and hidden-page state suspend the active frame loop. Leaving the slide disposes its loop, observer, Canvas renderer and GSAP transition.

## Arabic and editing

Business Arabic conveys intended meaning concisely. The logical checkpoint sequence and its flow reverse together in Arabic. The physical room photograph, header logos and global control positions do not swap.

- `assets/config/slides/07-governance.js`: all English/Arabic copy, three modes, four checkpoints and effect coordinates.
- `assets/scripts/slides/07-governance.js`: deterministic gates, markup, flow animation and record lifecycle.
- `assets/styles/slides/07-governance.css`: fixed stage, checkpoints, feedback and theme/RTL styling.
- `assets/images/governance/review-night.webp` and `review-day.webp`: matched scene pair.
- `assets/config/media.js`: image paths under `ACCAssets.governance`.

`decision(identity, scope, mode)` defines the authorization outcome after checking. Keep the corresponding controller, UI copy and route semantics aligned if adding modes or checkpoints.
