/** SLIDE 05 — a transparent illustrative decision-support workflow.
 * All conditions are deterministic local scenario inputs, not model confidence or live telemetry.
 */
(() => {
  "use strict";
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  function assess(alert, fresh, available) {
    return !alert ? "noalert" : !fresh ? "insufficient" : !available ? "noasset" : "eligible";
  }
  window.ACCIntelligenceScenario = { assess };
  window.ACCSlideViews.intelligence = ({ state, t, esc, icon, A }) => {
    const C = window.ACCSlides.intelligence,
      tab = clamp(state.tabs.intelligence || 0, 0, 2);
    return /* HTML */ `
      <section class="slide domains-slide intelligence-slide" aria-labelledby="slideTitle">
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
                  `<button id="intel-tab-${i}" data-intel-tab="${i}" role="tab" aria-controls="intel-panel" aria-selected="${tab === i}" tabindex="${tab === i ? 0 : -1}"><span dir="ltr">0${i + 1}</span>${icon(v.icon)}<b>${esc(t(v.label))}</b></button>`,
              )
              .join("")}
          </div>
          <button class="domain-pause" data-intel-action="pause" aria-label="${esc(t(C.ui.pause))}">
            ${icon("pause")}
          </button>
        </div>
        <div
          class="intel-workspace"
          id="intel-panel"
          role="tabpanel"
          aria-labelledby="intel-tab-${tab}"
        >
          <div class="intel-stage">
            <div class="intel-viewport">
              <div class="intel-world">
                <img
                  class="intel-photo theme-night"
                  src="${A.intelligence.night}"
                  alt=""
                  draggable="false"
                />
                <img
                  class="intel-photo theme-day"
                  src="${A.intelligence.day}"
                  alt=""
                  draggable="false"
                />
                <canvas class="intel-atmosphere" aria-hidden="true"></canvas>
              </div>
              <div class="center-image-shade"></div>
              <div class="intel-photo-top">
                <span>${icon("brain-circuit")}${esc(t(C.ui.demo))}</span>
                <button data-intel-action="reset">
                  ${icon("rotate-ccw")}${esc(t(C.ui.reset))}
                </button>
              </div>
              <div class="intel-photo-caption">
                <span class="intel-case-dot"></span>
                <div>
                  <p>${esc(t(C.eyebrow))}</p>
                  <h2 class="intel-case-title"></h2>
                </div>
              </div>
            </div>
            <div class="intel-reasoning-dock">
              <div class="intel-chain-heading">
                <b>${esc(t(C.ui.chain))}</b>
                <span>${esc(t(C.ui.chainHint))}</span>
              </div>
              <div class="intel-evidence-ribbon"></div>
              <div class="intel-chain-result" aria-live="polite"></div>
            </div>
          </div>
          <aside class="domain-console intel-console">
            <header class="domain-console-head">
              <span>${esc(t(C.ui.demo))}</span>
              <span class="intel-page-number" dir="ltr"></span>
            </header>
            <div class="domain-console-body intel-body"></div>
            <footer class="domain-console-footer">
              <p class="domain-action-hint intel-action-hint" aria-live="polite"></p>
              <button class="domain-primary" data-intel-action="primary">
                <span></span>
                ${icon("arrow-right")}
              </button>
              <div class="intel-test-controls">
                <button data-intel-action="fresh"></button>
                <button data-intel-action="available"></button>
              </div>
            </footer>
          </aside>
        </div>
        <footer class="domains-footer">
          <span>${esc(t(C.footer))}</span>
          <span>${icon("user-round-check")}${esc(t(C.ui.human))}</span>
        </footer>
      </section>
    `;
  };
  window.ACCSlideMounts.intelligence = (context) => {
    const { state, t, esc, icon, A, scope } = context,
      C = window.ACCSlides.intelligence;
    const root = document.querySelector(".intelligence-slide"),
      q = (s) => root.querySelector(s),
      qa = (s) => [...root.querySelectorAll(s)];
    let tab = clamp(state.tabs.intelligence || 0, 0, 2),
      alert = false,
      fresh = true,
      available = true,
      asset = 0,
      prepared = false,
      requested = false,
      mode = context.motion,
      paused = false,
      dead = false,
      ambient = 0,
      reveal = 0,
      last = 0,
      frame = 0,
      effects,
      observer,
      tween;
    const status = () => assess(alert, fresh, available);
    function telemetry() {
      return /* HTML */ `
        <div class="intel-telemetry">
          <div>
            <span>${esc(t(C.ui.trend))}</span>
            <b>${esc(t(alert ? C.ui.alert : C.ui.normal))}</b>
          </div>
          <svg
            class="intel-trend"
            viewBox="0 0 350 142"
            role="img"
            aria-label="${esc(t(C.ui.trend))}"
            dir="ltr"
          >
            <defs>
              <linearGradient id="intel-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#dbb971" stop-opacity=".28" />
                <stop offset="1" stop-color="#dbb971" stop-opacity="0" />
              </linearGradient>
            </defs>
            <rect class="intel-elevated-band" x="12" y="15" width="326" height="44" rx="6" />
            <path class="intel-grid-line" d="M12 60 H338 M12 106 H338" />
            <path class="intel-trend-area" />
            <path class="intel-trend-line" />
            <circle class="intel-trend-dot" r="4" />
            <text x="57" y="30" text-anchor="middle">${esc(t(C.ui.high))}</text>
            <text x="57" y="128" text-anchor="middle">${esc(t(C.ui.low))}</text>
          </svg>
        </div>
      `;
    }
    function body(animate = false) {
      const v = C.views[tab];
      let inner = "";
      if (tab === 0)
        inner =
          telemetry() +
          `<div class="intel-facts">${C.facts.map((f) => `<div><span>${icon(f.icon)}</span><div><h3>${esc(t(f.label))}</h3><p>${esc(t(f.body))}</p></div></div>`).join("")}</div>`;
      else if (tab === 1)
        inner = `<p class="intel-evidence-note">${esc(t(C.ui.inspectOnly))}</p><div class="intel-assets">${C.assets.map((a, i) => `<button data-intel-asset="${i}" aria-pressed="${asset === i}"><span class="intel-asset-icon">${icon(a.icon)}</span><span><b dir="ltr">${a.id}</b><small>${esc(t(a.label))}</small><em>${esc(t(i === 0 ? (available ? C.ui.eligible : C.ui.none) : i === 1 ? C.ui.busy : C.ui.ground))}</em></span>${icon(asset === i ? "crosshair" : "chevron-down")}</button>`).join("")}</div><div class="intel-asset-reason"><span class="detail-eyebrow">${esc(t(C.ui.constraints))}</span><h3>${esc(t(C.assets[asset].fit))}</h3><p>${esc(t(asset === 0 && !available ? C.ui.noAssetReason : C.assets[asset].reason))}</p></div>`;
      else
        inner = `<div class="intel-recommendation" data-ready="${status() === "eligible"}"><div class="intel-recommendation-head">${icon("brain-circuit")}<span>${esc(t(C.ui[status()]))}</span></div><h3>${esc(t(status() === "eligible" ? C.proposal.title : C.ui[status()]))}</h3>${status() === "eligible" ? `<p>${esc(t(C.proposal.body))}</p>` : ""}<div class="intel-reason-block"><b>${esc(t(C.ui.reason))}</b><p>${esc(t(status() === "eligible" ? C.proposal.why : C.ui[status()]))}</p></div><div class="intel-reason-block"><b>${esc(t(C.ui.limits))}</b><p>${esc(t(C.proposal.limits))}</p></div></div><button class="intel-more-evidence" data-intel-action="evidence">${icon("eye")}${esc(t(C.ui.request))}</button><p class="intel-evidence-note">${esc(t(C.ui.evidence))}</p>`;
      if (tab === 2 && prepared)
        inner =
          `<section class="intel-draft"><header>${icon("clipboard-check")}<h3>${esc(t(C.ui.draftTitle))}</h3></header><dl><dt>${esc(t(C.ui.draftScope))}</dt><dd>${esc(t(C.proposal.title))}</dd><dt>${esc(t(C.ui.draftBasis))}</dt><dd>${esc(t(C.ui.draftBasisBody))}</dd><dt>${esc(t(C.ui.draftPending))}</dt><dd>${esc(t(C.proposal.limits))}</dd></dl><p>${esc(t(C.ui.prepared))}</p></section>` +
          inner;
      q(".intel-body").innerHTML =
        `<h2>${esc(t(v.title))}</h2><p class="domain-lead">${esc(t(v.lead))}</p>${inner}`;
      q(".intel-page-number").textContent = `0${tab + 1} / 03`;
      const button = q("[data-intel-action=primary]");
      button.disabled = tab === 2 && (status() !== "eligible" || prepared);
      button.querySelector("span").textContent = t(
        tab === 0
          ? alert
            ? C.ui.compare
            : C.ui.inject
          : tab === 1
            ? C.ui.recommend
            : prepared
              ? C.ui.prepared
              : C.ui.prepare,
      );
      q(".intel-action-hint").textContent = t(
        requested
          ? C.ui.requested
          : prepared
            ? C.ui.prepared
            : tab === 2
              ? C.ui[status()]
              : C.ui.human,
      );
      q("[data-intel-action=fresh]").textContent = t(fresh ? C.ui.stale : C.ui.refresh);
      q("[data-intel-action=fresh]").setAttribute("aria-pressed", String(!fresh));
      q("[data-intel-action=available]").textContent = t(
        available ? C.ui.unavailable : C.ui.available,
      );
      q("[data-intel-action=available]").setAttribute("aria-pressed", String(!available));
      q(".intel-case-title").textContent = t(alert ? C.ui.alert : C.ui.normal);
      q(".intel-evidence-ribbon").innerHTML = [
        ["radio-tower", C.ui.alertShort, alert, "signal"],
        ["eye", C.ui.freshShort, fresh, "fresh"],
        ["drone", C.ui.assetShort, available, "available"],
      ]
        .map(
          ([glyph, label, valid, action], i) =>
            `<button data-intel-input="${action}" data-quality="${valid ? "ready" : "attention"}" aria-label="${esc(t(action === "signal" ? (alert ? C.views[0].label : C.ui.inject) : action === "fresh" ? (fresh ? C.ui.stale : C.ui.refresh) : available ? C.ui.unavailable : C.ui.available))}"><span>${icon(glyph)}</span><div><small>${esc(t(label))}</small><b>${esc(t(valid ? C.ui.pass : C.ui.missing))}</b></div><i></i></button>`,
        )
        .join("");
      q(".intel-chain-result").innerHTML =
        `<svg class="intel-chain-lines" viewBox="0 0 600 18" preserveAspectRatio="none" aria-hidden="true"><path d="M100 0V7H300V18 M300 0V18 M500 0V7H300"/><circle class="intel-chain-packet" r="2.5"/></svg><span>${icon(status() === "eligible" ? "clipboard-check" : "pause")}<b>${esc(t(prepared ? C.ui.prepared : status() === "eligible" ? C.ui.review : C.ui.held))}</b></span><small>${esc(t(C.ui[status()]))}</small>`;
      root.dataset.intelTab = tab;
      root.dataset.readiness = status();
      root.dataset.prepared = String(prepared);
      root.dataset.alert = String(alert);
      if (animate && window.gsap && mode === "full" && !paused) {
        tween?.kill();
        tween = window.gsap.fromTo(
          q(".intel-body"),
          { opacity: 0.4, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", overwrite: true },
        );
      }
      paint();
    }
    function select(index, focus = false) {
      tab = clamp(index, 0, 2);
      state.tabs.intelligence = tab;
      qa("[data-intel-tab]").forEach((el, i) => {
        el.setAttribute("aria-selected", String(i === tab));
        el.tabIndex = tab === i ? 0 : -1;
      });
      q("#intel-panel").setAttribute("aria-labelledby", `intel-tab-${tab}`);
      body(true);
      if (focus) q(`#intel-tab-${tab}`).focus();
    }
    function paint() {
      if (dead) return;
      if (tab === 0) {
        const points = [];
        for (let i = 0; i <= 60; i++) {
          const x = 12 + (i * 326) / 60;
          let y = 103 + Math.sin(i * 0.63 + ambient * 0.5) * 3 + Math.sin(i * 1.8) * 1.5;
          if (alert && i > 27) y -= Math.min(1, (i - 27) / 22) * 58 * reveal;
          points.push([x, y]);
        }
        const path = points
          .map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
          .join(" ");
        q(".intel-trend-line")?.setAttribute("d", path);
        q(".intel-trend-area")?.setAttribute("d", path + " L338 135 H12Z");
        const end = points[points.length - 1];
        q(".intel-trend-dot")?.setAttribute("cx", end[0]);
        q(".intel-trend-dot")?.setAttribute("cy", end[1]);
      }
      const packet = q(".intel-chain-packet");
      if (packet) {
        const phase = (ambient * 0.65) % 1;
        packet.setAttribute("cx", "300");
        packet.setAttribute("cy", String(phase * 18));
        packet.style.opacity = status() === "eligible" ? "1" : "0";
      }
      effects?.render(
        ambient,
        "authority",
        state.theme === "light" ? 1 : 0,
        0,
        0,
        null,
        alert ? { x: 0.45, y: 0.23 } : null,
      );
    }
    function resize() {
      const r = q(".intel-viewport").getBoundingClientRect(),
        w = Math.min(Math.max(0, r.width), (Math.max(0, r.height) * 16) / 9),
        h = (w * 9) / 16;
      if (w < 1 || h < 1) return;
      q(".intel-world").style.width = w + "px";
      q(".intel-world").style.height = h + "px";
      effects?.resize(w, h);
      paint();
    }
    function updateTheme() {
      const src = A.intelligence[state.theme === "light" ? "day" : "night"];
      q(".domains-backdrop").style.backgroundImage = `url("${src}")`;
      q(".intel-viewport").style.setProperty("--intel-image", `url("${src}")`);
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
      if (alert) reveal = clamp(reveal + dt * 0.7);
      paint();
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      const stopped = paused || mode !== "full" || document.hidden;
      root.dataset.paused = String(stopped);
      const b = q("[data-intel-action=pause]");
      b.innerHTML = icon(stopped ? "play" : "pause");
      b.setAttribute("aria-label", t(stopped ? C.ui.play : C.ui.pause));
      b.title = t(stopped ? C.ui.play : C.ui.pause);
      if (tween) stopped ? tween.pause() : tween.play();
      if (!stopped && !dead) frame = requestAnimationFrame(tick);
    }
    scope.listen(root, "click", (event) => {
      const b = event.target.closest("button");
      if (!b || b.disabled) return;
      if (b.dataset.intelInput !== undefined) {
        const input = b.dataset.intelInput;
        if (input === "signal") {
          if (!alert) {
            alert = true;
            reveal = mode === "full" ? 0 : 1;
          }
          select(0);
        } else {
          if (input === "fresh") fresh = !fresh;
          else available = !available;
          prepared = false;
          requested = false;
          body();
        }
        return;
      }
      if (b.dataset.intelTab !== undefined) {
        if (Number(b.dataset.intelTab) !== tab) select(Number(b.dataset.intelTab));
        return;
      }
      if (b.dataset.intelAsset !== undefined) {
        asset = Number(b.dataset.intelAsset);
        body();
        q(".intel-body").scrollTop = 0;
        return;
      }
      switch (b.dataset.intelAction) {
        case "primary":
          if (tab === 0 && !alert) {
            alert = true;
            reveal = mode === "full" ? 0 : 1;
            body();
          } else if (tab < 2) select(tab + 1);
          else if (status() === "eligible") {
            prepared = true;
            requested = false;
            body();
            q(".intel-body").scrollTop = 0;
          }
          break;
        case "fresh":
          fresh = !fresh;
          prepared = false;
          requested = false;
          body();
          break;
        case "available":
          available = !available;
          prepared = false;
          requested = false;
          body();
          break;
        case "evidence":
          requested = true;
          prepared = false;
          fresh = false;
          body();
          break;
        case "reset":
          alert = false;
          fresh = true;
          available = true;
          prepared = false;
          requested = false;
          asset = 0;
          reveal = 0;
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
    scope.listen(root, "keydown", (event) => {
      if (
        !event.target.matches("[data-intel-tab]") ||
        !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
      )
        return;
      event.preventDefault();
      event.stopPropagation();
      const dir = (event.key === "ArrowRight" ? 1 : -1) * (state.lang === "ar" ? -1 : 1);
      select(event.key === "Home" ? 0 : event.key === "End" ? 2 : (tab + dir + 3) % 3, true);
    });
    scope.listen(document, "visibilitychange", sync);
    try {
      effects = new window.ACCVisionAtmosphere(q(".intel-atmosphere"), { authority: C.atmosphere });
    } catch (e) {
      console.warn(e);
    }
    if (window.ResizeObserver) {
      observer = new window.ResizeObserver(resize);
      observer.observe(q(".intel-viewport"));
    } else scope.listen(window, "resize", resize);
    select(tab);
    updateTheme();
    resize();
    sync();
    return {
      setTheme: updateTheme,
      setMotion(value) {
        mode = value;
        if (mode !== "full") {
          tween?.progress(1);
          if (alert) reveal = 1;
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
