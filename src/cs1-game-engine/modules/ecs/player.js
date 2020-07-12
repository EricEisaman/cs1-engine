//PLAYER SYSTEM SETUP CREATES MYPLAYER ON SCENE-READY THEN FIRES PLAYER-READY

//PLAYER LEVEL DSL
import {setAvatar} from '../dsl/player/setAvatar';

export const player = (()=>{
  
AFRAME.registerSystem('player', {
  schema: {},  // System schema. Parses into `this.data`.

  init: function () {
    
    
    if(CS1.scene){
      console.log('Player system responding to CS1.scene being detected.')
      this.setup()
      
    }else{
      
      console.log('Player system waiting for device-declared event since CS1.scene is not detected.')
      document.body.addEventListener('device-declared', e=>{ this.setup() })
      
    }
    
  },
  
  setup: function(){
    
    console.log('initializing player system ...');
    console.log('Creating CS1.MyPlayer ....')
    CS1.MyPlayer =  document.createElement("a-player");
    CS1.MyPlayer.setAttribute('me',true);
    CS1.Scene.appendChild(CS1.MyPlayer);
    console.log('player-ready')
    document.body.dispatchEvent( new Event('player-ready'))
    
    
    
  }

  // Other handlers and methods.
});


AFRAME.registerComponent('player', {

	schema: {
		avatar: {default: {type:'simple',head:'box',body:'box',color:'red',outline:'yellow',cursortype:'cs1-cursor'}},
    me: {default: false},
    speed: {default: 0.3},
    rotSpeed: {default: 0.02}
	},
  
  init: function(){
    
   
    
  },
  
  update: function () {
    
    if(this.data.me){
       this.el.setAttribute('id','my-player');
       if(CS1.device=='Oculus'){
           CS1.MyPlayer.setSpeed = speed =>{
              CS1.Rig.set('movement-controls',`speed:${speed}`)
            }
           CS1.MyPlayer.getSpeed = () =>{
              return CS1.Rig.components['movement-controls'].data.speed;
            }
         }else{
           CS1.MyPlayer.setSpeed = speed =>{
              CS1.MyPlayer.set('wasd-controls',`acceleration:${speed*100}`)
            }
           CS1.MyPlayer.getSpeed = () =>{
              return CS1.MyPlayer.components['wasd-controls'].data.acceleration/100;
            }
         }
     }else{

     }
    this.el.speed = this.data.speed;
    this.el.rotSpeed = this.data.rotSpeed;
    
    //Add DSL
    this.el.setAvatar = setAvatar;
    this.el.AvatarSettings = this.data.avatar;
  
  },

	tick: function () {
		
	}
  
});
  
  
AFRAME.registerPrimitive('a-player', {
  defaultComponents: {
    player: {me:true}
  },

  mappings: {
    avatar: 'player.avatar',
    me: 'player.me',
    speed: 'player.speed',
    rotSpeed: 'player.rotSpeed'
  }
});
  
  
  
  
  
})()