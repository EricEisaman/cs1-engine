import {simpleavatar} from './components/simple-avatar';
import { follow } from "./components/follow";

export const thirdPerson = {
  
  type: 'THIRD_PERSON',
  
  init: function(){
    
    console.log('Setting game as THIRD_PERSON.');
    CS1.myPlayer.setAttribute('wasd-controls','acceleration:30');
    
    
    const camTarget = document.createElement('a-entity');
    camTarget.object3D.position.set(0,2,3);
    camTarget.setAttribute('id','cam-target');
    CS1.myPlayer.appendChild(camTarget);
    CS1.myPlayer.camTarget = camTarget;
    //CS1.myPlayer.cam = document.querySelector('[camera]');
    CS1.cam.setAttribute("follow", "target: #cam-target;");
    CS1.cam.setAttribute("look-controls", "pointerLockEnabled:true;");
    
    
    
    CS1.myPlayer.components.player.tick = function(t,dt){
      //console.log(CS1.myPlayer.cam.object3D.rotation.y)
      //console.log(CS1.cam.object3D.rotation.y)
      CS1.myPlayer.object3D.rotation.y = CS1.cam.object3D.rotation.y;
    }
    
    
    
    
    
    const avatar = document.createElement('simple-avatar');
    avatar.setAttribute('laserOffset','0 0 -.5');
    avatar.setAttribute('id','my-avatar');
    CS1.myPlayer.appendChild(avatar);
    CS1.myPlayer.avatar = avatar;
    console.log('Avatar added.')
    
    
    
    // if(CS1.device=='Standard'){
    //   document.body.addEventListener('keyup', e=>{
    //     switch(e.code){
    //       case 'Digit1':
    //         CS1.game.view.toggle();
    //         break;
    //       case 'Digit2':
    //         break
    //     }
    //   })
    // }
    
    
    
  
    
  },

  toggle: function(){
    if(!CS1.cam.components.follow)return
    if(CS1.myPlayer.camTarget.object3D.position.z==3){
      CS1.myPlayer.camTarget.object3D.position.set(0,2,1);
      CS1.cam.components.follow.data.yFactor = 1;
      CS1.cam.components.follow.data.strength = 0.1;
      CS1.myPlayer.avatar.object3D.traverse(o=>{
        if(o.type=='Mesh'){
         o.material.transparent = true
         o.material.opacity = 0.05
        }
      })
    }else{
      CS1.myPlayer.camTarget.object3D.position.set(0,2,3);
      CS1.cam.components.follow.data.yFactor = 2;
      CS1.cam.components.follow.data.strength = 0.05;
      CS1.myPlayer.avatar.object3D.traverse(o=>{
        if(o.type=='Mesh'){
         o.material.transparent = false
         o.material.opacity = 1.0
        }
      })
    }
    
    
    
  },
  



}