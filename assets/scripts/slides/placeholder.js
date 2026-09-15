/** Reserved chapter view. Used only for slides marked planned. */
window.ACCPlaceholderView = function ({
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
}) {
  const s = slides[state.slide],
    key = "chapter-" + s.id,
    active = state.tabs[key] || 0;
  return /* HTML */ `
    <section class="slide chapter" aria-labelledby="slideTitle">
      <div class="chapter-copy">
        <div class="chapter-index">
          <p class="eyebrow">${esc(t(sections[s.section]))}</p>
          <span dir="ltr">${String(state.slide + 1).padStart(2, "0")} / 10</span>
        </div>
        <h1 id="slideTitle" tabindex="-1">${esc(t(s.title))}</h1>
        <p class="chapter-summary">${esc(t(s.summary))}</p>
        <span class="chapter-status">${esc(w("reserved"))}</span>
      </div>
      <div class="story-panel">
        ${tabMarkup(key, [words.story, words.animation], active)}
        <div
          class="story-body"
          id="${key}-panel"
          role="tabpanel"
          aria-labelledby="${key}-tab-${active}"
          tabindex="0"
        >
          <p class="eyebrow">${esc(active ? w("sequence") : w("proposal"))}</p>
          <h3>${esc(active ? w("animationTitle") : t(s.story))}</h3>
          <p>${esc(t(active ? s.animation : s.detail))}</p>
        </div>
        <div class="story-panel-foot">${esc(w("shellNote"))}</div>
      </div>
      <span class="chapter-watermark" aria-hidden="true">
        ${String(state.slide + 1).padStart(2, "0")}
      </span>
    </section>
  `;
};
