import {utils} from '../utils';

export const game = CS1=>{

AFRAME.registerComponent('game', {
  
  init: function(){
    CS1.utils = utils;
  },
  
  setType: function(type){
    this.gameType = type;
  },
  
  start: function(){
    
    switch(this.gameType){
      case 'MULTIPLAYER':
        let sio = (typeof io !== 'undefined')
        //display login - don't call CS1.scene.clock.start() until successful user login
        //fetch socket module
        if(!sio)CS1.utils.loadScript('cs1-game-socket.min.js')
        .then(e=>{
          console.log('Time to display login screen.');
        })
        console.log('Multiplayer game waiting for login.');
        break;
      case 'SINGLE_PLAYER_SERVER':
        //display login - don't call CS1.scene.clock.start() until successful user login
        //fetch socket module
        console.log('Single player game waiting for login.');
        break;
      default:
        console.log('Single player game started.  Starting CS1.scene.clock.');
        CS1.scene.clock.start();
        break;
    }
    
  },
  
  tick: function(t,dt){
    
  },
  
  addParticles: function(params=''){
    
    utils.loadScript('https://unpkg.com/aframe-spe-particles-component@1.0.4/dist/aframe-spe-particles-component.min.js')
      .then(e=>{
        try{
         CS1.myPlayer.setAttribute('spe-particles',params);
        } catch(err){
          console.warn('ADDING PARTICLES FAILED!');
          console.error(err);
        }
      }) 
    
    
  },
  
  addEnvironment: function(params='ground:flat'){
    
    utils.loadScript('https://unpkg.com/aframe-environment-component@1.1.0/dist/aframe-environment-component.min.js')
      .then(e=>{
         CS1.scene.setAttribute('environment', params);  
      }) 
    
  }
  
});
  
CS1.scene.setAttribute('game','');
CS1.game = CS1.scene.components.game;
  
}