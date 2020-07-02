//return true/false for success/fail
export const add = function(entityOrName=false,config={}){
  
return new Promise(function(resolve, reject) { 

if(typeof entityOrName == 'string'){
  
  if(AFRAME.primitives.primitives[entityOrName]){
    const el = document.createElement(entityOrName);
    CS1.utils.setProps(el,config);
    CS1.scene.appendChild(el);
    resolve(el);
  }
  else if(CS1.game.templates[entityOrName]){
    const el = CS1.game.templates[entityOrName].cloneNode();
    CS1.utils.setProps(el,config);
    CS1.scene.appendChild(el);
    resolve(el);
  }
  else if(CS1.utils.libMap[entityOrName]){
    CS1.utils.loadScript(CS1.utils.libMap[entityOrName])
    .then(e=>{
      try{
        const el = document.createElement(entityOrName)
        CS1.utils.setProps(el,config);
        CS1.scene.appendChild(el);
        resolve(el);
      } catch(err){
        console.warn(`Failed to create ${entityOrName}!`);
        console.error(err);
        reject(err);
        }
      }) 
  }
  else{
    console.log('CS1.add first parameter strings must point to a registered primitive or template or libmapped primitive.')
  }
  
}
else if(entityOrName.isEntity){
  CS1.utils.setProps(entityOrName,config);
  CS1.scene.appendChild(entityOrName);
  resolve(entityOrName);
}


})
  
 
}
