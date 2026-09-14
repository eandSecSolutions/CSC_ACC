import * as T from "three";
const clamp = T.MathUtils.clamp;
const routes = [
  [
    [0.53, 0.25, 45],
    [0.66, 0.18, 41],
    [0.85, 0.24, 43],
    [0.87, 0.32, 49],
    [0.69, 0.32, 53],
    [0.52, 0.29, 49],
  ],
  [
    [0.91, 0.17, 54],
    [0.79, 0.125, 58],
    [0.61, 0.16, 55],
    [0.62, 0.23, 58],
    [0.78, 0.23, 61],
    [0.92, 0.21, 57],
  ],
].map(
  (points) =>
    new T.CatmullRomCurve3(
      points.map((p) => new T.Vector3(...p)),
      true,
      "centripetal",
    ),
);
export function flightState(time, index) {
  const period = index ? 65 : 54,
    phase = time / period + (index ? 0.05 : 0.015),
    u = phase + 0.019 * Math.sin(phase * Math.PI * 2);
  const p = routes[index].getPoint(((u % 1) + 1) % 1),
    adjust = index === 1 && p.x > 0.64 && p.x < 0.79;
  return {
    x: p.x,
    y: p.y,
    depth: p.z,
    opacity: 1,
    status: adjust ? "ALTITUDE SEPARATION" : "PATH CLEAR",
    state: adjust ? "adjust" : "clear",
    altitude: Math.round(70 + (p.z - 40) * 2.1),
    speed: 0,
  };
}
// Bound complete aircraft, including rotor span, rather than just their centres.
export function worldPosition(f, width, height, lang = "en") {
  const compact = width <= 760,
    scale = compact ? 0.6 : 1,
    viewHeight = 2 * Math.tan(T.MathUtils.degToRad(17.5)) * f.depth;
  const radius = (2.38 * scale * height) / viewHeight + 14;
  const u = compact ? 0.53 + (f.x - 0.5) * 0.72 : 0.58 + (f.x - 0.52) * 0.83;
  const centre = clamp(u * width, compact ? radius : width * 0.51 + radius + 12, width - radius);
  const px = lang === "ar" ? width - centre : centre;
  const py = clamp(
    (compact ? 0.18 + (f.y - 0.12) * 0.58 : f.y) * height,
    Math.max(radius, compact ? 94 : 108),
    height - radius,
  );
  return {
    position: new T.Vector3(
      ((px / width - 0.5) * viewHeight * width) / height,
      (0.5 - py / height) * viewHeight,
      10 - f.depth,
    ),
    x: px,
    y: py,
    scale,
    radius,
  };
}
export function flightPose(time, index, width, height, lang = "en") {
  const h = 0.12,
    f = flightState(time, index),
    p = worldPosition(f, width, height, lang),
    before = worldPosition(flightState(time - h, index), width, height, lang).position,
    after = worldPosition(flightState(time + h, index), width, height, lang).position;
  const velocity = after
      .clone()
      .sub(before)
      .multiplyScalar(1 / (2 * h)),
    acceleration = after
      .clone()
      .add(before)
      .addScaledVector(p.position, -2)
      .multiplyScalar(1 / (h * h));
  const yaw = Math.atan2(velocity.x, velocity.z),
    forward = new T.Vector3(Math.sin(yaw), 0, Math.cos(yaw)),
    right = new T.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
  const pitch =
    clamp(velocity.length() * 0.045 + acceleration.dot(forward) * 0.18, -0.17, 0.22) +
    Math.sin(time * 1.8 + index) * 0.009;
  const roll =
    clamp(-acceleration.dot(right) * 0.38, -0.28, 0.28) + Math.sin(time * 2.3 + index) * 0.007;
  // Small stabilisation motion is physical-scale; it does not replace the route.
  p.position.y += Math.sin(time * 2.1 + index) * 0.022;
  return {
    ...p,
    state: f,
    velocity,
    yaw,
    pitch,
    roll,
    quaternion: new T.Quaternion().setFromEuler(new T.Euler(pitch, yaw, roll, "YXZ")),
  };
}
export function labelPlacements(poses, width, height, lang = "en") {
  const lw = width <= 760 ? 135 : 154;
  const minX = width > 760 ? width * 0.515 : 12,
    maxX = width - lw - 12;
  const out = poses.map((p) => ({
    x: clamp((lang === "ar" ? width - p.x : p.x) + 32, minX, maxX),
    y: clamp(p.y - 94, 12, height - 84),
  }));
  const [a, b] = out;
  if (
    width > 760 &&
    a.x < b.x + lw + 14 &&
    a.x + lw + 14 > b.x &&
    a.y < b.y + 76 &&
    a.y + 76 > b.y
  ) {
    if (a.x - lw - 20 >= minX) b.x = a.x - lw - 20;
    else if (a.x + lw + 20 <= maxX) b.x = a.x + lw + 20;
    else b.y = a.y >= 94 ? a.y - 82 : a.y + 82;
  }
  if (lang === "ar") out.forEach((p) => (p.x = width - p.x - lw));
  return out;
}
export function lightState(time, index) {
  const p = (time + index * 0.57) % 1.9;
  return { navigation: p < 0.26 ? 1 : 0.22, strobe: p < 0.085 || (p > 0.18 && p < 0.265) ? 1 : 0 };
}
