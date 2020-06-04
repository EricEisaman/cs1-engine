import aframe from '../vendor/aframe-custom-6.01.20.js'
import {cs1scene} from './cs1scene';
import {utils} from '../utils';
CS1.utils = utils;
import {flags} from '../flags';
import {links} from '../links';
import {log} from './log';
import {device} from '../device';
import {view} from '../view';
import {voices} from '../voices';
import {create} from '../create';
import {add} from '../add';
import {register} from '../register';
import {version} from '../version';
CS1.version = version.version;

export const game = ( ()=>{

AFRAME.registerComponent('game', {
  
  schema:{
    type: {default:'SINGLE_PLAYER'},
    view: {default:'THIRD_PERSON'}, //FIRST_PERSON, OMNICIENT
    flags: {default: flags}
  },
  
  init: function(){
    console.log(`CS1 Game Engine Version: ${CS1.version}`);
    this.flags = this.data.flags;
    this.view = view.set(this.data.view);
    device.adapt();
  },
  
  setType: function(type){
    this.data.type = type;
  },
  
  setFlags: function(flags){
    Object.keys(flags).forEach(flag=>{
      this.data.flags[flag]=flags[flag];
    });
  },
  
  start: function(){
    switch(this.data.type){
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
  
  update: function(){
    
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
  

const CS1 = window.CS1;
CS1.scene.setAttribute('game','');
CS1.game = CS1.scene.components.game;  
  
})()