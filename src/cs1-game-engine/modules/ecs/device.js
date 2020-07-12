export const device = (()=>{
  
AFRAME.registerSystem('device', {
  schema: {},  // System schema. Parses into `this.data`.

  init: function () {
    
    console.log('initializing device system, checking for CS1.Scene')
    
    if(!CS1.Scene){ 
      document.body.addEventListener('scene-ready', e=>{ this.setup() })  
    }else{
      this.setup();
    }
    
      
      
  },
  
  setup: function(){
    
    console.log('Checking device type  ...')
    if(AFRAME.utils.device.isOculusBrowser()){
      CS1.Scene.setAttribute('oculus','');
    } 
    else if(AFRAME.utils.device.isMobile()){
      CS1.Scene.setAttribute('mobile','');
    } 
    else {
      CS1.Scene.setAttribute('standard','');
    }
    
    
  }

});

  
  
})()