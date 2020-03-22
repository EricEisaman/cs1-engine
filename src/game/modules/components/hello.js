export default(()=>{

AFRAME.registerComponent('hello', {
  schema: {
	  console: {default: true}
  },
  
  init: function(){
    const text = document.createElement('a-text')
    text.setAttribute('value','Hello')
    text.object3D.position.set(0, 2, -4)
    CS1.scene.appendChild(text)
    
  }
});
  
})()