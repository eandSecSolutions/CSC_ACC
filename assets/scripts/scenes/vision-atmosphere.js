/** Canvas atmosphere aligned to the Vision artwork. No pixel reads or remote textures. */
(() => {
  "use strict";
  class VisionAtmosphere {
    constructor(canvas, configuration) {
      this.canvas = canvas;
      this.ctx = canvas.getContext?.("2d");
      this.configuration = configuration;
      this.particles = Array.from({ length: 38 }, (_, i) => ({
        x: (i * 0.618033) % 1,
        y: (i * 0.38197 + 0.1) % 1,
        radius: 0.7 + (i % 5) * 0.3,
        speed: 0.008 + (i % 7) * 0.0015,
        phase: i * 2.39,
      }));
    }
    resize(width, height) {
      const ratio = Math.min(1, 1150 / width);
      this.canvas.width = Math.round(width * ratio);
      this.canvas.height = Math.round(height * ratio);
    }
    glow(x, y, radius, color, alpha) {
      const ctx = this.ctx,
        gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${color},${alpha})`);
      gradient.addColorStop(0.2, `rgba(${color},${alpha * 0.45})`);
      gradient.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    render(time, type, day, progress, phase, images, focus) {
      const ctx = this.ctx;
      if (!ctx) return;
      const w = this.canvas.width,
        h = this.canvas.height;
      ctx.clearRect(0, 0, w, h);
      const C = this.configuration[type];
      if (type === "picture" && images?.night?.complete && images.night.naturalWidth) {
        ctx.save();
        ctx.beginPath();
        C.water.forEach(([x, y], i) => (i ? ctx.lineTo(x * w, y * h) : ctx.moveTo(x * w, y * h)));
        ctx.closePath();
        ctx.clip();
        // Refraction is confined to unobstructed foreground water, below the vessel.
        const image = day > 0.5 ? images.day : images.night;
        if (image?.naturalWidth) {
          ctx.globalAlpha = 0.78;
          for (let y = Math.floor(h * 0.8); y < h; y += 3) {
            const depth = (y / h - 0.8) / 0.2,
              dx = Math.sin(y * 0.054 - time * 1.15) * (1 + depth * 1.5);
            ctx.drawImage(
              image,
              0,
              (y / h) * image.naturalHeight,
              image.naturalWidth,
              Math.min(
                (4 / h) * image.naturalHeight,
                image.naturalHeight - (y / h) * image.naturalHeight,
              ),
              dx,
              y,
              w,
              4,
            );
          }
        }
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = 1;
        for (let i = 0; i < 38; i++) {
          const x = (0.04 + ((i * 0.618) % 1) * 0.47) * w,
            y = (0.78 + ((i * 0.381) % 1) * 0.22) * h;
          const alpha =
            (0.03 + 0.19 * Math.pow(Math.max(0, Math.sin(time * 1.4 + i)), 2)) * (1 - day * 0.58);
          ctx.fillStyle = `rgba(232,211,166,${alpha})`;
          ctx.fillRect(x + Math.sin(time * 0.9 + i) * 2, y, 7 + (i % 7) * 3, 1.1);
        }
        ctx.restore();
      }
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < C.lights.length; i++) {
        const [x, y] = C.lights[i],
          pulse = 0.5 + 0.5 * Math.sin(time * (0.7 + (i % 3) * 0.13) + i * 2.18);
        this.glow(
          x * w,
          y * h,
          w * (0.009 + (i % 3) * 0.002),
          "255,211,146",
          (0.06 + pulse * 0.24) * (1 - day * 0.72),
        );
      }
      for (const p of this.particles) {
        const x = ((p.x + time * p.speed * 0.05) % 1) * w,
          y = ((((p.y - time * p.speed * 0.11) % 1) + 1) % 1) * h;
        const alpha =
          (0.06 + 0.16 * (0.5 + 0.5 * Math.sin(time * 0.65 + p.phase))) * (1 - day * 0.48);
        this.glow(x, y, p.radius * 3, "168,213,224", alpha);
      }
      if (type === "picture") {
        const pulse =
          time % 1.55 < 0.68 ? Math.pow(Math.sin(((time % 1.55) / 0.68) * Math.PI), 0.55) : 0;
        this.glow(w * 0.943, h * 0.767, w * 0.012, "255,157,39", pulse * 0.9);
        this.glow(w * 0.943, h * 0.785, w * 0.021, "255,161,59", pulse * 0.17);
      }
      if (type === "response") {
        const x = C.target.x * w,
          y = C.target.y * h,
          done = phase === 4;
        this.glow(
          x,
          y,
          w * 0.033,
          done ? "137,238,206" : "255,174,57",
          0.22 + 0.2 * Math.sin(time * 2.8) ** 2,
        );
        if (phase === 3) {
          // Inspection sweep belongs to the facility, not to a floating synthetic asset.
          const sweepY = y + h * (0.02 + progress * 0.14);
          const g = ctx.createLinearGradient(0, sweepY - h * 0.008, 0, sweepY + h * 0.008);
          g.addColorStop(0, "rgba(129,217,235,0)");
          g.addColorStop(0.5, `rgba(129,217,235,${0.17 - day * 0.05})`);
          g.addColorStop(1, "rgba(129,217,235,0)");
          ctx.fillStyle = g;
          ctx.fillRect(x - w * 0.06, sweepY - h * 0.008, w * 0.12, h * 0.016);
        }
      }
      if (type === "authority") {
        for (const [x, y, ww, hh] of C.screens) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(x * w, y * h, ww * w, hh * h);
          ctx.clip();
          const sweep = ((time * 0.095) % 1) * ww * w;
          const g = ctx.createLinearGradient(x * w + sweep - 60, 0, x * w + sweep + 60, 0);
          g.addColorStop(0, "rgba(134,206,226,0)");
          g.addColorStop(0.5, `rgba(134,206,226,${0.065 * (1 - day * 0.3)})`);
          g.addColorStop(1, "rgba(134,206,226,0)");
          ctx.fillStyle = g;
          ctx.fillRect(x * w, y * h, ww * w, hh * h);
          ctx.restore();
        }
      }
      ctx.restore();
      if (focus) {
        ctx.save();
        const r = ((12 + ((time * 0.45) % 1) * 30) * w) / 1000;
        ctx.strokeStyle = `rgba(202,226,220,${(1 - ((time * 0.45) % 1)) * 0.48})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(focus.x * w, focus.y * h, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }
    destroy() {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx = null;
    }
  }
  window.ACCVisionAtmosphere = VisionAtmosphere;
})();
