const {exec} = require('child_process');

/*
The rollup.config currently builds an IIFE style package allowing CommonJS.
TODO: Add support for pure ES6 Modules
*/
const fs = require('fs')

console.log('process.argv', process.argv)

let name = process.argv[2]

const settings = require( process.cwd() + '/system/projects/' + name + '/' + name + '.json');

let s,d1,d2;

s = `./dist/${settings.name}/${settings.version}/${settings.name}.min.js`
d1 = `./public/${settings.name}.min.js`
d2 = `./dist/${settings.name}/latest/${settings.name}.min.js`


function version(){
  // echo \"export const version = {version:'$npm_package_version'}\"  > src/cs1-game-engine/modules/version.js
  exec(`echo \"export const Version = {version:'${settings.version}'}\"  > src/${settings.name}/modules/version/Version.js` , err=>{
    if (err) {
      console.error(err);
      return;
    }
    console.log('Version script executed successfully.');
    console.log(`Check for your version in src/${settings.name}/modules/version/Version.js`);
    rollup();
  })
  
}


function rollup(){
  
  exec(`rollup -c --extend --environment PROD:0,BUILD_NAME:${settings.name},VERSION:${settings.version}` , err=>{
    if (err) {
      console.error(err);
      return;
    }
    console.log('Development Build script executed successfully.');
    console.log(`Check for your build in public/staging/${settings.name}.js`);
    refresh();
  })
  
  
}
  


function refresh(){
  
  
exec(`refresh` , err=>{
  if (err) {
    console.error(err);
    return;
  }
})

   
  
}


version();