export const cs1sound = (()=>{
  
AFRAME.registerSystem('cs1sound', {
  schema: {},  // System schema. Parses into `this.data`.

  init: function () {
    // Called on scene initialization.
  },

  // Other handlers and methods.
});


AFRAME.registerComponent('cs1sound', {

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
  
  
AFRAME.registerPrimitive('cs1-sound', {
  defaultComponents: {
    cs1sound:{}
  },

  mappings: {
    
  }
});
  
  
  
  
  
})()