import {Version} from './modules/version/Version';

(async ()=>{

console.log('CS1 Neon Demo Version: ', Version.version);


CS1.Scene.set('environment',{preset:'starry',lighting: 'none', ground:'flat'})
CS1.add('a-light',{position:'12 12 -12', type: 'ambient' , intensity: 0.7})

  
await CS1.Scene.set('render-order','background foreground')
   
const juke = await CS1.add('a-jukebox',{position:'0 2 -1.5', scale:'2 2 2'})    
juke.set('render-order','background');
  
CS1.MyPlayer.setAttribute('render-order','foreground')
  
CS1.add('gltf-instances', {count:1000});
  
 
const greenBlob = await CS1.add('cs1-particles',{preset:'greenBlob', position:'-3 2 -1.5'})  
const fire = await CS1.add('cs1-particles',{preset:'fire', position:'3 2 -1.5'}) 
const fireworks = await CS1.add('cs1-particles',{position:'0 8 -6'})  
const energyDisc = await CS1.add('cs1-particles',{preset:'energyDisc', position:'-7 0 -1.5'})  
const vortex = await CS1.add('cs1-particles',{preset:'vortex', position:'7 2 -1.5'})  
const snow = await CS1.add('cs1-particles',{preset:'snow', position:'-17 10 -1.5'})
const rain = await CS1.add('cs1-particles',{preset:'rain', position:'17 10 -1.5'})



const log = document.createElement('a-log')
log.setAttribute('position','-5  3 -12')
CS1.Scene.appendChild(log)
CS1.Scene.set('stats')

//CS1.MyPlayer.setAvatar({color:"green"})
CS1.MyPlayer.setAvatar({type:"rigged"})  
  
  
CS1.MyPlayer.setAttribute('jump','speed:25 ; landingparticles:dust ; slipstream:default')
  
CS1.Game.start();


  
})()

