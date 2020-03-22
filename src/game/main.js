document.body.addEventListener('cs1-ready', e=>{
 
  const box = document.createElement('a-box')
  box.setAttribute('color','blue')
  box.object3D.position.set(0,2,-4)
  CS1.scene.appendChild(box)
  
})