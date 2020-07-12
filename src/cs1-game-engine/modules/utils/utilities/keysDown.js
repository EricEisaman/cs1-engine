Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


onkeydown = onkeyup = function(e){
  e = e || event; // to deal with IE
  if(e.type == 'keydown'){
    if(!keysDown.includes(e.code)){
      keysDown.push(e.code) 
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
    }else{
      document.body.dispatchEvent(new CustomEvent("cs1keydown", {
        detail: {
          event: e 
        }
      }))
    }   
  }else{
    keysDown.remove(e.code) 
    document.body.dispatchEvent(new CustomEvent("cs1keyup", {
        detail: {
          event: e 
        }
      }))
  }
   
}

export const keysDown = []


  
  
