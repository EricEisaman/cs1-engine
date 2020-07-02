export const setRenderOrder = function(layers='background middleground foreground'){
  
  if(typeof layers == 'string'){
    
    CS1.scene.setAttribute('render-order',layers);
    console.log(`render-order layers set to: ${layers}`)
    
  } else {
    
    console.error('setRenderOrder takes a string of space separated layers.')
    
  }
  
  
}