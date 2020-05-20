export const adapt = (()=>{
  

Object.keys(AFRAME.utils.device).forEach(f=>{
  
  const c = AFRAME.utils.device[f]
  console.log(f , (typeof c =='function')?c():c);
  
  
})




})()