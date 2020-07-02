export const setAvatar = function(obj){
  
  if(typeof obj == 'object'){
    
    Object.assign(this.avatarSettings ,obj);
    Object.assign(this.components.player.data.avatar ,obj);
    
  } else {
    
    console.error('setAvatar takes an object.')
    
  }
  
  
}