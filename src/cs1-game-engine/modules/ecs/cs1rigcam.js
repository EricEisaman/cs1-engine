export const cs1rigcam = (()=>{

AFRAME.registerSystem('cs1rigcam', {
  schema: {

  },
  
  init: function(){
    
    document.body.addEventListener('cs1-ready', e=>{
     
      console.log('CS1Cam system responding to cs1-ready event ....')
      const cam = document.querySelector("[camera]");
      cam.parentNode.removeChild(cam);
      CS1.cam = document.createElement("a-entity");
      CS1.cam.setAttribute("camera", "active:true");
      CS1.cam.setAttribute('id','cs1-cam');
      CS1.cam.setAttribute('position','0 1.6 0')
      CS1.cam.setAttribute('look-controls','pointerLockEnabled:true');
      
      
      const rig = document.createElement('a-entity');
      rig.setAttribute('id','cs1-rig')
      rig.appendChild(CS1.cam);
      rig.set('movement-controls','');
      CS1.scene.appendChild(rig);
      CS1.rig = rig;
      CS1.rig.rotateInSteps = false;
      CS1.rig.rotateStep = Math.PI/4;
      
    })

  },
  
  tick: function(){
    
  }
  
});
  
  
  
  
})()