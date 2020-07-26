import {Pastel} from './themes/Pastel'

export const Design = {
  
  Themes : {

    Pastel : Pastel
    
  },
  
  setTheme : function(theme){
    CS1.Design.Theme = theme;
  },
  
  setThemeByName: function(name){
    CS1.Design.Theme = CS1.Design.Themes[name]
  },
  
  Theme : Pastel,
  
  addTheme: function(name,theme){
    CS1.Design.Themes[name]=theme;
  },
  
}


