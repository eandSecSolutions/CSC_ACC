/** SLIDE 02 — cinematic Vision
 * Copy, focus coordinates and translations: assets/config/slides/02-vision.js.
 * Photographic artwork and light effects share one stable image-coordinate space.
 */
(() => {
  "use strict";
  const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));
  const smooth = (v) => {
    const x = clamp(v);
    return x * x * (3 - 2 * x);
  };
  function responseState(time, approved) {
    if (time < 2.5) return { phase: 0, progress: 0 };
    if (time < 5.5) return { phase: 1, progress: 0 };
    if (!approved) return { phase: 2, progress: 0 };
    if (time < 16.5) return { phase: 3, progress: smooth((time - 5.5) / 11) };
    return { phase: 4, progress: 1 };
  }
  window.ACCVisionScenario = { responseState };
  const SCENES = ["picture", "response", "authority"];

  window.ACCSlideViews.vision = ({ state, t, esc, icon, A }) => {
    const C = window.ACCSlides.vision,
      selected = clamp(state.tabs.vision || 0, 0, 2);
    return /* HTML */ `
      <section
        class="slide vision-slide"
        aria-labelledby="slideTitle"
        data-vision-tab="${SCENES[selected]}"
      >
        <div class="vision-backdrop" aria-hidden="true"></div>
        <header class="vision-heading">
          <div>
            <p class="eyebrow">${esc(t(C.eyebrow))}</p>
            <h1 id="slideTitle" tabindex="-1">${esc(t(C.title))}</h1>
          </div>
          <p class="vision-summary">${esc(t(C.summary))}</p>
        </header>
        <div class="vision-navigation">
          <div class="vision-tabs" role="tablist" aria-label="${esc(t(C.eyebrow))}">
            ${C.tabs
              .map(
                (tab, i) => /* HTML */ `
                  <button
                    class="vision-tab"
                    id="vision-tab-${i}"
                    role="tab"
                    data-vision-tab="${i}"
                    aria-selected="${i === selected}"
                    aria-controls="vision-panel"
                    tabindex="${i === selected ? 0 : -1}"
                  >
                    <span class="tab-preview" aria-hidden="true">
                      <img class="theme-night" src="${A.vision[tab.id].night}" alt="" />
                      <img class="theme-day" src="${A.vision[tab.id].day}" alt="" />
                    </span>
                    <span class="tab-number" dir="ltr">0${i + 1}</span>
                    <span>${esc(t(tab.label))}</span>
                  </button>
                `,
              )
              .join("")}
          </div>
          <div class="vision-playback" dir="ltr">
            <button
              class="vision-control"
              data-vision-action="pause"
              aria-label="${esc(t(C.ui.pause))}"
              title="${esc(t(C.ui.pause))}"
            >
              ${icon("pause")}
            </button>
            <button
              class="vision-control"
              data-vision-action="replay"
              aria-label="${esc(t(C.ui.replay))}"
              title="${esc(t(C.ui.replay))}"
            >
              ${icon("rotate-ccw")}
            </button>
          </div>
        </div>
        <div
          id="vision-panel"
          class="vision-workspace"
          role="tabpanel"
          aria-labelledby="vision-tab-${selected}"
        >
          <div class="vision-scene-card">
            <div class="vision-viewport">
              <div class="vision-camera">
                <div class="vision-world">
                  ${SCENES.map(
                    (id) => /* HTML */ `
                      <div
                        class="vision-photo-scene"
                        data-photo-scene="${id}"
                        style="opacity:${id === SCENES[selected] ? 1 : 0}"
                      >
                        <img
                          class="theme-night"
                          src="${A.vision[id].night}"
                          alt=""
                          draggable="false"
                        />
                        <img class="theme-day" src="${A.vision[id].day}" alt="" draggable="false" />
                      </div>
                    `,
                  ).join("")}
                  <canvas class="vision-atmosphere" aria-hidden="true"></canvas>
                  <div class="vision-focus" role="group" aria-label="${esc(t(C.ui.focus))}"></div>
                </div>
              </div>
              <div class="scene-edge-shade" aria-hidden="true"></div>
              <div class="vision-scene-chrome">
                <span class="scene-name">
                  <i aria-hidden="true"></i>
                  <span id="visionSceneName"></span>
                </span>
                <div class="scene-actions" dir="ltr">
                  <button
                    class="vision-control"
                    data-vision-action="focus"
                    aria-pressed="true"
                    aria-label="${esc(t(C.ui.hideFocus))}"
                    title="${esc(t(C.ui.hideFocus))}"
                  >
                    ${icon("crosshair")}
                  </button>
                  <button
                    class="vision-control scene-expand"
                    data-vision-action="expand"
                    aria-label="${esc(t(C.ui.explore))}"
                    title="${esc(t(C.ui.explore))}"
                  >
                    ${icon("expand")}
                    <span>${esc(t(C.ui.explore))}</span>
                  </button>
                </div>
              </div>
              <div class="mission-scene-status" hidden>
                <span class="mission-status-icon">${icon("radio-tower")}</span>
                <div>
                  <b id="missionSceneTitle"></b>
                  <span id="missionSceneDetail"></span>
                  <div class="mission-progress-track" aria-hidden="true"><i></i></div>
                </div>
              </div>
              <span class="vision-image-note">${esc(t(C.ui.illustrative))}</span>
            </div>
            <div class="vision-scene-dock"></div>
            <div class="vision-action-bar">
              <span id="visionHint"></span>
              <button class="approve-button" data-vision-action="approve" hidden>
                ${icon("shield-check")}
                <span>${esc(t(C.ui.approve))}</span>
                ${icon("arrow-right")}
              </button>
              <button class="vision-primary" data-vision-action="next">
                <span></span>
                ${icon("arrow-right")}
              </button>
            </div>
          </div>
          <aside class="vision-narrative"></aside>
        </div>
        <div class="vision-bottom">
          <span>${esc(t(C.footer))}</span>
          <span>${icon("user-round-check")}${esc(t(C.ui.human))}</span>
        </div>
      </section>
    `;
  };

  window.ACCSlideMounts.vision = (context) => {
    const { state, t, esc, icon, A, scope } = context,
      C = window.ACCSlides.vision;
    const root = document.querySelector(".vision-slide"),
      q = (s) => root.querySelector(s),
      qa = (s) => [...root.querySelectorAll(s)];
    let selected = clamp(state.tabs.vision || 0, 0, 2),
      domain = 0,
      level = 0,
      insight = 0,
      mode = context.motion;
    let time = mode === "full" ? 0 : selected === 1 ? 5.5 : 0,
      ambient = 0,
      approved = false,
      paused = false,
      expanded = false,
      focusVisible = true;
    let frame = 0,
      last = 0,
      phase = -1,
      dead = false,
      observer,
      atmosphere;
    const theme = { day: state.theme === "light" ? 1 : 0 },
      tweens = new Set();
    function tween(target, vars) {
      if (!window.gsap || mode !== "full") return null;
      const a = window.gsap.to(target, {
        ...vars,
        overwrite: "auto",
        onComplete: () => tweens.delete(a),
        onInterrupt: () => tweens.delete(a),
      });
      tweens.add(a);
      return a;
    }
    function reveal(target) {
      window.gsap?.killTweensOf(target);
      if (window.gsap && mode === "full") {
        const a = window.gsap.fromTo(
          target,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => tweens.delete(a),
            onInterrupt: () => tweens.delete(a),
          },
        );
        tweens.add(a);
      }
    }
    try {
      if (window.ACCVisionAtmosphere)
        atmosphere = new window.ACCVisionAtmosphere(q(".vision-atmosphere"), C.scenes);
    } catch (error) {
      console.warn(error);
    }

    function focusPoints() {
      const points = C.scenes[SCENES[selected]].focus;
      if (selected === 1)
        return /* HTML */ `
          <span
            class="mission-target"
            style="left:${C.scenes.response.target.x * 100}%;top:${C.scenes.response.target.y *
            100}%"
          >
            ${icon("scan-line")}
            <span>${esc(t(C.ui.incident))}</span>
          </span>
        `;
      return points
        .map((p, i) => {
          const active = selected === 0 ? i === domain : i === level;
          const text = selected === 0 ? C.domains[i].label : C.tabs[2].levels[i].title;
          const glyph = selected === 0 ? C.domains[i].icon : C.tabs[2].levels[i].icon;
          return /* HTML */ `
            <button
              class="focus-point"
              data-focus-${selected === 0 ? "domain" : "level"}="${i}"
              style="left:${p.x * 100}%;top:${p.y * 100}%"
              aria-pressed="${active}"
              aria-label="${esc(t(text))}"
              title="${esc(t(text))}"
            >
              ${icon(glyph)}
              <span>${esc(t(text))}</span>
            </button>
          `;
        })
        .join("");
    }
    function signalDiagram() {
      const glyph = (name, x, y) =>
        `<g transform="translate(${x - 10},${y - 10})">${icon(name).replace('class="ui-icon"', 'class="ui-icon" width="20" height="20"')}</g>`;
      if (selected === 0)
        return /* HTML */ `
          <div class="vision-diagram-card">
            <h3>${esc(t(C.ui.signalTitle))}</h3>
            <svg
              class="vision-signal-map"
              viewBox="0 0 350 168"
              role="img"
              aria-label="${esc(t(C.ui.signalNote))}"
              dir="ltr"
            >
              ${C.domains
                .map((d, i) => {
                  const y = 26 + i * 35;
                  return `<g class="signal-source ${i === domain ? "is-active" : ""}"><circle cx="23" cy="${y}" r="15"/>${glyph(d.icon, 23, y)}<text x="77" y="${y + 4}" text-anchor="middle">${esc(t(d.label))}</text><path d="M111 ${y} H132 L172 79"/><circle class="signal-packet" data-signal-packet="${i}" r="3"/></g>`;
                })
                .join("")}
              <path class="signal-link" d="M205 79 H290" />
              <circle class="signal-hub" cx="189" cy="79" r="23" />
              ${glyph("layers-3", 189, 79)}
              <circle class="signal-hub" cx="309" cy="79" r="20" />
              ${glyph("user-round-check", 309, 79)}
              <circle class="signal-output-packet" r="3.5" />
              <text class="signal-caption" x="189" y="122" text-anchor="middle">
                ${esc(t(C.ui.signalCase))}
              </text>
              <text class="signal-caption" x="309" y="122" text-anchor="middle">
                ${esc(t(C.ui.signalDecision))}
              </text>
            </svg>
          </div>
        `;
      if (selected === 1)
        return /* HTML */ `
          <div class="vision-diagram-card response-diagram-card">
            <h3>${esc(t(C.ui.responseDiagram))}</h3>
            <svg
              class="vision-response-map"
              viewBox="0 0 350 143"
              role="img"
              aria-label="${esc(t(C.ui.responseDiagram))}"
              dir="ltr"
            >
              <path class="response-route" d="M44 47 H298 M44 109 H298" />
              <path class="response-gate" d="M88 27 V63 M88 90 V129" />
              <text x="88" y="19" text-anchor="middle">${esc(t(C.ui.responseAir))}</text>
              <text x="88" y="82" text-anchor="middle">${esc(t(C.ui.responseGround))}</text>
              ${[47, 109]
                .map(
                  (y, i) =>
                    `<g class="response-map-asset" data-response-asset="${i}"><circle r="15"/>${glyph(i === 0 ? "drone" : "bot", 0, 0)}</g><circle class="response-destination" cx="298" cy="${y}" r="16"/><g class="response-scan-icon">${glyph("scan-line", 298, y)}</g><g class="response-complete-icon">${glyph("clipboard-check", 298, y)}</g>`,
                )
                .join("")}
            </svg>
            <p class="vision-diagram-state" aria-live="polite"></p>
          </div>
        `;
      return "";
    }
    function paintDiagram(snapshot) {
      if (selected === 0) {
        qa("[data-signal-packet]").forEach((el, i) => {
          const v = mode === "full" ? (ambient * 0.32 + i * 0.19) % 1 : 0.45;
          const y = 26 + i * 35;
          el.setAttribute("cx", 111 + v * 61);
          el.setAttribute("cy", v < 0.34 ? y : y + ((79 - y) * (v - 0.34)) / 0.66);
        });
        const packet = q(".signal-output-packet");
        packet?.setAttribute("cx", 205 + (mode === "full" ? (ambient * 0.35) % 1 : 0.5) * 84);
        packet?.setAttribute("cy", 79);
      } else if (selected === 1) {
        qa("[data-response-asset]").forEach((el, i) => {
          // Both assets remain behind the gate until dispatch is approved.
          const p = snapshot.phase < 3 ? 0 : snapshot.progress;
          el.setAttribute("transform", `translate(${44 + p * 254},${i === 0 ? 47 : 109})`);
        });
        q(".response-diagram-card").dataset.approved = String(approved);
        q(".response-diagram-card").dataset.complete = String(snapshot.phase === 4);
        q(".vision-diagram-state").textContent = t(
          snapshot.phase === 4
            ? C.ui.responseDone
            : approved
              ? C.ui.missionActive
              : C.ui.responseHold,
        );
      }
    }
    function narrative() {
      const tab = C.tabs[selected];
      let body = "";
      if (selected === 0) {
        const d = C.domains[domain];
        body = /* HTML */ `
          <div class="domain-detail">
            <span class="domain-symbol">${icon(d.icon)}</span>
            <div>
              <span class="detail-eyebrow">${esc(t(C.ui.assetFocus))}</span>
              <h3>${esc(t(d.label))}</h3>
              <p>${esc(t(d.assets))}</p>
            </div>
          </div>
          <p class="vision-readout" aria-live="polite">${icon("radio-tower")}${esc(t(d.feed))}</p>
          <div class="vision-principles">
            <p class="detail-eyebrow">${esc(t(C.ui.allDetails))}</p>
            ${tab.points
              .map(
                (p, i) => /* HTML */ `
                  <div class="principle">
                    <button
                      data-insight="${i}"
                      aria-expanded="${insight === i}"
                      aria-controls="vision-insight-${i}"
                    >
                      <span dir="ltr">0${i + 1}</span>
                      <b>${esc(t(p.title))}</b>
                      ${icon("chevron-down")}
                    </button>
                    <p id="vision-insight-${i}" ${insight === i ? "" : "hidden"}>
                      ${esc(t(p.body))}
                    </p>
                  </div>
                `,
              )
              .join("")}
          </div>
        `;
      } else if (selected === 1) {
        body = /* HTML */ `
          <div class="response-story">
            <div class="response-step-top">
              <span id="response-step-number" dir="ltr"></span>
              <span class="response-pulse" aria-hidden="true"></span>
            </div>
            <h3 id="response-title"></h3>
            <p id="response-body"></p>
            <div class="response-assignment">
              <span>${icon("drone")}${esc(t(C.ui.drone))}</span>
              <span>${icon("bot")}${esc(t(C.ui.robot))}</span>
            </div>
            <p
              id="response-decision"
              class="response-decision"
              role="status"
              aria-live="polite"
            ></p>

            <p class="approval-help" hidden>${esc(t(C.ui.approvalNote))}</p>
          </div>
        `;
      } else {
        const l = tab.levels[level];
        body = /* HTML */ `
          <div class="authority-choices">
            ${tab.levels
              .map(
                (v, i) => /* HTML */ `
                  <button data-level="${i}" class="authority-choice" aria-pressed="${i === level}">
                    <span>${icon(v.icon)}</span>
                    <span>
                      <b>${esc(t(v.title))}</b>
                      <small>${esc(t(v.status))}</small>
                    </span>
                    <i class="authority-indicator" aria-hidden="true"></i>
                  </button>
                `,
              )
              .join("")}
          </div>
          <div class="authority-detail">
            <h3>${esc(t(l.title))}</h3>
            <p>${esc(t(l.body))}</p>
            <p class="authority-example">${icon("clipboard-check")}${esc(t(l.example))}</p>
          </div>
        `;
      }
      return /* HTML */ `
        <div class="narrative-intro">
          <span class="scene-chapter" dir="ltr">0${selected + 1} / 03</span>
          <h2>${esc(t(tab.headline))}</h2>
          <p class="vision-lead">${esc(t(tab.lead))}</p>
        </div>
        ${signalDiagram()} ${body}
        <p class="vision-takeaway">${esc(t(tab.takeaway))}</p>
      `;
    }
    function dock() {
      if (selected === 0)
        return /* HTML */ `
          <div class="domain-ribbon">
            ${C.domains
              .map(
                (d, i) => /* HTML */ `
                  <button class="domain-node" data-domain="${i}" aria-pressed="${i === domain}">
                    ${icon(d.icon)}
                    <span>${esc(t(d.label))}</span>
                    <i aria-hidden="true"></i>
                  </button>
                `,
              )
              .join("")}
          </div>
        `;
      if (selected === 1)
        return /* HTML */ `
          <ol class="response-steps">
            ${C.tabs[1].steps
              .map(
                (s, i) => /* HTML */ `
                  <li data-response-step="${i}">
                    <span dir="ltr">0${i + 1}</span>
                    <b>${esc(t(s.name))}</b>
                    <i aria-hidden="true"></i>
                  </li>
                `,
              )
              .join("")}
          </ol>
        `;
      return /* HTML */ `
        <div class="authority-readout">
          ${icon("user-round-check")}
          <span>${esc(t(C.tabs[2].levels[level].status))}</span>
          <span class="trace-record">${icon("clipboard-check")}${esc(t(C.ui.record))}</span>
        </div>
      `;
    }
    function refreshDetails(animate = true) {
      q(".vision-focus").innerHTML = focusPoints();
      q(".vision-scene-dock").innerHTML = dock();
      q(".vision-narrative").innerHTML = narrative();
      if (selected === 1) {
        phase = -1;
        updateResponse();
      }
      const hints = [C.ui.pictureHint, C.ui.responseHint, C.ui.authorityHint];
      q("#visionHint").textContent = t(hints[selected]);
      const next = q("[data-vision-action=next]");
      next.querySelector("span").textContent = t(
        selected === 0 ? C.ui.tryResponse : C.ui.nextDomain,
      );
      next.hidden = selected === 1 && responseState(time, approved).phase !== 4;
      if (animate) reveal(q(".vision-narrative"));
    }
    function switchScene(index, moveFocus = false) {
      window.gsap?.killTweensOf(qa(".vision-photo-scene"));
      selected = clamp(index, 0, 2);
      state.tabs.vision = selected;
      time = mode === "full" ? 0 : selected === 1 ? 5.5 : 0;
      approved = false;
      phase = -1;
      root.dataset.visionTab = SCENES[selected];
      q("#vision-panel").setAttribute("aria-labelledby", `vision-tab-${selected}`);
      qa("[data-vision-tab]").forEach((b, i) => {
        b.setAttribute("aria-selected", String(i === selected));
        b.tabIndex = i === selected ? 0 : -1;
      });
      qa(".vision-photo-scene").forEach((p) => {
        const opacity = p.dataset.photoScene === SCENES[selected] ? 1 : 0;
        if (!tween(p, { opacity, duration: 0.85, ease: "power2.inOut" })) p.style.opacity = opacity;
      });
      q(".vision-viewport").style.setProperty(
        "--scene-image",
        `url("${A.vision[SCENES[selected]][theme.day > 0.5 ? "day" : "night"]}")`,
      );
      q(".vision-backdrop").style.backgroundImage =
        `url("${A.vision[SCENES[selected]][theme.day > 0.5 ? "day" : "night"]}")`;
      q("#visionSceneName").textContent = t(C.scenes[SCENES[selected]].label);
      q(".mission-scene-status").hidden = selected !== 1;
      q("[data-vision-action=approve]").hidden = true;
      refreshDetails();
      resize();
      paint();
      sync();
      if (moveFocus) q(`#vision-tab-${selected}`).focus();
    }
    function updateResponse() {
      const snapshot = responseState(time, approved);
      root.dataset.responsePhase = snapshot.phase;
      root.dataset.missionProgress = snapshot.progress.toFixed(4);
      if (phase === snapshot.phase) return;
      phase = snapshot.phase;
      const s = C.tabs[1].steps[phase];
      q("#response-step-number").textContent = `0${phase + 1} / 05`;
      q("#response-title").textContent = t(s.title);
      q("#response-body").textContent = t(s.body);
      q("#response-decision").textContent = t(s.decision);
      q("[data-vision-action=approve]").hidden = phase !== 2;
      q("[data-vision-action=next]").hidden = phase !== 4;
      q("#visionHint").textContent = t(phase === 2 ? C.ui.approvalNote : C.ui.responseHint);
      q(".approval-help").hidden = phase !== 2;
      qa("[data-response-step]").forEach((e, i) => {
        e.setAttribute("aria-current", i === phase ? "step" : "false");
        e.dataset.complete = String(i < phase);
      });
      q("#missionSceneTitle").textContent = t(
        phase === 4
          ? C.ui.missionComplete
          : phase === 3
            ? C.ui.missionActive
            : phase === 2
              ? C.ui.assetReady
              : C.tabs[1].steps[phase].title,
      );
      q("#missionSceneDetail").textContent = t(C.ui.missionAssigned);
      if (phase === 3 || phase === 4) reveal(q(".mission-scene-status"));
    }
    function paint() {
      if (dead) return;
      const type = SCENES[selected],
        snapshot = selected === 1 ? responseState(time, approved) : { phase: 0, progress: 0 };
      if (selected === 1) {
        updateResponse();
        q(".mission-progress-track i").style.transform = `scaleX(${snapshot.progress})`;
      }
      const plate = q(`[data-photo-scene="${type}"]`),
        images = {
          night: plate.querySelector(".theme-night"),
          day: plate.querySelector(".theme-day"),
        };
      const focus =
        focusVisible && selected !== 1
          ? C.scenes[type].focus[selected === 0 ? domain : level]
          : null;
      paintDiagram(snapshot);
      atmosphere?.render(
        ambient,
        type,
        theme.day,
        snapshot.progress,
        snapshot.phase,
        images,
        focus,
      );
    }
    function resize() {
      if (dead) return;
      const r = q(".vision-viewport").getBoundingClientRect();
      // Fit the complete composition. Cropping would hide foreground robots on short screens.
      const width = Math.min(Math.max(0, r.width), (Math.max(0, r.height) * 16) / 9),
        height = (width * 9) / 16;
      if (width < 1 || height < 1) return;
      const world = q(".vision-world");
      world.style.width = width + "px";
      world.style.height = height + "px";
      atmosphere?.resize(width, height);
      paint();
    }
    function running() {
      return !dead && !paused && mode === "full" && !document.hidden;
    }
    function tick(stamp) {
      frame = 0;
      if (!running()) return;
      if (last && stamp - last < 1000 / 30) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const dt = last ? Math.min((stamp - last) / 1000, 0.1) : 0;
      last = stamp;
      ambient += dt;
      time += dt;
      if (selected === 1) time = Math.min(time, approved ? 17 : 5.5);
      paint();
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      const stopped = paused || mode !== "full",
        b = q("[data-vision-action=pause]");
      b.innerHTML = icon(stopped ? "play" : "pause");
      b.setAttribute("aria-label", t(stopped ? C.ui.play : C.ui.pause));
      b.title = t(stopped ? C.ui.play : C.ui.pause);
      b.setAttribute("aria-pressed", String(stopped));
      root.dataset.paused = String(stopped);
      if (running()) frame = requestAnimationFrame(tick);
    }
    function selectDomain(value) {
      domain = clamp(value, 0, 3);
      refreshDetails();
      paint();
    }
    function selectLevel(value) {
      level = clamp(value, 0, 2);
      refreshDetails();
      paint();
    }
    function toggleExpanded() {
      expanded = !expanded;
      root.classList.toggle("is-expanded", expanded);
      const b = q("[data-vision-action=expand]"),
        label = t(expanded ? C.ui.return : C.ui.explore);
      b.innerHTML = icon(expanded ? "shrink" : "expand") + `<span>${esc(label)}</span>`;
      b.title = label;
      b.setAttribute("aria-label", label);
      b.setAttribute("aria-expanded", String(expanded));
      resize();
    }
    scope.listen(root, "click", (event) => {
      const b = event.target.closest("button");
      if (!b) return;
      if (b.dataset.visionTab !== undefined) {
        if (Number(b.dataset.visionTab) !== selected) switchScene(Number(b.dataset.visionTab));
        return;
      }
      if (b.dataset.domain !== undefined || b.dataset.focusDomain !== undefined) {
        selectDomain(Number(b.dataset.domain ?? b.dataset.focusDomain));
        return;
      }
      if (b.dataset.level !== undefined || b.dataset.focusLevel !== undefined) {
        selectLevel(Number(b.dataset.level ?? b.dataset.focusLevel));
        return;
      }
      if (b.dataset.insight !== undefined) {
        insight = Number(b.dataset.insight);
        refreshDetails(false);
        q(`[data-insight="${insight}"]`).focus();
        return;
      }
      switch (b.dataset.visionAction) {
        case "next":
          if (selected === 0) switchScene(1, true);
          else location.hash = "domains";
          break;
        case "approve":
          if (selected !== 1 || responseState(time, approved).phase !== 2) return;
          approved = true;
          time = mode === "full" ? 5.5 : 17;
          phase = -1;
          paint();
          sync();
          break;
        case "replay":
          approved = false;
          time = mode === "full" ? 0 : selected === 1 ? 5.5 : 0;
          ambient = 0;
          phase = -1;
          paint();
          sync();
          break;
        case "pause":
          if (mode !== "full") {
            mode = "full";
            paused = false;
            context.setMotion?.("full");
          } else paused = !paused;
          sync();
          break;
        case "expand":
          toggleExpanded();
          break;
        case "focus":
          focusVisible = !focusVisible;
          root.dataset.focus = String(focusVisible);
          b.setAttribute("aria-pressed", String(focusVisible));
          b.setAttribute("aria-label", t(focusVisible ? C.ui.hideFocus : C.ui.showFocus));
          b.title = t(focusVisible ? C.ui.hideFocus : C.ui.showFocus);
          paint();
          break;
      }
    });
    scope.listen(root, "keydown", (event) => {
      if (event.key === "Escape" && expanded) {
        event.stopPropagation();
        toggleExpanded();
        q("[data-vision-action=expand]").focus();
        return;
      }
      if (!event.target.matches("[data-vision-tab]")) return;
      if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
        const direction = (event.key === "ArrowRight" ? 1 : -1) * (state.lang === "ar" ? -1 : 1);
        switchScene(
          event.key === "Home" ? 0 : event.key === "End" ? 2 : (selected + direction + 3) % 3,
          true,
        );
      }
    });
    const viewport = q(".vision-viewport");
    scope.listen(viewport, "pointermove", (event) => {
      if (mode !== "full" || paused || event.pointerType === "touch") return;
      const r = viewport.getBoundingClientRect();
      tween(q(".vision-camera"), {
        x: ((event.clientX - r.left) / r.width - 0.5) * 5,
        y: ((event.clientY - r.top) / r.height - 0.5) * 4,
        duration: 1.1,
        ease: "power2.out",
      });
    });
    scope.listen(viewport, "pointerleave", () =>
      tween(q(".vision-camera"), { x: 0, y: 0, duration: 1.2, ease: "power2.out" }),
    );
    scope.listen(document, "visibilitychange", () => {
      tweens.forEach((a) => (document.hidden ? a.pause() : a.play()));
      sync();
    });
    qa(".vision-photo-scene img").forEach((img) => scope.listen(img, "load", paint));
    if (window.ResizeObserver) {
      observer = new window.ResizeObserver(resize);
      observer.observe(viewport);
    } else scope.listen(window, "resize", resize);
    switchScene(selected);
    return {
      setTheme(value) {
        const target = value === "light" ? 1 : 0;
        q(".vision-viewport").style.setProperty(
          "--scene-image",
          `url("${A.vision[SCENES[selected]][target ? "day" : "night"]}")`,
        );
        q(".vision-backdrop").style.backgroundImage =
          `url("${A.vision[SCENES[selected]][target ? "day" : "night"]}")`;
        if (!tween(theme, { day: target, duration: 0.75, onUpdate: paint })) {
          theme.day = target;
          paint();
        }
      },
      setMotion(value) {
        mode = value;
        if (mode !== "full") {
          tweens.forEach((a) => a.progress(1));
          if (selected === 1 && !approved) time = 5.5;
        }
        paint();
        sync();
      },
      destroy() {
        if (dead) return;
        dead = true;
        cancelAnimationFrame(frame);
        tweens.forEach((a) => a.kill());
        tweens.clear();
        observer?.disconnect();
        atmosphere?.destroy();
      },
    };
  };
})();
