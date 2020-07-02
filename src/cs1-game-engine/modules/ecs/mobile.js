export const mobile = (()=>{


AFRAME.registerComponent('mobile', {

	schema: {
		
	},
  
  init: function(){
    
   CS1.device = 'Mobile'
   console.log('device-declared')
   document.body.dispatchEvent( new Event('device-declared'))
    
  },
  
  update: function () {
    
  },

	tick: function () {
		
	}
  
});
  
 
  
})()