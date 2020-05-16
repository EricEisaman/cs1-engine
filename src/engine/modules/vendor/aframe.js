import utils from '../utils.js'

export default(()=>{
  
  
 window.addEventListener('DOMContentLoaded', e => {
    utils.loadScript('https://aframe.io/releases/1.0.4/aframe.min.js')
    .then(e=>{
      console.log('AFRAME is loaded.')
    })
  });

 
  
})()