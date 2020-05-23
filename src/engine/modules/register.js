export const register = (()=>{
  
CS1.registerComponent = function(name, def){
  
  AFRAME.registerComponent(name,def);
  
}

CS1.registerPrimitive = function(name,def){
  
  AFRAME.registerPrimitive(name,def);
  
   
}




})()