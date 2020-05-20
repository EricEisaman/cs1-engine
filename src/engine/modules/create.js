import {libmap} from './libmap';

export const create = (()=>{
  
CS1.create = function(name,url){
  
  if(Object.keys(AFRAME.primitives.primitives).includes(name)){
    return document.createElement(name);
  }else if(Object.keys(libmap).inculdes(name)){
    //asynch load using libmap url
    CS1.utils.loadScript(libmap.name)
    .then(e=>{
        try{
         return document.createElement(name);
        } catch(err){
          console.warn(`Failed to create ${name}!`);
          console.error(err);
        }
      }) 
  }else{
    if(!url)return;
    CS1.utils.loadScript(url)
    .then(e=>{
        try{
         return document.createElement(name);
        } catch(err){
          console.warn(`Failed to create ${name}!`);
          console.error(err);
        }
      }) 
  }
  
}




})()