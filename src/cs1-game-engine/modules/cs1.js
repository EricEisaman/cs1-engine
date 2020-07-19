import aframe from './vendor/aframe-custom-6.01.20';
import {cs1Script} from './customElements/cs1Script';

import {Utils} from './utils/Utils';
import {Input} from './input/Input';
import {Flags} from './flags/Flags';
import {Version} from './version/Version';

//TOP LEVEL Domain Specific Language (dsl)
import {add} from './dsl/add';


let CS1 = window.CS1 = {
  version: Version.version,
  Utils: Utils,
  Input: Input,
  Flags: Flags,
  add: add
}  

//ECS Modules

//device system
import {device} from './ecs/device';
import {oculus} from './ecs/oculus';
import {mobile} from './ecs/mobile';
import {standard} from './ecs/standard';

import {game} from './ecs/game';
import {player} from './ecs/player';
import {cs1cursor} from './ecs/cs1cursor';
import {cs1rigcam} from './ecs/cs1rigcam';


import {cs1avatar} from './ecs/cs1avatar';

import {media} from './ecs/media';
import {cs1sound} from './ecs/cs1sound';

//import {renderOrder} from './ecs/renderOrder';
import {gltfInstances} from './ecs/gltfInstances';
import {trail} from './ecs/trail';
import {jump} from './ecs/jump';
import {log} from './ecs/log';


export const cs1 = (()=>{
  
//Injected script  
const head = document.getElementsByTagName('head')[0]
const script = document.createElement('script')
script.type = 'text/javascript'
script.innerHTML = `console.log('Learn more about the CS1 Game Engine at https://cs1.netlify.app/ .')`
head.appendChild(script)

console.log('CS1 Game Engine Version: ', CS1.version);
 
const hideScripts = document.createElement('style');
hideScripts.innerHTML = `
cs1-script {
  display:none;
}
`
document.head.appendChild(hideScripts);
  
const txt = `if (location.protocol == "http:") location.protocol = "https:";if ("serviceWorker" in navigator){navigator.serviceWorker.register( "./sw.js" ).then(reg => console.log("Service Worker registered", reg)).catch(err =>console.error("Service Worker **not** registered", err));} else {console.warn("Service Worker not supported in this browser");}
`
  
CS1.Utils.loadScript(false,txt)
  
  
  
})()