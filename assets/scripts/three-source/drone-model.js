import * as T from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export function makeDrone() {
  const group = new T.Group(),
    rotors = [],
    lamps = [],
    glows = [];
  const m = {
    shell: new T.MeshPhysicalMaterial({
      color: 0xc5cfd4,
      metalness: 0.48,
      roughness: 0.29,
      clearcoat: 0.7,
    }),
    carbon: new T.MeshStandardMaterial({ color: 0x1c232b, metalness: 0.36, roughness: 0.38 }),
    rubber: new T.MeshStandardMaterial({ color: 0x070b10, roughness: 0.8 }),
    titanium: new T.MeshStandardMaterial({ color: 0x879aa6, metalness: 0.9, roughness: 0.24 }),
    glass: new T.MeshPhysicalMaterial({
      color: 0x163c51,
      metalness: 0.65,
      roughness: 0.08,
      clearcoat: 1,
    }),
    red: new T.MeshBasicMaterial({ color: 0xff6555 }),
    green: new T.MeshBasicMaterial({ color: 0x5ef2c4 }),
    white: new T.MeshBasicMaterial({ color: 0xe2f3ff }),
  };
  const add = (geo, mat, pos = [0, 0, 0], scale = null, parent = group) => {
    const o = new T.Mesh(geo, m[mat]);
    o.position.set(...pos);
    if (scale) o.scale.set(...scale);
    parent.add(o);
    return o;
  };
  const box = (w, h, d, mat, pos, parent = group) =>
    add(new RoundedBoxGeometry(w, h, d, 3, Math.min(w, h, d) * 0.18), mat, pos, null, parent);
  const cylinder = (r, h, mat, pos, parent = group, rt = r) =>
    add(new T.CylinderGeometry(rt, r, h, 24), mat, pos, null, parent);
  const strut = (a, b, r, mat, parent = group) => {
    const d = new T.Vector3(...b).sub(new T.Vector3(...a));
    const o = add(
      new T.CylinderGeometry(r, r, d.length(), 12),
      mat,
      new T.Vector3(...a).addScaledVector(d, 0.5).toArray(),
      null,
      parent,
    );
    o.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize());
    return o;
  };
  // Sculpted fuselage, removable battery pack and overlapping shell seams.
  add(new T.SphereGeometry(1, 40, 24), "carbon", [0, 0, 0], [0.61, 0.26, 0.92]);
  add(new T.SphereGeometry(1, 40, 24), "shell", [0, 0.1, -0.04], [0.59, 0.235, 0.86]);
  box(0.64, 0.13, 0.75, "carbon", [0, 0.315, -0.15]);
  box(0.5, 0.055, 0.61, "shell", [0, 0.398, -0.14]);
  box(0.18, 0.07, 0.23, "titanium", [0, 0.42, -0.46]);
  for (const x of [-0.4, 0.4])
    for (let i = 0; i < 9; i++) box(0.05, 0.07, 0.025, "rubber", [x, 0.24, -0.47 + i * 0.074]);
  for (const x of [-0.39, 0.39])
    for (const z of [-0.61, 0.48]) cylinder(0.028, 0.018, "titanium", [x, 0.286, z]);
  // Forward stereo navigation optics and a separate stabilised camera gimbal.
  for (const x of [-0.22, 0.22]) {
    const housing = cylinder(0.105, 0.12, "carbon", [x, 0.1, 0.79]);
    housing.rotation.x = Math.PI / 2;
    const optic = cylinder(0.078, 0.018, "glass", [x, 0.1, 0.865]);
    optic.rotation.x = Math.PI / 2;
  }
  strut([0, -0.15, 0.44], [0, -0.46, 0.44], 0.052, "titanium");
  const gimbal = new T.Group();
  gimbal.position.set(0, -0.49, 0.48);
  group.add(gimbal);
  box(0.45, 0.33, 0.36, "carbon", [0, 0, 0], gimbal);
  const lens = cylinder(0.142, 0.12, "titanium", [0, -0.01, 0.21], gimbal);
  lens.rotation.x = Math.PI / 2;
  const glass = cylinder(0.117, 0.022, "glass", [0, -0.01, 0.28], gimbal);
  glass.rotation.x = Math.PI / 2;
  add(new T.SphereGeometry(0.026, 12, 8), "white", [-0.042, 0.04, 0.3], [1, 0.45, 0.2], gimbal);
  // Four folding arms with hinges, motor windings and two-blade propellers.
  for (const x of [-1, 1])
    for (const z of [-1, 1]) {
      const px = x * 1.25,
        pz = z * 1.08;
      strut([x * 0.38, 0.02, z * 0.48], [px, 0.12, pz], 0.09, "carbon");
      strut([x * 0.42, 0.105, z * 0.5], [px, 0.2, pz], 0.025, "titanium");
      const hinge = cylinder(0.12, 0.18, "titanium", [x * 0.5, 0.1, z * 0.54]);
      hinge.rotation.z = Math.PI / 2;
      cylinder(0.21, 0.23, "carbon", [px, 0.19, pz]);
      cylinder(0.185, 0.09, "titanium", [px, 0.34, pz]);
      cylinder(0.095, 0.065, "carbon", [px, 0.412, pz]);
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        box(0.025, 0.15, 0.022, "titanium", [
          px + Math.cos(a) * 0.202,
          0.2,
          pz + Math.sin(a) * 0.202,
        ]);
      }
      const rotor = new T.Group();
      rotor.position.set(px, 0.46, pz);
      group.add(rotor);
      rotors.push(rotor);
      const shape = new T.Shape();
      shape.moveTo(0.06, -0.055);
      shape.bezierCurveTo(0.3, -0.15, 0.66, -0.11, 0.77, -0.015);
      shape.bezierCurveTo(0.65, 0.06, 0.3, 0.065, 0.06, 0.045);
      shape.closePath();
      const g = new T.ExtrudeGeometry(shape, {
        depth: 0.013,
        bevelEnabled: true,
        bevelSegments: 1,
        steps: 1,
        bevelSize: 0.008,
        bevelThickness: 0.004,
        curveSegments: 16,
      });
      g.rotateX(-Math.PI / 2);
      add(g, "carbon", [0, 0, 0], null, rotor);
      const other = add(g, "carbon", [0, 0, 0], null, rotor);
      other.rotation.y = Math.PI;
      cylinder(0.05, 0.04, "titanium", [0, 0.04, 0], rotor);
      const blur = new T.Mesh(
        new T.RingGeometry(0.13, 0.77, 40),
        new T.MeshBasicMaterial({
          color: 0xb1c3cd,
          transparent: true,
          opacity: 0.075,
          side: T.DoubleSide,
          depthWrite: false,
        }),
      );
      blur.rotation.x = -Math.PI / 2;
      rotor.add(blur);
      const light = box(0.11, 0.075, 0.14, x < 0 ? "red" : "green", [px, 0.105, pz + z * 0.19]);
      lamps.push(light);
      // Open landing gear, with visible rubber feet.
      strut([x * 0.38, -0.12, z * 0.48], [x * 0.73, -0.63, z * 0.64], 0.047, "titanium");
    }
  for (const x of [-0.73, 0.73]) {
    strut([x, -0.63, -0.82], [x, -0.63, 0.85], 0.045, "carbon");
    box(0.1, 0.065, 0.3, "rubber", [x, -0.65, 0.7]);
    box(0.1, 0.065, 0.3, "rubber", [x, -0.65, -0.7]);
  }
  // Antennas and underside distance sensors complete the silhouette.
  strut([-0.22, 0.34, -0.54], [-0.28, 0.67, -0.59], 0.018, "carbon");
  strut([0.22, 0.34, -0.54], [0.28, 0.6, -0.59], 0.018, "carbon");
  for (const x of [-0.18, 0.18]) cylinder(0.06, 0.03, "glass", [x, -0.25, -0.3]);
  // Batch fixed surfaces by material; preserve the rotors and navigation lamps.
  group.updateMatrixWorld(true);
  const buckets = new Map(),
    old = new Set();
  for (const o of [...group.children])
    if (o.isMesh && !lamps.includes(o)) {
      const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      g.applyMatrix4(o.matrixWorld);
      if (!buckets.has(o.material)) buckets.set(o.material, []);
      buckets.get(o.material).push(g);
      old.add(o.geometry);
      group.remove(o);
    }
  for (const [material, parts] of buckets) {
    const merged = mergeGeometries(parts);
    group.add(new T.Mesh(merged, material));
    parts.forEach((g) => g.dispose());
  }
  old.forEach((g) => g.dispose());
  // Procedural light falloff is generated locally; no billboard aircraft images.
  const data = new Uint8Array(32 * 32 * 4);
  for (let y = 0; y < 32; y++)
    for (let x = 0; x < 32; x++) {
      const r = Math.hypot((x - 15.5) / 15.5, (y - 15.5) / 15.5),
        k = (y * 32 + x) * 4;
      data[k] = data[k + 1] = data[k + 2] = 255;
      data[k + 3] = Math.round(Math.pow(Math.max(0, 1 - r), 2.4) * 255);
    }
  const texture = new T.DataTexture(data, 32, 32);
  texture.needsUpdate = true;
  for (const lamp of lamps) {
    const glow = new T.Sprite(
      new T.SpriteMaterial({
        map: texture,
        color: lamp.material.color,
        transparent: true,
        opacity: 0.7,
        blending: T.AdditiveBlending,
        depthWrite: false,
      }),
    );
    glow.position.copy(lamp.position);
    glow.scale.setScalar(0.6);
    group.add(glow);
    glows.push(glow);
  }
  const strobe = add(new T.SphereGeometry(0.055, 12, 8), "white", [0, 0.48, 0.28]);
  const halo = new T.Sprite(
    new T.SpriteMaterial({
      map: texture,
      color: 0xe3f4ff,
      transparent: true,
      opacity: 1,
      blending: T.AdditiveBlending,
      depthWrite: false,
    }),
  );
  halo.position.copy(strobe.position);
  halo.scale.setScalar(0.9);
  group.add(halo);
  glows.push(halo);
  return { group, rotors, lamps, glows, strobe, gimbal, materials: m };
}
