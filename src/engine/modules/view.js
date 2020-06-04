import {firstPerson} from './firstPerson'
import {thirdPerson} from './thirdPerson'
import {omnicientPerson} from './omnicientPerson'

export const view = {
  
  set: function(viewType){
    console.log('Setting game view.')
    switch(viewType){
      case 'THIRD_PERSON': 
        thirdPerson.init();
        return thirdPerson
        break;
      case 'FIRST_PERSON': 
        firstPerson.init();
        return firstPerson
        break;
      case 'OMNICIENT_PERSON': 
        omnicientPerson.init();
        return omnicientPerson;
        break;
    }
    
  }
  
  
}
  




