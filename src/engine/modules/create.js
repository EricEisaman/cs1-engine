export const create = (()=>{
  
CS1.create = function(name,config={},url){
  
return new Promise(function(resolve, reject) {

if(Object.keys(AFRAME.primitives.primitives).includes(name)){
  const el = document.createElement(name)
  Object.keys(config).forEach(p=>{
    el.setAttribute(p,config[p])
  })
  resolve(el);
}else if(Object.keys(CS1.utils.libmap).includes(name)){
 
  CS1.utils.loadScript(CS1.utils.libmap[name])
  .then(e=>{
    try{
      const el = document.createElement(name)
      Object.keys(config).forEach(p=>{
        el.setAttribute(p,config[p])
      })
      resolve(el);
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
          const el = document.createElement(name)
          Object.keys(config).forEach(p=>{
            el.setAttribute(p,config[p])
          })
          resolve(el);
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