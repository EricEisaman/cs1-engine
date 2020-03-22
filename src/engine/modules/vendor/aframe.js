import utils from '../utils.js'

export default(()=>{
  
  
 window.addEventListener('DOMContentLoaded', e => {
    utils.loadScript('https://aframe.io/releases/1.0.4/aframe.min.js',e=>{
      document.body.dispatchEvent(new Event('aframe-ready'))
      console.log('AFRAME READY')
     })
  });

 
  
})()