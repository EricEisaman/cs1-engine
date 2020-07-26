// CS1.Design DSL
import {Design} from '../dsl/design/Design';

export const design = (()=>{
  
AFRAME.registerSystem('design', {

  init: function () {
    CS1.Design = Design;
  },

  
});

})()