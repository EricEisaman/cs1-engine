export const cs1cursor = (()=>{


AFRAME.registerComponent('cs1cursor', {

	schema: {
		
	},
  
  init: function(){
    this.el.setAttribute('raycaster','showLine:true ; objects: .jukebox,.clickable');
  },
  
  remove: function(){
    if(this.el.hasAttribute('cursor'))
      this.el.removeAttribute('cursor');
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
    fuse: 'cursor.fuse'
  }
});
  
  
  
  
  
})()