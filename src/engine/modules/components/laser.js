export const laser = (()=>{


AFRAME.registerComponent('laser', {

	schema: {
		offset: {type:'vec3'}
	},
  
  init: function(){
    this.addLaser();
  },
  
  addLaser: function(){
    
  const object3d	= new THREE.Object3D()
	// generate the texture
	const canvas	= generateLaserBodyCanvas()
	const texture	= new THREE.Texture( canvas )
	texture.needsUpdate	= true;
	// do the material	
	const material	= new THREE.MeshBasicMaterial({
		map		: texture,
		blending	: THREE.AdditiveBlending,
		color		: 0x4444aa,
		side		: THREE.DoubleSide,
		depthWrite	: false,
		transparent	: true
	})
	const geometry	= new THREE.PlaneGeometry(1, 0.1)
	const nPlanes	= 16;
	for(let i = 0; i < nPlanes; i++){
		const mesh	= new THREE.Mesh(geometry, material)
		mesh.position.x	= 1/2
		mesh.rotation.x	= i/nPlanes * Math.PI
		object3d.add(mesh)
	}
  object3d.rotation.y = Math.PI/2;
	object3d.position.set(this.data.offset.x,this.data.offset.y,this.data.offset.z);
    
  this.addLaserBounce(object3d);  
    
  this.el.setObject3D('laser',object3d);
  
	
	function generateLaserBodyCanvas(){
		// init canvas
		const canvas	= document.createElement( 'canvas' );
		const context	= canvas.getContext( '2d' );
		canvas.width	= 1;
		canvas.height	= 64;
		// set gradient
		const gradient	= context.createLinearGradient(0, 0, canvas.width, canvas.height);		
		gradient.addColorStop( 0  , 'rgba(  0,  0,  0,0.1)' );
		gradient.addColorStop( 0.1, 'rgba(160,160,160,0.3)' );
		gradient.addColorStop( 0.5, 'rgba(255,255,255,0.5)' );
		gradient.addColorStop( 0.9, 'rgba(160,160,160,0.3)' );
		gradient.addColorStop( 1.0, 'rgba(  0,  0,  0,0.1)' );
		// fill the rectangle
		context.fillStyle	= gradient;
		context.fillRect(0,0, canvas.width, canvas.height);
		// return the just built canvas 
		return canvas;	
	}
    
    
    
    
    
    
  },
  
  addLaserBounce: function(object3d){
    

	// for update loop
	let updateFcts	= []
	this.updateLaser	= function(){
		updateFcts.forEach(function(updateFct){
			updateFct()	
		})
	}
	

	// build THREE.Sprite for impact
	const textureUrl	= 'https://cdn.glitch.com/dd22975b-82dc-4009-bd8a-e8122ea8a8de%2Fblue_particle.png?v=1590100318809';
	const texture	= new THREE.TextureLoader().load(textureUrl)	
	const material	= new THREE.SpriteMaterial({
		map		: texture,
		blending	: THREE.AdditiveBlending,
	})
	const sprite	= new THREE.Sprite(material)
	sprite.scale.x = 0.5
	sprite.scale.y = 2;

	sprite.position.x	= 1-0.01
	object3d.add(sprite)

	// add a point light
	const light	= new THREE.PointLight( 0x4444ff);
	light.intensity	= 0.5
	light.distance	= 4
	light.position.x= -0.05
	this.light	= light
	sprite.add(light)

	// to exports last intersects
	this.lastIntersects	= []

	const raycaster	= new THREE.Raycaster()
  raycaster.camera = CS1.cam.object3D.children[0];
	// TODO assume object3d.position are worldPosition. works IFF attached to scene
	raycaster.ray.origin.copy(object3d.position)

	updateFcts.push(e=>{
		// get laserBeam matrixWorld
		object3d.updateMatrixWorld();
		const matrixWorld	= object3d.matrixWorld.clone()
		// set the origin
		raycaster.ray.origin.setFromMatrixPosition(matrixWorld)
		// keep only the roation
		matrixWorld.setPosition(new THREE.Vector3(0,0,0))		
		// set the direction
		raycaster.ray.direction.set(1,0,0)
			.applyMatrix4( matrixWorld )
			.normalize()

		const intersects		= raycaster.intersectObjects( CS1.scene.object3D.children,true );
		if( intersects.length > 0 ){
      
			const position	= intersects[0].point
			const distance	= position.distanceTo(raycaster.ray.origin)
			object3d.scale.x	= distance
      //console.log(`laser custom scale ${distance}`)
      
		}else{
      //console.log('laser default scale 10')
			object3d.scale.x	= 10			
		}
		// backup last intersects
		this.lastIntersects	= intersects
    
	});


    
    
    
    
    
    
  },
  

	tick: function () {
		this.updateLaser();
	}
  
});
  
AFRAME.registerPrimitive('cs1-laser', {
  defaultComponents: {
    laser:{}
  },

  mappings: {
    
  }
}); 
  
  
  
  
  
  
  
  
  
  
  
  

  
  
})()