export const jump = (()=>{
  

AFRAME.registerComponent('jump', {
  schema: {
    speed: {default: 8},
    g: {default: -9.8}
  },
  
  init: function(){
    this.el.isJumping = false;
    this.forwardVelocity = -this.data.speed;
    this.verticalVelocity = 0;
    this.jumpEvent = new Event('jump');
    this.landEvent = new Event('land');
    this.jumpDirection = new THREE.Vector3();
    switch(CS1.device){
      case 'Oculus Quest':
        const lh = CS1.myPlayer.components.player.lh.components["oculus-touch-controls"];
        if(AFRAME.utils.device.checkHeadsetConnected()){
          lh.el.addEventListener('xbuttondown',e=>{
             this.jump();
          });
        }
        break;
      case 'Mobile':
        document.body.addEventListener("touchstart", e => {
              let now = new Date().getTime();
              let timesince = now - this.lastJumpTap;

              if (timesince < 300 && 
                  timesince > 0  &&
                  e.changedTouches[0].pageY > window.innerHeight/2) {
                // double tap
                this.jump();
     
              } else {
                // too much time to be a doubletap
              }
              this.lastJumpTap = new Date().getTime();
            });
        break;
        default:
        document.addEventListener('keydown', e=>{
          if(e.code=='Space' && !this.el.isJumping){
            this.jump();
          }
        });
        break;
    }
    
  },
  
  tick: function(t,dt){
    if(this.el.isJumping){
      this.verticalVelocity+=this.data.g*dt/1000;
      this.el.object3D.position.addScaledVector(this.jumpDirection,this.forwardVelocity*dt/1500);
      this.el.object3D.translateY(this.verticalVelocity*dt/1000);
      if(this.verticalVelocity<0 && this.el.object3D.position.y<=0){
        this.land();
      }
    }
  },
  
  jump: function(s){
    this.cachedAcceleration = this.el.components['wasd-controls'].data.acceleration;
    this.el.components['wasd-controls'].data.acceleration = 0;
    this.el.isJumping = true;
    CS1.cam.object3D.getWorldDirection(this.jumpDirection);
    this.jumpDirection.y = (this.jumpDirection.y>=0)?-0.02:this.jumpDirection.y;
    this.jumpDirection.x /= 2;
    this.jumpDirection.z /= 2;
    this.verticalVelocity = s?s:this.data.speed;
    this.el.dispatchEvent(this.jumpEvent);
  },
  
  land: function(){
    this.el.isJumping = false;
    this.verticalVelocity = 0;
    this.el.object3D.position.y = 0;
    this.el.components['wasd-controls'].data.acceleration = this.cachedAcceleration;
    this.el.dispatchEvent(this.landEvent); 
  },
  
  
});
  
})()