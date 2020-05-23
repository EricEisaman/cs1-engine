const instances = document.createElement('gltf-instances');
CS1.add(instances);
CS1.myPlayer.setAttribute('jump','speed:25');
CS1.create('a-jukebox').then(o=>{
  window.jukebox=o 
  o.setAttribute('position','0 3.1 -10')
  o.setAttribute('scale','4 4 4')
  CS1.scene.appendChild(o);
})
CS1.create('a-box').then(o=>{
  o.setAttribute('color','blue');
  o.setAttribute('scale','5 10 5');
  o.setAttribute('position','-4 5 -15');
  CS1.scene.appendChild(o);
});
CS1.game.addEnvironment();
CS1.game.start();
