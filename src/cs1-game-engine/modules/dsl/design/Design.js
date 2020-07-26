import {Pastel} from './specs/Pastel'

export const Design = {
  
  Specs : {

    Pastel : Pastel
    
  },
  
  setSpec : function(spec){
    CS1.Design.Spec = spec;
  },
  
  setSpecByName: function(name){
    CS1.Design.Spec = CS1.Design.Specs[name]
  },
  
  Spec : Pastel,
  
  addSpec: function(name,spec){
    CS1.Design.Specs[name]=spec;
  },
  
}


