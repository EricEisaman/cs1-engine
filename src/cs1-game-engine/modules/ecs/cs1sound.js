export const cs1sound = (()=>{
  
AFRAME.registerSystem('cs1sound', {
  schema: {},  

  init: function () {
    CS1.Media.Sound = {};
    CS1.Media.Sound.Library = {};
    CS1.Media.Sound.Registry = {};
    CS1.Media.Sound.register = this.register;
    CS1.Media.Sound.create = this.create;
  },
  
  register: function (nameOrObject , url ){
    if(typeof nameOrObject=='object'){
      Object.assign(CS1.Media.Sound.Registry,nameOrObject)
    }else{
      CS1.Media.Sound.Registry[nameOrObject] = url;
    }
  },
  
  create: function (name , url=false){
    return new Promise(function(resolve, reject) { 
      if(url){
        const s = document.createElement('cs1-sound');
        s.setAttribute('url',url);
        CS1.Scene.appendChild(s);
        s.addEventListener('loaded',e=>{
          CS1.Media.Sound.Library[name] = s;
          const sclone = s.cloneNode()
          CS1.Scene.appendChild(sclone)
          sclone.addEventListener('loaded',e=>{
            resolve(sclone) 
          })
        })  
      }else if(CS1.Media.Sound.Library[name]){
        const s = CS1.Media.Sound.Library[name].cloneNode()
        CS1.Scene.appendChild(s)
        s.addEventListener('loaded',e=>{
            resolve(s) 
        })  
      }else if(CS1.Media.Sound.Registry[name]){
        const s = document.createElement('cs1-sound');
        s.setAttribute('url', CS1.Media.Sound.Registry[name]);
        CS1.Scene.appendChild(s);
        s.addEventListener('loaded',e=>{
          CS1.Media.Sound.Library[name] = s;
          const sclone = s.cloneNode()
          CS1.Scene.appendChild(sclone)
          sclone.addEventListener('loaded',e=>{
            resolve(sclone) 
          })
        })      
      }else{
        const msg = `
CS1.Media.Sound.create() requires the name library sound
OR 
the name of a registered sound which is not yet loaded into the library
OR
a name and a URL to the sound file.`
        console.error(msg)
      }
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
    this.el.playSoundAt = function(pos){
      this.setAttribute('position',pos)
      this.components.sound.playSound()
    }
    this.el.playSound = function(){
      this.components.sound.playSound()
    }
    this.el.pauseSound = function(){
      this.components.sound.pauseSound()
    }
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
    this.el.setAttribute('sound',`src:${this.data.url}`) 
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