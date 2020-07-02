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
      console.log('my-avatar-ready')
      document.body.dispatchEvent( new Event('my-avatar-ready'))
    })
  },

  createHead: function (data) {
    switch(data.head){
      case 'box':
        const head = document.createElement('a-box');
        head.setAttribute('color',data.color);
        head.setAttribute('scale','0.33 0.5 0.35');
        head.setAttribute('position','0 1.75 0');
        return head;
        break;
      default:
        if(CS1.utils.isValidURL(data.head)){
          const head = document.createElement('a-gltf-model');
          head.setAttribute('src',data.head)
          head.setAttribute('position','0 1.75 0');
          return head;
        }else{
          console.error('Avatar head data must be either box or a valid model URL.')
        }
    }
  },
  
  createBody: function (data) {
    switch(data.body){
      case 'box':
        const body = document.createElement('a-box');
        body.setAttribute('color',data.color);
        body.setAttribute('scale','.6 1 .6');
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
    avatar.el.head.set('outline',
        `color:${avatar.data.outline}`,
        'https://raw.githack.com/EricEisaman/aframe-outline/master/dist/aframe-outline.min.js')
      .then(o=>{
          avatar.el.body.set('outline',`color:${avatar.data.outline}`)
      });
  },
  
  addCursor: function (avatar) {
    const cursor = document.createElement(avatar.data.cursortype);
    avatar.el.head.appendChild(cursor);
  }
  
});


AFRAME.registerComponent('cs1avatar', {

	schema: {
		type: {default: 'simple'},
    cursortype: {default: 'cs1-cursor'},
    head: {default: 'box'},
    body: {default: 'box'},
    color: {default: 'red'},
    outline: {default: 'yellow'}
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
          this.system.addOutline(this);
          this.system.addCursor(this)
          break;
        
      }
  
  },

	tick: function () {
		this.el.head.object3D.rotation.x = CS1.cam.object3D.rotation.x;
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