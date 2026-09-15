/** SLIDE 08 — autoplaying government-value narrative with direct selection.
 * Motion changes emphasis only. Every benefit and proposed KPI stays visible.
 */
(() => {
  "use strict";

  window.ACCSlideViews.value = ({ t, esc, icon, A }) => {
    const C = window.ACCSlides.value;

    function overlayMarkup(pillar) {
      const label = pillar.overlay.map((item) => esc(t(item)));
      if (pillar.id === "safety")
        return /* HTML */ `
          <div class="value-overlay value-overlay-safety" aria-hidden="true">
            <svg viewBox="0 0 1000 560" preserveAspectRatio="none">
              <path class="value-route-base" d="M110 350C245 335 330 250 465 250S700 240 865 145" />
              <path class="value-route-live" d="M110 350C245 335 330 250 465 250S700 240 865 145" />
              <circle class="value-route-node value-node-a" cx="110" cy="350" r="7" />
              <circle class="value-route-node value-node-b" cx="465" cy="250" r="8" />
              <circle class="value-route-node value-node-c" cx="690" cy="240" r="7" />
              <circle class="value-route-node value-node-d" cx="865" cy="145" r="8" />
              <circle class="value-scan-ring value-scan-ring-a" cx="465" cy="250" r="34" />
              <circle class="value-scan-ring value-scan-ring-b" cx="465" cy="250" r="58" />
              <circle class="value-flow-packet" cx="110" cy="350" r="6" />
            </svg>
            <span class="value-callout value-callout-a">${icon("scan-line")}<b>${label[0]}</b></span>
            <span class="value-callout value-callout-b">${icon("crosshair")}<b>${label[1]}</b></span>
            <span class="value-callout value-callout-c">${icon("user-round-check")}<b>${label[2]}</b></span>
            <span class="value-callout value-callout-d">${icon("shield-check")}<b>${label[3]}</b></span>
          </div>
        `;

      if (pillar.id === "efficiency")
        return /* HTML */ `
          <div class="value-overlay value-overlay-efficiency" aria-hidden="true">
            <svg viewBox="0 0 1000 560" preserveAspectRatio="none">
              <path class="value-route-base" d="M125 145C265 145 330 245 470 280M125 280H470M125 415C265 415 330 315 470 280M470 280C620 280 710 280 865 280" />
              <path class="value-route-live" d="M125 145C265 145 330 245 470 280M125 280H470M125 415C265 415 330 315 470 280M470 280C620 280 710 280 865 280" />
              <circle class="value-route-node value-node-a" cx="125" cy="145" r="7" />
              <circle class="value-route-node value-node-b" cx="125" cy="280" r="7" />
              <circle class="value-route-node value-node-c" cx="125" cy="415" r="7" />
              <circle class="value-route-hub" cx="470" cy="280" r="29" />
              <circle class="value-route-node value-node-d" cx="865" cy="280" r="8" />
              <circle class="value-flow-packet" cx="125" cy="145" r="6" />
            </svg>
            <span class="value-callout value-callout-a">${icon("layers-3")}<b>${label[0]}</b></span>
            <span class="value-callout value-callout-b">${icon("eye")}<b>${label[1]}</b></span>
            <span class="value-callout value-callout-c">${icon("route")}<b>${label[2]}</b></span>
          </div>
        `;

      if (pillar.id === "resilience")
        return /* HTML */ `
          <div class="value-overlay value-overlay-resilience" aria-hidden="true">
            <svg viewBox="0 0 1000 560" preserveAspectRatio="none">
              <path class="value-route-base value-route-primary" d="M115 330H440" />
              <path class="value-route-broken" d="M470 330H865" />
              <path class="value-route-live value-route-alternate" d="M115 330C285 105 650 105 865 330" />
              <circle class="value-route-node value-node-a" cx="115" cy="330" r="7" />
              <circle class="value-route-node value-node-b" cx="455" cy="330" r="8" />
              <path class="value-route-cross" d="M440 315L470 345M470 315L440 345" />
              <circle class="value-route-node value-node-c" cx="520" cy="155" r="7" />
              <circle class="value-route-node value-node-d" cx="865" cy="330" r="8" />
              <circle class="value-flow-packet" cx="115" cy="330" r="6" />
            </svg>
            <span class="value-callout value-callout-a">${icon("pause")}<b>${label[0]}</b></span>
            <span class="value-callout value-callout-b">${icon("radio-tower")}<b>${label[1]}</b></span>
            <span class="value-callout value-callout-c">${icon("repeat-2")}<b>${label[2]}</b></span>
          </div>
        `;

      return /* HTML */ `
        <div class="value-overlay value-overlay-capability" aria-hidden="true">
          <svg viewBox="0 0 1000 560" preserveAspectRatio="none">
            <path class="value-route-base" d="M285 300C420 300 520 145 700 125M285 300C455 300 575 270 835 270M285 300C440 320 550 425 725 445" />
            <path class="value-route-live" d="M285 300C420 300 520 145 700 125M285 300C455 300 575 270 835 270M285 300C440 320 550 425 725 445" />
            <circle class="value-route-hub" cx="285" cy="300" r="31" />
            <circle class="value-route-node value-node-a" cx="700" cy="125" r="8" />
            <circle class="value-route-node value-node-b" cx="835" cy="270" r="8" />
            <circle class="value-route-node value-node-c" cx="725" cy="445" r="8" />
            <circle class="value-flow-packet" cx="285" cy="300" r="6" />
          </svg>
          <span class="value-callout value-callout-a">${icon("user-round-check")}<b>${label[0]}</b></span>
          <span class="value-callout value-callout-b">${icon("lock-keyhole")}<b>${label[1]}</b></span>
          <span class="value-callout value-callout-c">${icon("layers-3")}<b>${label[2]}</b></span>
        </div>
      `;
    }

    function commandCore() {
      return /* HTML */ `
        <div class="value-command-core" role="img" aria-label="${esc(t(C.core.alt))}">
          <div class="value-core-rig" aria-hidden="true">
            <span class="value-core-orbit value-core-orbit-a"><i></i></span>
            <span class="value-core-orbit value-core-orbit-b"><i></i></span>
            <span class="value-core-orbit value-core-orbit-c"><i></i></span>
            <div class="value-core-cube">
              <span class="value-core-face value-core-front">${icon("layers-3")}</span>
              <span class="value-core-face value-core-back">${icon("crosshair")}</span>
              <span class="value-core-face value-core-right">${icon("radio-tower")}</span>
              <span class="value-core-face value-core-left">${icon("shield-check")}</span>
              <span class="value-core-face value-core-top"></span>
              <span class="value-core-face value-core-bottom"></span>
            </div>
            <span class="value-satellite value-satellite-air">${icon("drone")}</span>
            <span class="value-satellite value-satellite-land">${icon("bot")}</span>
            <span class="value-satellite value-satellite-sea">${icon("ship")}</span>
            <span class="value-satellite value-satellite-infra">${icon("radio-tower")}</span>
          </div>
          <div class="value-core-copy">
            <small>${esc(t(C.core.label))}</small>
            <b>${esc(t(C.core.title))}</b>
          </div>
        </div>
      `;
    }

    return /* HTML */ `
      <section
        class="slide domains-slide value-slide"
        aria-labelledby="slideTitle"
        data-value-phase="0"
        data-value-scene="${C.pillars[0].id}"
        data-value-paused="false"
      >
        <div class="value-backdrop" aria-hidden="true">
          ${C.pillars
            .map((pillar, index) => {
              const media = A.value.scenes[pillar.id];
              return `
                <span class="value-backdrop-scene" data-value-item="${index}">
                  <img class="theme-night" src="${media.night}" alt="" />
                  <img class="theme-day" src="${media.day}" alt="" />
                </span>
              `;
            })
            .join("")}
        </div>

        <header class="domains-heading value-heading">
          <div>
            <p class="eyebrow">${esc(t(C.eyebrow))}</p>
            <h1 id="slideTitle" tabindex="-1">${esc(t(C.title))}</h1>
          </div>
          <p>${esc(t(C.summary))}</p>
        </header>

        <div class="value-workspace">
          <section class="value-theatre" aria-live="off">
            <div class="value-scene-stack">
              ${C.pillars
                .map((pillar, index) => {
                  const media = A.value.scenes[pillar.id];
                  return /* HTML */ `
                    <article class="value-scene" data-value-item="${index}" aria-hidden="${index !== 0}">
                      <div class="value-scene-photo">
                        <img class="theme-night" src="${media.night}" alt="" draggable="false" />
                        <img class="theme-day" src="${media.day}" alt="" draggable="false" />
                      </div>
                      <div class="value-scene-shade" aria-hidden="true"></div>
                      <div class="value-scene-titlebar">
                        <span class="value-scene-icon">${icon(pillar.icon)}</span>
                        <span>
                          <small>${esc(t(C.ui.governmentBenefit))} <i dir="ltr">0${index + 1}</i></small>
                          <b>${esc(t(pillar.outcome))}</b>
                        </span>
                      </div>
                      ${overlayMarkup(pillar)}
                    </article>
                  `;
                })
                .join("")}
            </div>

            ${commandCore()}

            <div class="value-theatre-footer">
              <div class="value-sequence-meta">
                <span class="value-sequence-dot" aria-hidden="true"></span>
                <span>${esc(t(C.ui.automaticSequence))}</span>
                <b id="valueCounter" dir="ltr">01 / 04</b>
              </div>
              <button
                type="button"
                class="value-playback"
                data-value-action="pause"
                aria-label="${esc(t(C.ui.pause))}"
                title="${esc(t(C.ui.pause))}"
                aria-pressed="false"
              >
                ${icon("pause")}<span>${esc(t(C.ui.pause))}</span>
              </button>
            </div>
            <p class="sr-only" id="valueLive" aria-live="polite">
              ${esc(t(C.pillars[0].title))}. ${esc(t(C.pillars[0].outcome))}
            </p>
          </section>

          <aside class="value-benefits" aria-label="${esc(t(C.ui.select))}">
            ${C.pillars
              .map((pillar, index) => {
                const media = A.value.scenes[pillar.id];
                return /* HTML */ `
                  <button
                    type="button"
                    class="value-benefit"
                    data-value-item="${index}"
                    data-value-select="${index}"
                    aria-pressed="${index === 0}"
                    aria-label="${esc(t(C.ui.select))}: ${esc(t(pillar.title))}"
                  >
                    <span class="value-benefit-photo">
                      <img class="theme-night" src="${media.night}" alt="" draggable="false" />
                      <img class="theme-day" src="${media.day}" alt="" draggable="false" />
                      <span class="value-benefit-icon">${icon(pillar.icon)}</span>
                    </span>
                    <span class="value-benefit-copy">
                      <span class="value-benefit-heading">
                        <small dir="ltr">0${index + 1}</small>
                        <strong>${esc(t(pillar.title))}</strong>
                      </span>
                      <span class="value-benefit-outcome">${esc(t(pillar.outcome))}</span>
                      <span class="value-benefit-body">${esc(t(pillar.body))}</span>
                      <span class="value-kpi-block">
                        <em>${esc(t(C.ui.proposedKpis))}</em>
                        <span class="value-kpis">
                          ${pillar.kpis
                            .map((kpi) => `<span>${icon("check")}<b>${esc(t(kpi))}</b></span>`)
                            .join("")}
                        </span>
                      </span>
                    </span>
                    <i class="value-benefit-progress" aria-hidden="true"></i>
                  </button>
                `;
              })
              .join("")}
          </aside>
        </div>

        <footer class="domains-footer value-footer">
          <span>${esc(t(C.footer))}</span>
          <span dir="ltr">08 / 10</span>
        </footer>
      </section>
    `;
  };

  window.ACCSlideMounts.value = ({ t, icon, motion, scope, setMotion }) => {
    const root = document.querySelector(".value-slide");
    const C = window.ACCSlides.value;
    const items = [...root.querySelectorAll("[data-value-item]")];
    const scenes = [...root.querySelectorAll(".value-scene")];
    const selectors = [...root.querySelectorAll("[data-value-select]")];
    const playback = root.querySelector("[data-value-action=pause]");
    const theatre = root.querySelector(".value-theatre");
    const counter = root.querySelector("#valueCounter");
    const live = root.querySelector("#valueLive");
    const duration = 6500;
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
    }

    function animatePhase() {
      killPhaseTweens();
      if (!window.gsap || stopped()) return;
      const scene = scenes[phase];
      const image = scene.querySelector(".value-scene-photo");
      const title = scene.querySelector(".value-scene-titlebar");
      const overlayItems = scene.querySelectorAll(".value-callout");
      const activeButton = selectors[phase];
      phaseTweens.push(
        window.gsap.fromTo(
          image,
          { scale: 1.035, filter: "saturate(.78)" },
          { scale: 1, filter: "saturate(1)", duration: 1.35, ease: "power2.out" },
        ),
        window.gsap.fromTo(
          title,
          { opacity: 0, y: -9 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        ),
        window.gsap.fromTo(
          overlayItems,
          { opacity: 0, y: 9, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.09, ease: "power2.out" },
        ),
        window.gsap.fromTo(
          activeButton,
          { x: document.documentElement.dir === "rtl" ? 5 : -5 },
          { x: 0, duration: 0.55, ease: "power2.out" },
        ),
      );
    }

    function paint(animate = false) {
      const pillar = C.pillars[phase];
      root.dataset.valuePhase = String(phase);
      root.dataset.valueScene = pillar.id;
      root.style.setProperty("--value-phase", String(phase));
      items.forEach((item) => {
        const active = Number(item.dataset.valueItem) === phase;
        item.setAttribute("data-value-active", String(active));
      });
      scenes.forEach((scene, index) => scene.setAttribute("aria-hidden", String(index !== phase)));
      selectors.forEach((button, index) =>
        button.setAttribute("aria-pressed", String(index === phase)),
      );
      counter.textContent = `${String(phase + 1).padStart(2, "0")} / 04`;
      live.textContent = `${t(pillar.title)}. ${t(pillar.outcome)}`;
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
        phase = (phase + 1) % C.pillars.length;
        paint(true);
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
      root.dataset.valuePaused = String(isStopped);
    }

    function restartProgress() {
      const progress = selectors[phase].querySelector(".value-benefit-progress");
      progress.style.animation = "none";
      void progress.offsetWidth;
      progress.style.animation = "";
    }

    function selectPhase(next, focus = false) {
      phase = (next + C.pillars.length) % C.pillars.length;
      paint(true);
      restartProgress();
      schedule();
      if (focus) selectors[phase].focus({ preventScroll: true });
    }

    scope.listen(root, "click", (event) => {
      const pauseButton = event.target.closest("[data-value-action=pause]");
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
      const selection = event.target.closest("[data-value-select]");
      if (selection) selectPhase(Number(selection.dataset.valueSelect));
    });

    scope.listen(root, "keydown", (event) => {
      const selection = event.target.closest("[data-value-select]");
      if (!selection || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key))
        return;
      event.preventDefault();
      event.stopPropagation();
      let next = Number(selection.dataset.valueSelect);
      if (event.key === "Home") next = 0;
      else if (event.key === "End") next = C.pillars.length - 1;
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
      theatre.style.setProperty("--value-tilt-x", `${(-y * 3.2).toFixed(2)}deg`);
      theatre.style.setProperty("--value-tilt-y", `${(x * 4.2).toFixed(2)}deg`);
      theatre.style.setProperty("--value-pan-x", `${(x * -5).toFixed(2)}px`);
      theatre.style.setProperty("--value-pan-y", `${(y * -4).toFixed(2)}px`);
    });

    function resetTilt() {
      theatre.style.setProperty("--value-tilt-x", "0deg");
      theatre.style.setProperty("--value-tilt-y", "0deg");
      theatre.style.setProperty("--value-pan-x", "0px");
      theatre.style.setProperty("--value-pan-y", "0px");
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
