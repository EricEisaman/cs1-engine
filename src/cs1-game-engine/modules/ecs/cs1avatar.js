export const cs1avatar = (()=>{
  
AFRAME.registerSystem('cs1avatar', {
  schema: {},  // System schema. Parses into `this.data`.

  init: function () {
    
    console.log('initializing cs1avatar system, waiting for game-start to proceed')
    
    document.body.addEventListener('game-start',e=>{
      CS1.myPlayer.avatar = document.createElement('cs1-avatar')
      const s = CS1.myPlayer.avatarSettings;
      CS1.myPlayer.avatar.setAttribute('type', s.type)
      CS1.myPlayer.avatar.setAttribute('cursortype', s.cursortype)
      CS1.myPlayer.avatar.setAttribute('head', s.head)
      CS1.myPlayer.avatar.setAttribute('body', s.body)
      CS1.myPlayer.avatar.setAttribute('color', s.color)
      CS1.myPlayer.avatar.setAttribute('outline', s.outline)
      CS1.myPlayer.appendChild(CS1.myPlayer.avatar)
      CS1.log('my-avatar-ready')
      document.body.dispatchEvent( new Event('my-avatar-ready'))
    })
  },

  createHead: function (data) {
    let head;
    switch(data.head){
      case 'box':
        head = document.createElement('a-box');
        head.setAttribute('color',data.color);
        head.setAttribute('scale','0.35 0.6 0.37');
        head.setAttribute('position','0 1.75 0');
        head.rxFactor = 1;
        return head;  
        break;
      case 'oval':
        head = document.createElement('a-sphere');
        head.setAttribute('color',data.color);
        head.setAttribute('scale','0.28 0.4 0.3');
        head.setAttribute('position','0 1.75 0');
        head.rxFactor = 1;
        return head;
        break;
      default:
        if(CS1.utils.isValidURL(data.head)){
          const head = document.createElement('a-gltf-model');
          head.setAttribute('src',data.head)
          head.setAttribute('position','0 1.75 0');
          head.setAttribute('rotation','0 180 0');
          head.rxFactor = -1;
          return head;
        }else{
          console.error('Avatar head data must be either box or a valid model URL.')
        }
    }
  },
  
  createBody: function (data) {
    let body;
    switch(data.body){
      case 'box':
        body = document.createElement('a-box');
        body.setAttribute('color',data.color);
        body.setAttribute('scale','.6 1 .6');
        body.setAttribute('position','0 .6 0');
        return body;
        break;
      case 'oval':
        body = document.createElement('a-sphere');
        body.setAttribute('color',data.color);
        body.setAttribute('scale','.4 .6 .4');
        body.setAttribute('position','0 .6 0');
        return body;
        break;
      default:
        if(CS1.utils.isValidURL(data.body)){
          const body = document.createElement('a-gltf-model');
          body.setAttribute('src',data.body)
          body.setAttribute('position','0 .6 0');
          return body;
        }else{
          console.error('Avatar body data must be either box or a valid model URL.')
        }
    }
  },
  
  addOutline: function (avatar) {
    if(avatar.el.head.rxFactor == -1)return
    avatar.el.head.set('outline',
        `color:${avatar.data.outline}`,
        'https://raw.githack.com/EricEisaman/aframe-outline/master/dist/aframe-outline.min.js')
      .then(o=>{
          avatar.el.body.set('outline',`color:${avatar.data.outline}`)
      });
  },
  
  addCursor: function (avatar) {
    
    let cursor;
    switch(avatar.data.type){
      case 'simple':
        cursor = document.createElement(avatar.data.cursortype);
        cursor.setAttribute('position',`0 0 ${-.5*avatar.el.head.rxFactor}`);
        if(avatar.el.head.rxFactor == -1)cursor.setAttribute('rotation','0 180 0');
        avatar.el.head.appendChild(cursor);
        break;
      case 'rigged':
        cursor = document.createElement(avatar.data.cursortype);
        if(avatar.camRotXObject.type == 'Bone'){
          avatar.el.cursor = cursor;
        }
        cursor.setAttribute('position',`0 1.6 .5`);
        cursor.setAttribute('rotation','0 180 0');
        avatar.el.modelEntity.appendChild(cursor);
        
        break;
        
        
        
    }    
        
        
  },
  
  createModel: function (data) {
    const model = document.createElement('a-gltf-model');
    model.setAttribute('rotation','0 180 0');
    model.setAttribute('src', data.url);
    model.setAttribute('animation-mixer', 'clip:idle');
    return model;
  },
  
  addAnimationControls: function(myAvatar){
    
    CS1.myPlayer.setAnimation = e=>{}
    
    if(CS1.device=='Standard'){
      
    CS1.myPlayer.setAnimation = clipName=>{
      myAvatar.setAttribute('animation-mixer',`clip:${clipName}`)
    }  
      
    document.body.addEventListener('keydown',e=>{
         switch(e.code){
           case 'KeyW':
             if(!CS1.myPlayer.isWalking){
               CS1.myPlayer.setAnimation('walk')
               CS1.myPlayer.isWalking=true;    
             }
             break;
            case 'KeyS':
             if(!CS1.myPlayer.isWalking){
               CS1.myPlayer.setAnimation('walk')
               CS1.myPlayer.isWalking=true;    
             }
             break;
         }
      });
      document.body.addEventListener('keyup',e=>{
         switch(e.code){
           case 'KeyW':
             CS1.myPlayer.setAnimation('idle')
             CS1.myPlayer.isWalking=false;
             break;
          case 'KeyS':
             CS1.myPlayer.setAnimation('idle')
             CS1.myPlayer.isWalking=false;
             break;
         }
      });
    }
  
    this.animationControlsApplied = true;
  }
  
  
  
});


AFRAME.registerComponent('cs1avatar', {

	schema: {
		type: {default: 'simple'},
    cursortype: {default: 'cs1-cursor'},
    head: {default: 'box'},
    body: {default: 'box'},
    color: {default: 'red'},
    outline: {default: 'yellow'},
    url: {default: 'https://cdn.glitch.com/41a9cdac-916b-45df-bf58-0ba63c04533e%2FChip.glb?v=1594228449668'},
    animations: {default: []}
	},
  
  init: function(){

  },
  
  update: function () {
    
    switch(this.data.type){
      case 'simple':
        this.el.head = this.system.createHead(this.data);
        this.el.appendChild(this.el.head);
        this.el.body = this.system.createBody(this.data);
        this.el.appendChild(this.el.body);
        if(CS1.device != 'Oculus') this.system.addCursor(this);
        this.system.addOutline(this);
        this.camRotXObject = this.el.head.object3D;
        this.camRotXFactor = this.el.head.rxFactor;
        this.camRotXOffset = 0;
        break;
      case 'rigged':
        this.el.modelEntity = this.system.createModel(this.data);
        this.camRotXObject = this.el.modelEntity.object3D;
        this.camRotXOffset = 0;
        this.camRotXFactor = -0.8;
        this.el.modelEntity.addEventListener('model-loaded',e=>{
          
          this.el.modelEntity.object3D.traverse(o=>{
              o.frustumCulled = false;
              if(o.type=='Bone' && o.name.includes('Neck')){
                this.camRotXObject = o;
                this.camRotXOffset = -Math.PI/2;
                CS1.log('Model Neck bone detected, will animate with camera rotationX.');
              }  
          
          })
          
          this.el.modelEntity.object3D.frustumCulled = false;
          
          if(CS1.device != 'Oculus') this.system.addCursor(this);  
          
        });
        this.el.appendChild(this.el.modelEntity);
        
        
        if(!this.system.animationControlsApplied) this.system.addAnimationControls(this.el.modelEntity);
        
        break;
        
      }
  
  },
  
  

	tick: function () {
		this.camRotXObject.rotation.x = this.camRotXFactor * CS1.cam.object3D.rotation.x + this.camRotXOffset;
    if(this.camRotXObject.type == 'Bone'  && CS1.device != 'Oculus'){
      this.el.cursor.object3D.rotation.x = -this.camRotXFactor * CS1.cam.object3D.rotation.x ;
    }
	}
  
});
  
  
AFRAME.registerPrimitive('cs1-avatar', {
  defaultComponents: {
    cs1avatar:{}
  },

  mappings: {
    type: 'cs1avatar.type',
    cursortype: 'cs1avatar.cursortype',
    head: 'cs1avatar.head',
    body: 'cs1avatar.body',
    color: 'cs1avatar.color',
    outline: 'cs1avatar.outline',
  }
});
  
  
  
  
  
})()