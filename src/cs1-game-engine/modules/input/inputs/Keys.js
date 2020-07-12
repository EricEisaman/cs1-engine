onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    if(e.type == 'keydown'){
      
      
        if(Keys[e.code] && Keys[e.code].isDown){
          document.body.dispatchEvent(new CustomEvent("cs1keydown", {
            detail: {
              event: e 
            }
          }))
        } else {
          if(!Keys[e.code])Keys[e.code]={isKey:true}
          Keys[e.code].isDown = true;
          document.body.dispatchEvent(new CustomEvent("cs1keydown", {
            detail: {
              event: e 
            }
          }))
          document.body.dispatchEvent(new CustomEvent("cs1keydownonce", {
            detail: {
              event: e 
            }
          }))
        }
           
  
    }else{
      
      Keys[e.code].isDown = false; 
      document.body.dispatchEvent(new CustomEvent("cs1keyup", {
          detail: {
            event: e 
          }
        }))
    }
     
  }
  
  export const Keys = {}
  
  Keys.down = function(){
    
    let a = []
    Object.keys(Keys).forEach(key => {
      if(Keys[key].isKey && Keys[key].isDown) a.push(key)
    })
    return a
    
  }
  
  Keys.registerCombo = function(name,Keys,callback){
    
    /* Not implemented
       will execute callback then dispatch event with given name
       will add combo to Keys.combos
    
      COMBO {
      
      Keys: [],
      
      callback: function
      
      }
    
    */
    
  }
    
    
  