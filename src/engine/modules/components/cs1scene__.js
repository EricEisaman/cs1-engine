import { player } from "./player";
import { follow } from "./follow";
import { cs1cam } from "./cs1cam";

import { jump } from "./jump";
import { gltfInstances} from "./gltf-instances";
import { trail } from "./trail";

export const cs1scene = (()=>{
  

AFRAME.registerComponent('cs1scene', {
  schema: {

  },
  
  init: function(){
    
    
    
  }
  
});
  
  
window.CS1 = {scene:documentCreateElement('a-scene')};
document.addEventListener('DOMContentLoaded',setup);
  
function setup(){
const scene = document.querySelector('a-scene');

if (scene && scene.hasLoaded) {
  CS1.game.start();
} else {
  scene.addEventListener('loaded', CS1.game.start());
}

  
}
   
  
})()