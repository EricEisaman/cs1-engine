export const cs1sound = (()=>{
  
AFRAME.registerSystem('cs1sound', {
  schema: {},  

  init: function () {
    CS1.Media.Sound = {};
    CS1.Media.Sound.Registry = {};
    CS1.Media.Sound.register = this.register;
  },
  
  register: function (name , url ){
    const s = document.createElement('cs1-sound');
    s.setAttribute('url',url);
    CS1.Scene.appendChild(s);
    s.addEventListener('loaded',e=>{
      CS1.Media.Sound.Registry[name] = s.components.cs1sound;
    })
  }

  
});


AFRAME.registerComponent('cs1sound', {

	schema: {
		effects: {default:[]},
    url: {default:''}
	},
  
  init: function(){
    // Will power the cs1-sound wrapper of the sound component
    // with extra functionality above and beyond what the sound component provides
    // such as effects
    this.el.setAttribute('sound',`src:${this.data.url}`)
  },
  
  playSoundAt: function(pos){
    this.el.setAttribute('position',pos)
    this.el.components.sound.playSound()
  },
  
  playSound: function(){
    this.el.components.sound.playSound()
  },
  
  pauseSound: function(){
   this.el.components.sound.pauseSound()
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
    url:'cs1sound.url',
    effects:'cs1sound.effects'
  }
});
  
  
  
  
  
})()