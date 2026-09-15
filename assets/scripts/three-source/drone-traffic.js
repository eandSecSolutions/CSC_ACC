import * as T from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { makeDrone } from "./drone-model.js";

import { flightPose, labelPlacements, lightState } from "./flight-motion.js";
export {
  flightState,
  flightPose,
  labelPlacements,
  lightState,
  worldPosition,
} from "./flight-motion.js";

class DroneTraffic {
  constructor(host, { lang = "en", hud = window.ACCSlides.cover.hud } = {}) {
    this.host = host;
    this.lang = lang;
    this.hud = hud;
    this.text = (pair) => pair?.[this.lang] || pair?.en || "";
    this.canvas = host.querySelector(".drone-canvas");
    this.svg = host.querySelector(".drone-hud");
    this.dead = false;
    this.labels = [];
    this.lines = [];
    this.lastLabel = -1;
    try {
      this.renderer = new T.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      this.renderer.setClearColor(0, 0);
      this.renderer.toneMapping = T.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.45;
      this.renderer.debug.onShaderError = () => {
        throw new Error("Drone shader unavailable");
      };
      this.scene = new T.Scene();
      this.camera = new T.PerspectiveCamera(35, 1, 0.1, 150);
      this.camera.position.set(0, 0, 10);
      const pm = new T.PMREMGenerator(this.renderer),
        env = new RoomEnvironment();
      this.environment = pm.fromScene(env, 0.07);
      this.scene.environment = this.environment.texture;
      this.scene.environmentIntensity = 0.8;
      env.dispose();
      pm.dispose();
      this.hemi = new T.HemisphereLight(0xc5e0ff, 0x34465b, 2);
      this.scene.add(this.hemi);
      const key = new T.DirectionalLight(0xffe4b8, 3.5);
      key.position.set(-4, 9, 10);
      this.scene.add(key);
      const rim = new T.DirectionalLight(0xa6d8ff, 3);
      rim.position.set(6, 2, -7);
      this.scene.add(rim);
      this.drones = [makeDrone(), makeDrone()];
      this.drones.forEach((d) => this.scene.add(d.group));
      for (let i = 0; i < 2; i++) {
        const label = document.createElement("div");
        label.className = "flight-label";
        label.innerHTML = /* HTML */ `
          <b></b>
          <small></small>
          <div class="flight-stats"></div>
          <div class="flight-status"></div>
        `;
        label.querySelector("b").textContent = hud.aircraftIds[i];
        label.querySelector("small").textContent = this.text(hud.simulated);
        label.querySelector(".flight-stats").dir = lang === "ar" ? "rtl" : "ltr";
        host.appendChild(label);
        this.labels.push(label);
        const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        line.setAttribute("fill", "none");
        line.setAttribute("stroke-width", "1");
        this.svg.appendChild(line);
        this.lines.push(line);
      }
      this.lost = () => {
        this.destroy();
        host.dataset.available = "false";
      };
      this.canvas.addEventListener("webglcontextlost", this.lost);
      this.resize();
      host.dataset.available = "true";
    } catch (e) {
      console.warn("3D drone rendering is unavailable.", e);
      this.destroy();
      host.dataset.available = "false";
    }
  }
  resize() {
    if (this.dead || !this.renderer) return;
    const r = this.host.getBoundingClientRect();
    this.width = Math.max(1, r.width);
    this.height = Math.max(1, r.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.4, Math.sqrt(1800000 / (this.width * this.height))),
    );
    this.renderer.setSize(this.width, this.height, false);
    this.svg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
  }
  update(time, day = 0) {
    if (this.dead) return;
    this.scene.environmentIntensity = 0.6 + day * 0.35;
    this.hemi.intensity = 1.7 + day * 0.7;
    const compact = this.width <= 760,
      poses = [
        flightPose(time, 0, this.width, this.height, this.lang),
        flightPose(time, 1, this.width, this.height, this.lang),
      ],
      placements = labelPlacements(poses, this.width, this.height, this.lang);
    const dt =
      this.previousTime === undefined ? 0 : Math.max(0, Math.min(0.1, time - this.previousTime));
    this.previousTime = time;
    for (let i = 0; i < 2; i++) {
      const pose = poses[i],
        f = pose.state,
        d = this.drones[i],
        visible = !(compact && (i === 1 || this.height < 380)) && f.opacity > 0.025;
      d.group.visible = visible;
      this.labels[i].hidden = !visible;
      this.lines[i].style.display = visible ? "" : "none";
      if (!visible) continue;
      d.group.position.copy(pose.position);
      d.group.scale.setScalar(pose.scale);
      if (!d.oriented) {
        d.group.quaternion.copy(pose.quaternion);
        d.oriented = true;
      } else d.group.quaternion.slerp(pose.quaternion, 1 - Math.exp(-dt * 3.6));
      if (d.gimbal) {
        d.gimbal.rotation.x = -pose.pitch * 0.85;
        d.gimbal.rotation.z = -pose.roll * 0.85;
      }
      d.rotors.forEach((r, j) => {
        r.rotation.y = time * (j % 2 ? 57 : -57) * (1 + Math.sin(time * 0.4 + j) * 0.035);
      });
      const light = lightState(time, i);
      d.lamps.forEach((l) => {
        l.visible = light.navigation > 0.3;
      });
      d.glows.forEach(
        (g, j) =>
          (g.material.opacity =
            (j < 4 ? light.navigation * 0.7 : light.strobe * 0.95) * (1 - day * 0.2)),
      );
      d.strobe.visible = light.strobe > 0;
      const x = pose.x,
        y = pose.y,
        lw = compact ? 135 : 154;
      f.speed = pose.velocity.length() * 5;
      const { x: lx, y: ly } = placements[i];
      this.labels[i].style.transform = `translate(${lx.toFixed(1)}px,${ly.toFixed(1)}px)`;
      this.labels[i].style.opacity = f.opacity.toFixed(3);
      this.labels[i].dataset.state = f.state;
      const edge = lx > x ? lx : Math.min(lx + lw, x);
      this.lines[i].setAttribute(
        "d",
        `M ${x.toFixed(1)} ${y.toFixed(1)} L ${(x + (edge > x ? 20 : -20)).toFixed(1)} ${(ly + 14).toFixed(1)} L ${edge.toFixed(1)} ${(ly + 14).toFixed(1)}`,
      );
      this.lines[i].setAttribute(
        "stroke",
        f.state === "adjust" ? "#e4c48b" : day > 0.5 ? "#397c85" : "#9ed8df",
      );
      this.lines[i].style.opacity = (f.opacity * 0.75).toFixed(3);
      if (Math.floor(time * 4) !== this.lastLabel) {
        this.labels[i].querySelector(".flight-stats").textContent = this.text(this.hud.stats)
          .replace("{altitude}", f.altitude)
          .replace("{speed}", f.speed.toFixed(1));
        this.labels[i].querySelector(".flight-status").textContent = this.text(
          f.state === "adjust" ? this.hud.altitudeSeparation : this.hud.pathClear,
        );
      }
    }
    this.lastLabel = Math.floor(time * 4);
    try {
      this.renderer.render(this.scene, this.camera);
    } catch (e) {
      console.warn(e);
      this.destroy();
      this.host.dataset.available = "false";
    }
  }
  destroy() {
    if (this.dead) return;
    this.dead = true;
    if (this.lost) this.canvas.removeEventListener("webglcontextlost", this.lost);
    this.labels.forEach((l) => l.remove());
    this.lines.forEach((l) => l.remove());
    const gs = new Set(),
      ms = new Set(),
      textures = new Set();
    this.scene?.traverse((o) => {
      if (o.geometry) gs.add(o.geometry);
      if (o.material) {
        ms.add(o.material);
        if (o.material.map) textures.add(o.material.map);
      }
    });
    gs.forEach((g) => g.dispose());
    ms.forEach((m) => m.dispose());
    textures.forEach((t) => t.dispose());
    this.environment?.dispose();
    this.renderer?.dispose();
    this.renderer?.forceContextLoss();
  }
}
window.DroneTraffic = DroneTraffic;
