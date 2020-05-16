import { player } from "./components/player";
import { follow } from "./components/follow";

export const scene = CS1 => {
  
  CS1.scene = document.createElement("a-scene");
  CS1.myPlayer = document.createElement("a-player");
  window.addEventListener("DOMContentLoaded", e => {
    if (AFRAME.scenes[0]) {
      CS1.scene = AFRAME.scenes[0];
      const cam = document.querySelector("[camera]");
      cam.parentNode.removeChild(cam);
    } 
    CS1.scene.clock.autoStart = false;
    CS1.scene.appendChild(CS1.myPlayer);
    CS1.cam = document.createElement("a-entity");
    CS1.cam.setAttribute("camera", "active:true");
    CS1.cam.object3D.position.y = 3;
    //CS1.cam.setAttribute('wasd-controls','enabled: false;');
    CS1.cam.setAttribute("follow", "target: #cam-target;");
    CS1.cam.setAttribute("look-controls", "pointerLockEnabled:true;");
    CS1.scene.appendChild(CS1.cam);
    if(!AFRAME.scenes[0])document.body.appendChild(CS1.scene);
  });
};
