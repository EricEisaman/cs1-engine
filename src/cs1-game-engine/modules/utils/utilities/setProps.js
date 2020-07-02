export const setProps = (entityOrObj,newPropsObj)=>{
  
if(typeof entityOrObj=='object'){
  Object.keys(newPropsObj).forEach(propName=>{
    if(entityOrObj.data && entityOrObj.data[propName]){
      entityOrObj.data[propName]=newPropsObj[propName]
    }else if(entityOrObj.isEntity){
      entityOrObj.setAttribute(propName,newPropsObj[propName])
    }else{
      entityOrObj[propName]=newPropsObj[propName]
    }
  })
}else{
  console.log('setProps first param must be an an object.')
}
  
  
}