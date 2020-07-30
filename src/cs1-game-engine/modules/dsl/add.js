export const add = function(param=false,config={}){
  
  return new Promise(function(resolve, reject) { 
  
  if(typeof param == 'string'){
    
    if(AFRAME.primitives.primitives[param] || (param=='a-entity')    ){
      const el = document.createElement(param);
      if(typeof config == 'string')
        el.setAttribute('position', config)
      else
        CS1.Utils.setProps(el,config);
      CS1.Scene.appendChild(el);
      resolve(el);
    }
    else if(CS1.Game.Templates[param]){
      const el = CS1.Game.Templates[param].cloneNode();
      if(typeof config == 'string')
        el.setAttribute('position', config)
      else
        CS1.Utils.setProps(el,config);
      CS1.Scene.appendChild(el);
      resolve(el);
    }
    else if(CS1.Utils.LibMap[param]){
      CS1.Utils.loadScript(CS1.Utils.LibMap[param])
      .then(e=>{
        try{
          const el = document.createElement(param)
          if(typeof config == 'string')
            el.setAttribute('position', config)
          else
            CS1.Utils.setProps(el,config);
          CS1.Scene.appendChild(el);
          resolve(el);
        } catch(err){
          console.warn(`Failed to create ${param}!`);
          console.error(err);
          reject(err);
          }
        }) 
    }
    else if(CS1.Utils.isValidURL(param)){
      const el = document.createElement('a-gltf-model');
      el.setAttribute('src', param);
      if(typeof config == 'string')
        el.setAttribute('position', config)
      else
        CS1.Utils.setProps(el,config);
      el.addEventListener('model-loaded',e=>{     
              el.object3D.traverse(o=>{
                  if(o.animations){
                    el.Animation = {Clips:{}}
                    o.animations.forEach(animation=>{
                      el.Animation.Clips[animation.name] = animation
                    })
    
                    el.Animation.set = clipName=>{
                      if(el.Animation  && el.Animation.Clips[clipName] ){
                         el.setAttribute('animation-mixer',`clip:${clipName}`)
                         el.Animation.current = clipName; 
                        }
                      } 

                    el.Animation.pause = e =>{
                        el.components['animation-mixer'].pause();
                      }

                    el.Animation.play = e =>{
                        el.components['animation-mixer'].play();
                        if(e)el.Animation.set(e);
                      }
                    
                    el.Animation.set(Object.keys(el.Animation.Clips)[0])
                  }
              })         
            });
      CS1.Scene.appendChild(el);
      resolve(el);
    }
    else{
      console.log('CS1.add first parameter strings must point to a registered primitive,template,libmapped primitive, or .glb URL.')
    }
    
  }
  else if(param.isEntity){
    CS1.Utils.setProps(param,config);
    CS1.Scene.appendChild(param);
    resolve(param);
  }
  
  
  })
    
   
  }
  