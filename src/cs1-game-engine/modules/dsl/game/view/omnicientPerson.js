export const omnicientPerson = {
  
  type: 'OMNICIENT_PERSON',
  
  init: function(){
    console.log('view-ready')
    document.body.dispatchEvent( new Event('view-ready'))
    
  }
  

}