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
  
    const data = this.data;
    this.dummy = new THREE.Object3D();
    const self = this;
    const loader = new THREE.GLTFLoader();

		loader.load( data.src , function ( gltf ) {
      
    console.log('MODEL LOADED');

		const o1 = gltf.scene.getObjectByName( 'clock' );
    self.el.o1 = o1;
		
    const o1geo = new THREE.InstancedBufferGeometry();

		THREE.BufferGeometry.prototype.copy.call( o1geo , o1.geometry );
    
    const defaultTransform = new THREE.Matrix4()
					.makeRotationX( Math.PI/2 )
					.multiply( new THREE.Matrix4().makeScale( 0.1 , 0.1, 0.1 ) );

		o1geo.applyMatrix( defaultTransform );

		const o1mat = o1.material;

// 		// Assign random colors to the blossoms.
// 		const _color = new THREE.Color();
// 		const color = new Float32Array( data.count * 3 );
// 		const o1Palette = [ 0xF20587, 0xF2D479, 0xF2C879, 0xF2B077, 0xF24405 ];

// 		for ( var i = 0; i < data.count; i ++ ) {

// 			_color.setHex( o1Palette[ Math.floor( Math.random() * o1Palette.length ) ] );
// 			_color.toArray( color, i * 3 );

// 		}

// 		o1geo.setAttribute( 'color', new THREE.InstancedBufferAttribute( color, 3 ) );
// 		o1mat.vertexColors = true;

		const o1mesh = new THREE.InstancedMesh( o1geo, o1mat, data.count );

		// Instance matrices will be updated every frame.
		o1mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
      

		for ( var i = 0; i < data.count; i ++ ) {

				self.dummy.position.set( 20*Math.random() , 20*Math.random, 20);
        //dummy.scale.set( scales[ i ], scales[ i ], scales[ i ] );
        //dummy.lookAt( _normal );
        self.dummy.updateMatrix();
        o1mesh.setMatrixAt( i, self.dummy.matrix );

			}
    

		self.el.sceneEl.object3D.add(o1mesh);
		//animate();
    window.mesh = o1mesh;
               
  })
    
  },
  
  setup: function(){
    
    
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