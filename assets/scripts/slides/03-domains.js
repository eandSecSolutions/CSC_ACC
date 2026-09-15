/** SLIDE 03 — photographed operating context + interactive mission control.
 * Content: assets/config/slides/03-domains.js. Artwork never resizes between tabs.
 * Mission progress is explicit and deterministic; animation cannot bypass approval.
 */
(() => {
  "use strict";
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  function route(points, progress) {
    const lengths = points
      .slice(1)
      .map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
    let remaining = clamp(progress) * lengths.reduce((a, b) => a + b, 0);
    for (let i = 0; i < lengths.length; i++) {
      if (remaining <= lengths[i] || i === lengths.length - 1) {
        const f = remaining / lengths[i];
        return {
          x: points[i][0] + (points[i + 1][0] - points[i][0]) * f,
          y: points[i][1] + (points[i + 1][1] - points[i][1]) * f,
        };
      }
      remaining -= lengths[i];
    }
  }
  // Unitless schematic positions. These are explanatory examples, not live telemetry.
  function pose(id, progress) {
    const p = clamp(progress);
    if (id === "air")
      return {
        a: { x: 45 + 220 * p, y: 132 },
        b: route(
          [
            [255, 132],
            [255, 53],
            [45, 53],
          ],
          p,
        ),
      };
    if (id === "land")
      return {
        a: route(
          [
            [45, 135],
            [95, 135],
            [95, 55],
            [240, 55],
            [268, 135],
          ],
          p,
        ),
      };
    if (id === "sea")
      return {
        a: route(
          [
            [238, 143],
            [194, 117],
            [130, 66],
            [65, 100],
          ],
          p,
        ),
      };
    return {
      a: { x: 55 + 210 * clamp((p - 0.55) / 0.45), y: 119 },
      b: { x: 170, y: 156 - 122 * clamp(p / 0.5) },
    };
  }
  window.ACCDomainsScenario = { pose, route };
  window.ACCSlideViews.domains = ({ state, t, esc, icon, A }) => {
    const C = window.ACCSlides.domains,
      selected = clamp(state.tabs.domains || 0, 0, 3);
    return /* HTML */ `
      <section class="slide domains-slide" aria-labelledby="slideTitle">
        <div class="domains-backdrop" aria-hidden="true"></div>
        <header class="domains-heading">
          <div>
            <p class="eyebrow">${esc(t(C.eyebrow))}</p>
            <h1 id="slideTitle" tabindex="-1">${esc(t(C.title))}</h1>
          </div>
          <p>${esc(t(C.summary))}</p>
        </header>
        <div class="domains-navigation">
          <div class="domains-tabs" role="tablist" aria-label="${esc(t(C.ui.selectLabel))}">
            ${C.domains
              .map(
                (d, i) => /* HTML */ `
                  <button
                    class="domains-tab"
                    role="tab"
                    id="domain-tab-${i}"
                    data-domain-tab="${i}"
                    aria-controls="domain-panel"
                    aria-selected="${i === selected}"
                    tabindex="${i === selected ? 0 : -1}"
                  >
                    <span class="domain-tab-photo" aria-hidden="true">
                      <img class="theme-night" src="${A.domains[d.id].night}" alt="" />
                      <img class="theme-day" src="${A.domains[d.id].day}" alt="" />
                    </span>
                    <span class="domain-tab-copy">
                      <b>${icon(d.icon)}${esc(t(d.label))}</b>
                      <small>${esc(t(d.tagline))}</small>
                    </span>
                    <span class="domain-tab-index" dir="ltr">0${i + 1}</span>
                  </button>
                `,
              )
              .join("")}
          </div>
          <button
            class="domain-pause"
            data-domain-action="pause"
            aria-label="${esc(t(C.ui.pause))}"
            title="${esc(t(C.ui.pause))}"
          >
            ${icon("pause")}
          </button>
        </div>
        <div
          class="domains-workspace"
          id="domain-panel"
          role="tabpanel"
          aria-labelledby="domain-tab-${selected}"
        >
          <div class="domain-stage">
            <div class="domain-viewport">
              <div class="domain-world">
                ${C.domains
                  .map(
                    (d, i) => /* HTML */ `
                      <div
                        class="domain-plate"
                        data-domain-plate="${i}"
                        style="opacity:${selected === i ? 1 : 0}"
                      >
                        <img
                          class="theme-night"
                          src="${A.domains[d.id].night}"
                          alt=""
                          draggable="false"
                        />
                        <img
                          class="theme-day"
                          src="${A.domains[d.id].day}"
                          alt=""
                          draggable="false"
                        />
                      </div>
                    `,
                  )
                  .join("")}
                <canvas class="domain-atmosphere" aria-hidden="true"></canvas>
                <div class="domain-photo-focus" aria-hidden="true">
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>
              <div class="domain-scene-shade" aria-hidden="true"></div>
              <div class="domain-scene-top">
                <span class="domain-scene-label"></span>
                <span class="domain-simulation-label">${esc(t(C.ui.illustrative))}</span>
              </div>
              <div class="domain-scene-caption">
                <span class="domain-scene-number" dir="ltr"></span>
                <div>
                  <p class="domain-scene-kicker"></p>
                  <h2 class="domain-scene-title"></h2>
                </div>
              </div>
            </div>
            <div class="domain-step-dock">
              <ol>
                ${["challenge", "decision", "outcome"]
                  .map(
                    (k, i) =>
                      `<li data-domain-step="${i}"><span dir="ltr">0${i + 1}</span><b>${esc(t(C.ui[k]))}</b><i></i></li>`,
                  )
                  .join("")}
              </ol>
              <p class="domain-stage-hint">${esc(t(C.ui.select))}</p>
            </div>
          </div>
          <aside class="domain-console">
            <header class="domain-console-head">
              <span>${esc(t(C.ui.overview))}</span>
              <button data-domain-action="brief" hidden>
                ${icon("arrow-left")}${esc(t(C.ui.back))}
              </button>
            </header>
            <div class="domain-console-body"></div>
            <footer class="domain-console-footer">
              <p class="domain-action-hint"></p>
              <button class="domain-primary" data-domain-action="advance">
                <span></span>
                ${icon("arrow-right")}
              </button>
            </footer>
          </aside>
        </div>
        <footer class="domains-footer">
          <span>${esc(t(C.footer))}</span>
          <span>${icon("shield-check")}${esc(t(C.ui.illustrative))}</span>
        </footer>
      </section>
    `;
  };
  window.ACCSlideMounts.domains = (context) => {
    const { state, t, esc, icon, A, scope } = context,
      C = window.ACCSlides.domains;
    const root = document.querySelector(".domains-slide"),
      q = (s) => root.querySelector(s),
      qa = (s) => [...root.querySelectorAll(s)];
    let selected = clamp(state.tabs.domains || 0, 0, 3),
      step = -1,
      progress = { value: 0 },
      executing = false,
      authorized = false,
      expanded = false,
      paused = false,
      dead = false,
      mode = context.motion,
      frame = 0,
      last = 0,
      elapsed = 0,
      observer,
      effects,
      missionTween;
    const transitions = new Set();
    const current = () => C.domains[selected];
    function animate(target, vars) {
      if (!window.gsap || mode !== "full") {
        if (vars.opacity !== undefined) target.style.opacity = vars.opacity;
        return;
      }
      window.gsap.killTweensOf(target);
      const a = window.gsap.to(target, {
        ...vars,
        overwrite: true,
        onComplete: () => transitions.delete(a),
        onInterrupt: () => transitions.delete(a),
      });
      transitions.add(a);
      if (paused || document.hidden) a.pause();
    }
    function schematic() {
      const d = current(),
        id = d.id;
      let base = "";
      if (id === "air")
        base = `<rect class="map-corridor" x="25" y="31" width="270" height="43" rx="16"/><rect class="map-corridor" x="25" y="110" width="270" height="43" rx="16"/><path class="map-route" d="M45 132 H265"/><path class="map-route secondary" d="M255 132 V53 H45"/><path class="map-rejected" d="M255 132 H45"/>`;
      if (id === "land")
        base = `<path class="map-road" d="M25 135 H292 M95 135 V55 H240 L268 135"/><path class="map-route" d="M45 135 H95 V55 H240 L268 135"/><rect class="map-obstacle" x="160" y="112" width="22" height="47" rx="4"/><path class="map-rejected" d="M105 135 H158"/>`;
      if (id === "sea")
        base = `<path class="map-water" d="M15 35 Q80 0 150 32 T305 30 V180 H15Z"/><path class="map-boundary" d="M33 42 L232 30 L281 156 L55 165Z"/><path class="map-route" d="M238 143 L194 117 L130 66 L65 100"/><path class="map-rejected" d="M238 143 L294 177"/>`;
      if (id === "mobility")
        base = `<path class="map-road" d="M20 119 H300"/>${[67, 88, 109, 130, 151].map((y) => `<rect class="map-crossing" x="153" y="${y}" width="35" height="10" rx="1"/>`).join("")}<path class="map-route" d="M55 119 H265"/><path class="map-stop" d="M132 83 V155"/>`;
      const badge = (name, glyph, color) =>
        `<g data-map-asset="${name}" class="map-asset ${color}"><circle r="16"/><path class="map-heading" d="M21 -4 L27 0 L21 4"/><g transform="translate(-10,-10)">${icon(glyph).replace('class="ui-icon"', 'class="ui-icon" width="20" height="20"')}</g></g>`;
      return /* HTML */ `
        <div class="domain-tactical">
          <div class="tactical-top">
            <span>${esc(t(C.ui.diagram))}</span>
            <b class="tactical-state"></b>
            <button
              class="domain-expand"
              data-domain-action="expand"
              aria-label="${esc(t(expanded ? C.ui.collapse : C.ui.expand))}"
              title="${esc(t(expanded ? C.ui.collapse : C.ui.expand))}"
            >
              ${icon(expanded ? "shrink" : "expand")}
            </button>
          </div>
          <svg
            class="domain-map"
            viewBox="0 0 320 190"
            role="img"
            aria-label="${esc(t(d.scenario.stages[Math.max(0, step)].title))}"
            dir="ltr"
          >
            <defs>
              <pattern id="domain-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="currentColor" stroke-width=".35" />
              </pattern>
            </defs>
            <rect width="320" height="190" fill="url(#domain-grid)" opacity=".18" />
            ${base}${badge("a", d.icon, "primary")}${id === "air"
              ? badge("b", "drone", "secondary")
              : id === "mobility"
                ? badge("b", "user-round", "secondary")
                : ""}
          </svg>
          <div class="domain-scrubber">
            <label for="domainProgress">
              ${esc(t(authorized ? C.ui.scrub : C.ui.scrubLocked))}
            </label>
            <div>
              <input
                id="domainProgress"
                type="range"
                min="0"
                max="100"
                step="1"
                value="${Math.round(progress.value * 100)}"
                ${authorized ? "" : "disabled"}
                aria-label="${esc(t(C.ui.scrub))}"
              />
              <output id="domainProgressValue" dir="ltr">
                ${Math.round(progress.value * 100)}%
              </output>
            </div>
          </div>
          <div class="tactical-legend">
            ${id === "air"
              ? `<span><i></i>${esc(t(C.ui.trackA))}</span><span><i></i>${esc(t(C.ui.trackB))}</span>`
              : `<span><i></i>${esc(t(C.ui.safeRoute))}</span><span>${esc(t(C.ui[id === "land" ? "blocked" : id === "sea" ? "zone" : "crossing"]))}</span>`}
          </div>
        </div>
      `;
    }
    function updateBody() {
      const d = current(),
        s = d.scenario.stages[Math.max(0, step)];
      q(".domain-console-head > span").textContent = t(
        step < 0 ? C.ui.overview : C.ui[["challenge", "decision", "outcome"][step]],
      );
      q("[data-domain-action=brief]").hidden = step < 0;
      q(".domain-console-body").innerHTML =
        step < 0
          ? /* HTML */ `
              <h2>${esc(t(d.title))}</h2>
              <p class="domain-lead">${esc(t(d.lead))}</p>
              <dl class="domain-brief-list">
                ${[
                  ["assets", "assets", d.icon],
                  ["missions", "mission", "crosshair"],
                  ["controls", "control", "shield-check"],
                ]
                  .map(
                    ([label, key, glyph]) =>
                      `<div><dt>${icon(glyph)}${esc(t(C.ui[label]))}</dt><dd>${esc(t(d[key]))}</dd></div>`,
                  )
                  .join("")}
              </dl>
              <p class="domain-value">${esc(t(d.value))}</p>
            `
          : /* HTML */ `
              <div class="domain-event-title">
                <span class="domain-event-number" dir="ltr">0${step + 1}</span>
                <h2>${esc(t(s.title))}</h2>
              </div>
              <p class="domain-lead" aria-live="polite">${esc(t(s.body))}</p>
              ${schematic()}
              <p class="domain-schematic-note">${esc(t(C.ui.insetNote))}</p>
            `;
      q(".domain-scene-title").textContent = t(d.label);
      q(".domain-scene-number").textContent = `0${selected + 1}`;
      q(".domain-scene-kicker").textContent = t(d.tagline);
      q(".domain-scene-label").innerHTML =
        icon(d.icon) + `<span>${esc(t(step < 0 ? d.title : s.title))}</span>`;
      qa("[data-domain-step]").forEach((el, i) => {
        el.setAttribute("aria-current", i === step ? "step" : "false");
        el.dataset.complete = String(step > i);
      });
      root.dataset.missionStep = String(step);
      root.dataset.domain = current().id;
      const hints =
        step < 0
          ? C.ui.select
          : step === 0
            ? C.ui.challenge
            : step === 1
              ? d.scenario.automatic
                ? C.ui.policy
                : C.ui.approval
              : C.ui.complete;
      q(".domain-action-hint").textContent = t(authorized && step === 1 ? C.ui.scrub : hints);
      const button = q("[data-domain-action=advance]");
      button.disabled = executing;
      button.querySelector("span").textContent = t(
        step < 0
          ? C.ui.start
          : step === 0
            ? d.scenario.review
            : step === 1
              ? executing
                ? C.ui.running
                : authorized
                  ? C.ui.resumeSequence
                  : d.scenario.action
              : C.ui.restart,
      );
      q(".domain-stage-hint").textContent = t(
        step < 0
          ? d.value
          : step === 1
            ? d.scenario.automatic
              ? C.ui.policy
              : C.ui.approval
            : step === 2
              ? C.ui.complete
              : C.ui.hold,
      );
      const focus = q(".domain-photo-focus");
      focus.style.left = d.focus.x * 100 + "%";
      focus.style.top = d.focus.y * 100 + "%";
      paintMap();
    }
    function paintMap() {
      if (step < 0) return;
      const p = pose(current().id, progress.value);
      Object.entries(p).forEach(([name, v]) =>
        q(`[data-map-asset="${name}"]`)?.setAttribute(
          "transform",
          `translate(${v.x.toFixed(2)},${v.y.toFixed(2)})`,
        ),
      );
      const label =
        step === 2 ? C.ui.complete : executing ? C.ui.running : authorized ? C.ui.scrub : C.ui.hold;
      q(".tactical-state").textContent = t(label);
      root.dataset.missionProgress = progress.value.toFixed(4);
      root.dataset.authorized = String(authorized);
      const slider = q("#domainProgress");
      if (slider && document.activeElement !== slider)
        slider.value = Math.round(progress.value * 100);
      if (q("#domainProgressValue"))
        q("#domainProgressValue").textContent = Math.round(progress.value * 100) + "%";
      const next = pose(current().id, Math.min(1, progress.value + 0.003));
      const prev = pose(current().id, Math.max(0, progress.value - 0.003));
      Object.keys(p).forEach((name) => {
        const dx = next[name].x - prev[name].x,
          dy = next[name].y - prev[name].y;
        if (Math.hypot(dx, dy) > 0.01)
          q(`[data-map-asset="${name}"] .map-heading`)?.setAttribute(
            "transform",
            `rotate(${(Math.atan2(dy, dx) * 180) / Math.PI})`,
          );
      });
    }
    function stopMission() {
      missionTween?.kill();
      missionTween = null;
      executing = false;
    }
    function reset() {
      stopMission();
      step = -1;
      authorized = false;
      expanded = false;
      root.classList.remove("is-map-expanded");
      progress.value = 0;
      updateBody();
      paint();
    }
    function finish() {
      executing = false;
      missionTween = null;
      progress.value = 1;
      step = 2;
      updateBody();
      paint();
    }
    function advance() {
      if (executing) return;
      if (step < 0) {
        step = 0;
        progress.value = 0;
        updateBody();
      } else if (step === 0) {
        step = 1;
        updateBody();
      } else if (step === 1) {
        authorized = true;
        executing = true;
        updateBody();
        if (mode !== "full") {
          finish();
          return;
        }
        if (window.gsap) {
          missionTween = window.gsap.to(progress, {
            value: 1,
            duration: Math.max(0.2, (current().id === "mobility" ? 9 : 7) * (1 - progress.value)),
            ease: "none",
            onUpdate: paintMap,
            onComplete: finish,
          });
          if (paused || document.hidden) missionTween.pause();
        }
      } else {
        stopMission();
        step = 0;
        authorized = false;
        progress.value = 0;
        updateBody();
      }
      paint();
    }
    function select(index, focus = false) {
      stopMission();
      selected = clamp(index, 0, 3);
      state.tabs.domains = selected;
      step = -1;
      authorized = false;
      expanded = false;
      root.classList.remove("is-map-expanded");
      progress.value = 0;
      transitions.forEach((a) => a.kill());
      transitions.clear();
      qa("[data-domain-tab]").forEach((b, i) => {
        b.setAttribute("aria-selected", String(i === selected));
        b.tabIndex = i === selected ? 0 : -1;
      });
      q("#domain-panel").setAttribute("aria-labelledby", `domain-tab-${selected}`);
      qa(".domain-plate").forEach((el, i) =>
        animate(el, { opacity: i === selected ? 1 : 0, duration: 0.65, ease: "power2.inOut" }),
      );
      updateTheme();
      updateBody();
      paint();
      if (focus) q(`#domain-tab-${selected}`).focus();
    }
    function updateTheme() {
      const src = A.domains[current().id][state.theme === "light" ? "day" : "night"];
      q(".domains-backdrop").style.backgroundImage = `url("${src}")`;
      q(".domain-viewport").style.setProperty("--domain-image", `url("${src}")`);
    }
    function paint() {
      if (dead) return;
      effects?.render(elapsed, current(), state.theme === "light", step);
      paintMap();
    }
    function resize() {
      const r = q(".domain-viewport").getBoundingClientRect(),
        width = Math.min(Math.max(0, r.width), (Math.max(0, r.height) * 16) / 9),
        height = (width * 9) / 16;
      if (width < 1 || height < 1) return;
      const world = q(".domain-world");
      world.style.width = width + "px";
      world.style.height = height + "px";
      effects?.resize(width, height);
      paint();
    }
    function tick(stamp) {
      frame = 0;
      if (dead || paused || mode !== "full" || document.hidden) return;
      if (last && stamp - last < 1000 / 30) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const dt = last ? Math.min((stamp - last) / 1000, 0.1) : 0;
      last = stamp;
      elapsed += dt;
      if (executing && !missionTween) {
        progress.value = clamp(progress.value + dt / (current().id === "mobility" ? 9 : 7));
        if (progress.value >= 1) finish();
      }
      paint();
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      last = 0;
      const stopped = paused || mode !== "full" || document.hidden;
      q(".domain-pause").innerHTML = icon(stopped ? "play" : "pause");
      q(".domain-pause").setAttribute("aria-label", t(stopped ? C.ui.play : C.ui.pause));
      q(".domain-pause").title = t(stopped ? C.ui.play : C.ui.pause);
      q(".domain-pause").setAttribute("aria-pressed", String(stopped));
      root.dataset.paused = String(stopped);
      transitions.forEach((a) => (stopped ? a.pause() : a.play()));
      if (missionTween) stopped ? missionTween.pause() : missionTween.play();
      if (!stopped && !dead) frame = requestAnimationFrame(tick);
    }
    scope.listen(root, "click", (event) => {
      const b = event.target.closest("button");
      if (!b) return;
      if (b.dataset.domainTab !== undefined) {
        if (Number(b.dataset.domainTab) !== selected) select(Number(b.dataset.domainTab));
        return;
      }
      switch (b.dataset.domainAction) {
        case "advance":
          advance();
          break;
        case "expand":
          expanded = !expanded;
          root.classList.toggle("is-map-expanded", expanded);
          updateBody();
          q(".domain-expand")?.focus();
          break;
        case "brief":
          reset();
          break;
        case "pause":
          if (mode !== "full") {
            mode = "full";
            paused = false;
            context.setMotion?.("full");
          } else paused = !paused;
          sync();
          break;
      }
    });
    scope.listen(root, "input", (event) => {
      if (event.target.id !== "domainProgress" || !authorized) return;
      stopMission();
      progress.value = clamp(Number(event.target.value) / 100);
      step = progress.value >= 1 ? 2 : 1;
      root.dataset.missionStep = step;
      q("[data-domain-action=advance]").disabled = false;
      q("[data-domain-action=advance] span").textContent = t(
        step === 2 ? C.ui.restart : C.ui.resumeSequence,
      );
      paint();
    });
    scope.listen(root, "change", (event) => {
      if (event.target.id !== "domainProgress" || !authorized) return;
      updateBody();
      q("#domainProgress")?.focus();
    });
    scope.listen(root, "keydown", (event) => {
      if (event.key === "Escape" && expanded) {
        event.stopPropagation();
        expanded = false;
        root.classList.remove("is-map-expanded");
        updateBody();
        q(".domain-expand")?.focus();
      }
    });
    scope.listen(root, "keydown", (event) => {
      if (!event.target.matches("[data-domain-tab]")) return;
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      event.stopPropagation();
      const d = (event.key === "ArrowRight" ? 1 : -1) * (state.lang === "ar" ? -1 : 1);
      select(event.key === "Home" ? 0 : event.key === "End" ? 3 : (selected + d + 4) % 4, true);
    });
    scope.listen(document, "visibilitychange", sync);
    try {
      effects = new window.ACCDomainsAtmosphere(q(".domain-atmosphere"));
    } catch (e) {
      console.warn(e);
    }
    if (window.ResizeObserver) {
      observer = new window.ResizeObserver(resize);
      observer.observe(q(".domain-viewport"));
    } else scope.listen(window, "resize", resize);
    qa(".domain-plate img").forEach((img) => scope.listen(img, "load", paint));
    select(selected);
    resize();
    sync();
    return {
      setTheme() {
        updateTheme();
        paint();
      },
      setMotion(value) {
        mode = value;
        if (mode !== "full") {
          transitions.forEach((a) => a.progress(1));
          if (executing) {
            stopMission();
            finish();
          }
        }
        sync();
        paint();
      },
      destroy() {
        dead = true;
        cancelAnimationFrame(frame);
        stopMission();
        transitions.forEach((a) => a.kill());
        transitions.clear();
        observer?.disconnect();
        effects?.destroy();
      },
    };
  };
})();
