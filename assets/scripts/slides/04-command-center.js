/** SLIDE 04 — cinematic operations floor and deterministic 2D walkthroughs.
 * Copy and photo coordinates: assets/config/slides/04-command-center.js.
 * No live control, network failover or telemetry is performed by this illustration.
 */
(() => {
  "use strict";
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const traceState = (time, approved) =>
    time < 1.5 ? 0 : time < 3 ? 1 : time < 4.5 ? 2 : !approved ? 3 : time < 7 ? 4 : 5;
  const continuityState = (time, outage, resumed) =>
    !outage ? 0 : resumed ? 3 : time < 2.5 ? 1 : 2;
  window.ACCCenterScenario = { traceState, continuityState };
  window.ACCSlideViews.center = ({ state, t, esc, icon, A }) => {
    const C = window.ACCSlides.center,
      tab = clamp(state.tabs.center || 0, 0, 2);
    return /* HTML */ `
      <section class="slide center-slide domains-slide" aria-labelledby="slideTitle">
        <div
          class="domains-backdrop"
          style="background-image:url('${A.center[state.theme === "light" ? "day" : "night"]}')"
          aria-hidden="true"
        ></div>
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
                  `<button id="center-tab-${i}" role="tab" data-center-tab="${i}" aria-controls="center-panel" aria-selected="${i === tab}" tabindex="${i === tab ? 0 : -1}"><span dir="ltr">0${i + 1}</span>${icon(v.icon)}<b>${esc(t(v.label))}</b></button>`,
              )
              .join("")}
          </div>
          <button
            class="domain-pause"
            data-center-action="pause"
            aria-label="${esc(t(C.ui.pause))}"
            title="${esc(t(C.ui.pause))}"
          >
            ${icon("pause")}
          </button>
        </div>
        <div
          class="center-workspace"
          id="center-panel"
          role="tabpanel"
          aria-labelledby="center-tab-${tab}"
        >
          <div class="center-stage">
            <div class="center-viewport">
              <div class="center-world">
                <img
                  class="center-image theme-night"
                  src="${A.center.night}"
                  alt=""
                  draggable="false"
                />
                <img
                  class="center-image theme-day"
                  src="${A.center.day}"
                  alt=""
                  draggable="false"
                />
                <canvas class="center-atmosphere" aria-hidden="true"></canvas>
                <div class="center-hotspots" role="group" aria-label="${esc(t(C.ui.focus))}">
                  ${C.zones
                    .map(
                      (z, i) =>
                        `<button data-center-zone="${i}" style="left:${z.x * 100}%;top:${z.y * 100}%" aria-label="${esc(t(z.title))}" aria-pressed="${i === 0}">${icon(z.icon)}<span>${esc(t(z.title))}</span></button>`,
                    )
                    .join("")}
                </div>
              </div>
              <div class="center-image-shade" aria-hidden="true"></div>
              <div class="center-photo-top">
                <span>${icon("radio-tower")}${esc(t(C.ui.illustrative))}</span>
                <span class="center-photo-state"></span>
              </div>
              <div class="center-photo-caption">
                <span dir="ltr">04</span>
                <div>
                  <p>${esc(t(C.eyebrow))}</p>
                  <h2>${esc(t(C.title))}</h2>
                </div>
              </div>
            </div>
            <div class="center-chain">
              <div class="center-chain-top">
                <span>${esc(t(C.ui.capabilities))}</span>
                <span class="center-chain-status"></span>
              </div>
              <div class="center-chain-body" dir="ltr">
                <svg viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">
                  <path class="center-chain-line" d="M100 30 H900" />
                  <path class="center-chain-trail" d="M100 30 H900" />
                  <circle class="center-chain-packet" r="5" cy="30" />
                </svg>
                <div class="center-chain-nodes">
                  ${C.nodes
                    .map(
                      (n, i) =>
                        `<button data-center-node="${i}" aria-pressed="false"><span class="center-node-disc">${icon(n.icon)}</span><b dir="${state.lang === "ar" ? "rtl" : "ltr"}">${esc(t(n.label))}</b><small dir="ltr">0${i + 1}</small></button>`,
                    )
                    .join("")}
                </div>
              </div>
            </div>
          </div>
          <aside class="center-console domain-console">
            <header class="domain-console-head">
              <span class="center-console-eyebrow"></span>
              <span class="center-counter" dir="ltr"></span>
            </header>
            <div class="domain-console-body center-body"></div>
            <footer class="domain-console-footer">
              <p class="domain-action-hint center-hint"></p>
              <button class="domain-primary" data-center-action="primary">
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
  window.ACCSlideMounts.center = (context) => {
    const { state, t, esc, icon, A, scope } = context,
      C = window.ACCSlides.center;
    const root = document.querySelector(".center-slide"),
      q = (s) => root.querySelector(s),
      qa = (s) => [...root.querySelectorAll(s)];
    let tab = clamp(state.tabs.center || 0, 0, 2),
      zone = 0,
      node = -1,
      mode = context.motion,
      paused = false,
      started = false,
      approved = false,
      outage = false,
      resumed = false,
      time = 0,
      ambient = 0,
      last = 0,
      frame = 0,
      phase = -1,
      dead = false,
      observer,
      effects,
      revealTween;
    const currentPhase = () =>
      tab === 1
        ? traceState(time, approved)
        : tab === 2
          ? continuityState(time, outage, resumed)
          : 0;
    function connectionDiagram() {
      const p = currentPhase();
      return /* HTML */ `
        <div class="center-network" data-link-state="${p}">
          <svg viewBox="0 0 340 136" aria-hidden="true" dir="ltr">
            <path class="network-link primary" d="M48 69 L90 30 H250 L292 69" />
            <path class="network-link secondary" d="M48 69 L90 110 H250 L292 69" />
            <circle class="network-end" cx="32" cy="69" r="17" />
            <circle class="network-end" cx="308" cy="69" r="17" />
            <g transform="translate(22,59)">
              ${icon("radio-tower").replace(
                'class="ui-icon"',
                'class="ui-icon" width="20" height="20"',
              )}
            </g>
            <g transform="translate(298,59)">
              ${icon("layers-3").replace(
                'class="ui-icon"',
                'class="ui-icon" width="20" height="20"',
              )}
            </g>
            <circle class="network-packet" r="4" />
            <path class="network-break" d="M163 23 L177 37 M177 23 L163 37" />
          </svg>
          <div class="center-network-legend">
            <span>
              <i></i>
              ${esc(t(C.ui.primary))}
            </span>
            <span>
              <i></i>
              ${esc(t(C.ui.secondary))}
            </span>
          </div>
        </div>
      `;
    }
    function renderBody(animate = false) {
      const v = C.views[tab],
        p = currentPhase();
      phase = p;
      let detail;
      if (tab === 0) {
        const d = node >= 0 ? C.nodes[node] : C.zones[zone];
        detail = /* HTML */ `
          <div class="center-detail-title">
            <span>${icon(node >= 0 ? C.nodes[node].icon : C.zones[zone].icon)}</span>
            <h3>${esc(t(d.title))}</h3>
          </div>
          <p class="center-detail-copy">${esc(t(d.body))}</p>
          ${d.outcome ? `<p class="center-outcome">${esc(t(d.outcome))}</p>` : ""}
          <div class="center-zone-list">
            ${C.zones
              .map(
                (z, i) =>
                  `<button data-center-zone="${i}" aria-pressed="${node < 0 && zone === i}">${icon(z.icon)}<span>${esc(t(z.title))}</span>${icon("chevron-down")}</button>`,
              )
              .join("")}
          </div>
        `;
      } else if (tab === 1) {
        const d = C.traceSteps[p];
        detail = /* HTML */ `
          <div class="center-event">
            <span class="center-event-index" dir="ltr">0${p + 1}</span>
            <div>
              <h3>${esc(t(d.title))}</h3>
              <p>${esc(t(d.body))}</p>
            </div>
          </div>
          <ol class="center-event-log">
            ${C.traceSteps
              .slice(Math.max(0, p - 2), p + 1)
              .map((d, j) => {
                const index = Math.max(0, p - 2) + j;
                return `<li class="${index === p ? "current" : ""}"><span dir="ltr">0${index + 1}</span>${esc(t(d.title))}${icon(index === p ? "radio-tower" : "clipboard-check")}</li>`;
              })
              .join("")}
          </ol>
        `;
      } else {
        const d = C.continuity[p];
        detail = /* HTML */ `
          ${connectionDiagram()}
          <div class="center-continuity-detail">
            <h3>${esc(t(d.title))}</h3>
            <p>${esc(t(d.body))}</p>
          </div>
          <div class="center-policy-note">
            ${icon("shield-check")}
            <span>${esc(t(p === 0 ? C.ui.normal : p === 3 ? C.ui.restored : C.ui.held))}</span>
          </div>
        `;
      }
      q(".center-body").innerHTML = /* HTML */ `
        <h2>${esc(t(v.title))}</h2>
        <p class="domain-lead">${esc(t(v.lead))}</p>
        <div class="center-detail">${detail}</div>
        <p class="domain-value">${esc(t(v.takeaway))}</p>
      `;
      q(".center-console-eyebrow").textContent = t(tab === 0 ? C.ui.detail : v.label);
      q(".center-counter").textContent = tab === 1 ? `0${p + 1} / 06` : `0${tab + 1} / 03`;
      const action = q("[data-center-action=primary]"),
        label =
          tab === 0
            ? C.ui.trace
            : tab === 1
              ? !started
                ? C.ui.trace
                : p === 3
                  ? C.ui.approve
                  : p === 5
                    ? C.ui.replay
                    : C.ui.running
              : !outage
                ? C.ui.loss
                : p === 1
                  ? C.ui.checking
                  : p === 2
                    ? C.ui.reconnect
                    : C.ui.reset;
      action.querySelector("span").textContent = t(label);
      action.disabled = (tab === 1 && started && p !== 3 && p !== 5) || (tab === 2 && p === 1);
      const status =
        tab === 0
          ? C.ui.select
          : tab === 1
            ? !started
              ? C.ui.notLive
              : p === 3
                ? C.ui.waiting
                : p === 5
                  ? C.ui.complete
                  : C.ui.running
            : p === 0
              ? C.ui.normal
              : p === 1
                ? C.ui.held
                : p === 2
                  ? C.ui.backup
                  : C.ui.restored;
      q(".center-hint").textContent = t(status);
      q(".center-chain-status").textContent = t(status);
      q(".center-photo-state").textContent = t(tab === 0 ? C.ui.focus : status);
      qa(".center-hotspots [data-center-zone]").forEach((el, i) =>
        el.setAttribute("aria-pressed", String(tab === 0 && node < 0 && zone === i)),
      );
      root.dataset.centerTab = tab;
      root.dataset.tracePhase = tab === 1 ? p : -1;
      root.dataset.continuityPhase = tab === 2 ? p : -1;
      if (animate && window.gsap && mode === "full" && !paused) {
        revealTween?.kill();
        revealTween = window.gsap.fromTo(
          q(".center-body"),
          { opacity: 0.35, y: 6 },
          { opacity: 1, y: 0, duration: 0.38, ease: "power2.out", overwrite: true },
        );
      }
      paintChain();
    }
    function paintChain() {
      const p = currentPhase(),
        active = tab === 0 ? node : tab === 1 ? Math.min(p, 4) : outage && !resumed ? 0 : 4;
      qa("[data-center-node]").forEach((el, i) => {
        el.setAttribute("aria-pressed", String(i === active));
        el.dataset.done = String(tab === 1 && p > i);
      });
      let x = 100;
      if (tab === 0) x = 100 + (mode === "full" ? (ambient * 0.13) % 1 : 0.4) * 800;
      else if (tab === 1) {
        if (!started) x = 100;
        else if (p === 3) x = 700;
        else if (p === 5) x = 900;
        else if (p === 4) x = 700 + clamp((time - 4.5) / 2.5) * 200;
        else x = 100 + (p + clamp(time / 1.5 - p)) * 200;
      } else
        x = !outage || resumed ? 100 + (mode === "full" ? (ambient * 0.18) % 1 : 0.4) * 800 : 100;
      q(".center-chain-packet").setAttribute("cx", x);
      q(".center-chain-trail").style.strokeDasharray = `${Math.max(0, x - 100)} 800`;
      root.dataset.packetX = x.toFixed(2);
      if (tab === 2) {
        const e = q(".network-packet");
        const v = mode === "full" ? (ambient * 0.3) % 1 : 0.5;
        let px = 48 + v * 244,
          py = p === 0 ? 30 : 110;
        if (v < 0.17) py = 69 + ((py - 69) * v) / 0.17;
        else if (v > 0.83) py = py + ((69 - py) * (v - 0.83)) / 0.17;
        e?.setAttribute("cx", px);
        e?.setAttribute("cy", py);
        if (e) e.style.opacity = p === 1 ? 0 : 1;
      }
    }
    function paint() {
      if (dead) return;
      if (phase !== currentPhase()) renderBody();
      paintChain();
      const focus =
        tab === 0
          ? C.zones[node < 0 ? zone : node === 3 ? 2 : node === 0 ? 1 : 0]
          : tab === 1
            ? C.zones[currentPhase() === 3 ? 2 : 0]
            : C.zones[1];
      effects?.render(ambient, "authority", state.theme === "light" ? 1 : 0, 0, 0, null, focus);
    }
    function resize() {
      const r = q(".center-viewport").getBoundingClientRect(),
        w = Math.min(Math.max(0, r.width), (Math.max(0, r.height) * 16) / 9),
        h = (w * 9) / 16;
      if (w < 1 || h < 1) return;
      q(".center-world").style.width = w + "px";
      q(".center-world").style.height = h + "px";
      effects?.resize(w, h);
      paint();
    }
    function reset() {
      time = 0;
      started = false;
      approved = false;
      outage = false;
      resumed = false;
      phase = -1;
      node = -1;
      zone = 0;
    }
    function select(i, focus = false) {
      tab = clamp(i, 0, 2);
      state.tabs.center = tab;
      reset();
      qa("[data-center-tab]").forEach((el, n) => {
        el.setAttribute("aria-selected", String(n === tab));
        el.tabIndex = n === tab ? 0 : -1;
      });
      q("#center-panel").setAttribute("aria-labelledby", `center-tab-${tab}`);
      renderBody(true);
      paint();
      if (focus) q(`#center-tab-${tab}`).focus();
    }
    function primary() {
      const p = currentPhase();
      if (tab === 0) {
        select(1);
        started = true;
        time = mode === "full" ? 0 : 4.5;
      } else if (tab === 1) {
        if (!started || p === 5) {
          started = true;
          approved = false;
          time = mode === "full" ? 0 : 4.5;
        } else if (p === 3) {
          approved = true;
          time = mode === "full" ? 4.5 : 7;
        }
      } else if (!outage) {
        outage = true;
        time = mode === "full" ? 0 : 2.5;
      } else if (p === 2) {
        resumed = true;
      } else if (p === 3) {
        outage = false;
        resumed = false;
        time = 0;
      }
      renderBody();
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
      ambient += dt;
      if (tab === 1 && started) time = Math.min(time + dt, approved ? 7 : 4.5);
      if (tab === 2 && outage) time = Math.min(time + dt, 2.5);
      paint();
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      const stopped = paused || mode !== "full" || document.hidden;
      root.dataset.paused = String(stopped);
      const b = q("[data-center-action=pause]");
      b.innerHTML = icon(stopped ? "play" : "pause");
      b.setAttribute("aria-label", t(stopped ? C.ui.play : C.ui.pause));
      b.title = t(stopped ? C.ui.play : C.ui.pause);
      b.setAttribute("aria-pressed", String(stopped));
      if (revealTween) stopped ? revealTween.pause() : revealTween.play();
      if (!stopped && !dead) frame = requestAnimationFrame(tick);
    }
    scope.listen(root, "click", (event) => {
      const b = event.target.closest("button");
      if (!b || b.disabled) return;
      if (b.dataset.centerTab !== undefined) {
        if (Number(b.dataset.centerTab) !== tab) select(Number(b.dataset.centerTab));
        return;
      }
      if (b.dataset.centerZone !== undefined) {
        if (tab !== 0) select(0);
        zone = Number(b.dataset.centerZone);
        node = -1;
        renderBody(true);
        q(".center-body").scrollTop = 0;
        paint();
        return;
      }
      if (b.dataset.centerNode !== undefined) {
        if (tab !== 0) select(0);
        node = Number(b.dataset.centerNode);
        renderBody(true);
        q(".center-body").scrollTop = 0;
        paint();
        return;
      }
      if (b.dataset.centerAction === "primary") primary();
      if (b.dataset.centerAction === "pause") {
        if (mode !== "full") {
          mode = "full";
          paused = false;
          context.setMotion?.("full");
        } else paused = !paused;
        sync();
      }
    });
    scope.listen(root, "keydown", (event) => {
      if (!event.target.matches("[data-center-tab]")) return;
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      event.stopPropagation();
      const dir = (event.key === "ArrowRight" ? 1 : -1) * (state.lang === "ar" ? -1 : 1);
      select(event.key === "Home" ? 0 : event.key === "End" ? 2 : (tab + dir + 3) % 3, true);
    });
    scope.listen(document, "visibilitychange", sync);
    try {
      effects = new window.ACCVisionAtmosphere(q(".center-atmosphere"), {
        authority: C.atmosphere,
      });
    } catch (e) {
      console.warn(e);
    }
    if (window.ResizeObserver) {
      observer = new window.ResizeObserver(resize);
      observer.observe(q(".center-viewport"));
    } else scope.listen(window, "resize", resize);
    q(".center-viewport").style.setProperty(
      "--center-image",
      `url("${A.center[state.theme === "light" ? "day" : "night"]}")`,
    );
    select(tab);
    resize();
    sync();
    return {
      setTheme() {
        const src = A.center[state.theme === "light" ? "day" : "night"];
        q(".domains-backdrop").style.backgroundImage = `url("${src}")`;
        q(".center-viewport").style.setProperty("--center-image", `url("${src}")`);
        paint();
      },
      setMotion(value) {
        mode = value;
        if (mode !== "full") {
          revealTween?.progress(1);
          if (tab === 1 && started) time = approved ? 7 : 4.5;
          if (tab === 2 && outage) time = 2.5;
        }
        renderBody();
        paint();
        sync();
      },
      destroy() {
        dead = true;
        cancelAnimationFrame(frame);
        revealTween?.kill();
        observer?.disconnect();
        effects?.destroy();
      },
    };
  };
})();
