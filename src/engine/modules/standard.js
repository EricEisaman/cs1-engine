export const standard = {
  
  init: function(){
    
    console.log('Initializing standard device.')
    CS1.device = 'Standard'  
    CS1.scene.setAttribute("vr-mode-ui", "enabled: false");
    
    if(CS1.game.view && CS1.game.view.type=='THIRD_PERSON')document.body.addEventListener('keyup', e=>{
        switch(e.code){
          case 'Digit1':
            CS1.game.view.toggle();
            break;
          case 'Digit2':
            break
        }
      })
    
    
  }
  

}