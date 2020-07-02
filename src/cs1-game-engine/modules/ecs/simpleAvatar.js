export const simpleAvatar = (()=>{


AFRAME.registerComponent('simpleavatar', {

	schema: {
	  color: {default:'red'},
    cursorType: {default:'cs1-cursor'},
    outline: {default:'yellow'}
	},
  
  init: function(){
    
    
    
  },
  
  update: function(){
    this.createHead();
    this.createBody();
    this.addCursor();
    if(this.data.outline) this.addOutline();
  },
  
  createHead: function(){
    const head = document.createElement('a-box');
    head.setAttribute('color',this.data.color);
    head.setAttribute('scale','0.33 0.5 0.35');
    head.setAttribute('position','0 1.75 0');
    this.el.head = head;
    this.el.appendChild(this.el.head);
  },
  
  createBody: function(){
    const body = document.createElement('a-box');
    body.setAttribute('color',this.data.color);
    body.setAttribute('scale','.6 1 .6');
    body.setAttribute('position','0 .6 0');
    this.el.body = body;
    this.el.appendChild(this.el.body);   
  },
  
  addCursor: function(){
    const cursor = document.createElement(this.data.cursorType);
    this.el.head.appendChild(cursor);
  },
  
  addOutline: function(){
    const self = this
    self.el.head.set('outline',
        `color:${self.data.outline}`,
        'https://raw.githack.com/EricEisaman/aframe-outline/master/dist/aframe-outline.min.js')
      .then(o=>{
          self.el.body.set('outline',`color:${self.data.outline}`)

      });
  },
  
	tick: function () {
    
    this.el.head.object3D.rotation.x = CS1.cam.object3D.rotation.x;
    //this.el.head.object3D.rotation.y = CS1.cam.object3D.rotation.y%Math.PI;
        
	}
  
});
  
  
AFRAME.registerPrimitive('simple-avatar', {
  defaultComponents: {
    simpleavatar:{}
  },

  mappings: {
    color: 'simpleavatar.color',
    cursorType: 'simpleavatar.cursorType',
    outline: 'simpleavatar.outline'
  }
});
  
  
  
})()