/** SLIDE 09 — government implementation roadmap.
 * Automatic sequencing with manual phase selection. No runtime network requests.
 */
(() => {
  "use strict";

  window.ACCSlideViews.roadmap = ({ t, esc, icon, A }) => {
    const C = window.ACCSlides.roadmap;

    function overlayMarkup(phase) {
      const label = phase.overlay.map((item) => esc(t(item)));
      if (phase.id === "mandate") {
        return /* HTML */ `
          <div class="roadmap-overlay roadmap-overlay-mandate" aria-hidden="true">
            <svg viewBox="0 0 1000 560" preserveAspectRatio="none">
              <path class="roadmap-route-base" d="M155 405C280 345 330 225 465 210S705 235 850 145" />
              <path class="roadmap-route-live" d="M155 405C280 345 330 225 465 210S705 235 850 145" />
              <circle class="roadmap-node roadmap-node-a" cx="155" cy="405" r="8" />
              <circle class="roadmap-gate-node roadmap-node-b" cx="465" cy="210" r="25" />
              <circle class="roadmap-node roadmap-node-c" cx="850" cy="145" r="8" />
              <path class="roadmap-gate-stamp" d="M445 210l13 13 28-33" />
              <circle class="roadmap-flow-pulse" cx="155" cy="405" r="6" />
            </svg>
            <span class="roadmap-callout roadmap-callout-a">${icon("clipboard-check")}<b>${label[0]}</b></span>
            <span class="roadmap-callout roadmap-callout-b">${icon("lock-keyhole")}<b>${label[1]}</b></span>
            <span class="roadmap-callout roadmap-callout-c">${icon("user-round-check")}<b>${label[2]}</b></span>
          </div>
        `;
      }

      if (phase.id === "pilot") {
        return /* HTML */ `
          <div class="roadmap-overlay roadmap-overlay-pilot" aria-hidden="true">
            <svg viewBox="0 0 1000 560" preserveAspectRatio="none">
              <rect class="roadmap-zone" x="118" y="165" width="285" height="230" rx="28" />
              <path class="roadmap-route-base" d="M190 370C300 305 435 315 545 240S735 170 860 225" />
              <path class="roadmap-route-live" d="M190 370C300 305 435 315 545 240S735 170 860 225" />
              <circle class="roadmap-node roadmap-node-a" cx="190" cy="370" r="8" />
              <circle class="roadmap-gate-node roadmap-node-b" cx="545" cy="240" r="24" />
              <circle class="roadmap-scan-ring roadmap-scan-ring-a" cx="545" cy="240" r="45" />
              <circle class="roadmap-scan-ring roadmap-scan-ring-b" cx="545" cy="240" r="75" />
              <circle class="roadmap-node roadmap-node-c" cx="860" cy="225" r="8" />
              <circle class="roadmap-flow-pulse" cx="190" cy="370" r="6" />
            </svg>
            <span class="roadmap-callout roadmap-callout-a">${icon("scan-line")}<b>${label[0]}</b></span>
            <span class="roadmap-callout roadmap-callout-b">${icon("drone")}<b>${label[1]}</b></span>
            <span class="roadmap-callout roadmap-callout-c">${icon("chart-no-axes-combined")}<b>${label[2]}</b></span>
          </div>
        `;
      }

      if (phase.id === "expansion") {
        return /* HTML */ `
          <div class="roadmap-overlay roadmap-overlay-expansion" aria-hidden="true">
            <svg viewBox="0 0 1000 560" preserveAspectRatio="none">
              <path class="roadmap-route-base" d="M145 180C260 180 340 260 470 282M145 380C260 380 340 305 470 282M470 282C615 282 720 282 860 282" />
              <path class="roadmap-route-live" d="M145 180C260 180 340 260 470 282M145 380C260 380 340 305 470 282M470 282C615 282 720 282 860 282" />
              <circle class="roadmap-node roadmap-node-a" cx="145" cy="180" r="8" />
              <circle class="roadmap-node roadmap-node-b" cx="145" cy="380" r="8" />
              <circle class="roadmap-gate-node roadmap-node-c" cx="470" cy="282" r="29" />
              <circle class="roadmap-node roadmap-node-d" cx="860" cy="282" r="8" />
              <circle class="roadmap-flow-pulse" cx="145" cy="180" r="6" />
            </svg>
            <span class="roadmap-callout roadmap-callout-a">${icon("layers-3")}<b>${label[0]}</b></span>
            <span class="roadmap-callout roadmap-callout-b">${icon("route")}<b>${label[1]}</b></span>
            <span class="roadmap-callout roadmap-callout-c">${icon("layers-3")}<b>${label[2]}</b></span>
          </div>
        `;
      }

      return /* HTML */ `
        <div class="roadmap-overlay roadmap-overlay-national" aria-hidden="true">
          <svg viewBox="0 0 1000 560" preserveAspectRatio="none">
            <path class="roadmap-route-base" d="M138 360C270 210 395 185 505 285S720 395 865 260" />
            <path class="roadmap-route-live" d="M138 360C270 210 395 185 505 285S720 395 865 260" />
            <path class="roadmap-route-alt" d="M220 410C390 470 620 470 780 360" />
            <circle class="roadmap-node roadmap-node-a" cx="138" cy="360" r="8" />
            <circle class="roadmap-gate-node roadmap-node-b" cx="505" cy="285" r="29" />
            <circle class="roadmap-node roadmap-node-c" cx="865" cy="260" r="8" />
            <circle class="roadmap-orbit-dot" cx="505" cy="285" r="55" />
            <circle class="roadmap-flow-pulse" cx="138" cy="360" r="6" />
          </svg>
          <span class="roadmap-callout roadmap-callout-a">${icon("eye")}<b>${label[0]}</b></span>
          <span class="roadmap-callout roadmap-callout-b">${icon("repeat-2")}<b>${label[1]}</b></span>
          <span class="roadmap-callout roadmap-callout-c">${icon("chart-no-axes-combined")}<b>${label[2]}</b></span>
        </div>
      `;
    }

    function phaseNumber(index) {
      return String(index + 1).padStart(2, "0");
    }

    function implementationCore() {
      return /* HTML */ `
        <div class="roadmap-core" aria-hidden="true">
          <div class="roadmap-core-rig">
            <span class="roadmap-core-orbit roadmap-core-orbit-a"><i></i></span>
            <span class="roadmap-core-orbit roadmap-core-orbit-b"><i></i></span>
            <span class="roadmap-core-orbit roadmap-core-orbit-c"><i></i></span>
            <div class="roadmap-core-prism">
              <span class="roadmap-core-face roadmap-core-front">${icon("clipboard-check")}</span>
              <span class="roadmap-core-face roadmap-core-back">${icon("radio-tower")}</span>
              <span class="roadmap-core-face roadmap-core-right">${icon("shield-check")}</span>
              <span class="roadmap-core-face roadmap-core-left">${icon("route")}</span>
              <span class="roadmap-core-face roadmap-core-top"></span>
              <span class="roadmap-core-face roadmap-core-bottom"></span>
            </div>
            <span class="roadmap-core-satellite roadmap-satellite-one">${icon("drone")}</span>
            <span class="roadmap-core-satellite roadmap-satellite-two">${icon("bot")}</span>
            <span class="roadmap-core-satellite roadmap-satellite-three">${icon("radio-tower")}</span>
          </div>
        </div>
      `;
    }

    return /* HTML */ `
      <section
        class="slide roadmap-slide"
        aria-labelledby="slideTitle"
        data-roadmap-phase="0"
        data-roadmap-scene="${C.phases[0].id}"
        data-roadmap-paused="false"
      >
        <div class="roadmap-backdrop" aria-hidden="true">
          ${C.phases
            .map((phase, index) => {
              const media = A.roadmap.scenes[phase.id];
              return /* HTML */ `
                <span class="roadmap-backdrop-scene" data-roadmap-item="${index}">
                  <img class="theme-night" src="${media.night}" alt="" />
                  <img class="theme-day" src="${media.day}" alt="" />
                </span>
              `;
            })
            .join("")}
        </div>

        <header class="roadmap-heading">
          <div>
            <p class="eyebrow">${esc(t(C.eyebrow))}</p>
            <h1 id="slideTitle" tabindex="-1">${esc(t(C.title))}</h1>
          </div>
          <p>${esc(t(C.summary))}</p>
        </header>

        <div class="roadmap-workspace">
          <section class="roadmap-theatre" aria-live="off">
            <div class="roadmap-scene-stack">
              ${C.phases
                .map((phase, index) => {
                  const media = A.roadmap.scenes[phase.id];
                  return /* HTML */ `
                    <article class="roadmap-scene" data-roadmap-item="${index}" aria-hidden="${index !== 0}">
                      <div class="roadmap-scene-photo">
                        <img class="theme-night" src="${media.night}" alt="" draggable="false" />
                        <img class="theme-day" src="${media.day}" alt="" draggable="false" />
                      </div>
                      <div class="roadmap-scene-shade" aria-hidden="true"></div>
                      <div class="roadmap-scene-titlebar">
                        <span class="roadmap-scene-icon">${icon(phase.icon)}</span>
                        <span>
                          <small>${esc(t(C.ui.phase))} <i dir="ltr">${phaseNumber(index)}</i> · ${esc(t(phase.tag))}</small>
                          <b>${esc(t(phase.title))}</b>
                        </span>
                      </div>
                      ${overlayMarkup(phase)}
                    </article>
                  `;
                })
                .join("")}
            </div>

            ${implementationCore()}

            <nav class="roadmap-rail" aria-label="${esc(t(C.ui.select))}">
              <span class="roadmap-rail-line" aria-hidden="true"></span>
              ${C.phases
                .map(
                  (phase, index) => /* HTML */ `
                    <button
                      type="button"
                      class="roadmap-rail-node"
                      data-roadmap-select="${index}"
                      aria-pressed="${index === 0}"
                      aria-label="${esc(t(C.ui.select))}: ${esc(t(phase.title))}"
                    >
                      <span>${phaseNumber(index)}</span>
                      <b>${esc(t(phase.tag))}</b>
                    </button>
                  `,
                )
                .join("")}
            </nav>

            <div class="roadmap-theatre-footer">
              <div class="roadmap-sequence-meta">
                <span class="roadmap-sequence-dot" aria-hidden="true"></span>
                <span>${esc(t(C.ui.automaticJourney))}</span>
                <b id="roadmapCounter" dir="ltr">01 / 04</b>
              </div>
              <button
                type="button"
                class="roadmap-playback"
                data-roadmap-action="pause"
                aria-label="${esc(t(C.ui.pause))}"
                title="${esc(t(C.ui.pause))}"
                aria-pressed="false"
              >
                ${icon("pause")}<span>${esc(t(C.ui.pause))}</span>
              </button>
            </div>
            <p class="sr-only" id="roadmapLive" aria-live="polite">
              ${esc(t(C.phases[0].title))}. ${esc(t(C.phases[0].outcome))}
            </p>
          </section>

          <aside class="roadmap-panel">
            <div class="roadmap-detail-stack">
              ${C.phases
                .map(
                  (phase, index) => /* HTML */ `
                    <article class="roadmap-detail-card" data-roadmap-detail="${index}" aria-hidden="${index !== 0}">
                      <p class="roadmap-detail-kicker">${esc(t(C.ui.governmentOutcome))}</p>
                      <h2>${esc(t(phase.outcome))}</h2>
                      <p>${esc(t(phase.body))}</p>
                      <div class="roadmap-gate-box">
                        <span>${icon("circle-check-big")}${esc(t(C.ui.readinessGate))}</span>
                        <b>${esc(t(phase.gate))}</b>
                      </div>
                      <div class="roadmap-control-list" aria-label="${esc(t(C.ui.implementationControls))}">
                        ${phase.controls
                          .map((control) => `<span>${icon("check")}<b>${esc(t(control))}</b></span>`)
                          .join("")}
                      </div>
                    </article>
                  `,
                )
                .join("")}
            </div>

            <div class="roadmap-phase-list" aria-label="${esc(t(C.ui.select))}">
              ${C.phases
                .map((phase, index) => {
                  const media = A.roadmap.scenes[phase.id];
                  return /* HTML */ `
                    <button
                      type="button"
                      class="roadmap-phase-card"
                      data-roadmap-select="${index}"
                      aria-pressed="${index === 0}"
                      aria-label="${esc(t(C.ui.select))}: ${esc(t(phase.title))}"
                    >
                      <span class="roadmap-phase-thumb">
                        <img class="theme-night" src="${media.night}" alt="" draggable="false" />
                        <img class="theme-day" src="${media.day}" alt="" draggable="false" />
                        <span class="roadmap-phase-icon">${icon(phase.icon)}</span>
                      </span>
                      <span class="roadmap-phase-copy">
                        <span class="roadmap-phase-heading">
                          <small dir="ltr">${phaseNumber(index)}</small>
                          <strong>${esc(t(phase.title))}</strong>
                        </span>
                        <span>${esc(t(phase.outcome))}</span>
                      </span>
                      <i class="roadmap-phase-progress" aria-hidden="true"></i>
                    </button>
                  `;
                })
                .join("")}
            </div>
          </aside>
        </div>

        <footer class="roadmap-footer">
          <span>${esc(t(C.footer))}</span>
          <span dir="ltr">09 / 10</span>
        </footer>
      </section>
    `;
  };

  window.ACCSlideMounts.roadmap = ({ t, icon, motion, scope, setMotion }) => {
    const root = document.querySelector(".roadmap-slide");
    const C = window.ACCSlides.roadmap;
    const items = [...root.querySelectorAll("[data-roadmap-item]")];
    const scenes = [...root.querySelectorAll(".roadmap-scene")];
    const selectors = [...root.querySelectorAll("[data-roadmap-select]")];
    const details = [...root.querySelectorAll("[data-roadmap-detail]")];
    const playback = root.querySelector("[data-roadmap-action=pause]");
    const theatre = root.querySelector(".roadmap-theatre");
    const counter = root.querySelector("#roadmapCounter");
    const live = root.querySelector("#roadmapLive");
    const duration = 6800;
    let phase = 0;
    let mode = motion;
    let paused = false;
    let timer = 0;
    let dead = false;
    let phaseTweens = [];

    const stopped = () => paused || mode !== "full" || document.hidden;

    function killPhaseTweens() {
      phaseTweens.forEach((tween) => tween?.kill?.());
      phaseTweens = [];
      details.forEach((detail) => {
        detail.style.opacity = "";
        detail.style.visibility = "";
        detail.style.transform = "";
      });
    }

    function animatePhase() {
      killPhaseTweens();
      if (!window.gsap || stopped()) return;
      const scene = scenes[phase];
      const image = scene.querySelector(".roadmap-scene-photo");
      const title = scene.querySelector(".roadmap-scene-titlebar");
      const callouts = scene.querySelectorAll(".roadmap-callout");
      const detail = details[phase];
      const activeSelectors = selectors.filter((button) => Number(button.dataset.roadmapSelect) === phase);
      phaseTweens.push(
        window.gsap.fromTo(
          image,
          { scale: 1.045, filter: "saturate(.76) brightness(.95)" },
          { scale: 1, filter: "saturate(1) brightness(1)", duration: 1.25, ease: "power2.out" },
        ),
        window.gsap.fromTo(
          title,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.58, ease: "power2.out" },
        ),
        window.gsap.fromTo(
          callouts,
          { opacity: 0, y: 9, scale: 0.965 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08, ease: "power2.out" },
        ),
        window.gsap.fromTo(
          detail,
          { opacity: 0, y: 10, visibility: "visible" },
          { opacity: 1, y: 0, visibility: "visible", duration: 0.52, ease: "power2.out" },
        ),
        window.gsap.fromTo(
          activeSelectors,
          { x: document.documentElement.dir === "rtl" ? 5 : -5 },
          { x: 0, duration: 0.45, ease: "power2.out" },
        ),
      );
    }

    function paint(animate = false) {
      const active = C.phases[phase];
      root.dataset.roadmapPhase = String(phase);
      root.dataset.roadmapScene = active.id;
      root.style.setProperty("--roadmap-phase", String(phase));
      items.forEach((item) => {
        const isActive = Number(item.dataset.roadmapItem) === phase;
        item.setAttribute("data-roadmap-active", String(isActive));
      });
      scenes.forEach((scene, index) => scene.setAttribute("aria-hidden", String(index !== phase)));
      selectors.forEach((button) => {
        const isActive = Number(button.dataset.roadmapSelect) === phase;
        button.setAttribute("aria-pressed", String(isActive));
      });
      details.forEach((detail, index) => {
        const isActive = index === phase;
        detail.setAttribute("data-roadmap-active", String(isActive));
        detail.setAttribute("aria-hidden", String(!isActive));
      });
      counter.textContent = `${String(phase + 1).padStart(2, "0")} / 04`;
      live.textContent = `${t(active.title)}. ${t(active.outcome)}`;
      if (animate) animatePhase();
    }

    function stopTimer() {
      clearTimeout(timer);
      timer = 0;
    }

    function schedule() {
      stopTimer();
      if (dead || stopped()) return;
      timer = window.setTimeout(() => {
        phase = (phase + 1) % C.phases.length;
        paint(true);
        restartProgress();
        schedule();
      }, duration);
    }

    function syncPlayback() {
      const isStopped = stopped();
      const copy = t(isStopped ? C.ui.play : C.ui.pause);
      playback.innerHTML = `${icon(isStopped ? "play" : "pause")}<span>${copy}</span>`;
      playback.setAttribute("aria-label", copy);
      playback.title = copy;
      playback.setAttribute("aria-pressed", String(isStopped));
      root.dataset.roadmapPaused = String(isStopped);
    }

    function restartProgress() {
      root.querySelectorAll(".roadmap-phase-progress").forEach((progress) => {
        progress.style.animation = "none";
        void progress.offsetWidth;
        progress.style.animation = "";
      });
    }

    function selectPhase(next, focus = false) {
      phase = (next + C.phases.length) % C.phases.length;
      paint(true);
      restartProgress();
      schedule();
      if (focus) {
        selectors.find((button) => Number(button.dataset.roadmapSelect) === phase)?.focus({ preventScroll: true });
      }
    }

    scope.listen(root, "click", (event) => {
      const pauseButton = event.target.closest("[data-roadmap-action=pause]");
      if (pauseButton) {
        if (mode !== "full") {
          paused = false;
          setMotion("full");
        } else {
          paused = !paused;
        }
        syncPlayback();
        if (!stopped()) restartProgress();
        schedule();
        return;
      }
      const selection = event.target.closest("[data-roadmap-select]");
      if (selection) selectPhase(Number(selection.dataset.roadmapSelect));
    });

    scope.listen(root, "keydown", (event) => {
      const selection = event.target.closest("[data-roadmap-select]");
      if (!selection || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      event.stopPropagation();
      let next = Number(selection.dataset.roadmapSelect);
      if (event.key === "Home") next = 0;
      else if (event.key === "End") next = C.phases.length - 1;
      else {
        const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
        const direction =
          (forward ? 1 : -1) *
          (event.key.startsWith("ArrowL") || event.key.startsWith("ArrowR")
            ? document.documentElement.dir === "rtl"
              ? -1
              : 1
            : 1);
        next += direction;
      }
      selectPhase(next, true);
    });

    scope.listen(theatre, "pointermove", (event) => {
      if (stopped() || event.pointerType === "touch") return;
      const box = theatre.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      theatre.style.setProperty("--roadmap-tilt-x", `${(-y * 3).toFixed(2)}deg`);
      theatre.style.setProperty("--roadmap-tilt-y", `${(x * 4).toFixed(2)}deg`);
      theatre.style.setProperty("--roadmap-pan-x", `${(x * -5).toFixed(2)}px`);
      theatre.style.setProperty("--roadmap-pan-y", `${(y * -4).toFixed(2)}px`);
    });

    function resetTilt() {
      theatre.style.setProperty("--roadmap-tilt-x", "0deg");
      theatre.style.setProperty("--roadmap-tilt-y", "0deg");
      theatre.style.setProperty("--roadmap-pan-x", "0px");
      theatre.style.setProperty("--roadmap-pan-y", "0px");
    }

    scope.listen(theatre, "pointerleave", resetTilt);
    scope.listen(document, "visibilitychange", () => {
      syncPlayback();
      if (!stopped()) restartProgress();
      schedule();
    });

    paint();
    syncPlayback();
    schedule();

    return {
      setMotion(next) {
        mode = next;
        if (mode !== "full") resetTilt();
        syncPlayback();
        if (!stopped()) restartProgress();
        schedule();
      },
      setTheme() {},
      destroy() {
        dead = true;
        stopTimer();
        killPhaseTweens();
      },
    };
  };
})();
