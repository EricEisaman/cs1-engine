const version = {version:'0.0.10'};

(async ()=>{

console.log('CS1 Cosmic Demo Version: ', version.version);


CS1.scene.set('environment',{preset:'osiris', ground:'flat'});

await CS1.scene.set('render-order','background foreground');
   
const juke = await CS1.add('a-jukebox',{position:'0 2 -1.5', scale:'2 2 2'});    
juke.set('render-order','background');
  
const log = document.createElement('a-log');
log.setAttribute('position','-5  3 -12');
CS1.scene.appendChild(log);


CS1.myPlayer.setAvatar({color:"orange",head:"oval",body:"box"});

CS1.myPlayer.setAttribute('jump','speed:25');
  
CS1.game.start();


  
})();
//# sourceMappingURL=cs1-cosmic-demo.js.map
