/** SLIDE 10 — packaged dashboard preview and launch controls. */
(() => {
  "use strict";

  window.ACCSlideViews.demo = ({ t, esc, icon }) => {
    const C = window.ACCSlides.demo;
    return /* HTML */ `
      <section class="slide demo-slide" aria-labelledby="slideTitle" data-demo-screen="0">
        <div class="demo-backdrop" aria-hidden="true">
          <img class="theme-night" src="assets/images/center/floor-night.webp" alt="" />
          <img class="theme-day" src="assets/images/center/floor-day.webp" alt="" />
        </div>
        <div class="demo-vignette" aria-hidden="true"></div>

        <div class="demo-copy">
          <div class="demo-kicker-row">
            <p class="eyebrow">${esc(t(C.kicker))}</p>
            <span class="demo-ready"><i></i>${esc(t(C.ready))}</span>
          </div>
          <h1 id="slideTitle" tabindex="-1">${esc(t(C.title))}</h1>
          <p class="demo-summary">${esc(t(C.summary))}</p>

          <div class="demo-capabilities">
            ${C.capabilities
              .map(
                (item) => `
                  <article>
                    <span>${icon(item.icon)}</span>
                    <b>${esc(t(item.title))}</b>
                  </article>
                `,
              )
              .join("")}
          </div>

          <div class="demo-actions">
            <button class="demo-action demo-action-primary" data-dashboard-action="view">
              <span>${icon("eye")}</span>
              <span><b>${esc(t(C.actions.view.title))}</b><small>${esc(t(C.actions.view.detail))}</small></span>
            </button>
            <button class="demo-action demo-action-secondary" data-dashboard-action="launch">
              <span>${icon("expand")}</span>
              <span><b>${esc(t(C.actions.launch.title))}</b><small>${esc(t(C.actions.launch.detail))}</small></span>
            </button>
          </div>
          <p class="demo-note">${icon("info")}<span>${esc(t(C.note))}</span></p>
          <p class="demo-popup-message" role="status" aria-live="polite"></p>
        </div>

        <div class="demo-theatre" aria-label="${esc(t(C.title))}">
          <div class="demo-screen-glow" aria-hidden="true"></div>
          <div class="demo-screen-shell">
            <div class="demo-screen-top">
              <span class="demo-screen-brand"><i></i> UAE ACC</span>
              <span class="demo-screen-status">${icon("shield-check")}<b>${esc(t(C.ready))}</b></span>
            </div>
            <div class="demo-screen-stage">
              ${C.screens
                .map(
                  (screen, index) => `
                    <figure class="demo-screen-image ${index === 0 ? "active" : ""}" data-demo-screen-item="${index}">
                      <img src="${screen.image}" alt="${esc(t(screen.label))}" />
                      <figcaption><b>${esc(t(screen.label))}</b><small>${esc(t(screen.detail))}</small></figcaption>
                    </figure>
                  `,
                )
                .join("")}
              <span class="demo-screen-scan" aria-hidden="true"></span>
            </div>
            <div class="demo-screen-selector" role="tablist" aria-label="${esc(t(C.kicker))}">
              ${C.screens
                .map(
                  (screen, index) => `
                    <button type="button" data-demo-screen-select="${index}" role="tab" aria-selected="${index === 0}">
                      <i></i><span><b>${esc(t(screen.label))}</b><small>${esc(t(screen.detail))}</small></span>
                    </button>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="demo-screen-base" aria-hidden="true"><i></i></div>
        </div>
      </section>
    `;
  };

  window.ACCSlideMounts.demo = ({ state, t, scope, motion }) => {
    const C = window.ACCSlides.demo;
    const root = document.querySelector(".demo-slide");
    const theatre = root.querySelector(".demo-theatre");
    const selectors = Array.from(root.querySelectorAll("[data-demo-screen-select]"));
    const images = Array.from(root.querySelectorAll("[data-demo-screen-item]"));
    const message = root.querySelector(".demo-popup-message");
    const overlay = document.getElementById("dashboardOverlay");
    const frame = document.getElementById("dashboardFrame");
    let current = 0;
    let mode = motion;
    let paused = false;
    let dead = false;
    let timer = 0;

    function dashboardUrl() {
      const url = new URL("dashboard/index.html", window.location.href);
      url.searchParams.set("presentation", "1");
      url.searchParams.set("module", "command");
      url.searchParams.set("user", "aisha");
      url.searchParams.set("lang", state.lang);
      url.searchParams.set("theme", state.theme);
      url.searchParams.set("font", "large");
      return url.href;
    }

    function paint(next) {
      current = (next + images.length) % images.length;
      root.dataset.demoScreen = String(current);
      images.forEach((image, index) => image.classList.toggle("active", index === current));
      selectors.forEach((button, index) => button.setAttribute("aria-selected", String(index === current)));
    }

    function stopTimer() {
      window.clearTimeout(timer);
      timer = 0;
    }

    function schedule() {
      stopTimer();
      if (dead || paused || mode !== "full" || document.hidden) return;
      timer = window.setTimeout(() => {
        paint(current + 1);
        schedule();
      }, 4300);
    }

    function launchDashboard() {
      const popup = window.open(
        dashboardUrl(),
        "uae-autonomous-command-center",
        "popup=yes,width=1760,height=1000,left=36,top=28,resizable=yes,scrollbars=yes",
      );
      if (!popup) message.textContent = t(C.overlay.popupBlocked);
      else {
        message.textContent = "";
        popup.focus?.();
      }
    }

    function openOverlay() {
      document.getElementById("dashboardOverlayTitle").textContent = t(C.overlay.title);
      document.getElementById("dashboardOverlaySubtitle").textContent = t(C.overlay.subtitle);
      document.getElementById("dashboardOverlayLoading").textContent = t(C.overlay.loading);
      const close = overlay.querySelector(".dashboard-overlay-close");
      const popout = overlay.querySelector("[data-dashboard-overlay-launch]");
      close.setAttribute("aria-label", t(C.overlay.close));
      close.title = t(C.overlay.close);
      popout.querySelector("span").textContent = t(C.overlay.popout);
      popout.setAttribute("aria-label", t(C.overlay.popout));
      frame.title = t(C.overlay.title);
      overlay.classList.remove("loaded");
      frame.src = dashboardUrl();
      if (!overlay.open) overlay.showModal();
    }

    function unloadOverlay() {
      overlay.classList.remove("loaded");
      frame.src = "about:blank";
    }

    scope.listen(root, "click", (event) => {
      const screen = event.target.closest("[data-demo-screen-select]");
      if (screen) {
        paint(Number(screen.dataset.demoScreenSelect));
        schedule();
        return;
      }
      const action = event.target.closest("[data-dashboard-action]")?.dataset.dashboardAction;
      if (action === "view") openOverlay();
      if (action === "launch") launchDashboard();
    });
    scope.listen(overlay, "click", (event) => {
      if (event.target.closest("[data-dashboard-overlay-launch]")) launchDashboard();
    });
    scope.listen(overlay, "close", unloadOverlay);
    scope.listen(frame, "load", () => {
      if (frame.src && !frame.src.endsWith("about:blank")) overlay.classList.add("loaded");
    });
    scope.listen(theatre, "pointerenter", () => {
      paused = true;
      stopTimer();
    });
    scope.listen(theatre, "pointerleave", () => {
      paused = false;
      schedule();
    });
    scope.listen(theatre, "pointermove", (event) => {
      if (mode !== "full" || event.pointerType === "touch") return;
      const box = theatre.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      theatre.style.setProperty("--demo-tilt-x", `${(-y * 2.1).toFixed(2)}deg`);
      theatre.style.setProperty("--demo-tilt-y", `${(x * 2.8).toFixed(2)}deg`);
    });
    scope.listen(theatre, "pointerleave", () => {
      theatre.style.setProperty("--demo-tilt-x", "0deg");
      theatre.style.setProperty("--demo-tilt-y", "0deg");
    });
    scope.listen(document, "visibilitychange", schedule);

    paint(0);
    schedule();
    return {
      setMotion(next) {
        mode = next;
        if (mode !== "full") {
          theatre.style.setProperty("--demo-tilt-x", "0deg");
          theatre.style.setProperty("--demo-tilt-y", "0deg");
        }
        schedule();
      },
      setTheme() {},
      destroy() {
        dead = true;
        stopTimer();
        if (overlay.open) overlay.close();
        unloadOverlay();
      },
    };
  };
})();
