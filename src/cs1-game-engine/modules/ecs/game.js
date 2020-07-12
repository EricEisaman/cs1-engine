//THIS SYSTEM INITIALIZES AFTER SCENE-READY AND BEFORE AFRAME-HYDRATED

//GAME LEVEL DSL
import {View} from '../dsl/game/view/View';

export const game = (()=>{
    

  AFRAME.registerSystem('game', {
  schema: {},  // System schema. Parses into `this.data`.

  init: function () {
    // Called on scene initialization.
    console.log('initializing game system ...');
    this.Templates = {};
    this.Settings = {
      type: 'SINGLE_PLAYER',
      view: 'THIRD_PERSON'
    }
    CS1.Game = this;
    CS1.Game.View =View;
  },
  
  start: function(config={}){
    Object.assign(this.Settings,config)
    
    
    document.body.addEventListener('my-avatar-ready', e=>{
      CS1.Game.View = CS1.Game.View.set(this.Settings.view);
    })
    
    
    CS1.log('game-start');
    document.body.dispatchEvent( new Event('game-start'))
    
    
    switch(this.Settings.type){
      case 'SINGLE_PLAYER':
        CS1.Scene.clock.start();
        CS1.Scene.play();
        break;
      default:
        CS1.Scene.pause();
        break;
    }
    
    
  },
  
  addNamedTemplate: function(name,entity){
    this.Templates[name] = entity;
  }
  
});
 
  
})()