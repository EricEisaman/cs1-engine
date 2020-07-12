import {FirstPerson} from './FirstPerson'
import {ThirdPerson} from './ThirdPerson'
import {OmnicientPerson} from './OmnicientPerson'

export const View = {
  
  set: function(viewType){
    console.log('Setting game view.')
    switch(viewType){
      case 'THIRD_PERSON': 
        ThirdPerson.init();
        return ThirdPerson
        break;
      case 'FIRST_PERSON': 
        FirstPerson.init();
        return FirstPerson
        break;
      case 'OMNICIENT_PERSON': 
        OmnicientPerson.init();
        return OmnicientPerson;
        break;
    }
    
  }
  
  
}
  




