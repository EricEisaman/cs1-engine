import {Version} from './modules/version/Version';

(async ()=>{

console.log('CS1 Cosmic Demo Version: ', Version.version);


await CS1.Scene.set('environment',{preset:'osiris', ground:'flat'})
CS1.add('a-light',{position:'12 12 -12', type: 'ambient' , intensity: 0.3})

await CS1.Scene.set('render-order','background foreground')
//CS1.Scene.set('stats')
   
const juke = await CS1.add('a-jukebox',{position:'0 2 -1.5', scale:'2 2 2'})    
juke.set('render-order','background');
  
const log = document.createElement('a-log')
log.setAttribute('position','-5  3 -12')
CS1.Scene.appendChild(log)


//CS1.MyPlayer.setAvatar({color:"orange",head:"oval",body:"box"})
CS1.MyPlayer.setAvatar({type:"rigged"})
  
CS1.Media.Sound.register('jump','https://cdn.glitch.com/41a9cdac-916b-45df-bf58-0ba63c04533e%2Fjump_1.mp3?v=1595699203430')
  
CS1.Media.Sound.register('land','https://cdn.glitch.com/41a9cdac-916b-45df-bf58-0ba63c04533e%2Fland_in_grass.mp3?v=1595703071856')

//CS1.MyPlayer.setAttribute('jump','speed:25 ; landingparticles:dust ; slipstream:default ; jumpsound:jump ; landsound:land')
  
const cube = await CS1.add('https://cdn.glitch.com/41a9cdac-916b-45df-bf58-0ba63c04533e%2FBlender_Design_Materials_Starter.glb?v=1595969375915', '4 0 -2')

const chip = await CS1.add('https://cdn.glitch.com/41a9cdac-916b-45df-bf58-0ba63c04533e%2FChip_CS1.Design.Theme.glb?v=1596051503961', '-4 0 -2')

setTimeout(e=>{
  cube.set('design')
  chip.set('design')
  setTimeout(e=>{CS1.Design.setTheme('Neon')},8000)
}, 8000)
  
CS1.MyPlayer.set('jump',{
  speed:25,
  landingparticles:'dust',
  slipstream:'default',
  jumpsound:'jump',
  landsound:'land'
})
  
CS1.Game.start();


  
})()

