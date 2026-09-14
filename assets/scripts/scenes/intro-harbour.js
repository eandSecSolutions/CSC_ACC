/* UAE ACC v0.8.0 — photographic cinemagraph + local Three.js drone traffic. */
(() => {
  "use strict";
  const shore = [
    [0, 0.475],
    [0.26, 0.525],
    [0.43, 0.555],
    [0.6, 0.592],
    [0.71, 0.65],
    [0.775, 0.727],
    [0.807, 0.823],
    [0.816, 1],
    [0, 1],
  ];
  // Keep the vessel, mast and immediate contact water completely undistorted.
  const vessel = [
    [0.51, 0.66],
    [0.551, 0.642],
    [0.558, 0.612],
    [0.578, 0.612],
    [0.583, 0.646],
    [0.617, 0.675],
    [0.651, 0.707],
    [0.656, 0.759],
    [0.615, 0.785],
    [0.555, 0.752],
    [0.51, 0.715],
  ];
  function waterMask(width, height) {
    const p = new Path2D();
    for (const points of [shore, vessel]) {
      points.forEach(([x, y], i) =>
        i ? p.lineTo(x * width, y * height) : p.moveTo(x * width, y * height),
      );
      p.closePath();
    }
    return p;
  }
  function renderWater(ctx, source, time, mask, strength = 1) {
    const w = ctx.canvas.width,
      h = ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);
    if (!source || strength <= 0) return;
    ctx.save();
    ctx.clip(mask, "evenodd");
    ctx.globalAlpha = 0.94 * strength;
    // Visible refraction, increasing naturally toward the foreground water.
    for (let y = Math.floor(h * 0.473); y < h; y += 2) {
      const depth = (y / h - 0.45) / 0.55;
      const dx =
        (Math.sin(y * 0.057 - time * 1.55) * 3.2 + Math.sin(y * 0.019 + time * 0.83) * 1.8) *
        (0.25 + depth * 0.85);
      const dy = Math.sin(y * 0.031 - time * 1.1) * depth * 0.8;
      ctx.drawImage(
        source,
        0,
        Math.max(0, Math.min(h - 3, y + dy)),
        w,
        Math.min(3, h - y),
        dx,
        y,
        w,
        Math.min(3, h - y),
      );
    }
    // Broken moving highlights follow the existing reflection below the building.
    ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < 64; i++) {
      const f = i / 64,
        yy = h * (0.55 + f * 0.45),
        center = w * (0.57 + 0.035 * Math.sin(f * 5));
      const xx =
        center +
        Math.sin(i * 2.399) * w * (0.045 + f * 0.11) +
        Math.sin(time * 1.2 + i * 0.8) * w * 0.003;
      const alpha =
        (0.06 + 0.22 * Math.pow(Math.max(0, Math.sin(time * 1.7 - i * 0.56)), 2)) * strength;
      const rw = w * (0.008 + f * 0.025) * (1 + 0.35 * Math.sin(i * 3.4));
      const grad = ctx.createLinearGradient(xx - rw, 0, xx + rw, 0);
      grad.addColorStop(0, "rgba(241,211,157,0)");
      grad.addColorStop(0.5, "rgba(241,211,157," + alpha + ")");
      grad.addColorStop(1, "rgba(241,211,157,0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = grad;
      ctx.fillRect(xx - rw, yy + Math.sin(time * 0.8 + i) * h * 0.0015, rw * 2, 1.2 + f * 1.8);
    }
    ctx.restore();
  }
  // Baked from the night asset at build time; no file-origin pixel reads.
  const cityPoints = [
    { x: 0.953125, y: 0.075, phase: 3.54, radius: 4.5, power: 0.21000000000000002 },
    { x: 0.709375, y: 0.202778, phase: 4.78, radius: 4.5, power: 0.25 },
    { x: 0.728125, y: 0.236111, phase: 6.06, radius: 4.5, power: 0.22 },
    { x: 0.690625, y: 0.247222, phase: 5.78, radius: 4.5, power: 0.24000000000000002 },
    { x: 0.79375, y: 0.252778, phase: 4.78, radius: 4.5, power: 0.2 },
    { x: 0.6, y: 0.263889, phase: 1.26, radius: 4.5, power: 0.27 },
    { x: 0.859375, y: 0.275, phase: 1.62, radius: 4.5, power: 0.22 },
    { x: 0.878125, y: 0.275, phase: 0.94, radius: 4.5, power: 0.24000000000000002 },
    { x: 0.9375, y: 0.286111, phase: 0.06, radius: 4.5, power: 0.25 },
    { x: 0.75625, y: 0.297222, phase: 3.86, radius: 4.5, power: 0.26 },
    { x: 0.915625, y: 0.302778, phase: 2.62, radius: 4.5, power: 0.27 },
    { x: 0.621875, y: 0.308333, phase: 5.02, radius: 4.5, power: 0.27 },
    { x: 0.646875, y: 0.313889, phase: 0.42, radius: 4.5, power: 0.22 },
    { x: 0.746875, y: 0.313889, phase: 5.06, radius: 4.5, power: 0.23 },
    { x: 0.675, y: 0.319444, phase: 3.98, radius: 4.5, power: 0.27 },
    { x: 0.709375, y: 0.319444, phase: 0.22, radius: 4.5, power: 0.2 },
    { x: 0.946875, y: 0.319444, phase: 3.46, radius: 4.5, power: 0.26 },
    { x: 0.95625, y: 0.319444, phase: 3.74, radius: 4.5, power: 0.27 },
    { x: 0.5, y: 0.325, phase: 1.98, radius: 4.5, power: 0.26 },
    { x: 0.70625, y: 0.325, phase: 0.1, radius: 4.5, power: 0.27 },
    { x: 0.721875, y: 0.325, phase: 3.14, radius: 4.5, power: 0.23 },
    { x: 0.9625, y: 0.325, phase: 2.82, radius: 4.5, power: 0.22 },
    { x: 0.734375, y: 0.330556, phase: 1.62, radius: 4.5, power: 0.23 },
    { x: 0.975, y: 0.330556, phase: 0.38, radius: 4.5, power: 0.24000000000000002 },
    { x: 0.978125, y: 0.336111, phase: 2.54, radius: 4.5, power: 0.23 },
    { x: 0.64375, y: 0.352778, phase: 2.74, radius: 4.5, power: 0.24000000000000002 },
    { x: 0.6625, y: 0.352778, phase: 5.7, radius: 4.5, power: 0.28 },
    { x: 0.809375, y: 0.352778, phase: 5.98, radius: 4.5, power: 0.24000000000000002 },
    { x: 0.84375, y: 0.375, phase: 2.34, radius: 4.5, power: 0.26 },
    { x: 0.553125, y: 0.380556, phase: 6.18, radius: 4.5, power: 0.23 },
    { x: 0.55625, y: 0.386111, phase: 1.98, radius: 4.5, power: 0.24000000000000002 },
    { x: 0.63125, y: 0.386111, phase: 4.06, radius: 4.5, power: 0.22 },
    { x: 0.646875, y: 0.397222, phase: 6.06, radius: 4.5, power: 0.26 },
    { x: 0.84375, y: 0.397222, phase: 0.9, radius: 4.5, power: 0.24000000000000002 },
    { x: 0.59375, y: 0.402778, phase: 4.1, radius: 4.5, power: 0.2 },
    { x: 0.659375, y: 0.402778, phase: 3.82, radius: 4.5, power: 0.21000000000000002 },
    { x: 0.6, y: 0.408333, phase: 3.38, radius: 4.5, power: 0.25 },
    { x: 0.44375, y: 0.413889, phase: 5.78, radius: 4.5, power: 0.26 },
    { x: 0.665625, y: 0.419444, phase: 1.54, radius: 4.5, power: 0.2 },
    { x: 0.75, y: 0.419444, phase: 3.18, radius: 4.5, power: 0.25 },
    { x: 0.596875, y: 0.425, phase: 5.62, radius: 4.5, power: 0.27 },
    { x: 0.590625, y: 0.430556, phase: 4.62, radius: 4.5, power: 0.21000000000000002 },
    { x: 0.628125, y: 0.430556, phase: 4.98, radius: 4.5, power: 0.23 },
    { x: 0.303125, y: 0.436111, phase: 3.66, radius: 4.5, power: 0.22 },
    { x: 0.44375, y: 0.436111, phase: 4.02, radius: 4.5, power: 0.25 },
    { x: 0.65, y: 0.436111, phase: 5.7, radius: 4.5, power: 0.27 },
    { x: 0.86875, y: 0.436111, phase: 1.22, radius: 4.5, power: 0.2 },
    { x: 0.175, y: 0.441667, phase: 3.5, radius: 4.5, power: 0.21000000000000002 },
    { x: 0.240625, y: 0.441667, phase: 3.7, radius: 4.5, power: 0.22 },
    { x: 0.765625, y: 0.441667, phase: 1.22, radius: 4.5, power: 0.25 },
    { x: 0.2375, y: 0.447222, phase: 0.98, radius: 4.5, power: 0.21000000000000002 },
    { x: 0.253125, y: 0.447222, phase: 3.62, radius: 4.5, power: 0.21000000000000002 },
    { x: 0.915625, y: 0.447222, phase: 0.38, radius: 4.5, power: 0.26 },
    { x: 0.553125, y: 0.452778, phase: 0.22, radius: 4.5, power: 0.28 },
    { x: 0.896875, y: 0.452778, phase: 0.14, radius: 4.5, power: 0.2 },
    { x: 0.45625, y: 0.458333, phase: 1.66, radius: 4.5, power: 0.25 },
    { x: 0.809375, y: 0.458333, phase: 3.54, radius: 4.5, power: 0.23 },
    { x: 0.953125, y: 0.458333, phase: 0.06, radius: 4.5, power: 0.23 },
    { x: 0.79375, y: 0.463889, phase: 4.46, radius: 4.5, power: 0.27 },
    { x: 0.903125, y: 0.463889, phase: 3.1, radius: 4.5, power: 0.28 },
    { x: 0.88125, y: 0.469444, phase: 6.22, radius: 4.5, power: 0.27 },
    { x: 0.921875, y: 0.469444, phase: 1.14, radius: 4.5, power: 0.24000000000000002 },
    { x: 0.61875, y: 0.480556, phase: 6.26, radius: 4.5, power: 0.28 },
    { x: 0.803125, y: 0.480556, phase: 5.22, radius: 4.5, power: 0.21000000000000002 },
    { x: 0.759375, y: 0.486111, phase: 4.1, radius: 4.5, power: 0.24000000000000002 },
    { x: 0.90625, y: 0.486111, phase: 2.06, radius: 4.5, power: 0.22 },
    { x: 0.58125, y: 0.497222, phase: 4.66, radius: 4.5, power: 0.27 },
    { x: 0.721875, y: 0.497222, phase: 1.54, radius: 4.5, power: 0.22 },
    { x: 0.49375, y: 0.502778, phase: 3.02, radius: 4.5, power: 0.24000000000000002 },
    { x: 0.696875, y: 0.508333, phase: 1.78, radius: 4.5, power: 0.26 },
    { x: 0.69375, y: 0.513889, phase: 2.18, radius: 4.5, power: 0.21000000000000002 },
    { x: 0.88125, y: 0.513889, phase: 2.22, radius: 4.5, power: 0.25 },
    { x: 0.584375, y: 0.519444, phase: 4.42, radius: 4.5, power: 0.27 },
    { x: 0.884375, y: 0.525, phase: 5.34, radius: 4.5, power: 0.23 },
    { x: 0.678125, y: 0.530556, phase: 0.74, radius: 4.5, power: 0.23 },
    { x: 0.75625, y: 0.530556, phase: 2.14, radius: 4.5, power: 0.28 },
    { x: 0.746875, y: 0.536111, phase: 2.14, radius: 4.5, power: 0.26 },
    { x: 0.840625, y: 0.536111, phase: 1.86, radius: 4.5, power: 0.26 },
    { x: 0.790625, y: 0.541667, phase: 2.06, radius: 4.5, power: 0.28 },
    { x: 0.821875, y: 0.541667, phase: 2.34, radius: 4.5, power: 0.21000000000000002 },
    { x: 0.734375, y: 0.547222, phase: 1.22, radius: 4.5, power: 0.21000000000000002 },
    { x: 0.696875, y: 0.552778, phase: 4.62, radius: 4.5, power: 0.26 },
    { x: 0.86875, y: 0.552778, phase: 1.94, radius: 4.5, power: 0.24000000000000002 },
    { x: 0.85, y: 0.563889, phase: 3.82, radius: 4.5, power: 0.25 },
    { x: 0.8875, y: 0.563889, phase: 4.06, radius: 4.5, power: 0.28 },
    { x: 0.853125, y: 0.569444, phase: 4.18, radius: 4.5, power: 0.26 },
    { x: 0.91875, y: 0.575, phase: 0.62, radius: 4.5, power: 0.25 },
    { x: 0.91875, y: 0.586111, phase: 3.82, radius: 4.5, power: 0.26 },
    { x: 0.946875, y: 0.591667, phase: 6.06, radius: 4.5, power: 0.2 },
    { x: 0.85, y: 0.597222, phase: 2.9, radius: 4.5, power: 0.27 },
    { x: 0.9625, y: 0.597222, phase: 6.22, radius: 4.5, power: 0.23 },
    { x: 0.96875, y: 0.602778, phase: 1.26, radius: 4.5, power: 0.26 },
    { x: 0.99375, y: 0.608333, phase: 3.46, radius: 4.5, power: 0.27 },
    { x: 0.90625, y: 0.613889, phase: 4.22, radius: 4.5, power: 0.21000000000000002 },
    { x: 0.646875, y: 0.625, phase: 3.1, radius: 4.5, power: 0.22 },
    { x: 0.840625, y: 0.630556, phase: 3.98, radius: 4.5, power: 0.26 },
    { x: 0.928125, y: 0.630556, phase: 2.1, radius: 4.5, power: 0.21000000000000002 },
    { x: 0.95625, y: 0.636111, phase: 3.26, radius: 4.5, power: 0.22 },
  ];
  function renderCityLights(ctx, points, time, day) {
    if (!ctx) return;
    const w = ctx.canvas.width,
      h = ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (const p of points) {
      const a =
          p.power *
          (0.16 + 0.84 * Math.pow(0.5 + 0.5 * Math.sin(time * 0.85 + p.phase), 3)) *
          (1 - day * 0.83),
        x = p.x * w,
        y = p.y * h,
        r = (p.radius * w) / 1280;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r);
      glow.addColorStop(0, `rgba(255,225,170,${a})`);
      glow.addColorStop(0.3, `rgba(255,207,128,${a * 0.5})`);
      glow.addColorStop(1, "rgba(255,200,120,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
      ctx.fillStyle = `rgba(255,241,203,${a * 0.65})`;
      ctx.fillRect(x - 1, y - 0.5, 2, 0.9);
    }
    ctx.restore();
  }
  window.ACCCityLights = { points: cityPoints, render: renderCityLights };
  window.ACCWater = { render: renderWater, mask: waterMask };
  class HarbourScene {
    constructor(host, opts = {}) {
      this.host = host;
      this.frameEl = host.querySelector(".scene-frame");
      this.world = host.querySelector(".scene-world");
      this.canvas = host.querySelector(".water-canvas");
      this.images = [host.querySelector(".scene-night"), host.querySelector(".scene-day")];
      this.beacons = Array.from(host.querySelectorAll(".photo-beacon"));
      this.theme = opts.theme || "dark";
      this.mix = this.theme === "light" ? 1 : 0;
      this.targetMix = this.mix;
      this.motion = opts.motion || "full";
      this.paused = !!opts.paused;
      this.lens = "unified";
      this.zoom = 1;
      this.targetZoom = 1;
      this.origin = [66, 54];
      this.targetOrigin = [66, 54];
      this.time = 0;
      this.last = 0;
      this.frame = 0;
      this.dead = false;
      this.abort = new AbortController();
      try {
        this.ctx = this.canvas.getContext("2d", { alpha: true });
        this.buffer = document.createElement("canvas");
        this.bctx = this.buffer.getContext("2d");
      } catch {
        this.ctx = null;
      }
      this.cityCanvas = host.querySelector(".city-light-canvas");
      this.cityCtx = this.cityCanvas?.getContext("2d");
      this.cityPoints = [];
      this.sky = host.querySelector(".sky-glow");
      this.signal = host.querySelector(".vehicle-signal");
      this.spill = host.querySelector(".vehicle-signal-spill");
      const droneHost = host.parentElement?.querySelector(".drone-layer");
      if (droneHost && window.DroneTraffic)
        this.traffic = new window.DroneTraffic(droneHost, { lang: opts.lang, hud: opts.hud });
      this.ready = false;
      this.images.forEach((im) => {
        im.addEventListener("load", () => this.prepare(), { signal: this.abort.signal });
        im.addEventListener("error", () => this.prepare(), { signal: this.abort.signal });
      });
      this.host.dataset.sceneState = "initialising";
      this.visibility = () => this.sync();
      document.addEventListener("visibilitychange", this.visibility, { signal: this.abort.signal });
      if (window.ResizeObserver) {
        this.observer = new ResizeObserver(() => this.resize());
        this.observer.observe(host);
      } else window.addEventListener("resize", () => this.resize(), { signal: this.abort.signal });
      this.resize();
      this.prepare();
      this.setTheme(this.theme);
      this.sync();
    }
    resize() {
      if (this.dead) return;
      const r = this.host.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const ratio = 1672 / 941,
        width = Math.max(r.width, r.height * ratio),
        height = width / ratio;
      // Cover with a mild rightward crop; Arabic never reflects the photograph.
      const anchor = r.width < 760 ? 0.68 : 0.55;
      const left = Math.max(
        r.width - width,
        Math.min(0, Math.min((r.width - width) * anchor, r.width - 54 - width * 0.8542)),
      );
      const top = Math.min(0, Math.max((r.height - height) * 0.5, 64 - height * 0.1218));
      Object.assign(this.world.style, {
        width: width + "px",
        height: height + "px",
        left: left + "px",
        top: top + "px",
      });
      if (this.ctx && this.bctx) {
        this.canvas.width = Math.round(Math.min(1280, width));
        this.canvas.height = Math.round(this.canvas.width / ratio);
        this.buffer.width = this.canvas.width;
        this.buffer.height = this.canvas.height;
        this.mask = waterMask(this.canvas.width, this.canvas.height);
        if (this.cityCanvas) {
          this.cityCanvas.width = this.canvas.width;
          this.cityCanvas.height = this.canvas.height;
        }
        this.compose();
        this.sampleLights();
      }
      this.traffic?.resize();
      this.paint();
    }
    prepare() {
      if (this.dead) return;
      this.ready = this.images.every((im) => im.complete && im.naturalWidth > 0);
      if (this.ready) {
        this.compose();
        this.sampleLights();
        this.paint();
      }
      this.sync();
    }
    compose() {
      if (!this.ready || !this.bctx) return;
      const w = this.buffer.width,
        h = this.buffer.height;
      this.bctx.globalAlpha = 1;
      this.bctx.drawImage(this.images[0], 0, 0, w, h);
      if (this.mix > 0) {
        this.bctx.globalAlpha = this.mix;
        this.bctx.drawImage(this.images[1], 0, 0, w, h);
        this.bctx.globalAlpha = 1;
      }
    }
    sampleLights() {
      this.cityPoints = cityPoints;
    }
    running() {
      return !this.dead && !document.hidden && !this.paused && this.motion === "full";
    }
    paint() {
      if (this.dead) return;
      this.images[0].style.opacity = "1";
      this.images[1].style.opacity = String(this.mix);
      const push = 0.023 * (1 - Math.cos((this.time * Math.PI) / 14 + 0.55));
      this.frameEl.style.transform = `scale(${(this.zoom + push).toFixed(6)})`;
      this.frameEl.style.transformOrigin = this.origin.map((n) => n.toFixed(3) + "%").join(" ");
      if (this.ctx && this.ready) renderWater(this.ctx, this.buffer, this.time, this.mask, 1);
      if (this.sky) {
        this.sky.style.opacity = String(
          (0.38 + 0.22 * Math.sin(this.time * 0.35) + 0.12 * Math.sin(this.time * 0.67)) *
            (1 - this.mix * 0.65),
        );
        this.sky.style.transform = `translate(${Math.sin(this.time * 0.13) * 1.8}%,${Math.sin(this.time * 0.19) * 0.7}%) scale(1.07)`;
      }
      const blink = this.time % 1.3 < 0.54;
      if (this.signal) this.signal.style.opacity = blink ? "1" : ".02";
      if (this.spill) this.spill.style.opacity = blink ? String(0.7 - this.mix * 0.3) : "0";
      renderCityLights(this.cityCtx, this.cityPoints, this.time, this.mix);
      this.traffic?.update(this.time, this.mix);
      this.beacons.forEach((el, i) => {
        const phase = this.time * (i === 0 ? 3.7 : 3.0) + i * 1.8;
        const pulse = Math.pow(Math.max(0, Math.sin(phase)), 3);
        el.style.opacity = String((0.12 + pulse * 0.88) * (1 - this.mix * 0.35));
        el.style.setProperty("--pulse", pulse.toFixed(3));
      });
    }
    tick = (stamp) => {
      this.frame = 0;
      if (!this.running()) return;
      if (this.last && stamp - this.last < 1000 / 24) {
        this.frame = requestAnimationFrame(this.tick);
        return;
      }
      const dt = this.last ? Math.min((stamp - this.last) / 1000, 0.1) : 0;
      this.last = stamp;
      this.time += dt;
      const oldMix = this.mix;
      this.mix += (this.targetMix - this.mix) * (1 - Math.exp(-dt * 4));
      if (Math.abs(this.mix - this.targetMix) < 0.001) this.mix = this.targetMix;
      this.zoom += (this.targetZoom - this.zoom) * (1 - Math.exp(-dt * 1.1));
      this.origin = this.origin.map(
        (v, i) => v + (this.targetOrigin[i] - v) * (1 - Math.exp(-dt * 1.1)),
      );
      if (this.mix !== oldMix) this.compose();
      this.paint();
      this.frame = requestAnimationFrame(this.tick);
    };
    sync() {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
      this.last = 0;
      this.host.dataset.sceneState = this.running() ? "playing" : "paused";
      if (this.running()) this.frame = requestAnimationFrame(this.tick);
    }
    setTheme(theme) {
      this.theme = theme;
      this.targetMix = theme === "light" ? 1 : 0;
      if (!this.running()) {
        this.mix = this.targetMix;
        this.compose();
        this.paint();
      }
      this.sync();
    }
    setLens(lens) {
      this.lens = lens;
      this.targetOrigin = { unified: [66, 54], air: [85, 15], land: [86, 61], sea: [58, 74] }[
        lens
      ] || [66, 54];
      this.targetZoom = lens === "unified" ? 1 : 1.028;
      if (!this.running()) {
        this.zoom = this.targetZoom;
        this.origin = [...this.targetOrigin];
        this.paint();
      }
    }
    setPaused(value) {
      this.paused = value;
      if (value) {
        this.mix = this.targetMix;
        this.compose();
        this.paint();
      }
      this.sync();
    }
    setMotion(mode) {
      this.motion = mode;
      if (mode !== "full") {
        this.mix = this.targetMix;
        this.zoom = this.targetZoom;
        this.origin = [...this.targetOrigin];
        this.compose();
        this.paint();
      }
      this.sync();
    }
    destroy() {
      if (this.dead) return;
      this.dead = true;
      cancelAnimationFrame(this.frame);
      this.abort.abort();
      this.observer?.disconnect();
      this.traffic?.destroy();
      if (this.canvas) {
        this.canvas.width = 1;
        this.canvas.height = 1;
      }
      if (this.buffer) {
        this.buffer.width = 1;
        this.buffer.height = 1;
      }
      if (this.cityCanvas) {
        this.cityCanvas.width = this.cityCanvas.height = 1;
      }
      this.cityCtx = null;
      this.cityPoints = [];
      this.ctx = null;
      this.bctx = null;
      this.images = [];
      this.beacons = [];
    }
  }
  window.HarbourScene = HarbourScene;
})();
