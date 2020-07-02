//THIS SYSTEM INITIALIZES AFTER SCENE-READY AND BEFORE AFRAME-HYDRATED

//GAME LEVEL DSL
import {view} from '../dsl/game/view/view';

export const game = (()=>{
    

  AFRAME.registerSystem('game', {
  schema: {},  // System schema. Parses into `this.data`.

  init: function () {
    // Called on scene initialization.
    console.log('initializing game system ...');
    this.templates = {};
    this.settings = {
      type: 'SINGLE_PLAYER',
      view: 'THIRD_PERSON'
    }
    CS1.game = this;
    CS1.game.view = view;
  },
  
  start: function(config={}){
    Object.assign(this.settings,config)
    console.log('starting game ...');
    
    document.body.addEventListener('my-avatar-ready', e=>{
      CS1.game.view = CS1.game.view.set(this.settings.view);
    })
    
    document.body.dispatchEvent( new Event('game-start'))
    
    switch(this.settings.type){
      case 'SINGLE_PLAYER':
        CS1.scene.clock.start();
        CS1.scene.play();
        break;
      default:
        CS1.scene.pause();
        break;
    }
    
    
  },
  
  addNamedTemplate: function(name,entity){
    this.templates[name] = entity;
  }
  
});
 
  
})()