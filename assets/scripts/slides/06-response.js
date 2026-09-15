/** SLIDE 06 — local, deterministic response exercise.
 * Photography establishes context. SVG tracks explain coordination, not live geography.
 * Dispatch, route change and closure each have independent operator gates.
 */
(() => {
  "use strict";
  const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const AIR = [
    [100, 75],
    [290, 48],
    [595, 48],
    [765, 83],
  ];
  const GROUND_IN = [
    [100, 171],
    [355, 171],
  ];
  const DIRECT = [
    [355, 171],
    [765, 171],
  ];
  const ALTERNATE = [
    [355, 171],
    [355, 219],
    [690, 219],
    [765, 171],
  ];
  function along(points, progress) {
    const lengths = points
      .slice(1)
      .map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
    let distance = clamp(progress) * lengths.reduce((a, b) => a + b, 0);
    for (let i = 0; i < lengths.length; i++) {
      if (distance <= lengths[i] || i === lengths.length - 1) {
        const f = clamp(distance / lengths[i]),
          a = points[i],
          b = points[i + 1];
        return {
          x: a[0] + (b[0] - a[0]) * f,
          y: a[1] + (b[1] - a[1]) * f,
          angle: (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI,
        };
      }
      distance -= lengths[i];
    }
  }
  function pose(progress, alternate) {
    const p = clamp(progress);
    return {
      air: along(AIR, p),
      ground:
        p <= 0.42
          ? along(GROUND_IN, p / 0.42)
          : along(alternate ? ALTERNATE : DIRECT, (p - 0.42) / 0.58),
    };
  }
  function advance(progress, delta, approved, blocked, rerouted) {
    if (!approved) return 0;
    return Math.min(blocked && !rerouted ? 0.42 : 1, clamp(progress + delta));
  }
  window.ACCResponseScenario = { pose, advance };
  window.ACCSlideViews.response = ({ state, t, esc, icon, A }) => {
    const C = window.ACCSlides.response,
      tab = clamp(state.tabs.response || 0, 0, 2);
    const token = (id, glyph) =>
      `<g class="response-token" data-response-asset="${id}"><circle r="18"/><g transform="translate(-10 -10)">${icon(glyph).replace("<svg ", '<svg width="20" height="20" ')}</g><path class="response-heading" d="M24 0L19 -3V3Z"/></g>`;
    return /* HTML */ `
      <section class="slide domains-slide response-slide" aria-labelledby="slideTitle">
        <div class="domains-backdrop" aria-hidden="true"></div>
        <header class="domains-heading">
          <div>
            <p class="eyebrow">${esc(t(C.eyebrow))}</p>
            <h1 id="slideTitle" tabindex="-1">${esc(t(C.title))}</h1>
          </div>
          <p>${esc(t(C.summary))}</p>
        </header>
        <div class="center-navigation">
          <div class="center-tabs" role="tablist" aria-label="${esc(t(C.title))}">
            ${C.views
              .map(
                (v, i) =>
                  `<button id="response-tab-${i}" data-response-tab="${i}" role="tab" aria-controls="response-panel" aria-selected="${i === tab}" tabindex="${i === tab ? 0 : -1}"><span dir="ltr">0${i + 1}</span>${icon(v.icon)}<b>${esc(t(v.label))}</b></button>`,
              )
              .join("")}
          </div>
          <button
            class="domain-pause"
            data-response-action="pause"
            aria-label="${esc(t(C.ui.pause))}"
          >
            ${icon("pause")}
          </button>
        </div>
        <div
          class="response-workspace"
          id="response-panel"
          role="tabpanel"
          aria-labelledby="response-tab-${tab}"
        >
          <div class="response-stage">
            <div class="response-viewport intel-viewport">
              <div class="response-world intel-world">
                <img
                  class="intel-photo theme-night"
                  src="${A.response.night}"
                  alt=""
                  draggable="false"
                />
                <img
                  class="intel-photo theme-day"
                  src="${A.response.day}"
                  alt=""
                  draggable="false"
                />
                <canvas class="response-atmosphere intel-atmosphere" aria-hidden="true"></canvas>
              </div>
              <div class="center-image-shade"></div>
              <div class="intel-photo-top">
                <span>${icon("radio-tower")}${esc(t(C.ui.demo))}</span>
                <button data-response-action="reset">
                  ${icon("rotate-ccw")}${esc(t(C.ui.reset))}
                </button>
              </div>
              <div class="intel-photo-caption response-photo-caption">
                <span class="intel-case-dot"></span>
                <div>
                  <p dir="ltr">CASE R-06 / UAV-021 + UGV-008</p>
                  <h2 class="response-case-title"></h2>
                </div>
              </div>
            </div>
            <div class="response-control">
              <header>
                <span>${icon("layers-3")}${esc(t(C.ui.control))}</span>
                <small>${esc(t(C.ui.schematic))}</small>
                <button
                  class="response-expand"
                  data-response-action="expand"
                  aria-expanded="false"
                  aria-label="${esc(t(C.ui.expand))}"
                >
                  ${icon("expand")}
                </button>
              </header>
              <svg
                class="response-map"
                viewBox="0 0 900 250"
                role="img"
                aria-label="${esc(t(C.ui.control))}"
                dir="ltr"
              >
                <defs>
                  <pattern id="response-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M30 0H0V30" fill="none" stroke="currentColor" stroke-opacity=".08" />
                  </pattern>
                </defs>
                <rect width="900" height="250" fill="url(#response-grid)" />
                <rect class="response-zone" x="28" y="32" width="118" height="182" rx="17" />
                <rect
                  class="response-zone response-target"
                  x="725"
                  y="28"
                  width="147"
                  height="179"
                  rx="18"
                />
                <path class="response-air-lane" d="M100 75L290 48H595L765 83" />
                <path class="response-road-bed" d="M100 171H765 M355 171V219H690L765 171" />
                <path class="response-ground-route" d="M100 171H765" />
                <path class="response-detour-route" d="M355 171V219H690L765 171" />
                <g class="response-obstruction">
                  <rect x="405" y="153" width="62" height="36" rx="7" />
                  <path d="M412 179L429 162 M430 179L447 162 M449 179L462 166" />
                </g>
                <circle class="response-hold-ring" cx="355" cy="171" r="27" />
                <text x="88" y="24" text-anchor="middle">${esc(t(C.ui.base))}</text>
                <text x="795" y="21" text-anchor="middle">${esc(t(C.ui.site))}</text>
                <text class="response-air-label" x="440" y="32" text-anchor="middle">
                  ${esc(t(C.ui.air))}
                </text>
                <text x="218" y="153" text-anchor="middle">${esc(t(C.ui.ground))}</text>
                <text class="response-hold-label" x="355" y="132" text-anchor="middle">
                  ${esc(t(C.ui.holdPoint))}
                </text>
                <text class="response-detour-label" x="540" y="241" text-anchor="middle">
                  ${esc(t(C.ui.detour))}
                </text>
                ${token("air", "drone")}${token("ground", "bot")}
                <text class="response-asset-label" data-response-label="air" text-anchor="middle">
                  UAV-021
                </text>
                <text
                  class="response-asset-label"
                  data-response-label="ground"
                  text-anchor="middle"
                >
                  UGV-008
                </text>
              </svg>
              <div class="response-milestones"></div>
            </div>
          </div>
          <aside class="domain-console response-console">
            <header class="domain-console-head">
              <span dir="ltr">RESPONSE / R-06</span>
              <span class="response-page-number" dir="ltr"></span>
            </header>
            <div class="domain-console-body response-body"></div>
            <footer class="domain-console-footer">
              <p class="domain-action-hint response-hint" aria-live="polite"></p>
              <button class="domain-primary" data-response-action="primary">
                <span></span>
                ${icon("arrow-right")}
              </button>
              <div class="response-secondary">
                <button class="response-condition" data-response-action="condition"></button>
                <button class="response-condition" data-response-action="hold">
                  ${esc(t(C.ui.holdMission))}
                </button>
              </div>
            </footer>
          </aside>
        </div>
        <footer class="domains-footer">
          <span>${esc(t(C.footer))}</span>
          <span>${icon("user-round-check")}${esc(t(C.ui.authority))}</span>
        </footer>
      </section>
    `;
  };
  window.ACCSlideMounts.response = (context) => {
    const { state, t, esc, icon, A, scope } = context,
      C = window.ACCSlides.response;
    const root = document.querySelector(".response-slide"),
      q = (s) => root.querySelector(s),
      qa = (s) => [...root.querySelectorAll(s)];
    let tab = clamp(state.tabs.response || 0, 0, 2),
      approved = false,
      manualHold = false,
      holds = 0,
      resumptions = 0,
      expanded = false,
      blocked = true,
      rerouted = false,
      progress = 0,
      findings = [false, false],
      closed = false,
      paused = false,
      mode = context.motion,
      ambient = 0,
      last = 0,
      frame = 0,
      dead = false,
      effects,
      observer,
      tween;
    const holding = () => approved && blocked && !rerouted && progress >= 0.42;
    const arrived = () => progress >= 1;
    const moving = () => approved && !manualHold && !holding() && !arrived();
    const status = () =>
      manualHold
        ? "manualhold"
        : closed
          ? "closed"
          : arrived()
            ? "arrived"
            : holding()
              ? "hold"
              : rerouted
                ? "rerouted"
                : approved
                  ? "dispatch"
                  : "brief";
    function roles() {
      return `<div class="response-roles">${C.roles.map((r) => `<article><span>${icon(r.icon)}</span><div>${r.id ? `<small dir="ltr">${r.id}</small>` : ""}<h3>${esc(t(r.label))}</h3><p>${esc(t(r.body))}</p></div></article>`).join("")}</div>`;
    }
    function ledger() {
      const rows = [
        ["ledgerDispatch", approved],
        ["ledgerRoute", rerouted],
        ["ledgerEvidence", findings.every(Boolean)],
        ["ledgerClose", closed],
      ];
      return `<section class="response-ledger"><h3>${esc(t(C.ui.ledger))}</h3>${rows.map(([label, done], i) => `<div><span>${esc(t(C.ui[label]))}</span><b data-done="${done}">${esc(t(i === 1 && !blocked ? C.ui.notNeeded : done ? C.ui.done : C.ui.waiting))}</b></div>`).join("")}${holds ? `<div><span>${esc(t(C.ui.holdRecord))}</span><b dir="ltr">${holds} / ${resumptions}</b></div>` : ""}</section>`;
    }
    function renderBody(animate = false) {
      const v = C.views[tab];
      let inner = "";
      if (tab === 0)
        inner =
          roles() +
          `<div class="response-callout">${icon("eye")}<p>${esc(t(blocked ? C.ui.blockageHint : C.ui.clearHint))}</p></div>`;
      else if (tab === 1)
        inner =
          `<div class="response-state-card" data-state="${status()}"><span>${icon(holding() ? "pause" : arrived() ? "clipboard-check" : "drone")}</span><h3>${esc(t(C.ui[status()]))}</h3><p>${esc(t(manualHold ? C.ui.manualHint : holding() ? C.ui.holdHint : approved ? C.ui.travelHint : C.ui.authority))}</p><div class="response-progress" role="progressbar" aria-label="${esc(t(C.ui.missionLabel))}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(progress * 100)}"><i></i></div></div>` +
          roles();
      else
        inner = closed
          ? `<div class="response-closed"><span>${icon("shield-check")}</span><h3>${esc(t(C.ui.closed))}</h3><p>${esc(t(C.ui.result))}</p></div>` +
            ledger()
          : `<div class="response-findings">${[0, 1].map((i) => `<button data-response-finding="${i}" aria-pressed="${findings[i]}" ${arrived() ? "" : "disabled"}><span>${icon(i ? "bot" : "drone")}</span><div><b>${esc(t(C.ui[i ? "finding2" : "finding1"]))}</b><p>${esc(t(arrived() ? C.ui[i ? "find2body" : "find1body"] : C.ui.evidencePending))}</p></div><i>${icon(findings[i] ? "clipboard-check" : "eye")}</i></button>`).join("")}</div>` +
            ledger();
      q(".response-body").innerHTML =
        `<h2>${esc(t(v.title))}</h2><p class="domain-lead">${esc(t(v.lead))}</p>${inner}`;
      q(".response-page-number").textContent = `0${tab + 1} / 03`;
      updateControls();
      if (animate && window.gsap && mode === "full" && !paused) {
        tween?.kill();
        tween = window.gsap.fromTo(
          q(".response-body"),
          { opacity: 0.4, y: 8 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", overwrite: true },
        );
      }
      paint();
    }
    function updateControls() {
      const key =
        tab === 0
          ? "reviewPlan"
          : tab === 1
            ? closed
              ? "closed"
              : !approved
                ? "approve"
                : manualHold
                  ? "resumeMission"
                  : holding()
                    ? "replan"
                    : arrived()
                      ? "reviewEvidence"
                      : "inTransit"
            : closed
              ? "closed"
              : "close";
      const b = q("[data-response-action=primary]");
      b.querySelector("span").textContent = t(C.ui[key]);
      b.disabled =
        tab === 1
          ? moving() || closed
          : tab === 2
            ? closed || !arrived() || !findings.every(Boolean)
            : false;
      const hint =
        tab === 2
          ? closed
            ? "result"
            : !arrived()
              ? "wait"
              : findings.every(Boolean)
                ? "complete"
                : "both"
          : holding()
            ? "holdHint"
            : approved
              ? "travelHint"
              : "authority";
      q(".response-hint").textContent = t(manualHold ? C.ui.manualHint : C.ui[hint]);
      q("[data-response-action=hold]").disabled = !moving();
      root.dataset.manualHold = String(manualHold);
      const condition = q("[data-response-action=condition]");
      condition.textContent = t(C.ui[blocked ? "blocked" : "clear"]);
      condition.setAttribute("aria-pressed", String(blocked));
      condition.disabled = approved;
      condition.title = t(approved ? C.ui.locked : blocked ? C.ui.blockageHint : C.ui.clearHint);
      q(".response-case-title").textContent = t(C.ui[status()]);
      root.dataset.responseTab = String(tab);
      root.dataset.responseStatus = status();
      root.dataset.approved = String(approved);
      root.dataset.blocked = String(blocked);
      root.dataset.rerouted = String(rerouted);
      root.dataset.closed = String(closed);
      const step = closed ? 3 : arrived() ? 2 : approved ? 1 : 0;
      q(".response-milestones").innerHTML = [1, 2, 3, 4]
        .map(
          (n, i) =>
            `<span data-active="${i === step}" data-done="${i < step}"><i dir="ltr">0${n}</i>${esc(t(C.ui["milestone" + n]))}</span>`,
        )
        .join("");
    }
    function select(index, focus = false) {
      tab = clamp(index, 0, 2);
      state.tabs.response = tab;
      qa("[data-response-tab]").forEach((b, i) => {
        b.setAttribute("aria-selected", String(i === tab));
        b.tabIndex = i === tab ? 0 : -1;
      });
      q("#response-panel").setAttribute("aria-labelledby", "response-tab-" + tab);
      renderBody(true);
      if (focus) q("#response-tab-" + tab).focus();
    }
    function paint() {
      if (dead) return;
      const positions = pose(progress, rerouted);
      for (const id of ["air", "ground"]) {
        const p = positions[id],
          token = q(`[data-response-asset="${id}"]`),
          label = q(`[data-response-label="${id}"]`);
        token.setAttribute("transform", `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`);
        token
          .querySelector(".response-heading")
          .setAttribute("transform", `rotate(${p.angle.toFixed(2)})`);
        label.setAttribute("x", p.x.toFixed(2));
        label.setAttribute("y", (p.y + (id === "air" ? 32 : -26)).toFixed(2));
      }
      root.dataset.progress = progress.toFixed(4);
      q(".response-hold-ring").style.opacity = holding()
        ? String(0.48 + Math.sin(ambient * 3) * 0.18)
        : "0";
      const bar = q(".response-progress");
      if (bar) {
        bar.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
        bar.querySelector("i").style.width = progress * 100 + "%";
      }
      effects?.render(ambient, "authority", state.theme === "light" ? 1 : 0, 0, 0, null, null);
    }
    function resize() {
      const r = q(".response-viewport").getBoundingClientRect(),
        w = Math.min(Math.max(0, r.width), (Math.max(0, r.height) * 16) / 9),
        h = (w * 9) / 16;
      if (w < 1 || h < 1) return;
      q(".response-world").style.width = w + "px";
      q(".response-world").style.height = h + "px";
      effects?.resize(w, h);
      paint();
    }
    function theme() {
      const src = A.response[state.theme === "light" ? "day" : "night"];
      q(".domains-backdrop").style.backgroundImage = `url("${src}")`;
      q(".response-viewport").style.setProperty("--intel-image", `url("${src}")`);
      paint();
    }
    function settle() {
      if (moving() && (mode !== "full" || paused)) {
        progress = advance(progress, 1, approved, blocked, rerouted);
        renderBody();
      }
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
      ambient += dt;
      if (moving()) {
        const old = status();
        progress = advance(progress, dt / 12, approved, blocked, rerouted);
        if (status() !== old) renderBody();
      }
      paint();
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      const stopped = paused || mode !== "full" || document.hidden;
      root.dataset.paused = String(stopped);
      const b = q("[data-response-action=pause]");
      b.innerHTML = icon(stopped ? "play" : "pause");
      b.setAttribute("aria-label", t(C.ui[stopped ? "play" : "pause"]));
      if (tween) stopped ? tween.pause() : tween.play();
      if (!dead && !stopped) frame = requestAnimationFrame(tick);
    }
    scope.listen(root, "click", (e) => {
      const b = e.target.closest("button");
      if (!b || b.disabled) return;
      if (b.dataset.responseTab !== undefined) {
        if (Number(b.dataset.responseTab) !== tab) select(Number(b.dataset.responseTab));
        return;
      }
      if (b.dataset.responseFinding !== undefined) {
        if (arrived() && !closed) {
          const i = Number(b.dataset.responseFinding);
          findings[i] = !findings[i];
          renderBody();
          q(`[data-response-finding="${i}"]`).focus();
        }
        return;
      }
      switch (b.dataset.responseAction) {
        case "primary":
          if (tab === 0) select(1);
          else if (tab === 1) {
            if (!approved) approved = true;
            else if (manualHold) {
              manualHold = false;
              resumptions++;
            } else if (holding()) rerouted = true;
            else if (arrived()) {
              select(2);
              return;
            }
            settle();
            renderBody();
          } else if (arrived() && findings.every(Boolean)) {
            closed = true;
            renderBody();
            q(".response-body").scrollTop = 0;
          }
          break;
        case "expand":
          expanded = !expanded;
          root.classList.toggle("is-control-expanded", expanded);
          b.setAttribute("aria-expanded", String(expanded));
          b.setAttribute("aria-label", t(expanded ? C.ui.collapse : C.ui.expand));
          b.innerHTML = icon(expanded ? "shrink" : "expand");
          break;
        case "hold":
          if (moving()) {
            manualHold = true;
            holds++;
            select(1);
          }
          break;
        case "condition":
          if (!approved) {
            blocked = !blocked;
            renderBody();
          }
          break;
        case "reset":
          manualHold = false;
          holds = 0;
          resumptions = 0;
          if (expanded) q("[data-response-action=expand]").click();
          approved = false;
          blocked = true;
          rerouted = false;
          progress = 0;
          findings = [false, false];
          closed = false;
          select(0);
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
    scope.listen(root, "keydown", (e) => {
      if (e.key === "Escape" && expanded) {
        e.preventDefault();
        e.stopPropagation();
        q("[data-response-action=expand]").click();
        q("[data-response-action=expand]").focus();
        return;
      }
      if (
        !e.target.matches("[data-response-tab]") ||
        !["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
      )
        return;
      e.preventDefault();
      e.stopPropagation();
      const d = (e.key === "ArrowRight" ? 1 : -1) * (state.lang === "ar" ? -1 : 1);
      select(e.key === "Home" ? 0 : e.key === "End" ? 2 : (tab + d + 3) % 3, true);
    });
    scope.listen(document, "visibilitychange", sync);
    try {
      effects = new window.ACCVisionAtmosphere(q(".response-atmosphere"), {
        authority: C.atmosphere,
      });
    } catch (e) {
      console.warn(e);
    }
    if (window.ResizeObserver) {
      observer = new window.ResizeObserver(resize);
      observer.observe(q(".response-viewport"));
    } else scope.listen(window, "resize", resize);
    select(tab);
    theme();
    resize();
    sync();
    return {
      setTheme: theme,
      setMotion(value) {
        mode = value;
        if (mode !== "full") {
          tween?.progress(1);
          settle();
        }
        paint();
        sync();
      },
      destroy() {
        dead = true;
        cancelAnimationFrame(frame);
        tween?.kill();
        observer?.disconnect();
        effects?.destroy();
      },
    };
  };
})();
