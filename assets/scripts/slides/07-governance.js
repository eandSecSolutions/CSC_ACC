/** SLIDE 07 — bounded local authorization exercise, not an authentication service.
 * Modes share identity/scope checks; only the human-authority requirement differs.
 */
(() => {
  "use strict";
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const decision = (identity, scope, mode) =>
    !identity ? "noIdentity" : !scope ? "noScope" : mode === 0 ? "executing" : "approval";
  window.ACCGovernanceScenario = { decision };
  window.ACCSlideViews.governance = ({ state, t, esc, icon, A }) => {
    const C = window.ACCSlides.governance,
      tab = clamp(state.tabs.governance || 0, 0, 2);
    return /* HTML */ `
      <section class="slide domains-slide governance-slide" aria-labelledby="slideTitle">
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
                  `<button id="gov-tab-${i}" data-gov-tab="${i}" role="tab" aria-controls="gov-panel" aria-selected="${i === tab}" tabindex="${i === tab ? 0 : -1}"><span dir="ltr">0${i + 1}</span>${icon(v.icon)}<b>${esc(t(v.label))}</b></button>`,
              )
              .join("")}
          </div>
          <button class="domain-pause" data-gov-action="pause" aria-label="${esc(t(C.ui.pause))}">
            ${icon("pause")}
          </button>
        </div>
        <div
          class="intel-workspace"
          id="gov-panel"
          role="tabpanel"
          aria-labelledby="gov-tab-${tab}"
        >
          <div class="gov-stage">
            <div class="gov-viewport intel-viewport">
              <div class="gov-world intel-world">
                <img
                  class="intel-photo theme-night"
                  src="${A.governance.night}"
                  alt=""
                  draggable="false"
                />
                <img
                  class="intel-photo theme-day"
                  src="${A.governance.day}"
                  alt=""
                  draggable="false"
                />
                <canvas class="gov-atmosphere intel-atmosphere" aria-hidden="true"></canvas>
              </div>
              <div class="center-image-shade"></div>
              <div class="intel-photo-top">
                <span>${icon("shield-check")}${esc(t(C.ui.demo))}</span>
                <button data-gov-action="reset">${icon("rotate-ccw")}${esc(t(C.ui.reset))}</button>
              </div>
              <div class="intel-photo-caption">
                <span class="intel-case-dot"></span>
                <div>
                  <p>${esc(t(C.ui.human))}</p>
                  <h2 class="gov-state-title"></h2>
                </div>
              </div>
            </div>
            <div class="gov-control">
              <header>
                <b>${esc(t(C.ui.chain))}</b>
                <span>${esc(t(C.ui.chainHint))}</span>
              </header>
              <div class="gov-chain">
                ${C.checks
                  .map(
                    (c, i) =>
                      `<button data-gov-check="${i}" aria-pressed="${i === 2}"><span class="gov-node">${icon(c.icon)}<i dir="ltr">0${i + 1}</i></span><b>${esc(t(i === 3 ? C.ui.action : c.label))}</b><small class="gov-node-state"></small></button>`,
                  )
                  .join("")}
              </div>
              <svg
                class="gov-flow"
                viewBox="0 0 800 24"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M100 12H700" />
                <path class="gov-flow-completed" d="M100 12H700" pathLength="1" />
                <circle r="4" class="gov-packet" cy="12" />
              </svg>
              <p class="gov-rule"></p>
            </div>
          </div>
          <aside class="domain-console gov-console">
            <header class="domain-console-head">
              <span>${esc(t(C.ui.demo))}</span>
              <span class="gov-mode-number" dir="ltr"></span>
            </header>
            <div class="domain-console-body gov-body"></div>
            <footer class="domain-console-footer">
              <p class="domain-action-hint gov-hint" aria-live="polite"></p>
              <button class="domain-primary" data-gov-action="primary">
                <span></span>
                ${icon("arrow-right")}
              </button>
              <div class="gov-test-controls">
                <button data-gov-action="identity"></button>
                <button data-gov-action="scope"></button>
              </div>
              <button class="gov-revoke" data-gov-action="revoke">
                ${icon("shield-check")}${esc(t(C.ui.revoke))}
              </button>
            </footer>
          </aside>
        </div>
        <footer class="domains-footer">
          <span>${esc(t(C.footer))}</span>
          <span>${esc(t(C.ui.modeHint))}</span>
        </footer>
      </section>
    `;
  };
  window.ACCSlideMounts.governance = (context) => {
    const { state, t, esc, icon, A, scope } = context,
      C = window.ACCSlides.governance;
    const root = document.querySelector(".governance-slide"),
      q = (s) => root.querySelector(s),
      qa = (s) => [...root.querySelectorAll(s)];
    let tab = clamp(state.tabs.governance || 0, 0, 2),
      selected = 2,
      identity = true,
      inScope = true,
      phase = "idle",
      elapsed = 0,
      step = 0,
      execProgress = 0,
      events = [],
      sequence = 0,
      mode = context.motion,
      paused = false,
      ambient = 0,
      last = 0,
      frame = 0,
      dead = false,
      effects,
      observer,
      tween;
    const active = () => phase === "checking" || phase === "executing";
    const reason = () =>
      !identity
        ? "noIdentity"
        : !inScope
          ? "noScope"
          : phase === "approval"
            ? "reviewHint"
            : phase === "executing"
              ? "executeHint"
              : phase === "complete"
                ? "doneHint"
                : phase === "revoked"
                  ? "revokeHint"
                  : "startHint";
    function record(key) {
      events.push({ n: ++sequence, key });
      if (events.length > 20) events.shift();
    }
    function renderBody(animate = false) {
      const v = C.views[tab],
        c = C.checks[selected];
      q(".gov-body").innerHTML =
        `<h2>${esc(t(v.title))}</h2><p class="domain-lead">${esc(t(v.lead))}</p><div class="gov-task">${icon(v.icon)}<div><small>${esc(t(C.ui.demo))}</small><b>${esc(t(v.task))}</b></div></div><section class="gov-check-detail"><small>${esc(t(C.ui.checkpoint))} <span dir="ltr">0${selected + 1}</span></small><h3>${esc(t(c.title))}</h3><p>${esc(t(c.body))}</p></section><section class="gov-ledger"><h3>${esc(t(C.ui.ledger))}</h3>${events.length ? `<ol>${events.map((e) => `<li><span dir="ltr">${String(e.n).padStart(2, "0")}</span><p>${esc(t(C.ui[e.key]))}</p></li>`).join("")}</ol>` : `<p>${esc(t(C.ui.empty))}</p>`}<small>${esc(t(C.ui.recordNote))}</small></section>`;
      const recordList = q(".gov-ledger ol");
      if (recordList) recordList.scrollTop = recordList.scrollHeight;
      q(".gov-mode-number").textContent = `0${tab + 1} / 03`;
      q(".gov-state-title").textContent = t(C.ui[phase]);
      q(".gov-rule").textContent = t(v.rule);
      q(".gov-hint").textContent = t(C.ui[reason()]);
      const b = q("[data-gov-action=primary]");
      b.disabled = active();
      b.querySelector("span").textContent = t(
        C.ui[
          active()
            ? "running"
            : phase === "approval"
              ? tab === 1
                ? "acknowledge"
                : "approve"
              : phase === "complete" || phase === "revoked"
                ? "retest"
                : "evaluate"
        ],
      );
      for (const [name, valid, yes, no] of [
        ["identity", identity, "valid", "invalid"],
        ["scope", inScope, "inside", "outside"],
      ]) {
        const el = q(`[data-gov-action="${name}"]`);
        el.textContent = t(C.ui[valid ? yes : no]);
        el.setAttribute("aria-pressed", String(!valid));
        el.title = t(C.ui[name === "identity" ? "identityHint" : "scopeHint"]);
      }
      q("[data-gov-action=revoke]").disabled = !["checking", "approval", "executing"].includes(
        phase,
      );
      qa("[data-gov-check]").forEach((el, i) =>
        el.setAttribute("aria-pressed", String(selected === i)),
      );
      root.dataset.phase = phase;
      root.dataset.govTab = String(tab);
      root.dataset.identity = String(identity);
      root.dataset.inScope = String(inScope);
      if (animate && window.gsap && mode === "full" && !paused) {
        tween?.kill();
        tween = window.gsap.fromTo(
          q(".gov-body"),
          { opacity: 0.45, y: 7 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", overwrite: true },
        );
      }
      paint();
    }
    function update(delta) {
      if (phase === "checking") {
        elapsed += delta;
        step = Math.min(2, Math.floor(elapsed / 0.9));
        if (elapsed >= 0.9 && !identity) {
          phase = "blocked";
          step = 0;
          record("noIdentity");
          renderBody();
        } else if (elapsed >= 1.8 && !inScope) {
          phase = "blocked";
          step = 1;
          record("noScope");
          renderBody();
        } else if (elapsed >= 2.7) {
          phase = decision(identity, inScope, tab);
          step = 2;
          record("checksPassed");
          if (phase === "executing") record("policyGranted");
          renderBody();
        }
      } else if (phase === "executing") {
        execProgress = clamp(execProgress + delta / 3);
        step = 3;
        if (execProgress >= 1) {
          phase = "complete";
          record("complete");
          renderBody();
        }
      }
    }
    function settle() {
      if (mode !== "full" || paused) {
        if (phase === "checking") update(3);
        if (phase === "executing") update(3);
      }
    }
    function restart(resetInputs = true) {
      phase = "idle";
      elapsed = 0;
      step = 0;
      execProgress = 0;
      events = [];
      sequence = 0;
      if (resetInputs) {
        identity = true;
        inScope = true;
      }
      renderBody();
    }
    function select(index, focus = false) {
      tab = clamp(index, 0, 2);
      state.tabs.governance = tab;
      qa("[data-gov-tab]").forEach((b, i) => {
        b.setAttribute("aria-selected", String(i === tab));
        b.tabIndex = tab === i ? 0 : -1;
      });
      q("#gov-panel").setAttribute("aria-labelledby", "gov-tab-" + tab);
      restart();
      if (focus) q("#gov-tab-" + tab).focus();
    }
    function paint() {
      if (dead) return;
      qa("[data-gov-check]").forEach((b, i) => {
        const completed =
          phase === "complete" ||
          (phase === "checking" && i < step) ||
          (["approval", "executing"].includes(phase) && i < 2) ||
          (phase === "executing" && i === 2);
        b.dataset.state =
          phase === "blocked" && i === step
            ? "blocked"
            : phase === "revoked"
              ? "revoked"
              : completed
                ? "passed"
                : phase !== "idle" && i === step
                  ? "active"
                  : "waiting";
        const mark = completed
          ? "clipboard-check"
          : (phase === "blocked" && i === step) || (i === step && phase === "approval")
            ? "pause"
            : "";
        const badge = b.querySelector(".gov-node-state");
        if (badge.dataset.mark !== mark) {
          badge.dataset.mark = mark;
          badge.innerHTML = mark ? icon(mark) : "";
        }
      });
      let flow =
        phase === "idle" || phase === "revoked"
          ? 0
          : phase === "checking"
            ? Math.min(2, elapsed / 0.9) / 3
            : phase === "blocked"
              ? step / 3
              : phase === "approval"
                ? 2 / 3
                : phase === "complete"
                  ? 1
                  : 2 / 3 + execProgress / 3;
      q(".gov-flow-completed").style.strokeDasharray = `${flow} 1`;
      q(".gov-packet").setAttribute("cx", String(100 + 600 * flow));
      q(".gov-packet").style.opacity = phase === "idle" || phase === "revoked" ? "0" : "1";
      root.dataset.actionProgress = execProgress.toFixed(4);
      effects?.render(ambient, "authority", state.theme === "light" ? 1 : 0, 0, 0, null, null);
    }
    function resize() {
      const r = q(".gov-viewport").getBoundingClientRect(),
        w = Math.min(Math.max(0, r.width), (Math.max(0, r.height) * 16) / 9),
        h = (w * 9) / 16;
      if (w < 1 || h < 1) return;
      q(".gov-world").style.width = w + "px";
      q(".gov-world").style.height = h + "px";
      effects?.resize(w, h);
      paint();
    }
    function theme() {
      const src = A.governance[state.theme === "light" ? "day" : "night"];
      q(".domains-backdrop").style.backgroundImage = `url("${src}")`;
      q(".gov-viewport").style.setProperty("--intel-image", `url("${src}")`);
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
      update(dt);
      paint();
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      const stopped = paused || mode !== "full" || document.hidden;
      root.dataset.paused = String(stopped);
      const b = q("[data-gov-action=pause]");
      b.innerHTML = icon(stopped ? "play" : "pause");
      b.setAttribute("aria-label", t(C.ui[stopped ? "play" : "pause"]));
      if (tween) stopped ? tween.pause() : tween.play();
      if (!stopped && !dead) frame = requestAnimationFrame(tick);
    }
    scope.listen(root, "click", (e) => {
      const b = e.target.closest("button");
      if (!b || b.disabled) return;
      if (b.dataset.govTab !== undefined) {
        if (Number(b.dataset.govTab) !== tab) select(Number(b.dataset.govTab));
        return;
      }
      if (b.dataset.govCheck !== undefined) {
        selected = Number(b.dataset.govCheck);
        renderBody(true);
        q(".gov-body").scrollTop = 0;
        return;
      }
      switch (b.dataset.govAction) {
        case "primary":
          if (phase === "approval" && identity && inScope) {
            phase = "executing";
            execProgress = 0;
            record("humanGranted");
          } else if (!active()) {
            phase = "checking";
            elapsed = 0;
            step = 0;
            execProgress = 0;
            record("requested");
          }
          settle();
          renderBody();
          break;
        case "identity":
        case "scope":
          if (b.dataset.govAction === "identity") identity = !identity;
          else inScope = !inScope;
          elapsed = 0;
          execProgress = 0;
          step = !identity ? 0 : 1;
          phase = identity && inScope ? "idle" : "blocked";
          record("inputChanged");
          renderBody();
          break;
        case "revoke":
          if (["checking", "approval", "executing"].includes(phase)) {
            phase = "revoked";
            record("revoked");
            renderBody();
          }
          break;
        case "reset":
          restart();
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
      if (
        !e.target.matches("[data-gov-tab]") ||
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
      effects = new window.ACCVisionAtmosphere(q(".gov-atmosphere"), { authority: C.atmosphere });
    } catch (e) {
      console.warn(e);
    }
    if (window.ResizeObserver) {
      observer = new window.ResizeObserver(resize);
      observer.observe(q(".gov-viewport"));
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
