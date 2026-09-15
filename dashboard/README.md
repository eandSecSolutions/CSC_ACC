# UAE Autonomous Command Center — Interactive Demo v0.2.9

This standalone package contains the complete **Command Center**, **Live Map**, **Drone Operations**, **Robotics Command Center**, **Maritime Operations Center**, **Autonomous Mobility Operations Center**, **AI Intelligence & Assurance Center**, **National Incident Command Center**, **Fleet Readiness & Lifecycle**, flagship **Federated Digital Twin**, **National Analytics**, **Cyber-Physical Security Operations**, **Mission Command**, **Governed Reports** and **Platform Settings** modules for the v0.15.6 proposal baseline. Every top-level navigation section is now fully developed.

## Launch

Open `index.html` in a modern Chromium/Edge browser on desktop, tablet or phone. No build step is required.

Open `presentation-integration.html` to test the exact **View dashboard** overlay and **Launch dashboard** new-window patterns intended for the proposal deck. See `INTEGRATION.md` for deep-link parameters and the small presentation-control API.

The dashboard opens directly from `file:///` with no build step. Its UI, fonts, branding, evidence imagery, simulated data and fallback map are packaged locally. The live map uses the corporate-network-tested ArcGIS Maps SDK 4.33 and verified public Esri services.

## Demonstration path

1. Open **Live Map** for the role-scoped national common operating picture. Filter air, land, robotics and maritime tracks; focus a national sector; inspect coverage assurance, fused events, temporal playback, correlation and map-based command actions.
2. Open **Fleet** as Dr. Aisha or switch to **Maj. Saeed Al Dhaheri · FLT-CMD**. Inspect the 53-asset register, digital passport, condition forecast, configuration baseline, maintenance workbench, compliance ledger, critical spares and seven-day readiness forecast.
3. Open **Analytics** for the role-filtered national performance cockpit. Change period, domain, region and metric; inspect the national composite, readiness time series, mission portfolio, emirate benchmark, predictive outlook, performance drivers and AI-generated commander brief. Every card opens a governed analytical drilldown.
4. Open **Security** as **Fatima Al Ameri · SOC-CMD**. Select SEC-219, inspect the national zero-trust trust graph, correlated detection timeline, attack chain, privileged identities, asset attestation, response playbook and evidence vault, then demonstrate responder-only containment. Switch to **Leila Al Qasimi · SEC-AUD** to show the same governed evidence with containment denied.
5. Open **Digital Twin** as Dr. Aisha or switch to **Eng. Noura Al Marri · TWIN-CMD**. Begin with the ten national KPIs, eleven governed model layers, federation health, selected district, selected twin object, temporal state, sensor mesh and environment envelope.
6. Switch among Abu Dhabi, Dubai, Al Ain, Sharjah, Ras Al Khaimah and Fujairah, then move between governed districts and facilities. The same cached SceneView flies to the corresponding real terrain, imagery and OSM 3D buildings.
7. Expand the map full-screen. Switch 2D Street, Satellite, Terrain and 3D, then pan, tilt, rotate, reset north, use oblique/top-down views or start continuous 360-degree orbit. Use the map console to show/hide buildings, labels and elevation; change building color, opacity, shadows and rendering quality.
8. Select a 3D facility object or its persistent beacon. Open the object dossier, dependency graph, sensor mesh, individual sensor diagnostic, district twin, federated model register, camera fabric and immutable event ledger.
9. Open the **Predictive Scenario Lab**, compare baseline and modeled service continuity, select a scenario and run it in the live twin. Inspect the three-dimensional impact envelope, cascading infrastructure effects, affected autonomous assets and recovery objective.
10. Move the temporal slider to change sunlight and shadows. Switch clear, cloud, fog and rain scene weather. Launch direct 3D measurement, line-of-sight or building slice analysis from the map toolbar.
11. Switch from TWIN-CMD to a domain commander and then Security Auditor. Observe-only roles see locked simulation and infrastructure controls; the auditor receives approximate district geometry, protected imagery and denied camera access.
12. Open **Incidents** and select INC-023 to present the national detect → declare → coordinate → respond → recover → audit workflow with Command Dossier, Evidence Wall, Correlation Graph, Action Plan, Resource Board, Communications Bridge and SITREP.
13. Open **AI Intelligence** and select AI-DET-1907 to demonstrate explainability, provenance, decision trace, model operations, human approval and impact simulation.
14. Continue through **Autonomous Mobility**, **Maritime**, **Robotics** and **Drone Operations** for their domain-specific fleet, evidence, mission, telemetry and command workflows. All modules reuse the same map and enforce the selected identity.
15. Open **Missions** as Col. Rashid Al Marzouqi · JOC-CMD. Select a joint mission, inspect its real 3D operating map, objectives, timeline, dynamic risk, assigned air/land/sea resources and immutable activity, then demonstrate mission approval or retasking.
16. Open **Reports** to preview bilingual governed products, scope the period/category/region, inspect machine-assisted findings and evidence lineage, then demonstrate signed publication versus executive read-only access.
17. Open **Settings** as Salem Al Mansoor · SYS-ADMIN. Move through platform, roles, map, autonomy, security, integrations, notifications and retention policies; stage a setting and inspect the change-control and audit evidence.
18. Return to **Command Center**, then toggle Arabic/English, dark/light mode and the header's **Small / Medium / Large** text sizes. Arabic changes content, reading direction, drawer position and layout behavior; the chosen text size persists between sessions.

## Image optimization

All operational visuals are optimized WebP/JPEG assets. Digital Twin reuses the strongest existing infrastructure, mobility, maritime and aerial evidence instead of duplicating raster files. The release archive excludes all multi-megabyte source PNG files.

## v0.2.9 deterministic typography and clipping correction

- Replaced the header Demo Mode chip with an accessible three-state **Small / Medium / Large** text-size control; Large is the default and the selection persists locally.
- Removed viewport-driven font growth. A 1920 px monitor and a laptop now use the same chosen tier instead of silently changing the dashboard's typography.
- Coupled each type tier to compatible row, action and card spacing so Incident, AI, fleet and operational registers expand rather than clip their content.
- Widened critical Incident, AI, Reports and other side rails on large displays while preserving the fluid central work area and the existing tablet/mobile stack.
- Report names now use a controlled two-line treatment, scope/navigation rails contain overflow safely, and dense panel scrolling remains local and styled.
- Preserved all 15 modules, 16 role views, English/Arabic RTL, dark/light themes, optimized imagery, map modes and the single cached ArcGIS SceneView.

## v0.2.8 responsive typography and theme polish

- Replaced hundreds of legacy 4.5–8 px labels with a consistent fluid type scale and clear label/value/context hierarchy across all 15 modules.
- Added styled, high-contrast scrollbars to every operational register, drawer, table and modal while preserving stable panel widths.
- Rebuilt the light-theme palette with stronger text, borders, form controls and card separation; map controls deliberately retain dark backplates over live imagery.
- Added true tablet and phone layouts: scrollable navigation and KPI carousels, stacked workspaces, responsive reports and forms, touch-sized controls, full-height mobile modals and safe-area-aware footer controls.
- Added restrained hover, focus, pressed and transition states with a complete reduced-motion fallback. The update adds no image, 3D scene, map layer or runtime dependency.

## v0.2.7 presentation-readiness polish

- Added a bilingual guided walkthrough that opens from the footer or `G` key, with a concise recommended route through the national picture, real UAE 3D scene, Digital Twin, role controls, incidents, analytics and governed reports.
- Added deterministic full-demo restart to restore the approved opening state: Dr. Aisha Al Mansoori, Command Center, English, dark theme and default balanced 3D configuration.
- Added safe deep links for module, role, language and theme, plus a compact JavaScript and `postMessage` integration surface for presentation overlays and separate-window launch.
- Added `presentation-integration.html` as a working reference for the proposal slide's View and Launch buttons.
- Tightened focus states, text truncation, Arabic typography, modal tables, footer density, compact-height layouts, small-width navigation and full-screen map overlay legibility.
- Preserved the single cached ArcGIS SceneView, inactive-module suspension, Balanced default rendering and optimized WebP/JPEG imagery. The polish adds no new runtime library, map context or raster payload.

## Role simulation

| Identity | Role | Primary scope | Authority behavior |
| --- | --- | --- | --- |
| Dr. Aisha Al Mansoori | National Commander | UAE / all domains | Full command and approval |
| Mariam Al Suwaidi | Robotics Operations Commander | UAE / robotics | Ground-domain mission and remote-control authority |
| Omar Al Nuaimi | Air Domain Commander | UAE / air | Air-domain command |
| Sherif Kamal | Incident Manager | Abu Dhabi + Dubai | Incident response, no emergency override |
| Khalid Al Mazrouei | Maritime Operations Lead | Abu Dhabi + Fujairah / sea | Maritime mission and remote-helm authority; emergency approval required |
| Sara Al Kaabi | Autonomous Mobility Commander | UAE / road mobility | Fleet, route, emergency and teleoperation authority |
| Hamad Al Shamsi | AI Operations & Assurance Director | UAE / all AI domains | Model operations, human decision approval, assurance and audit authority |
| Noor Al Ketbi | Intelligence Analyst | UAE / aggregated and masked | Analysis and export; no commands |
| Faisal Al Hammadi | Field Operator | Abu Dhabi / four assigned units | Assigned-unit dispatch and camera |
| Leila Al Qasimi | Security Auditor | UAE / masked | Audit and security administration |
| Eng. Noura Al Marri | Digital Twin & Infrastructure Director | UAE / federated twin | Model federation, simulation and controlled infrastructure-isolation authority |
| Maj. Saeed Al Dhaheri | Fleet Readiness Director | UAE / all fleet domains | Lifecycle, maintenance-release and configuration-baseline authority |
| Fatima Al Ameri | National Cyber-Physical Security Commander | UAE / cyber-physical security | Security investigation, containment and restoration authority |
| Col. Rashid Al Marzouqi | Joint Mission Director | UAE / all operational domains | Joint-mission planning, command and high-risk approval |
| Salem Al Mansoor | Platform Systems Administrator | UAE / masked operational content | Platform configuration and change administration |
| Executive Demonstration | Executive Viewer | UAE / aggregated | Executive read-only view |

Drone Operations is assigned to the National Commander, Air Domain Commander, Incident Manager, assigned-unit Field Operator and Security Auditor. The Field Operator sees only two assigned drones. The Security Auditor gets masked-location, audit-only access with the camera feed obscured and every flight command denied. Maritime, intelligence and executive identities see the module locked.

Robotics is assigned to the National Commander, Robotics Operations Commander, Incident Manager, assigned-unit Field Operator and Security Auditor. The Robotics Commander can issue mission, emergency and remote-drive commands nationally; the Field Operator can remotely drive only assigned units; the Security Auditor receives masked, audit-only access with camera and controls locked.

Maritime is assigned to the National Commander, Maritime Operations Lead, Incident Manager and Security Auditor. The National Commander has full mission, emergency and helm authority. The Maritime Operations Lead controls Abu Dhabi and Fujairah vessels and can request, but not execute, an emergency override. The Security Auditor receives masked locations, protected imagery and read-only controls.

Autonomous Mobility is assigned to the National Commander, Autonomous Mobility Commander, Incident Manager and Security Auditor. MOB-CMD receives national vehicle visibility, route, emergency and teleoperation authority. The Incident Manager is limited to Abu Dhabi and Dubai and cannot teleoperate; the Security Auditor receives masked locations, protected imagery and read-only controls.

AI Intelligence is assigned to the National Commander, AI Operations & Assurance Director, Intelligence Analyst and Security Auditor. AI-CMD can authorize model operations and human-in-the-loop decisions. The Intelligence Analyst can inspect models, explain detections and export analysis but cannot deploy or approve. The Security Auditor receives masked evidence and audit-only controls.

Incidents is available to operational command, domain, field, intelligence and audit roles according to their region and domain scope. NAT-CMD and INC-MGR can orchestrate incidents; closure and public warning require explicit permissions. Domain commanders and field operators can inspect or respond within scope but cannot silently assume national incident authority. The auditor receives masked evidence and read-only access.

Digital Twin is available to National Command, TWIN-CMD, selected domain commanders and the Security Auditor. NAT-CMD and TWIN-CMD can configure federation state, run impact simulations and authorize simulated infrastructure isolation. Domain commanders have observe-only access. The Security Auditor receives approximate district geometry, protected visual context and no camera access while retaining the governed event and federation records.

Analytics is available to executive, intelligence, command, domain and audit identities. Metrics automatically respect domain and region scope, and the executive identity receives an aggregated decision view. The module introduces no extra map or WebGL context.

Security is available to National Command, SOC-CMD, AI assurance, fleet, digital-twin and audit identities. SOC-CMD and NAT-CMD may authorize simulated containment; SEC-AUD can inspect complete evidence and policy decisions but cannot execute response actions.

## v0.2.6 Mission Command + Reports + Settings

- Added a national mission register, reusable templates, shared live 3D mission map, execution timeline, objective tracking, dynamic constraints, mission dossiers, multi-domain resource packages, immutable activity and gated mission commands.
- Added a governed reporting center with role-filtered product catalog, bilingual report preview, machine-assisted narrative, evidence lineage, schedules, controlled distribution, evidence packages, version history and signed publication controls.
- Added a platform-governance workspace covering localization, roles, 3D rendering, autonomy guardrails, security baselines, integrations, notifications, retention, service health, change approval, audit and recovery.
- Added Col. Rashid Al Marzouqi as Joint Mission Director and Salem Al Mansoor as Platform Systems Administrator. Mission command, report publication and system administration use separate permissions.
- Missions reuses the single cached ArcGIS SceneView. Reports and Settings suspend the hidden SceneView, so the completed application preserves the established GPU and memory controls.

## v0.2.5 National Analytics + Cyber-Physical Security

- Added a national decision-analytics cockpit with eight executive KPIs, multi-axis scope controls, composite scoring, time-series analysis, domain and emirate comparisons, mission outcomes, predictive outlook, automated material signals, performance-driver analysis and governed saved views.
- Added a cyber-physical SOC with security posture, detection queue, live trust graph, correlated event timeline, attack-chain visualization, privileged access monitoring, software/configuration attestation, investigation dossier, response playbook and immutable evidence vault.
- Added Fatima Al Ameri as National Cyber-Physical Security Commander with distinct containment and restoration authority. The existing Security Auditor remains evidence-rich but response-restricted.
- Analytics and Security explicitly suspend the cached ArcGIS SceneView while active, avoiding hidden GPU rendering and preserving the one-map performance architecture.

Live Map is available to national, domain, incident, intelligence, field, twin and audit roles. Every map contact, sector and event is filtered by the active domain, region, assignment and precision policy. Fleet is available to national command, FLT-CMD, selected domain/incident/twin roles and the auditor. Only NAT-CMD and FLT-CMD can control fleet lifecycle records; maintenance release and configuration baseline changes have separate permission gates.

## v0.2.4 Live Map + Fleet Readiness

- Added a national multi-domain Live Map with ten live KPIs, ten operational layers, six regional command sectors, eight fused geo-events, four sensor-coverage fabrics, temporal playback, a correlation matrix and map-native command actions.
- Added air/land/robotics/sea filters that synchronize the ArcGIS operational overlays, domain zones, bases, ports, V2X context, weather, 3D asset models, persistent beacons and routes without creating another SceneView.
- Added coverage assurance, event ledger, multi-domain correlation, sector command board, contact track/dossier and interactive 3D geospatial-analysis drilldowns.
- Added a complete Fleet Readiness & Lifecycle workspace covering all 53 assets, digital passports, component health, utilization, configuration baselines, deployment allocation, active maintenance, compliance certificates and MRO spares.
- Added eight work orders, five certificate groups, five critical-spares records, six lifecycle events, seven-day readiness forecasting, peer comparison and role-gated maintenance/configuration actions.
- Added Maj. Saeed Al Dhaheri as Fleet Readiness Director with distinct fleet-management, maintenance-release and configuration-baseline permissions. Audit and domain roles receive granular view-only behavior.
- Reused the optimized WebP/JPEG imagery and the single cached ArcGIS SceneView. New Live Map and Fleet layers are signature-cached; repeated scenario ticks update positions without reconstructing static 3D graphics.

## v0.2.3 Federated Digital Twin

- Added a flagship national Digital Twin workspace spanning six UAE cities, nine governed districts, ten critical facilities, ten live sensor endpoints, eight utility/dependency links, five predictive scenarios and eight signed temporal events.
- Added a unified 3D operating view with real Esri imagery, street and terrain modes, World Elevation 3D and the verified global OSM 3D Buildings scene layer; all existing camera, 360-degree orbit, full-screen and building appearance controls remain available.
- Added clickable 3D infrastructure solids, persistent facility beacons and labels, sensor markers, elevated network topology, scenario impact envelopes and autonomous-asset routing to the selected twin object.
- Added live 3D measurement, line-of-sight and building-slice tools, plus time-of-day sunlight/shadow control and clear/cloud/fog/rain scene weather.
- Added object dossiers, condition prediction, governed dependency graphs, national sensor matrix, sensor diagnostics, geo-registered camera wall, district twins, federation/source register and an immutable event ledger.
- Added a predictive Scenario Lab comparing baseline and modeled service continuity, cascading impact, facility exposure, autonomous-asset delay and recovery objective before activating a simulated impact envelope.
- Added controlled two-step infrastructure isolation with explicit TWIN-CMD/NAT-CMD authority, audit recording and visible locked states for observe-only roles.
- Added Eng. Noura Al Marri as Digital Twin & Infrastructure Director. The Security Auditor now receives approximate district geometry, protected imagery and denied camera access in both live ArcGIS and local fallback modes.
- Reused the single cached SceneView and existing optimized imagery. Digital Twin layers are signature-cached and remain stable during temporal playback, so no new WebGL scene or repeated static reconstruction is introduced.

## v0.2.2 National Incident Command Center

- Added a national incident triage register with active, high-priority, resolved and closed views; seven rich case records span airspace, maritime, aviation, mobility, critical infrastructure and perimeter-security events.
- Added a selected-incident command post with operational phase, incident level, commander, command post, SLA, response progress, impact, lead hypothesis, unified-command agencies and command objectives.
- Added a multi-source evidence wall, time-aligned EO/thermal/semantic imagery, evidence integrity sealing and a visual chain from sensor capture through the immutable command record.
- Added cross-domain correlation analysis linking incidents, AI detections, affected infrastructure, responding assets and external authorities.
- Added an Incident Action Plan with accountable owners, deadlines, control measures and operational-period status; a resource board covers capability, tasking, ETA, secure communications and deployment state.
- Added recorded inter-agency communications, an immutable national event ledger and a presentation-ready command SITREP.
- Added granular incident-command, closure and public-warning permissions with visibly gated escalation, allocation, warning and closure workflows.
- Extended the single cached ArcGIS SceneView with response perimeters, incident command-post markers and responder routes while preserving real terrain, imagery, OSM 3D buildings, 2D/3D switching and full-screen controls.
- Reused optimized WebP/JPEG operational imagery and added no duplicate raster payload.

## v0.2.1 AI Intelligence & Assurance Center

- Added a national multi-domain AI workspace covering seven signed production models, six live fused detections, four operational decisions, six edge inference nodes and an immutable governance event stream.
- Added model health, precision/recall, drift, latency, deployment and artifact-signature views with full production model cards, shadow-testing and controlled rollback workflows.
- Added multi-sensor evidence imagery, semantic/signal modes, feature attribution, counterfactual confidence, end-to-end provenance and auditable decision traces.
- Added human-in-the-loop decision queues, risk-aware authority gates, impact simulation, a responsible-AI assurance index and explicit mandatory-human-authority policy.
- Extended the single cached ArcGIS SceneView with confidence markers, correlation footprints, multi-domain fusion paths and edge-AI nodes while retaining every 2D/3D, building and full-screen control.
- Added Hamad Al Shamsi as AI Operations & Assurance Director and separated model-action, decision-approval, analysis, evidence and audit permissions across role simulations.
- Reused already optimized operational imagery, adding no duplicate high-resolution image payload to the package.

## v0.2.0 Autonomous Mobility Operations Center

- Added ten road vehicles, four mission packages, five V2X junctions, five mobility hubs, four ODD/safety zones and seven operational events.
- Added forward/semantic/platform camera modes, autonomy and passenger dossiers, route/ODD control, traffic orchestration, engineering telemetry and a live L4 safety argument.
- Extended the cached ArcGIS SceneView with vehicle-only filtering, real UAE roads and 3D buildings, GLB vehicle models, road routes, V2X nodes, depots and mobility-zone overlays.
- Added role-gated reroute, safe hold, teleoperation and emergency stop workflows with two-person authorization presentation and full audit capture.
- Added two 1280px WebP visuals totaling under 250 KB. Release packaging excludes all high-resolution source PNG files.

## v0.1.9 Maritime Operations Center

- Added a complete Maritime Operations workspace with eight coastal assets, a searchable vessel register, four mission packages, six fused contacts, a collision-advisory scenario, mission navigation, live imagery, marine weather and a seven-event operational stream.
- Added marine-only ArcGIS filtering, locally packaged 3D unmanned-surface-vessel models, persistent ship beacons, coastal mission routes, port nodes, navigation zones, live buoy markers and AIS/radar/visual contacts around real UAE ports and coastal operating areas.
- Added a detailed CPA/TCPA collision-prediction radar, COLREGS Rule 15 drilldown, recommended heading/speed solution, protected-channel compliance and port-authority workflow.
- Added three optimized maritime visuals for vessel readiness, EO channel navigation and thermal unknown-contact evidence, with a sensor-fusion classification overlay and evidence-integrity metadata.
- Added role-gated remote helm, hold-position, return-to-port, mission-change and emergency-manoeuvre actions. Domain operators submit high-risk override requests; only authorized command roles execute them.
- Added port/base dossiers, four metocean stations, sea state, wind, waves, current, tide and visibility drilldowns with English/Arabic and dark/light treatments.
- Preserved 2D Street, Satellite, Terrain and 3D modes, OSM 3D buildings, elevation, full-screen map, 360-degree orbit, camera controls, building appearance settings and the offline fallback.
- Kept a single shared cached ArcGIS SceneView across all four completed modules; maritime graphics remain static-cached while only vessel positions update during simulation ticks.

## v0.1.8 Robotics Command Center

- Added a complete Robotics Operations workspace matching the supplied command-center reference: category rail, fleet summary/statistics, 3D fleet map, selected-unit dossier, mission controls, telemetry, live camera, remote driving, event register and searchable robot table.
- Added real robot-only ArcGIS scene filtering, locally packaged 3D robot models, persistent beacons and labels, short ground-route geometry, controlled ground geofences and robot-base graphics around real UAE operating locations.
- Preserved 2D Street, Satellite, Terrain and 3D modes, full-screen map, 360-degree orbit, pan/tilt controls, street labels, real elevation, OSM 3D buildings, transparency/colors and building visibility.
- Added three optimized UAE critical-infrastructure robot visuals, RGB/thermal/wide camera modes, evidence comparison, Edge AI assessment, chain-of-custody metadata and incident correlation.
- Added four mission packages, seven immutable operational events, four charging/operations bases and three safety geofences using simulated bilingual data.
- Added Mariam Al Suwaidi as Robotics Operations Commander, a new remote-control permission, assigned-unit field control and visibly locked/masked experiences for read-only roles.
- Kept one ArcGIS SceneView across all three modules, module-specific cached layer profiles, balanced rendering, hidden-tab suspension and position-only live updates to avoid multiplying WebGL memory.

## Live map implementation

- 2D: Esri World Street Map in a top-down SceneView
- Satellite: Esri World Imagery with optional labels
- Terrain: Esri World Terrain Base over real World Elevation 3D
- 3D Map: Esri imagery, World Elevation 3D and the verified global OpenStreetMap 3D Buildings SceneLayer
- Role-filtered assets, incidents, geofences, mission corridors, weather, ports, AIS contacts and camera markers use real geographic coordinates
- Drone Operations adds dedicated restricted-airspace polygons, flight corridors, landing-pad markers and mission-focused aircraft filtering
- The 53 simulated assets are intentionally deployed around the main city, island, port and coastal operating areas rather than empty inland areas
- Four locally packaged low-poly glTF/GLB operational models provide recognizable drone, autonomous vehicle, unmanned surface vessel and inspection-robot symbology
- Automatic symbology uses crisp 2D silhouettes at national scale and switches to true 3D object models at city scale; persistent domain beacons, callout stems and ID labels keep assets visible above 3D buildings
- Building controls: show/hide, natural/graphite/cyan/amber/red renderers, 12–100% opacity and real-time shadows
- The previous local UAE vector map remains packaged as an automatic fallback if any live 3D dependency fails

No API key, Mapbox account or credit card is required. Internet access to the verified Esri domains is required for live cartography; all dashboard functions and the local fallback remain available if that connection is interrupted.

## v0.1.7 performance and memory pass

- Replaced periodic full ArcGIS scene reconstruction with signature-based caches for assets, incidents, no-fly zones, routes, weather, bases and building settings.
- Live simulation now updates only existing geometry coordinates. Models, beacons, labels and route objects rebuild only when their membership, selection, visibility or rendering mode actually changes.
- Added a **Balanced** default renderer that retains imagery, terrain, OSM 3D buildings, shadows, models and every camera control while reducing WebGL quality-profile and ambient-occlusion memory. **High Fidelity** remains available instantly in the map console.
- Stopped rebuilding the inactive Command Center or Drone Operations page. Heavy drone imagery and drilldown DOM are released when that module is not active and reconstructed when reopened.
- Fully removes the animated local fallback from browser painting once ArcGIS is ready; it remains packaged and is restored automatically if the live scene fails.
- Loads full-screen domain-feed imagery only when full-screen mode is opened, decodes active imagery asynchronously and clears it after exit.
- Suspends simulation redraws, map pulses and CSS animation work when the browser tab is hidden or a detailed overlay covers the map.
- Coalesces window-resize and building-opacity events into single animation-frame updates and performs explicit WebGL/object-URL cleanup when the page closes.
- Added a deterministic performance regression test proving repeated simulation synchronization does not reconstruct static ArcGIS graphics.

## v0.1.6 Drone Operations intelligence pass

- Added three presentation-grade UAE operational visuals: matched RGB and radiometric thermal tower-inspection evidence plus a blue-hour drone launch-and-recovery base view.
- Rebuilt the camera area around evidence analysis with live anomaly cues, RGB/thermal/zoom switching, a four-item evidence filmstrip, integrity metadata and role-gated export and incident actions.
- Added side-by-side frame registration, AI hotspot inspection, temperature delta, confidence, geospatial correlation and review workflow overlays.
- Expanded Mission Control into a full command workbench with authorization, Remote ID, NOTAM conflict status, weather envelope, risk score, corridor capacity and complete mission-specific waypoint registers of up to twelve points.
- Added aircraft readiness, payload and maintenance drilldowns covering batteries, propulsors, GNSS, firmware, storage, EO/IR, LiDAR, command-link health and component service history.
- Added four map-native intelligence launchers and analytical overlays for five controlled airspace sectors, five restrictions, four weather stations, secure command-network topology and six operational bases.
- Made ArcGIS no-fly zones, mission routes, landing pads and weather graphics clickable so the live 3D scene leads directly into the corresponding command overlay.
- Added full event-stream and AI-insight review surfaces, stronger light/RTL handling, full-screen map placement and responsive dense-layout rules.
- Preserved granular role behavior: camera-denied users see protected evidence, read-only users cannot issue flight commands, and export/emergency actions continue to enforce their assigned permissions and approvals.

## v0.1.5 Drone Operations module

- Added a complete role-aware Drone Operations workspace with nine live KPIs, searchable/filterable fleet register and selected-aircraft mission context.
- Added a dedicated generated inspection-drone hero visual, animated status treatment and overview, sensor and telemetry tabs.
- Added a multi-mode EO/IR camera with normal, thermal and zoom treatments, live HUD data, reticle and permission-based masking.
- Added six detailed mission packages, mission progress, waypoint status, route compliance, flight clearance, weather envelope and battery-reserve drilldowns.
- Added recent mission-event and AI-flight-insight streams with interactive analytical overlays.
- Added ArcGIS no-fly-zone graphics, flight corridors, landing pads and drone-only 2D/3D operating layers while preserving buildings, labels, elevation and full-screen camera control.
- Added isolated map-layer profiles so Command Center and Drone Operations remember the appropriate operational picture when switching modules.
- Added bilingual English/Arabic content, RTL behavior, dark/light treatments and role-based command/approval logic throughout the new page.

## v0.1.4 3D asset-visibility update

- Redistributed every drone, robot, vehicle and marine unit into operational clusters around Abu Dhabi, Yas Island, Dubai, Sharjah, Al Ain, Ras Al Khaimah and Fujairah.
- Restricted marine units to realistic coastal waters, port channels and anchorages.
- Added a dedicated ArcGIS beacon layer that stays screen-readable above buildings even when a physical GLB model is small or occluded.
- Added persistent domain silhouettes, leader lines, asset IDs and a stronger animated selection halo at city zoom.
- Widened the default Abu Dhabi camera footprint so the opening 3D scene contains eleven visible operational assets across all four domains.
- Preserved true 3D object models, role filtering, map controls, building controls, Arabic RTL, full-screen mode and the local fallback.

## v0.1.3 multi-domain visual update

- Replaced generic live-map dots with recognizable air, land, sea and robotics silhouettes and locally embedded 3D glTF models.
- Added Automatic / 2D / 3D symbology control while retaining role masking, aggregation, selection and animated movement.
- Added native browser full-screen with a fixed-layout fallback and automatic ArcGIS canvas resizing.
- Added an interactive four-domain live-feed rail in full-screen mode and domain-specific evidence drilldowns.
- Added three new realistic UAE operational feeds: Yas Island aerial ISR, Khalifa Port USV patrol and Abu Dhabi substation UGV inspection.
- Upgraded the selected-asset card, incident queue, map legend, surface hierarchy, light mode and full-screen presentation.

## v0.1.2 live 3D update

- Replaced the illustrative procedural map with the successfully tested ArcGIS live 3D architecture.
- Added genuine UAE imagery, street, terrain, elevation and global OSM building data.
- Added a comprehensive camera console, cinematic location presets and automatic 360-degree orbit.
- Added granular scene, operational-layer and building-appearance controls.
- Rebuilt map overlays in ArcGIS GraphicsLayers so RBAC filtering, incident selection and asset drilldowns remain synchronized with the camera.
- Preserved the v0.1.1 local map as a visible loading surface and automatic failure fallback.

## Included assets

- Original e& and CSC brand assets from the v0.15.6 package
- Local English and Arabic fonts
- Generated fictional operational evidence imagery—including matched RGB/thermal inspection frames, drone launch/base imagery, maritime EO/thermal/USV views and mobility vehicle/road-camera views; none depicts a real incident or branded vehicle
- Four locally generated low-poly GLB models plus their embedded JavaScript payload for reliable `file:///` use
- 53 simulated autonomous assets, 7 incident cases, 6 national Live Map sectors, 8 fused geo-events, 8 fleet work orders, 6 federated cities, 10 governed facilities, 10 twin sensors, 5 predictive twin scenarios, AI alerts and 16 role policies

## Scope boundary

All top-level modules are fully developed in this release: Command Center, Live Map, Drone Operations, Robotics, Maritime, Autonomous Mobility, AI Intelligence, Incidents, Fleet, Digital Twin, Analytics, Security, Missions, Reports and Settings. No navigation section remains a placeholder.

## Validation

Run `node tests/validate.js` for package, translation and feature integrity; `node tests/presentation-polish.js` for the presentation bridge, deep links, reset scope, RTL/light/focus polish and image ceiling; `node tests/live-map-fleet-runtime.js` for Live Map/Fleet interaction, drilldowns, RBAC and bilingual runtime behavior; `node tests/digital-twin-runtime.js` for Digital Twin behavior; and `node tests/performance.js` for the cached ArcGIS synchronization regression. These tests are optional and are not required to launch the standalone dashboard.
