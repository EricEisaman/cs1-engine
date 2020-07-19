export const collectible = (()=>{
  
AFRAME.registerSystem('collectible', {
  schema: {},  

  init: function () {
    
  },

  
});


AFRAME.registerComponent('collectible', {

	schema: {
		
	},
  
  init: function(){
    
    this.defersToServer = (CS1.Game.Settings.type.includes('SERVER'))
    
  },
  
  update: function () {
    
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