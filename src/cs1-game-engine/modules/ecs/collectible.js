export const collectible = (()=>{
  
AFRAME.registerSystem('collectible', {
  schema: {},  // System schema. Parses into `this.data`.

  init: function () {
    // Called on scene initialization.
  },

  // Other handlers and methods.
});


AFRAME.registerComponent('collectible', {

	schema: {
		
	},
  
  init: function(){
    
    this.myObject = null;
    
  },
  
  update: function () {
    // Do stuff with `this.data`.
    this.myObject = this.system.createComplexObject(this.data);
  },

	tick: function () {
		
	}
  
});
  
  
AFRAME.registerPrimitive('a-collectible', {
  defaultComponents: {
    collectible:{}
  },

  mappings: {
    
  }
});
  
  
  
  
  
})()