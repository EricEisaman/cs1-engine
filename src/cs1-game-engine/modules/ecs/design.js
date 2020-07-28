// CS1.Design DSL
import {Design} from '../dsl/design/Design';

export const design = (()=>{
  
AFRAME.registerSystem('design', {

  init: function () {
    CS1.Design = Design;
    this.comps = [];
    CS1.Scene.addEventListener('theme-change', e=>{
      this.updateComps()
    })
  },
  
  register: function(comp){
    this.comps.push(comp)
  },
  
  deRegister: function(comp){
    const i = this.comps.indexOf(comp)
    this.comps.splice(i,1)
  },
  
  updateComps: function(){
    this.comps.forEach(comp=>{
      comp.update()
    })
  }

  
});
  
  
AFRAME.registerComponent('design', {

	schema: {
		
	},
  
  init: function(){
    
   this.system.register(this);
    
  },
  
  update: function () {
    const themeKeys = Object.keys(CS1.Design.Theme)
    this.el.object3D.traverse(o=>{
      if(o.type=='Mesh' && themeKeys.includes(o.material.name)){
        o.material.color.set(CS1.Design.Theme[o.material.name])
      }
    })
  },
  
  remove: function () {
    this.system.deRegister(this)
  },

	tick: function () {
		
	}
  
});  
  

})()