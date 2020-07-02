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

  function version() {
    // echo \"export const version = {version:'$npm_package_version'}\"  > src/cs1-game-engine/modules/version.js
    exec(
      `echo \"module.exports = {version:'${settings.version}'}\"  > src/${settings.name}/modules/version/version.js`,
      err => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Version script executed successfully.");
        console.log(
          `Check for your version in src/${settings.name}/modules/version/version.js`
        );
        serverPub();
      }
    );
  }
  
  version();
  
  
} else {
  let path;

  switch (name) {
    case "engine":
      path = "/package.json";
      break;
    case "socket":
      path = "/socket.json";
      break;
    case "forest":
      path = "/forest.json";
      break;
  }

  const settings = require(process.cwd() + path);

  console.log("path", path);

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
