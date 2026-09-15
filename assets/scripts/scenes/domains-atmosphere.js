/** Lightweight photographic atmosphere. One shared canvas; no synthetic model overlays.
 * Light positions live in slide 03's editable configuration. No image pixel reads.
 */
window.ACCDomainsAtmosphere = class DomainsAtmosphere {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });
    this.width = 1000;
    this.height = 563;
  }
  resize(width, height) {
    this.width = Math.min(1280, Math.max(1, width));
    this.height = (this.width * height) / width;
    this.canvas.width = Math.round(this.width);
    this.canvas.height = Math.round(this.height);
  }
  render(time, domain, day, step) {
    const c = this.ctx;
    if (!c) return;
    const w = this.canvas.width,
      h = this.canvas.height;
    c.clearRect(0, 0, w, h);
    const colors = {
      red: "255,72,56",
      green: "69,255,171",
      amber: "255,173,48",
      gold: "255,218,143",
    };
    const glow = (x, y, r, color, alpha) => {
      const g = c.createRadialGradient(x * w, y * h, 0, x * w, y * h, r * w);
      g.addColorStop(0, `rgba(${color},${alpha})`);
      g.addColorStop(0.15, `rgba(${color},${alpha * 0.58})`);
      g.addColorStop(1, `rgba(${color},0)`);
      c.fillStyle = g;
      c.fillRect((x - r) * w, (y - r) * h, 2 * r * w, 2 * r * w);
    };
    c.globalCompositeOperation = "screen";
    domain.lights.forEach(([x, y, color], i) => {
      const pulse =
        color === "amber"
          ? time % 1.25 < 0.56
            ? 1
            : 0.06
          : color === "red" && domain.id === "air"
            ? time % 1.8 < 0.16
              ? 1
              : 0.12
            : 0.62 + 0.28 * Math.sin(time * (1.1 + i * 0.13) + i * 1.8);
      glow(x, y, 0.013, colors[color], pulse * (day ? 0.36 : 0.8));
    });
    // Sparse motes catch light; they do not behave like a decorative snowstorm.
    for (let i = 0; i < 22; i++) {
      const x = (i * 0.618033 + Math.sin(time * 0.065 + i) * 0.013) % 1,
        y = 0.08 + ((i * 0.373 + time * 0.004) % 1) * 0.55,
        alpha = (0.03 + 0.045 * (1 + Math.sin(time * 0.38 + i))) * (day ? 0.3 : 1);
      glow(x, y, 0.0024, "188,218,236", alpha);
    }
    // Atmospheric sky glow moves slowly across a broad, soft region.
    if (domain.id === "air" || domain.id === "sea") {
      glow(0.65 + Math.sin(time * 0.075) * 0.13, 0.16, 0.29, "83,135,205", day ? 0.025 : 0.07);
    }
    // Water shimmer: clipped to open water, away from the vessel and quay.
    if (domain.id === "sea") {
      c.save();
      c.beginPath();
      c.moveTo(0.56 * w, 0.48 * h);
      c.lineTo(w, 0.43 * h);
      c.lineTo(w, h);
      c.lineTo(0.56 * w, h);
      c.closePath();
      c.clip();
      for (let i = 0; i < 95; i++) {
        const y = 0.47 + (i / 95) * 0.53,
          x = 0.64 + Math.sin(i * 3.11) * 0.18 + Math.sin(time * 0.9 + i * 0.8) * 0.009,
          alpha = (0.04 + 0.05 * Math.sin(time * 1.9 + i)) * (day ? 0.6 : 1);
        c.fillStyle = `rgba(230,209,156,${Math.max(0, alpha)})`;
        c.fillRect(x * w, y * h, (0.004 + i * 0.00015) * w, Math.max(1, h * 0.0012));
      }
      c.restore();
    }
    if (step >= 0) {
      const f = domain.focus;
      const radius = 0.055 + ((time * 0.035) % 0.045);
      c.strokeStyle = `rgba(147,223,218,${0.2 * (1 - (radius - 0.055) / 0.045)})`;
      c.lineWidth = 1;
      c.beginPath();
      c.ellipse(f.x * w, f.y * h, radius * w, radius * h, 0, 0, Math.PI * 2);
      c.stroke();
    }
    c.globalCompositeOperation = "source-over";
  }
  destroy() {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx = null;
  }
};
