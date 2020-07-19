export const cs1sound = (()=>{
  
AFRAME.registerSystem('cs1sound', {
  schema: {},  

  init: function () {
    CS1.Media.Sound = {};
    CS1.Media.Sound.Registry = {};
    CS1.Media.Sound.register = this.register;
  },
  
  register: function (name , cs1sound ){
    CS1.Media.Sound.Registry[name] = cs1sound;
  }

  
});


AFRAME.registerComponent('cs1sound', {

	schema: {
		effects: {default:[]}
	},
  
  init: function(){
    // Will power the cs1-sound wrapper of the sound component
    // with extra functionality above and beyond a-sound primitive
    // such as addEffect
    
    
  },
  
  update: function () {
    
    
  },
  
  addEffect: function(name){},
  
  removeEffect: function(name){},

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