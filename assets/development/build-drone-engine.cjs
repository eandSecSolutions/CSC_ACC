/** Optional rebuild for changes to the Three.js source only. */
const path = require("node:path");
const esbuild = require("esbuild");

esbuild.buildSync({
  entryPoints: [path.resolve(__dirname, "../scripts/three-source/drone-traffic.js")],
  outfile: path.resolve(__dirname, "../vendor/drone-engine.min.js"),
  nodePaths: [path.resolve(path.dirname(require.resolve("three")), "../..")],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2020",
  legalComments: "inline",
});
console.log("Updated assets/vendor/drone-engine.min.js");
