import css from "rollup-plugin-css-only";
import { terser } from "rollup-plugin-terser";
import json from "rollup-plugin-json";
import { string } from "rollup-plugin-string";


const prod = Boolean(process.env.PROD==1);
const version = process.env.VERSION;
const name = process.env.BUILD_NAME;
let i, o;
i = `src/${name}/main.js`;
o = prod 
      ? `dist/${name}/${version}/${name}.min.js`
      : `public/staging/${name}.js`;

let map = true;
let format = "es";


console.log("name: ", name);
console.log("prod: ", prod);
console.log("version: ", version);
console.log("i: ", i);
console.log("o: ", o);
console.log("format: ", format);
console.log("map: ", map);

export default {
  input: i,
  output: {
    file: o,
    format: format,
    sourcemap: map,
    name: name
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
