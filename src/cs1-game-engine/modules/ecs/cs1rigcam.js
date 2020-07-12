export const cs1rigcam = (()=>{

AFRAME.registerSystem('cs1rigcam', {
  schema: {

  },
  
  init: function(){
    
    document.body.addEventListener('cs1-ready', e=>{
     
      console.log('CS1Cam system responding to cs1-ready event ....')
      const cam = document.querySelector("[camera]");
      cam.parentNode.removeChild(cam);
      CS1.Cam = document.createElement("a-entity");
      CS1.Cam.setAttribute("camera", "active:true");
      CS1.Cam.setAttribute('id','cs1-cam');
      CS1.Cam.setAttribute('position','0 1.6 0')
      CS1.Cam.setAttribute('look-controls','pointerLockEnabled:true');
      
      
      const rig = document.createElement('a-entity');
      rig.setAttribute('id','cs1-rig')
      rig.appendChild(CS1.Cam);
      rig.set('movement-controls','speed:0.3');
      CS1.Scene.appendChild(rig);
      CS1.Rig = rig;
      CS1.Rig.rotateInSteps = false;
      CS1.Rig.rotateStep = Math.PI/4;
      
    })

  },
  
  tick: function(){
    
  }
  
});
  
  
  
  
})()