export const follow = (()=>{


/* Follows an object around (don't need to be in same space) */

const __tempVector1 = new THREE.Vector3();
const __tempVector2 = new THREE.Vector3();

AFRAME.registerComponent('follow', {

	schema: {
		strength: { default: 0.05 },
		target: { type: 'selector' },
    yFactor: {default: 2},
    zFactor: {default: 3}
	},
  
  init: function(){
    this._euler = new THREE.Euler( 0, 0, 0, 'XYZ' );
    this.cto = this.data.target.object3D;
    this.pp= CS1.MyPlayer.object3D.position;
    this.ctdir = new THREE.Vector3();
    this.matrix = new THREE.Matrix4();
  },

	tick: function (t,dt) {
    
		const usPos = __tempVector1;
		this.el.object3D.getWorldPosition(usPos);
		const targetPos = __tempVector2;
		this.data.target.object3D.getWorldPosition(targetPos);
    
    //Adjust strength based on distance to target and normalize for dt
    //const s = dt/17 * this.data.strength + usPos.distanceTo(targetPos)/700;
    const s = this.data.strength + usPos.distanceTo(targetPos)/700;
    
    const p = this.el.object3D.position;
    
    //Adjust pos.y based on cam look up/down angle
    //Third Person Standard and Mobile
    if(this.data.yFactor){
      const rx = CS1.Cam.object3D.rotation.x
      p.y = targetPos.y - this.data.yFactor*Math.sin(rx) 
    }else{ //Third Person VR
      // this.cto.position.copy( CS1.cam.parentEl.object3D.position) 
      // this.cto.position.z -= this.data.zFactor* Math.cos(CS1.cam.object3D.rotation.y)
      // this.cto.position.x -= this.data.zFactor* Math.sin(CS1.cam.object3D.rotation.y)
      // CS1.myPlayer.lhc.object3D.position.copy( CS1.cam.parentEl.object3D.position) 
      // CS1.myPlayer.rhc.object3D.position.copy( CS1.cam.parentEl.object3D.position) 
      // CS1.myPlayer.lhc.object3D.position.z -= this.data.zFactor* Math.cos(CS1.cam.object3D.rotation.y)
      // CS1.myPlayer.lhc.object3D.position.x -= this.data.zFactor* Math.sin(CS1.cam.object3D.rotation.y)
      // CS1.myPlayer.rhc.object3D.position.z -= this.data.zFactor* Math.cos(CS1.cam.object3D.rotation.y)
      // CS1.myPlayer.rhc.object3D.position.x -= this.data.zFactor* Math.sin(CS1.cam.object3D.rotation.y)
    }
    
		targetPos.sub(usPos).multiplyScalar(s).add(p);

		this.el.setAttribute('position', targetPos);
    //this.el.object3D.lookAt(targetPos);
    
	}
});
  
})()