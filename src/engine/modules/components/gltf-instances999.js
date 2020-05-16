export const gltfInstances = (()=>{


AFRAME.registerComponent('gltf-instances', {
	schema: {
		src: { default: 'https://cdn.glitch.com/162b879e-fd42-40d9-8519-671d783b8c70%2Fclock.glb?v=1538858467717' },
    count: { default: 10 },
    animation: { default: '' },
    distribution: { default: 'square' },
    spacing: { default: 1 },
	},
  
  init: function(){
    
    this.amount = 10;
    
    this.el.setAttribute('gltf-model',`src:url(${this.data.src})`);
    
    this.el.addEventListener('model-loaded', e=>{
      console.log('MODEL LOADED');
      let model = e.detail.model;
      if(!model.geometry){
        model.children.forEach(c=>{
          //currently gets last child with geometry
          //maybe run a geometry merge in future if >1 child has geometry
          if(c.geometry) model = c;
        })
      }
      this.gltf = model;
      window.gltf = model;
      this.geometries = this.makeGeometries(model.geometry);
      this.createInstancesMesh();
    });
    
  },
  
  makeGeometries: function ( geometry) {

  //const instanceCount = material.userData.instanceCount;
  const instanceCount = this.data.count;
  const instanceID = new THREE.InstancedBufferAttribute(
    new Float32Array( new Array( instanceCount ).fill( 0 ).map( ( _, index ) => index ) ),
    1
  );

  geometry = new THREE.InstancedBufferGeometry().copy( geometry );
  geometry.setAttribute( 'instanceID', instanceID );
  geometry.maxInstancedCount = instanceCount;

  return geometry;

},
  
createInstancesMesh: function() {
    
    var data = this.data;
    var el = this.el;

    var count = this.data.count;

    var mesh = new THREE.Mesh(this.geometries, this.gltf.material);
    mesh.frustumCulled = false;
    this.instances = mesh;
    window.instances = mesh;
    el.setObject3D("mesh", mesh);
    el.emit("instances-loaded", { format: "mesh", model: mesh });
    this.distribute();
  },
  
  distribute: function(){
    const self = this;
    self.dummy = new THREE.Object3D();
    for ( var i = 0; i < this.data.count; i ++ ) {

				self.dummy.position.set( 20*Math.random() , 20*Math.random, 20);
        //dummy.scale.set( scales[ i ], scales[ i ], scales[ i ] );
        //dummy.lookAt( _normal );
        self.dummy.updateMatrix();
        self.instances.setMatrixAt( i, self.dummy.matrix );

			}
    
    
  },

	tick: function (t,dt) {
    
    
		
	}
  
  
  
  
});
  
AFRAME.registerPrimitive('gltf-instances', {
  defaultComponents: {
    "gltf-instances": {}
  },

  mappings: {
    src: 'gltf-instances.src',
    count: 'gltf-instances.count',
    anim: 'gltf-instances.animation',
    distribution: 'gltf-instances.distribution',
    spacing: 'gltf-instances.spacing'
  }
});  
  
  
  
  
  
  
  
})()