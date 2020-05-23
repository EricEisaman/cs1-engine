const instances = document.createElement('gltf-instances');
CS1.add(instances);
CS1.myPlayer.setAttribute('jump','speed:25');
CS1.create('a-jukebox').then(o=>{
  window.jukebox=o 
  o.setAttribute('position','0 3.1 -10')
  o.setAttribute('scale','4 4 4')
  CS1.scene.appendChild(o);
})
CS1.registerComponent('circle-movement', {
  schema: {
    center: {type: 'vec3'},
    speed: {default: 1},
    radius: {default: 20},
    reverse: {default: false}
  },
  
  init: function(){
    this.dir=this.data.reverse?1:-1;
  },
  
  tick: function(t,dt){
    // x = rCos(theta)   y = rSin(theta)
    const x = this.data.center.x+this.data.radius*Math.cos(this.dir*t*this.data.speed/1000);
    const y = this.data.center.y;
    const z = this.data.center.z+this.data.radius*Math.sin(this.dir*t*this.data.speed/1000);
    this.el.object3D.position.set(x, y, z);
  }
  
});


CS1.game.addEnvironment();
CS1.game.start();








document.addEventListener('gameStart',e=>{
    
  addCircleFlyer('blue','0 6 -20',false,1);
  addCircleFlyer('red','-4 4 -15',true,1.5);
  addCircleFlyer('white','4 8 -25',true,0.6);
  
     
});  
  
function addCircleFlyer(color,center,reverse,speed){
  const s = document.createElement('a-sphere');
  s.setAttribute('trail__red','color:red; offset:-1 0 0');
  s.setAttribute('trail__white','color:white; length:120');
  s.setAttribute('trail__blue','color:blue; offset:1 0 0');
  s.setAttribute('color',color);
  s.setAttribute('radius', 0.5);
  s.setAttribute('circle-movement',`center:${center}; radius: 6;reverse:${reverse};speed:${speed}`);
  CS1.scene.appendChild(s);
}

