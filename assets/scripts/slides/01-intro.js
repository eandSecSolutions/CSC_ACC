/** Intro view. Copy and translations: assets/config/slides/01-intro.js. */
window.ACCSlideViews.cover = function ({ state, t, esc, icon, A }) {
  const C = window.ACCSlides.cover;

  return /* HTML */ `
    <section
      class="slide cover ${state.sceneFocus ? "scene-focus" : ""}"
      aria-labelledby="slideTitle"
    >
      <div class="cinema" aria-hidden="true">
        <div class="scene-orientation">
          <div class="scene-frame">
            <div class="scene-world">
              <img class="scene-plate scene-night" src="${A.night}" alt="" />
              <img class="scene-plate scene-day" src="${A.day}" alt="" />
              <canvas class="water-canvas"></canvas>
              <div class="sky-glow"></div>
              <span class="vehicle-signal"></span>
              <span class="vehicle-signal-spill"></span>
              <span class="photo-beacon vessel-beacon"></span>
              <span class="photo-beacon drone-beacon"></span>
              <span class="photo-beacon marine-green"></span>
              <canvas class="city-light-canvas"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div class="cover-shade" aria-hidden="true"></div>
      <div class="drone-layer" aria-hidden="true">
        <canvas class="drone-canvas"></canvas>
        <svg class="drone-hud"></svg>
      </div>
      <div class="flight-caption">${esc(t(C.ui.simulatedAirTraffic))}</div>
      <div class="motion-hint" id="motionHint" role="status"></div>
      <div class="scene-toolbar" dir="ltr">
        <button id="scenePause" class="scene-control" aria-label="${esc(t(C.ui.pauseScene))}">
          ${icon("pause")}
        </button>
        <button id="sceneFocus" class="scene-control" aria-label="${esc(t(C.ui.exploreScene))}">
          ${icon("expand")}
        </button>
      </div>
      <div class="cover-copy">
        <p class="eyebrow">${esc(t(C.eyebrow))}</p>
        <h1 id="slideTitle" class="hero-title" tabindex="-1">
          <span class="country">${esc(t(C.country))}</span>
          ${t(C.titleLines)
            .map(
              (line) => /* HTML */ `
                <span>${esc(line)}</span>
              `,
            )
            .join("")}
        </h1>
        <p class="hero-subtitle">${esc(t(C.subtitle)).replace("\n", "<br>")}</p>
        <div class="cover-actions">
          <button class="begin" data-go="1">
            <span class="begin-content">
              <span class="begin-label">${esc(t(C.ui.begin))}</span>
              <span class="begin-arrow-well">
                <span class="arrow">${icon("arrow-right")}</span>
              </span>
            </span>
          </button>
          <button class="text-button" id="exploreScene">${esc(t(C.ui.exploreTheScene))}</button>
        </div>
      </div>

      <button class="scene-return" id="sceneReturn">
        <span class="arrow">${icon("arrow-left")}</span>
        ${esc(t(C.ui.returnToIntroduction))}
      </button>
    </section>
  `;
};
