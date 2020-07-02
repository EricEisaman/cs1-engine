const addon = {
  name: 'addon',
  init: (socket,state) => {
  
   const self = addon; 
   self.socket = socket;
   self.state = state;
   

        
  }
  
}
module.exports = addon; 