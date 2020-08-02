import {Version} from './modules/version/Version';

(async ()=>{

console.log('CS1 Cosmic Demo Version: ', Version.version);

CS1.add('a-light',{position:'12 12 -12', type: 'ambient' , intensity: 0.3})
  
const env = await CS1.add('a-entity',{
  environment:'preset: default; ground: flat'
})

env.set('design', {
  compParams: ['environment' , {
    groundColor: 'primary'
  }]
})

await CS1.Scene.set('render-order','background foreground')
//CS1.Scene.set('stats')
  
const juke = await CS1.add('a-jukebox',{position:'0 2 -1.5', scale:'2 2 2', border:CS1.Design.Theme.info})    
juke.set('render-order','background');
  
juke.set('design',{
 compParams: ['jukebox', {
     border : 'info',
     color: 'warning',
     heading: 'success',
     logo: 'logo'
  }]
})
  
CS1.add('a-log', {
  position: '-5 3 -12',
  max: 15
})

//CS1.MyPlayer.setAvatar({color:"orange",head:"oval",body:"box"})
CS1.MyPlayer.setAvatar({type:"rigged"})
  
//CS1.MyPlayer.setAttribute('jump','speed:25 ; landingparticles:dust ; slipstream:default ; jumpsound:jump ; landsound:land')
  
const cube = await CS1.add('https://cdn.glitch.com/41a9cdac-916b-45df-bf58-0ba63c04533e%2FBlender_Design_Materials_Starter.glb?v=1595969375915', '4 0 -2')

cube.set('design')

const chip = await CS1.add('https://cdn.glitch.com/41a9cdac-916b-45df-bf58-0ba63c04533e%2FChip_CS1.Design.Theme.glb?v=1596051503961', '-4 0 -2')

chip.set('design')

const box = await CS1.add('a-box',
{
 position:'0 4.5 -1.5'
})

box.set('design',{
  color: 'primary'
})
  
box.set('animation',{
  property: 'rotation',
  to: '259',
  from: '0',
  dir: 'alternate',
  loop: 'true'
})
  
  
const sphere = await CS1.add('a-sphere' , {
  position:'0 6.5 -1.5'
})  

sphere.set('design',{
  props: {
    color: 'secondary',
    radius: 'radius'
  }
})


setInterval(e=>{
  if(CS1.Design.Theme.name=='Pastel'){
    CS1.Design.setTheme('Neon')
  }else{
    CS1.Design.setTheme('Pastel')
  }
}, 8000)
  
CS1.Media.Sound.create('jump','https://cdn.glitch.com/41a9cdac-916b-45df-bf58-0ba63c04533e%2Fjump_1.mp3?v=1595699203430')
  
CS1.Media.Sound.create('land','https://cdn.glitch.com/41a9cdac-916b-45df-bf58-0ba63c04533e%2Fland_in_grass.mp3?v=1595703071856')
  
CS1.MyPlayer.set('jump',{
  speed:25,
  landingparticles:'dust',
  slipstream:'default',
  jumpsound:'jump',
  landsound:'land'
})
  
CS1.Game.start();


  
})()

