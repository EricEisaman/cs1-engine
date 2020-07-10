export const standard = (()=>{


AFRAME.registerComponent('standard', {

	schema: {
		
	},
  
  init: function(){
    
    console.log('Initializing standard device.')
    CS1.device = 'Standard'  
    CS1.scene.setAttribute("vr-mode-ui", "enabled: false");
    console.log('device-declared')
    document.body.dispatchEvent( new Event('device-declared'))
    
    
  },
  
  update: function () {
    
  },

	tick: function () {
		
	}
  
});
  
 
  
})()