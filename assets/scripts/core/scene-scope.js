window.ACCSceneScope = class SceneScope {
  constructor() {
    this.controller = new AbortController();
    this.animations = [];
    this.timers = [];
    this.disposers = [];
  }
  listen(target, event, fn, opts = {}) {
    target.addEventListener(event, fn, { ...opts, signal: this.controller.signal });
  }
  animate(el, keyframes, options) {
    const a = el.animate(keyframes, options);
    this.animations.push(a);
    return a;
  }
  timer(fn, delay) {
    const id = setTimeout(fn, delay);
    this.timers.push(id);
    return id;
  }
  own(dispose) {
    this.disposers.push(dispose);
  }
  dispose() {
    this.controller.abort();
    this.animations.forEach((a) => a.cancel());
    this.timers.forEach(clearTimeout);
    this.disposers.forEach((fn) => fn());
  }
};
