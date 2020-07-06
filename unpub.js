const {exec} = require('child_process');

const packageToRemove = process.argv[2];
const versionToRemove = process.argv[3];

const settings = require( process.cwd() + '/system/projects/' + packageToRemove + '/' + packageToRemove + '.json');

console.log('running script:');
console.log(`pnpm run npmrc && cd /app/dist/${settings.name} && npm unpublish ${settings.name}@${versionToRemove}`);

exec(`pnpm run npmrc && cd /app/dist/${settings.name} && npm unpublish ${settings.name}@${versionToRemove}` , err=>{
  if (err) {
    console.error(err);
    return;
  }
  console.log('Unpublish script executed successfully.');
  console.log(`Check NPM for final verification at https://www.npmjs.com/package/${settings.name}`);
  console.log(`Removing local distribution directory for version ${versionToRemove}`);
  exec(`rm -rf /app/dist/${settings.name}/${versionToRemove} && refresh` , err=>{if(err)console.log(err)});
})

