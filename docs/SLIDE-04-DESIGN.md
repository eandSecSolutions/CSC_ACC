# Slide 04 — Command Center design brief

## Intended message

The command center combines a shared operating picture, specialist judgment and clear authority. It connects existing systems and coordinates action without replacing each domain's immediate safety controls.

## Visual choice

A detailed photographed operations room supplies the sense of place and scale. The scene has a matched night/day pair, restrained screen illumination and warm architectural light. Selectable zones connect the visible room to its operating role.

The mechanisms are more informative in 2D: an SVG operating chain shows information reaching human approval and then domain acknowledgement; a dual-route diagram explains loss of connectivity and reviewed resumption. No additional 3D model is needed to explain these relationships. The existing intro retains 3D where spatial aircraft motion is useful.

## Three views

| View             | Audience action                                                        | What becomes clear                                                                 |
| ---------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Operations floor | Select wall, console or command zone; inspect capability nodes         | Responsibilities within the room and services behind it                            |
| Alert to action  | Start the trace, review the approval stop and approve                  | AI supports a decision; the responsible person authorizes; the domain acknowledges |
| Continuity       | Simulate connection loss, inspect the held state and review resumption | Connection availability does not itself authorize new task dispatch                |

The connectivity example is conditional on a designed and tested alternate route. It does not claim an implemented high-availability architecture. Local asset safety policies remain separate from the center's new-dispatch hold.

## Interaction and layout contract

The photograph and operating-chain dock use identical dimensions across the three tabs. Explanatory content scrolls in the side panel; the action button remains outside that scrolling region. Diagram motion pauses with the slide, hidden browser tabs and motion settings. Reduced motion skips travel while retaining the human decision gates.

Tabs support arrows, Home and End, with Arabic-aware navigation. Arabic reverses the logical operating chain but not the photographed room or global chrome. All imagery, styles, fonts and libraries are local, with no network dependency during presentation.

All states, routes and status messages are illustrative. No real telemetry, control message, failover or operational authorization occurs.
