import css from "rollup-plugin-css-only";
//import cleanup from 'rollup-plugin-cleanup';
import { terser } from "rollup-plugin-terser";
import json from "rollup-plugin-json";
import { string } from "rollup-plugin-string";


const prod = (process.env.PROD==true);
const buildType = process.env.BUILD_TYPE;
const version = process.env.npm_package_version;
let i, o;

switch (buildType) {
  case "engine":
    i = "src/engine/engine.js";
    o = prod 
      ? `dist/${version}/cs1-game-engine.min.js`
      : `public/staging/cs1-game-engine.js`;
    break;
  case "game":
    i = "src/game/main.js";
    o = prod
      ? `dist/${version}/cs1-game.min.js`
      : `public/staging/cs1-game.js`;
    break;
  case "socket":
    i = "src/engine/modules/socket.js";
    o = prod
      ? `dist/${version}/cs1-game-socket.min.js`
      : `public/staging/cs1-game-socket.min.js`;
    break;
}

console.log("prod: ", prod);
console.log("buildType: ", buildType);
console.log("version: ", version);
console.log("i: ", i);
console.log("o: ", o);

export default {
  input: i,
  output: {
    file: o,
    format: "iife", // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,//(buildType=='game') || !prod,
    name: "CS1"
  },
  plugins: [
    json(),
    string({
      // Required to be specified
      include: "**/*.html",

      // Undefined by default
      exclude: ["**/index.html"]
    }),
    css({ output: "public/bundle.css" }),
    //resolve(), // tells Rollup how to find date-fns in node_modules
    //cleanup({comments: 'none'}),
    prod && terser() // minify, but only in production
  ]
};
