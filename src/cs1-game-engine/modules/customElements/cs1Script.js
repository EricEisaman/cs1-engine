//The cs1-script element provides a declarative abstraction which hides the complexity of cascading startup events
//It also sets the CS1.scene and related DSL
//SCENE DSL
import {setRenderOrder} from '../dsl/scene/setRenderOrder';

export const cs1Script = (()=>{
    
class cs1Script extends HTMLElement {
  constructor() {
  
    super();
 
    const self = this;
    self.waitFor = [];
    self.waitCount = 0;
    
    self.dclHandler = e => {
      document.removeEventListener('DOMContentLoaded',self.dclHandler)
      let scene = document.querySelector('a-scene');
      let code,scripts;
      if(self && self.innerHTML){
        code = self.innerHTML;
        scripts = document.querySelectorAll('cs1-script');
        const scriptsArray = Array.from(scripts);
        if(scriptsArray.length>1){
          scriptsArray.forEach(s=>{
            const src = s.getAttribute('src');
            if(src) self.waitFor.push(s);
          });
        }
      }
      
      function setLoadHandler()
      {
        scene.addEventListener('loaded', e=>{
            console.log('scene loaded event, cs1-script handler ...')
            CS1.scene.clock.autoStart = false;
            console.log(`cs1-script wait for : ${self.waitFor.length}`);
            if(!CS1.flags.isReady){
              console.log('Dispatching cs1-ready event ...')
              document.body.dispatchEvent( new Event('cs1-ready'))
              CS1.flags.isReady = true;
            }
            if(code){
              if(self.waitFor.length){
                self.waitFor.forEach(s=>{
                  s.addEventListener('cs1-script-fired', e=>{
                    console.log('handling cs1-script-fired event ...')
                    if(++self.waitCount==self.waitFor.length) eval(code)
                    console.log(`cs1-script wait count : ${self.waitCount}`)
                    console.log(`cs1-script wait for : ${self.waitFor.length}`)
                  })
                })
              }else{
                const wrapped = `(async function(){${code}})()`
                eval(wrapped);
              }  
            }else{
              fetch(self.getAttribute('src'))
               .then(res=>res.text())
               .then(t=>{
                  const wrapped = `(async function(){${t}})()`
                  eval(wrapped)
                  self.dispatchEvent( new Event('cs1-script-fired'))
                })
            }
        })
      }
      
      // Add DSL when creating CS1.scene
      if(scene && !CS1.scene)
      {
        console.log('scene detected ...')
        if(!scene.isPlaying){
          CS1.scene = scene;
          CS1.scene.setRenderOrder = setRenderOrder;
          CS1.scene.setRenderOrder();
          console.log('firing scene-ready and setting load handler')
          document.body.dispatchEvent( new Event('scene-ready'))
          setLoadHandler();
        }
      }
      else if(scene && !scene.isPlaying)
      {
        console.log('firing scene-ready and setting load handler')
        document.body.dispatchEvent( new Event('scene-ready'))
        setLoadHandler();
      }
      else if(!scene && !CS1.scene)
      {
        console.log('creating scene ...')
        scene = document.createElement('a-scene');
        document.body.appendChild(scene);
        CS1.scene = scene;
        CS1.scene.setRenderOrder = setRenderOrder;
        CS1.scene.setRenderOrder();
        if(!scene.isPlaying){
          console.log('firing scene-ready and setting load handler')
          document.body.dispatchEvent( new Event('scene-ready'))
          setLoadHandler();
        }
      }
    }
    
    document.addEventListener('DOMContentLoaded', self.dclHandler)
    
    return this;
  } 
}
  
customElements.define('cs1-script', cs1Script);
  
  
  
  
})()