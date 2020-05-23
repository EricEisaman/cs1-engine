export const cs1cursor = (()=>{


AFRAME.registerComponent('cs1cursor', {

	schema: {
		
	},
  
  init: function(){
    this.el.setAttribute('raycaster','showLine:true');
  },

	tick: function () {
		
	}
  
});
  
  
AFRAME.registerPrimitive('cs1-cursor', {
  defaultComponents: {
    cursor:{},
    cs1cursor:{}
  },

  mappings: {
    
  }
});
  
  
  
  
  
})()