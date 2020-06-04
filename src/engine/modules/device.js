import {mobile} from './mobile'
import {oculus} from './oculus'
import {standard} from './standard'

export const device = {
  
  adapt: function(){
    
    // Object.keys(AFRAME.utils.device).forEach(f=>{
    //   const c = AFRAME.utils.device[f]
    //   console.log(f , (typeof c =='function')?c():c);
    // })
    console.log('Checking device type.')
    if(AFRAME.utils.device.isOculusBrowser()){
      oculus.init()
    } 
    else if(AFRAME.utils.device.isMobile()){
      mobile.init() 
    } 
    else {
      standard.init() 
    }
    
  }
  
  
}
  




