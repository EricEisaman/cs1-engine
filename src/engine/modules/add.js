export const add = (()=>{
  
  
function addEntity(el){
  if(document.readyState!='loading'){
      CS1.scene.appendChild(el);
  }else{
    console.log('Adding to entity cache!');
    if(typeof CS1._entityCache == 'undefined'){
      CS1._entityCache = [];
    }
    CS1._entityCache.push(el);         
  }
   
  
}
  
CS1.add = (name,config={},url)=>{
  if(   (typeof name) == 'string'  ){
    CS1.create(name,config,url)
    .then(o=>{
      addEntity(o)
    })
  }else{
    addEntity(name)
  }
  
} 


  


  
})()