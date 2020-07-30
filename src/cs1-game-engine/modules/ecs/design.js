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
		color: {default:''},
    compParams : {default: []} // [ componentName , { param1 : themekey , param2 :themekey }]
	},
  
  init: function(){
    
   this.system.register(this);
    
  },
  
  update: function () {
    const themeKeys = Object.keys(CS1.Design.Theme)
    let themeSettings = {}
    if(this.data.compParams.length==2){
      Object.keys(this.data.compParams[1]).forEach(key=>{
        themeSettings[key]=CS1.Design.Theme[this.data.compParams[1][key]]
      })
      
      this.el.set( this.data.compParams[0], themeSettings )
      
      
    }
    else if(themeKeys.includes(this.data.color)){
      this.el.setAttribute('color', CS1.Design.Theme[this.data.color])
    }else{
      this.el.object3D.traverse(o=>{
        if(  (o.type=='Mesh' || o.type=='SkinnedMesh')     &&     themeKeys.includes(o.material.name)){
          o.material.color.set(CS1.Design.Theme[o.material.name])
          if(o.type=='SkinnedMesh'){
            o.frustumCulled=false
            o.material.frustumCulled=false
          }
        }
      })
    }
    
  },
  
  remove: function () {
    this.system.deRegister(this)
  },

	tick: function () {
		
	}
  
});  
  

})()