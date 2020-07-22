//VIEW INITIALIZES ON GAME-START
//VIEW EXPECTS THE MYPLAYER AND MYPLAYER.AVATAR
import {simpleavatar} from '../../../ecs/simpleAvatar';
import { follow } from "../../../ecs/follow";

export const ThirdPerson = {
  
  type: 'THIRD_PERSON',
  
  init: function(){
    
    console.log('Setting game as THIRD_PERSON.');
    CS1.MyPlayer.setAttribute('wasd-controls','acceleration:30');
    
    
    const rigTarget = document.createElement('a-entity');
    rigTarget.object3D.position.set(0,0.5,3);
    rigTarget.setAttribute('id','rig-target');
    const rigTargetSwivel = document.createElement('a-entity');
    rigTargetSwivel.appendChild(rigTarget);
    CS1.MyPlayer.appendChild(rigTargetSwivel);
    CS1.MyPlayer.RigTargetSwivel = rigTargetSwivel;
    CS1.MyPlayer.RigTarget = rigTarget;
    //CS1.myPlayer.cam = document.querySelector('[camera]');
    CS1.Rig.setAttribute("follow", "target: #rig-target;");
    
    
    //AFRAME.components["look-controls"].Component.prototype.remove = function(){ }
    CS1.Cam.setAttribute("look-controls", "pointerLockEnabled:true;");
    
    
    
    CS1.Cam.matrixSweep = function(){
      if(CS1.Cam.isSweeping)return;
      CS1.Cam.isSweeping = true;
      if(CS1.MyPlayer.isJumping)CS1.MyPlayer.Avatar.Animation.pause();
      //CS1.cam.components["look-controls"].saveCameraPose();
      CS1.Cam.components["look-controls"].data.enabled = false;
      const yFactor = CS1.Rig.components.follow.data.yFactor; 
      CS1.Rig.components.follow.data.yFactor = 0
      const v3 = CS1.Cam.object3D.rotation.toVector3()
      CS1.Cam.object3D.rotation.setFromVector3(new THREE.Vector3(0,v3.y,0))
      const cachedSpeed = CS1.MyPlayer.getSpeed();
      CS1.MyPlayer.setSpeed(0);
      let count = 0
      const sweep = setInterval(e=>{
      CS1.Rig.components.follow.data.strength=1
      CS1.MyPlayer.RigTargetSwivel.object3D.rotateY(0.005)
      CS1.Rig.object3D.rotateY(0.005)
      if(count++ >1256){
        clearInterval(sweep)
        CS1.Rig.components.follow.data.strength = 0.05
        CS1.MyPlayer.RigTargetSwivel.setAttribute('rotation','0 0 0')
        //CS1.Rig.setAttribute('rotation','0 0 0')
        CS1.Cam.components["look-controls"].data.enabled = true;
        CS1.Rig.components.follow.data.yFactor = yFactor;
        //CS1.Cam.components["look-controls"].restoreCameraPose()
        CS1.Cam.isSweeping = false;
        CS1.Cam.object3D.rotation.setFromVector3(new THREE.Vector3(0,v3.y,0))
        CS1.MyPlayer.setSpeed(cachedSpeed);
        if(CS1.MyPlayer.isJumping)CS1.MyPlayer.Avatar.Animation.play();
      }
      },0)
    }
    
    
    if(CS1.device=='Standard' || CS1.device=='Mobile') 
      CS1.MyPlayer.components.player.tick = function(t,dt){
        if(CS1.Cam.isSweeping  || CS1.MyPlayer.isJumping)return;
          CS1.MyPlayer.object3D.rotation.y = CS1.Cam.object3D.rotation.y;
      }

    
    console.log('view-ready')
    document.body.dispatchEvent( new Event('view-ready'))
    
    
    if(CS1.device=='Standard'){
      document.body.addEventListener('keyup', e=>{
        switch(e.code){
          case 'Digit1':
            if(CS1.Cam.isSweeping)return;
            CS1.Game.View.toggle();
            break;
          case 'Digit2':
            CS1.Cam.matrixSweep();
            break
        }
      })
    }
    
    
    
  
    
  },

  toggle: function(){
    if(!CS1.Rig.components.follow)return
    if(CS1.MyPlayer.RigTarget.object3D.position.z==3){
      CS1.MyPlayer.RigTarget.object3D.position.set(0,0,1);
      CS1.Rig.components.follow.data.yFactor = 1;
      CS1.Rig.components.follow.data.strength = 0.1;
      CS1.MyPlayer.Avatar.object3D.traverse(o=>{
        if(o.type=='Mesh' || o.type=='SkinnedMesh'){
         o.material.transparent = true
         o.material.opacity = 0.05
        }
      })
    }else{
      CS1.MyPlayer.RigTarget.object3D.position.set(0,0.5,3);
      CS1.Rig.components.follow.data.yFactor = 2;
      CS1.Rig.components.follow.data.strength = 0.05;
      CS1.MyPlayer.Avatar.object3D.traverse(o=>{
        if(o.type=='Mesh' || o.type=='SkinnedMesh'){
         o.material.transparent = false
         o.material.opacity = 1.0
        }
      })
    }
    
    
    
  },
  



}