# Slide 06 — Response

## Intended executive takeaway

One response needs a shared incident context, complementary asset roles, explicit authority to act and evidence for closure. Arrival alone does not establish resolution.

## Visual treatment

A detailed coastal utility campus establishes the proposed setting. The night image uses navy sea, practical amber beacons and warm architectural lighting; the daylight edit preserves the same camera and geometry. Both are locally packaged WebP. A separate SVG control view explains aerial and ground movement without placing crude 3D assets over the photograph.

The photographic viewport and 2D dock have a fixed grid. Changing tabs only changes the adjacent narrative. Long content scrolls inside that panel. On small screens, the workspace scrolls internally with the photo and control dock above the narrative. Shared header and footer positions remain fixed across languages. The schematic represents physical geography and retains its orientation; Arabic labels and narrative read naturally right to left.

The existing Canvas renderer produces photo-aligned light blooms, screen sweeps and sparse particles. The still photograph's parked vehicles do not move. The SVG tokens do move, and their heading markers follow route segments. Existing local GSAP animates narrative changes; no extra 3D library or runtime dependency is needed.

## Exercise sequence

1. Review the roles: UAV-021 provides an aerial view; UGV-008 performs ground verification; the operator authorizes critical actions.
2. Choose whether the service lane is blocked. The setting locks after dispatch and can be changed after restarting.
3. Approve simulated dispatch. Opening the Coordinate or Verify tab never grants approval.
4. In the blocked branch, both assets stop at progress 0.42. The aircraft holds its observation position and the rover stops before the obstruction. Elapsed time cannot pass this gate.
5. Approve the alternate route. The ground track continues from the same hold point via a visible detour; no positional jump is introduced. In the clear branch, this extra approval is not required.
6. After both tracks finish, review two simulated findings. Each can be selected or deselected. Closure remains unavailable until both are reviewed.
7. Confirm closure. The local decision record shows which approvals and reviews occurred. It makes no claim of externally persisted audit logging.

The 12-second animation scale and normalized progress are illustrative, not operational travel time or measured mission performance. Paths are a schematic and not a map suitable for navigation. The example assumes an inspection mission has been scoped and cleared; it does not calculate operational airspace, weather or access permissions.

## Lifecycle and reduced motion

One requestAnimationFrame loop owns both SVG movement and Canvas atmosphere, capped near 30 fps. Pause and hidden-page state suspend it. Reduced motion presents the next gate immediately following an explicit action; it never auto-approves dispatch, detour or closure. Leaving the slide destroys its loop, observer, tween and effects. Each new mount creates an independent example.

## Editable files

- `assets/config/slides/06-response.js`: all business copy, Arabic, roles and effect coordinates.
- `assets/scripts/slides/06-response.js`: markup, route geometry, pose interpolation and decision gates.
- `assets/styles/slides/06-response.css`: layout, dock, tracks, cards and day/night styles.
- `assets/images/response/campus-night.webp` and `campus-day.webp`: matched scene pair.
- `assets/config/media.js`: image registration under `ACCAssets.response`.

`pose(progress, alternate)` determines both schematic positions. `advance(progress, delta, approved, blocked, rerouted)` enforces the dispatch and route gates. Altering the roles, number of findings, route gates or milestone semantics requires a corresponding controller update; changing wording alone does not.

## v0.14.0 refinement

The enlarged coordination view uses the existing stage bounds, preserving photographic sizing inputs and access to the adjacent action console. Escape restores the scene and returns focus. A separate operator hold can stop moving assets at their current positions. Approving resumption releases only that hold; the obstruction gate remains mandatory. The local decision record adds hold/resumption counts. Presentation pause still freezes animation without changing mission authorization.
