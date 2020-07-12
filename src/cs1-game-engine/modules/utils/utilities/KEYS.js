onkeydown = onkeyup = function(e){
  e = e || event; // to deal with IE
  if(e.type == 'keydown'){
    
    
      if(KEYS[e.code] && KEYS[e.code].isDown){
        document.body.dispatchEvent(new CustomEvent("cs1keydown", {
          detail: {
            event: e 
          }
        }))
      } else {
        if(!KEYS[e.code])KEYS[e.code]={isKey:true}
        KEYS[e.code].isDown = true;
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
    
    KEYS[e.code].isDown = false; 
    document.body.dispatchEvent(new CustomEvent("cs1keyup", {
        detail: {
          event: e 
        }
      }))
  }
   
}

export const KEYS = {}

KEYS.down = function(){
  
  let a = []
  Object.keys(KEYS).forEach(key => {
    if(KEYS[key].isKey && KEYS[key].isDown) a.push(key)
  })
  return a
  
}

KEYS.registerCombo = function(name,keys,callback){
  
  /* Not implemented
     will execute callback then dispatch event with given name
     will add combo to KEYS.combos
  
    COMBO {
    
    keys: [],
    
    callback: function
    
    }
  
  */
  
}
  
  
