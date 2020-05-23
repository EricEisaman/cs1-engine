import {libmap} from './libmap';

export const create = (()=>{
  
CS1.create = function(name,url){
  
return new Promise(function(resolve, reject) {

if(Object.keys(AFRAME.primitives.primitives).includes(name)){
    resolve(document.createElement(name));
}else if(Object.keys(libmap).includes(name)){
 
  CS1.utils.loadScript(libmap[name])
  .then(e=>{
    try{
      console.log(`Returning result of document.createElement(${name})`);
      resolve(document.createElement(name));
    } catch(err){
      console.warn(`Failed to create ${name}!`);
      console.error(err);
      reject(err);
      }
    }) 
}else{
    if(!url)return;
    CS1.utils.loadScript(url)
    .then(e=>{
        try{
         resolve(document.createElement(name));
        } catch(err){
          console.warn(`Failed to create ${name}!`);
          console.error(err);
          reject(err);
        }
      }) 
}
  
  
})
  
  
  

}
  
})()