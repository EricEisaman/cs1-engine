export const component = (()=>{
  
AFRAME.registerSystem('component', {
  schema: {},  // System schema. Parses into `this.data`.

  init: function () {
    // Called on scene initialization.
  },

  // Other handlers and methods.
});


AFRAME.registerComponent('component', {

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
  
  
AFRAME.registerPrimitive('a-component', {
  defaultComponents: {
    component:{}
  },

  mappings: {
    
  }
});
  
  
  
  
  
})()