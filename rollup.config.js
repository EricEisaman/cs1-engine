import css from 'rollup-plugin-css-only';
//import cleanup from 'rollup-plugin-cleanup';
import {terser} from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import { string } from "rollup-plugin-string";

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = process.env.BUILD!='dev'?true:false;
const includeMap = process.env.SOURCEMAP=='true'?true:false;
const engine = process.env.ENGINE=='true'?true:false;
let input,output
if(engine){
  input='src/engine/engine.js'
  output=`dist/${process.env.VERSION}/cs1-engine.min.js`
}else{
  input='src/game/main.js'
  output='public/bundle.js'
}

export default {
	input: input,
	output: {
		file: output,
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: includeMap,
	},
	plugins: [
    json(),
    string({
      // Required to be specified
      include: "**/*.html",

      // Undefined by default
      exclude: ["**/index.html"]
    }),
    css({ output: 'public/bundle.css' }),
		//resolve(), // tells Rollup how to find date-fns in node_modules
    //cleanup({comments: 'none'}),
		production && terser(), // minify, but only in production
	]
};
