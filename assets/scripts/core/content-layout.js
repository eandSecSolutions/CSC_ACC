/** Shared layout/accessibility lifecycle for slides 02–07 only.
 * Select the scroll strategy from the actual stage bounds, not narrative height.
 * Scrolling keys belong to a focused scroll region rather than deck navigation.
 */
window.ACCContentLayout = {
  mount(stage, context) {
    const root = stage.querySelector(".vision-slide, .domains-slide");
    if (!root) return;
    const { scope, t, words } = context;
    const selectors =
      ".vision-workspace,.domains-workspace,.center-workspace,.intel-workspace,.response-workspace,.vision-narrative,.domain-console-body,.domain-console-footer,.vision-scene-dock,.vision-action-bar,.center-chain,.intel-reasoning-dock,.gov-control,.gov-ledger ol";
    let observer,
      mutation,
      disposed = false,
      lastControl = null;
    let selectedTab = root.querySelector("[role=tab][aria-selected=true]")?.id;
    function markScrollAreas() {
      [root, ...root.querySelectorAll(selectors)].forEach((el) => {
        el.setAttribute("data-content-scroll", "");
        // Explicit focus makes native tracks usable without a mouse. Buttons
        // inside these regions retain their own tab and arrow-key behavior.
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
        if (!el.hasAttribute("aria-label")) el.setAttribute("aria-label", t(words.scrollContent));
      });
    }
    function fit() {
      if (disposed) return;
      const r = stage.getBoundingClientRect();
      const heading = root.querySelector(".vision-heading,.domains-heading");
      const nav = root.querySelector(".vision-navigation,.domains-navigation,.center-navigation");
      const available =
        r.height -
        (heading?.getBoundingClientRect().height || 80) -
        (nav?.getBoundingClientRect().height || 48) -
        65;
      const stacked = r.width < 821;
      root.classList.toggle("content-flow", r.width < 1040 || r.height < 620 || available < 420);
      root.classList.toggle("content-stacked", stacked);
    }
    markScrollAreas();
    fit();
    if (window.ResizeObserver) {
      observer = new window.ResizeObserver(fit);
      observer.observe(stage);
      for (const el of root.querySelectorAll(
        ".vision-heading,.domains-heading,.vision-navigation,.domains-navigation,.center-navigation",
      ))
        observer.observe(el);
    } else scope.listen(window, "resize", fit);
    // New narrative content stays keyboard-scrollable after a tab/action render.
    if (window.MutationObserver) {
      mutation = new window.MutationObserver(() => {
        markScrollAreas();
        const nextTab = root.querySelector("[role=tab][aria-selected=true]")?.id;
        if (nextTab !== selectedTab) {
          selectedTab = nextTab;
          root
            .querySelectorAll(
              ".vision-workspace,.domains-workspace,.center-workspace,.intel-workspace,.response-workspace,.vision-narrative,.domain-console-body",
            )
            .forEach((el) => {
              el.scrollTop = 0;
            });
        }
        if (
          lastControl &&
          !root.contains(lastControl.node) &&
          (!document.activeElement || document.activeElement === document.body)
        ) {
          const replacement = [...root.querySelectorAll("button")].find((el) =>
            Object.entries(lastControl.data).every(([k, v]) => el.dataset[k] === v),
          );
          if (replacement && !replacement.disabled) replacement.focus({ preventScroll: true });
        }
        lastControl = null;
      });
      mutation.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["aria-selected"],
      });
    }
    scope.listen(
      root,
      "click",
      (event) => {
        const b = event.target.closest("button");
        if (!b) return;
        // Re-selecting the active tab is not a reset command.
        if (b.getAttribute("role") === "tab" && b.getAttribute("aria-selected") === "true") {
          event.stopImmediatePropagation();
          return;
        }
        const data = { ...b.dataset };
        if (Object.keys(data).length) lastControl = { node: b, data };
      },
      { capture: true },
    );
    scope.listen(root, "keydown", (event) => {
      if (
        event.defaultPrevented ||
        event.target.closest?.("[role=tab],input,textarea,select,[contenteditable=true]")
      )
        return;
      if (!["PageDown", "PageUp", "Home", "End", "ArrowUp", "ArrowDown"].includes(event.key))
        return;
      let el = event.target.closest?.("[data-content-scroll]");
      while (el && el.scrollHeight <= el.clientHeight + 1)
        el = el.parentElement?.closest?.("[data-content-scroll]");
      if (!el) return;
      event.preventDefault();
      event.stopPropagation();
      const offset =
        event.key === "Home"
          ? -el.scrollHeight
          : event.key === "End"
            ? el.scrollHeight
            : (event.key === "PageDown"
                ? 1
                : event.key === "PageUp"
                  ? -1
                  : event.key === "ArrowDown"
                    ? 1
                    : -1) * (event.key.startsWith("Page") ? el.clientHeight * 0.8 : 48);
      el.scrollTop = Math.max(
        0,
        Math.min(el.scrollHeight - el.clientHeight, el.scrollTop + offset),
      );
    });
    scope.own(() => {
      disposed = true;
      observer?.disconnect();
      mutation?.disconnect();
    });
  },
};
