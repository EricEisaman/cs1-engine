const { exec } = require("child_process");

/*
The rollup.config currently builds an IIFE style package allowing CommonJS.
TODO: Add support for pure ES6 Modules
*/
const fs = require("fs");

console.log("process.argv", process.argv);

let name = process.argv[2];

if (name == "server") {
  const settings = require(process.cwd() +
    "/src/cs1-game-server/package.json");

  function serverPub() {
    exec(`pnpm run npmrc && cd src/cs1-game-server && npm publish`, err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Publish script executed successfully.");
      console.log(
        `Check NPM for final verification at https://www.npmjs.com/package/cs1-game-server`
      );
    });
  }

  function version(){
  // echo \"export const version = {version:'$npm_package_version'}\"  > src/cs1-game-engine/modules/version.js
  exec(`echo \"export const Version = {version:'${settings.version}'}\"  > src/${settings.name}/modules/version/Version.js` , err=>{
    if (err) {
      console.error(err);
      return;
    }
    console.log('Version script executed successfully.');
    console.log(`Check for your version in src/${settings.name}/modules/version/Version.js`);
   
  })
  
}
  
  version();
  
  
} else {
 
  const settings = require( process.cwd() + '/system/projects/' + name + '/' + name + '.json');

  const pj = {
    name: settings.name,

    version: settings.version,

    description: settings.description,

    main: `latest/${settings.name}.min.js`,

    homepage: settings.homepage,

    repository: settings.repository,

    license: settings.license,

    keywords: settings.keywords
  };

  const storeData = (data, path) => {
    try {
      fs.writeFileSync(path, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  storeData(pj, `./dist/${settings.name}/package.json`);

  exec(`pnpm run npmrc && cd dist/${settings.name} && npm publish`, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Publish script executed successfully.");
    console.log(
      `Check NPM for final verification at https://www.npmjs.com/package/${settings.name}`
    );
  });
}
