const version = {version:'0.0.10'};

(async ()=>{

console.log('CS1 Neon Demo Version: ', version.version);


CS1.scene.set('environment',{preset:'starry',lighting: 'none', ground:'flat'});
CS1.add('a-light',{position:'12 12 -12', type: 'ambient' , intensity: 0.7});

  
await CS1.scene.set('render-order','background foreground');
   
const juke = await CS1.add('a-jukebox',{position:'0 2 -1.5', scale:'2 2 2'});    
juke.set('render-order','background');
  
CS1.myPlayer.setAttribute('render-order','foreground');
  
CS1.add('gltf-instances', {count:1000});
  
 
const greenBlob = await CS1.add('cs1-particles',{preset:'greenBlob', position:'-3 2 -1.5'});  
const fire = await CS1.add('cs1-particles',{preset:'fire', position:'3 2 -1.5'}); 
const fireworks = await CS1.add('cs1-particles',{position:'0 8 -6'});  
const energyDisc = await CS1.add('cs1-particles',{preset:'energyDisc', position:'-7 0 -1.5'});  
const vortex = await CS1.add('cs1-particles',{preset:'vortex', position:'7 2 -1.5'});  
const snow = await CS1.add('cs1-particles',{preset:'snow', position:'-17 10 -1.5'});
const rain = await CS1.add('cs1-particles',{preset:'rain', position:'17 10 -1.5'});


const log = document.createElement('a-log');
log.setAttribute('position','-5  3 -12');
CS1.scene.appendChild(log);


//CS1.myPlayer.setAvatar({color:"green"})
CS1.myPlayer.setAvatar({type:"rigged"});  
  
// if(CS1.device=='Oculus'){
//   CS1.rig.setAttribute('jump','speed:25')
// }else{
//   CS1.myPlayer.setAttribute('jump','speed:25');
// }
  
CS1.myPlayer.setAttribute('jump','speed:25');
  
CS1.game.start();


  
})();
//# sourceMappingURL=cs1-neon-demo.js.map
