/* UAE ACC shell v0.9.0 | No runtime network requests. */
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const A = window.ACCAssets;
  const icon = (name) => window.ACCIcons[name] || "";
  const langText = (en, ar) => ({ en, ar });
  const sections = window.ACCConfig.sections;
  const slides = window.ACCConfig.order.map((id) => window.ACCSlides[id]);
  const words = window.ACCInterface;
  const introUI = window.ACCSlides.cover.ui;
  const storage = {
    read(k, d) {
      try {
        return localStorage.getItem("uae-acc-" + k) || d;
      } catch {
        return d;
      }
    },
    write(k, v) {
      try {
        localStorage.setItem("uae-acc-" + k, v);
      } catch {}
    },
  };
  const state = {
    theme: storage.read("theme", "dark") === "light" ? "light" : "dark",
    scenePaused: false,
    sceneFocus: false,
    slide: 0,
    lang: storage.read("lang", "en") === "ar" ? "ar" : "en",
    motion: storage.read("motion-v041", "full"),
    tabs: {},
    ready: false,
  };
  const t = (x) => x?.[state.lang] ?? "";
  const w = (x) => t(words[x]);
  const esc = (str) =>
    String(str).replace(
      /[&<>"']/g,
      (x) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[x],
    );
  let scope = null,
    enterAnimation = null,
    dialogTrigger = null,
    toastTimer,
    coverScene = null,
    launchTimeline = null,
    activeSlide = null;
  const systemMotion = matchMedia("(prefers-reduced-motion: reduce)");
  /* Every future slide owns one scope. Leaving it cancels its timelines,
   timers and listeners. Default model poses belong to slide configuration,
   never to transient hover/click transforms. */
  function motionMode() {
    return state.motion === "system" ? (systemMotion.matches ? "reduced" : "full") : state.motion;
  }
  function applyMotion() {
    document.documentElement.dataset.motion = motionMode();
    if (motionMode() !== "full") enterAnimation?.finish();
    coverScene?.setMotion(motionMode());
    activeSlide?.setMotion(motionMode());
    renderMotionOptions();
    syncSceneControls();
  }
  function setMotion(value) {
    state.motion = value;
    storage.write("motion-v041", value);
    applyMotion();
  }
  function renderMotionOptions() {
    const opts = window.ACCConfig.motionOptions;
    $("#motionOptions").innerHTML = opts
      .map(
        ([id, en, ar]) => /* HTML */ `
          <button data-motion-option="${id}" aria-pressed="${state.motion === id}">
            ${esc(t(langText(en, ar)))}
          </button>
        `,
      )
      .join("");
  }
  function tabMarkup(key, items, active) {
    return /* HTML */ `
      <div class="tabs" role="tablist" aria-label="${esc(w("contents"))}">
        ${items
          .map(
            (x, i) => /* HTML */ `
              <button
                class="tab"
                id="${key}-tab-${i}"
                role="tab"
                data-tab-group="${key}"
                data-tab-index="${i}"
                aria-controls="${key}-panel"
                aria-selected="${i === active}"
                tabindex="${i === active ? 0 : -1}"
              >
                ${esc(t(x))}
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }
  function renderStage(direction = 0, focus = false) {
    scope?.dispose();
    scope = new window.ACCSceneScope();
    enterAnimation?.cancel();
    const context = {
      state,
      t,
      w,
      esc,
      icon,
      A,
      slides,
      sections,
      words,
      tabMarkup,
      scope,
      motion: motionMode(),
      setMotion,
    };
    const renderer = window.ACCSlideViews[slides[state.slide].id] || window.ACCPlaceholderView;
    $("#stage").innerHTML = renderer(context);
    const mount = window.ACCSlideMounts[slides[state.slide].id];
    if (mount) {
      activeSlide = mount(context);
      scope.own(() => {
        activeSlide?.destroy();
        activeSlide = null;
      });
    }
    if (state.slide >= 1 && state.slide <= 6) window.ACCContentLayout?.mount($("#stage"), context);
    if (state.slide === 0) mountCover();
    if (direction && motionMode() === "full") {
      const x = direction * (state.lang === "ar" ? -1 : 1) * 28;
      enterAnimation = scope.animate(
        $("#stage").firstElementChild,
        [
          { opacity: 0, transform: `translateX(${x}px)` },
          { opacity: 1, transform: "translateX(0)" },
        ],
        { duration: 560, easing: "cubic-bezier(.22,1,.36,1)" },
      );
    }
    if (focus) $("#slideTitle").focus({ preventScroll: true });
  }
  function updateTabs(key, index, focus = true) {
    state.tabs[key] = index;
    renderStage();
    if (focus) document.getElementById(key + "-tab-" + index)?.focus({ preventScroll: true });
  }
  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    $("#themeButton").innerHTML = icon(state.theme === "dark" ? "sun" : "moon");
    const label = t(state.theme === "dark" ? words.switchToLightMode : words.switchToDarkMode);
    $("#themeButton").title = label;
    $("#themeButton").setAttribute("aria-label", label);
    $("#themeButton").setAttribute("aria-pressed", String(state.theme === "light"));
    $('meta[name="theme-color"]').content = state.theme === "dark" ? "#081629" : "#eef2f5";
    coverScene?.setTheme(state.theme);
    activeSlide?.setTheme?.(state.theme);
  }
  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    storage.write("theme", state.theme);
    applyTheme();
  }
  function syncSceneControls() {
    const b = $("#scenePause");
    if (!b) return;
    const paused = state.scenePaused || motionMode() !== "full";
    const label = t(paused ? introUI.playScene : introUI.pauseScene);
    b.innerHTML = `${icon(paused ? "play" : "pause")}<span class="scene-play-label">${label}</span>`;
    b.title = label;
    b.setAttribute("aria-label", label);
    b.setAttribute("aria-pressed", String(paused));
    $(".cover")?.classList.toggle("motion-off", paused);
    const hint = $("#motionHint");
    if (hint) hint.textContent = t(introUI.scenePausedSelectPlaySceneToAnimate);
    const f = $("#sceneFocus");
    const fl = t(state.sceneFocus ? introUI.returnToIntroduction : introUI.exploreScene);
    f.title = fl;
    f.setAttribute("aria-label", fl);
    f.setAttribute("aria-pressed", String(state.sceneFocus));
    f.innerHTML = icon(state.sceneFocus ? "shrink" : "expand");
  }
  function toggleScenePause() {
    if (motionMode() !== "full") {
      state.scenePaused = false;
      setMotion("full");
    } else state.scenePaused = !state.scenePaused;
    coverScene?.setPaused(state.scenePaused);
    syncSceneControls();
  }
  function toggleSceneFocus() {
    state.sceneFocus = !state.sceneFocus;
    $(".cover")?.classList.toggle("scene-focus", state.sceneFocus);
    const copy = $(".cover-copy");
    if (copy) copy.inert = state.sceneFocus;
    const lens = $(".visual-lens");
    if (lens) lens.inert = state.sceneFocus;
    syncSceneControls();
    if (state.sceneFocus) $("#sceneReturn")?.focus({ preventScroll: true });
    else $("#exploreScene")?.focus({ preventScroll: true });
  }
  function mountCover() {
    const cinema = $(".cinema");
    if (window.HarbourScene) {
      try {
        const scene = new window.HarbourScene(cinema, {
          theme: state.theme,
          motion: motionMode(),
          paused: state.scenePaused,
          lang: state.lang,
          hud: window.ACCSlides.cover.hud,
        });
        coverScene = scene;
        scope.own(() => {
          scene.destroy();
          if (coverScene === scene) coverScene = null;
        });
      } catch (e) {
        console.warn("Scene unavailable; the rendered poster remains visible.", e);
      }
    }
    const button = $(".begin");
    scope.listen(button, "pointermove", (e) => {
      if (motionMode() !== "full" || e.pointerType === "touch") return;
      const r = button.getBoundingClientRect();
      button.style.setProperty("--rx", (0.5 - (e.clientY - r.top) / r.height) * 7 + "deg");
      button.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 8 + "deg");
      button.style.setProperty("--shine-x", ((e.clientX - r.left) / r.width) * 100 + "%");
    });
    const reset = () => {
      button.style.setProperty("--rx", "0deg");
      button.style.setProperty("--ry", "0deg");
    };
    scope.listen(button, "pointerleave", reset);
    scope.listen(button, "blur", reset);
    $(".cover-copy").inert = state.sceneFocus;
    syncSceneControls();
  }
  function beginPresentation() {
    if (launchTimeline) return;
    if (!window.gsap || motionMode() !== "full") {
      go(1);
      return;
    }
    const cover = $(".cover"),
      button = $(".begin");
    button.disabled = true;
    const tl = window.gsap.timeline({
      onComplete: () => {
        launchTimeline = null;
        go(1);
      },
    });
    launchTimeline = tl;
    tl.to(".cover-copy", { opacity: 0, y: -14, duration: 0.5, ease: "power2.inOut" }, 0)
      .to(".scene-toolbar", { opacity: 0, duration: 0.38 }, 0)
      .to(".cinema", { scale: 1.025, duration: 1.05, ease: "power2.inOut" }, 0)
      .to(".cover-shade", { opacity: 0.2, duration: 0.55 }, 0)
      .to(cover, { opacity: 0, duration: 0.35 }, 0.7);
  }
  function syncChrome() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    document.title = t(slides[0].title);
    const shortNames = slides.map((s) => s.navLabel);
    $("#sections").innerHTML =
      sections
        .map(
          (s, i) => /* HTML */ `
            <div class="nav-category" data-active="${slides[state.slide].section === i}">
              <span class="nav-category-name">
                ${icon(s.icon)}
                <span>${esc(t(s))}</span>
              </span>
              <div class="nav-slides">
                ${slides
                  .map((slide, j) =>
                    slide.section === i
                      ? /* HTML */ `
                          <button
                            class="nav-slide"
                            data-go="${j}"
                            aria-current="${state.slide === j ? "page" : "false"}"
                            title="${esc(t(slide.title))}"
                          >
                            ${esc(t(shortNames[j]))}
                          </button>
                        `
                      : "",
                  )
                  .join("")}
              </div>
            </div>
          `,
        )
        .join("") +
      /* HTML */ `
        <button class="nav-current" data-open-outline>
          <small>
            ${icon(sections[slides[state.slide].section].icon)}${esc(
              t(sections[slides[state.slide].section]),
            )}
          </small>
          <span>${esc(t(shortNames[state.slide]))}${icon("chevron-down")}</span>
        </button>
      `;
    $("#dots").innerHTML = slides
      .map(
        (s, i) => /* HTML */ `
          <button
            class="slide-dot"
            data-go="${i}"
            aria-current="${state.slide === i}"
            title="${esc(t(s.title))}"
            aria-label="${i + 1}. ${esc(t(s.title))}"
          ></button>
        `,
      )
      .join("");
    $("#counter").innerHTML = `${String(state.slide + 1).padStart(2, "0")} <i>/ ${String(slides.length).padStart(2, "0")}</i>`;
    $("#deckProgress").style.width = `${((state.slide + 1) / slides.length) * 100}%`;
    $("#footerLabel").textContent = w("footer");
    $("#previous").disabled = state.slide === 0;
    $("#next").disabled = state.slide === slides.length - 1;
    for (const [sel, key] of [
      ["#home", "home"],
      ["#previous", "previous"],
      ["#next", "next"],
      ["#outlineButton", "contents"],
      ["#settingsButton", "settings"],
    ]) {
      const e = $(sel);
      e.setAttribute("aria-label", w(key));
      e.title = w(key);
    }
    $("#language").textContent = state.lang === "en" ? "العربية" : "English";
    $("#language").lang = state.lang === "en" ? "ar" : "en";
    $("#language").title = t(state.lang === "en" ? words.switchToArabic : words.switchToEnglish);
    document.querySelectorAll("[data-i18n]").forEach((e) => (e.textContent = w(e.dataset.i18n)));
    document
      .querySelectorAll(".close-dialog")
      .forEach((e) => e.setAttribute("aria-label", w("close")));
    $("#outlineItems").innerHTML = slides
      .map(
        (s, i) => /* HTML */ `
          <button class="outline-item" data-go="${i}" aria-current="${state.slide === i}">
            <b dir="ltr">${String(i + 1).padStart(2, "0")}</b>
            <span>
              ${esc(t(s.title))}
              <small>
                ${esc(t(sections[s.section]))}${s.status === "planned"
                  ? " · " + esc(w("reserved"))
                  : ""}
              </small>
            </span>
          </button>
        `,
      )
      .join("");
    renderMotionOptions();
    syncFullscreen();
    applyTheme();
  }
  function go(index, { hash = true, focus = true } = {}) {
    if (!state.ready) return;
    launchTimeline?.kill();
    launchTimeline = null;
    state.sceneFocus = false;
    index = Math.max(0, Math.min(slides.length - 1, index));
    const direction = Math.sign(index - state.slide);
    state.slide = index;
    closeDialogs(false);
    syncChrome();
    renderStage(direction, focus);
    if (hash) {
      try {
        history.replaceState(null, "", "#" + slides[index].id);
      } catch {}
    }
    $("#announcer").textContent = `${index + 1} / ${slides.length}. ${t(slides[index].title)}`;
  }
  function readHash() {
    const id = location.hash.slice(1);
    const index = slides.findIndex((s) => s.id === id);
    return index < 0 ? 0 : index;
  }
  function horizontalKeyStep(key) {
    if (key === "ArrowRight") return state.lang === "ar" ? -1 : 1;
    if (key === "ArrowLeft") return state.lang === "ar" ? 1 : -1;
    return 0;
  }
  function toggleLanguage() {
    state.lang = state.lang === "en" ? "ar" : "en";
    storage.write("lang", state.lang);
    syncChrome();
    renderStage();
    $("#language").focus();
  }
  function openDialog(id) {
    dialogTrigger = document.activeElement;
    const d = $("#" + id);
    if (!d.open) d.showModal();
    $("#outlineButton").setAttribute("aria-expanded", String(id === "outline"));
  }
  function closeDialogs(restore = true) {
    document.querySelectorAll("dialog[open]").forEach((d) => d.close());
    $("#outlineButton").setAttribute("aria-expanded", "false");
    if (restore && dialogTrigger?.isConnected) dialogTrigger.focus({ preventScroll: true });
  }
  function toast(message) {
    clearTimeout(toastTimer);
    $("#toast").textContent = message;
    $("#toast").classList.add("show");
    toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 4000);
  }
  function syncFullscreen() {
    const title = w(document.fullscreenElement ? "exitFull" : "enterFull");
    $("#fullscreen").title = title;
    $("#fullscreen").setAttribute("aria-label", title);
    $("#fullscreen").setAttribute("aria-pressed", String(!!document.fullscreenElement));
    $("#fullscreen").innerHTML = icon(document.fullscreenElement ? "minimize" : "maximize");
  }
  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen)
        await document.documentElement.requestFullscreen();
      else toast(w("noFullscreen"));
    } catch {
      toast(w("noFullscreen"));
    }
  }
  // All navigation surfaces dispatch to the same state transition.
  document.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b || b.disabled) return;
    if (b.dataset.go !== undefined) {
      if (b.classList.contains("begin")) beginPresentation();
      else go(Number(b.dataset.go));
      return;
    }
    if (b.dataset.section !== undefined) {
      const section = Number(b.dataset.section);
      go(slides.findIndex((s) => s.section === section));
      return;
    }
    if (b.dataset.tabGroup) {
      updateTabs(b.dataset.tabGroup, Number(b.dataset.tabIndex));
      return;
    }
    if (b.dataset.motionOption) {
      setMotion(b.dataset.motionOption);
      document.querySelector(`[data-motion-option="${state.motion}"]`).focus();
      return;
    }
    if (b.hasAttribute("data-open-outline") || b.id === "outlineButton") {
      openDialog("outline");
      return;
    }
    if (b.classList.contains("close-dialog")) {
      closeDialogs();
      return;
    }
    switch (b.id) {
      case "themeButton":
        toggleTheme();
        break;
      case "scenePause":
        toggleScenePause();
        break;
      case "sceneFocus":
      case "exploreScene":
      case "sceneReturn":
        toggleSceneFocus();
        break;
      case "home":
        go(0);
        break;
      case "previous":
        go(state.slide - 1);
        break;
      case "next":
        go(state.slide + 1);
        break;
      case "language":
        toggleLanguage();
        break;
      case "settingsButton":
        openDialog("settings");
        break;
      case "fullscreen":
        toggleFullscreen();
        break;
    }
  });
  document.addEventListener("keydown", (e) => {
    if (!state.ready || e.altKey || e.ctrlKey || e.metaKey) return;
    const target = e.target;
    const tab = target.closest?.("[role=tab]");
    if (tab && ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
      e.preventDefault();
      const group = tab.dataset.tabGroup,
        items = Array.from(tab.parentElement.querySelectorAll("[role=tab]"));
      let i = Number(tab.dataset.tabIndex);
      if (e.key === "Home") i = 0;
      else if (e.key === "End") i = items.length - 1;
      else i = (i + horizontalKeyStep(e.key) + items.length) % items.length;
      updateTabs(group, i);
      return;
    }
    if (document.querySelector("dialog[open]")) return;
    if (e.key === "Escape" && state.sceneFocus) {
      e.preventDefault();
      toggleSceneFocus();
      return;
    }
    if (target.matches?.("input,textarea,select,[contenteditable=true]")) return;
    const horizontalStep = horizontalKeyStep(e.key);
    if (horizontalStep) {
      e.preventDefault();
      go(state.slide + horizontalStep);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(slides.length - 1);
    } else if (e.key.toLowerCase() === "f") {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === "PageDown" || e.key === "PageUp") {
      e.preventDefault();
      go(state.slide + (e.key === "PageDown" ? 1 : -1));
    }
  });
  document.querySelectorAll("dialog").forEach((d) => {
    d.addEventListener("click", (e) => {
      if (e.target === d) {
        const r = d.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
          closeDialogs();
      }
    });
    d.addEventListener("cancel", () => {
      $("#outlineButton").setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("fullscreenchange", syncFullscreen);
  document.addEventListener("visibilitychange", () => {
    document.body.classList.toggle("suspended", document.hidden);
    scope?.animations.forEach((a) => (document.hidden ? a.pause() : a.play()));
    coverScene?.setMotion(motionMode());
  });
  window.addEventListener("hashchange", () => go(readHash(), { hash: false }));
  systemMotion.addEventListener("change", applyMotion);
  // Preload actual packaged assets. Never block launch indefinitely on an asset failure.
  async function preload() {
    applyMotion();
    syncChrome();
    const loader = $("#loader");
    let visibleSince = Date.now();
    const image = $("#loaderImage");
    const reveal = () => {
      visibleSince = Date.now();
      loader.classList.add("art-ready");
    };
    const heroReady = new Promise((resolve) => {
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        reveal();
        resolve();
      };
      const timer = setTimeout(finish, 8000);
      if (image.complete && image.naturalWidth) {
        image
          .decode()
          .catch(() => {})
          .then(finish);
      } else {
        image.addEventListener("load", finish, { once: true });
        image.addEventListener("error", finish, { once: true });
      }
    });
    $(".loader-panel .eyebrow").textContent = t(window.ACCSlides.cover.country);
    $("#loadText").textContent = t(window.ACCSlides.cover.title);
    $("#loadDetail").textContent = t(words.preparingTheExperience);
    const sources = [
      A.night,
      A.day,
      ...Object.values(A.vision).flatMap((pair) => [pair.night, pair.day]),
      ...Object.values(A.domains).flatMap((pair) => [pair.night, pair.day]),
      A.center.night,
      A.center.day,
      A.intelligence.night,
      A.intelligence.day,
      A.response.night,
      A.response.day,
      A.governance.night,
      A.governance.day,
      ...(A.value.scenes
        ? Object.values(A.value.scenes).flatMap((pair) => [pair.night, pair.day])
        : [A.value.night, A.value.day]),
      ...(A.roadmap?.scenes
        ? Object.values(A.roadmap.scenes).flatMap((pair) => [pair.night, pair.day])
        : []),
      "assets/brand/eand-mark.svg",
      "assets/brand/csc-transparent.png",
    ];
    let done = 0;
    const total = sources.length + 2;
    function tick() {
      done++;
      const percent = Math.round((done / total) * 100);
      $("#loadBar").style.width = percent + "%";
      $("#loadPercent").textContent = percent + "%";
    }
    const images = sources.map(
      (src) =>
        new Promise((resolve) => {
          const im = new Image();
          let settled = false;
          const finish = () => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            tick();
            resolve();
          };
          const timer = setTimeout(finish, 8000);
          im.onload = async () => {
            try {
              await im.decode();
            } catch {}
            finish();
          };
          im.onerror = finish;
          im.src = src;
        }),
    );
    const fonts = Promise.race([
      Promise.all([
        document.fonts.load("400 16px Manrope"),
        document.fonts.load("700 16px Manrope"),
        document.fonts.load("400 16px Arabic"),
        document.fonts.load("700 16px Arabic"),
      ]),
      new Promise((r) => setTimeout(r, 8000)),
    ])
      .catch(() => {})
      .then(tick);
    await Promise.all([...images, fonts, heroReady.then(tick)]);
    const remaining = Math.max(0, window.ACCConfig.minimumLoadingMs - (Date.now() - visibleSince));
    if (remaining) await new Promise((r) => setTimeout(r, remaining));
    $("#loadDetail").textContent = t(words.openingThePresentation);
    state.ready = true;
    $("#app").inert = false;
    go(readHash(), { hash: false, focus: false });
    loader.classList.add("done");
    setTimeout(() => {
      loader.hidden = true;
      loader.classList.add("finished");
    }, 750);
  }

  $(".csc-logo").addEventListener(
    "error",
    () => {
      $("#cscBrand").innerHTML =
        `<span class="csc-fallback">${esc(words.brandFallback.ar)}<br>${esc(words.brandFallback.en)}</span>`;
    },
    { once: true },
  );
  $(".eand-logo").addEventListener(
    "error",
    () => {
      $(".eand-logo").src = "assets/brand/eand.svg";
    },
    { once: true },
  );
  preload();
})();
