AFRAME.registerSystem("trail", {
  schema: {},
  init: function() {},
  trails: { haveTrails: [] },
  createTrail: function createTrail(
    object,
    length,
    width,
    resolution,
    color,
    offset
  ) {
    if (resolution > length) {
      resolution = length;
    }
    if (!object.userData.trails) object.userData.trails = [];
    const trail = {
      length: Math.round(length),
      width: width,
      resolution: Math.round(resolution),
      trailHistory: [],
      trailVertices: [],
      worldDirection: new THREE.Vector3()
    };
    object.userData.trails.push(trail);
    var geometry = new THREE.PlaneGeometry(1, length, 1, resolution);
    var material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
      wireframe: !1,
      transparent: !0,
      opacity: 0.2
    });
    trail.mesh = new THREE.Mesh(geometry, material);
    trail.mesh.position.add(offset);
    this.el.sceneEl.object3D.add(trail.mesh);
    this.trails.haveTrails.push(object);
    trail.mesh.frustumCulled = !1;
    trail.trailHistory = [];
    trail.trailVertices = [];
    for (var i = 0; i < resolution + 1; i++) {
      trail.trailVertices[i] = [];
    }
    for (var i = 0; i < trail.trailVertices.length; i++) {
      trail.trailVertices[i][0] = trail.mesh.geometry.vertices[i * 2];
      trail.trailVertices[i][1] = trail.mesh.geometry.vertices[i * 2 + 1];
    }
  },
  updateTrailHistory: function updateTrailHistory(object) {
    object.userData.trails.forEach(trail => {
      object.getWorldDirection(trail.worldDirection);
      trail.trailHistory.push([
        object.position.x,
        object.position.y,
        object.position.z,
        trail.worldDirection.x,
        trail.worldDirection.z
      ]);
      if (trail.trailHistory.length > trail.length) {
        trail.trailHistory.shift();
      }
    });
  },
  updateTrails: function updateTrails() {
    for (let i = 0; i < this.trails.haveTrails.length; i++) {
      const object = this.trails.haveTrails[i];
      this.updateTrailHistory(object);
      object.userData.trails.forEach(trail => {
        for (var j = 0; j < trail.trailVertices.length; j++) {
          var index = Math.round(
            (trail.trailHistory.length / trail.resolution) * j
          );
          if (index === trail.trailHistory.length) {
            index = trail.trailHistory.length - 1;
          }
          var pos = trail.trailHistory[index];
          var width =
            (THREE.Math.mapLinear(j, 0, trail.trailVertices.length, 0, 1) *
              trail.width) /
            2;
          if (typeof pos != "undefined") {
            trail.trailVertices[j][0].x = pos[0] - pos[4] * width;
            trail.trailVertices[j][0].y = pos[1];
            trail.trailVertices[j][0].z = pos[2] + pos[3] * width;
            trail.trailVertices[j][1].x = pos[0] + pos[4] * width;
            trail.trailVertices[j][1].y = pos[1];
            trail.trailVertices[j][1].z = pos[2] - pos[3] * width;
          }
        }
        trail.mesh.geometry.verticesNeedUpdate = !0;
      });
    }
  },
  resetTrail: function resetTrail(object) {
    object.userData.trails.forEach(trail => {
      trail.trailHistory = [];
    });
  },
  tick: function(t, dt) {
    this.updateTrails();
  }
});
AFRAME.registerComponent("trail", {
  schema: {
    length: { default: 80 },
    width: { default: 0.8 },
    resolution: { default: 18 },
    color: { default: "white" },
    offset: { type: "vec3" }
  },
  multiple: !0,
  init: function() {
    console.log('Creating a trail.  The value of this is: ', this)
    this.system.createTrail(
      this.el.object3D,
      this.data.length,
      this.data.width,
      this.data.resolution,
      this.data.color,
      this.data.offset
    );
  },
  reset: function() {
    this.system.reset(this.el.object3D);
  }
});



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
async function addCircleFlyer(color,center,reverse,speed){
    const s = await CS1.create('a-sphere');
    s.setAttribute('trail__red','color:red; offset:-1 0 0');
    s.setAttribute('trail__white','color:white; length:120');
    s.setAttribute('trail__blue','color:blue; offset:1 0 0');
    s.setAttribute('color',color);
    s.setAttribute('radius', 0.5);
    s.setAttribute('circle-movement',`center:${center}; radius: 6;reverse:${reverse};speed:${speed}`);
    CS1.scene.appendChild(s);
    
}
addCircleFlyer('blue','0 6 -20',false,1);
addCircleFlyer('red','-4 4 -15',true,1.5);
addCircleFlyer('white','4 8 -25',true,0.6);
CS1.game.addEnvironment();
CS1.game.start();








