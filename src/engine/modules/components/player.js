export const player = (()=>{

AFRAME.registerComponent('player', {
  schema: {
	  avatar: {default: 'Mel'},
    me: {default: false}
  },
  
  init: function(){
    if(this.data.me){
      console.log('Adding my-player');
      this.el.setAttribute('id','my-player');
      this.el.setAttribute('wasd-controls','acceleration:250');
      this.addCamTarget();
    }
    this.addAvatar();
    this.cam = document.querySelector('[camera]');
  },
  
  addAvatar: function(){
    const avatar = document.createElement('a-box');
    avatar.setAttribute('color','red');
    avatar.setAttribute('id','my-avatar');
    avatar.object3D.position.y = 0.5;
    this.el.appendChild(avatar);
    this.el.avatar = avatar;
  },
  
  addCamTarget: function(){
    const camTarget = document.createElement('a-entity');
    camTarget.object3D.position.set(0,3,4);
    camTarget.setAttribute('id','cam-target');
    camTarget.togglePos = this.togglePos;
    this.el.appendChild(camTarget);
    this.el.camTarget = camTarget;
  },
  
  togglePos: function(){
    if(CS1.myPlayer.camTarget.object3D.position.y==3){
      CS1.myPlayer.camTarget.object3D.position.set(0,0.5,1);
      CS1.myPlayer.avatar.setAttribute('material', 'transparent: true; opacity: 0.2')
    }else{
      CS1.myPlayer.camTarget.object3D.position.set(0,3,4);
      CS1.myPlayer.avatar.setAttribute('material', 'transparent: false; opacity: 1.0')
    }
  },
    
  tick: function(t,dt){
    this.el.object3D.rotation.y = this.cam.object3D.rotation.y;
  }
  
});
  
  
AFRAME.registerPrimitive('a-player', {
  defaultComponents: {
    player: {me:true}
  },

  mappings: {
    avatar: 'player.avatar',
    me: 'player.me'
  }
});

  
  
  
})()