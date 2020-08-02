import {Pastel} from './themes/Pastel'
import {Neon} from './themes/Neon'

export const Design = {
  
  Themes : {

    Pastel : Pastel,
    Neon : Neon
    
  },
  
  setTheme : function(theme){
    if(typeof theme=='object'){
     CS1.Design.Theme = theme;
     CS1.Scene.dispatchEvent(new Event('theme-change'))
     if(theme.name)CS1.Design.addTheme(theme)
     else {
       theme.name = Object.keys(CS1.Design.Themes).length
       CS1.Design.addTheme( theme , theme.name ) 
     }
    }else if(typeof theme=='string' && CS1.Design.Themes[theme]){
      CS1.Design.Theme = CS1.Design.Themes[theme]
      CS1.Scene.dispatchEvent(new Event('theme-change'))
    }
    
  },
  
  Theme : Pastel,
  
  addTheme: function(theme ,name){
    if(theme.name)CS1.Design.Themes[theme.name]=theme;
    else if(name) CS1.Design.Themes[name]=theme;
  },
  
}


