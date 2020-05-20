import {utils} from './utils'


function setup(){
  
  CS1.socket = io()
  
  let s = CS1.socket
    
  s.on('connect',()=>{
    console.log('CS1 Game Server Socket Established.')
      
    if(s.authid){
      
      s.emit('reauth',socket.authid);
      s.id = socket.authid;
      console.log('Emitting reauth!');
      console.log('socket.id : ',s.id);
      console.log('socket.playerData : ');
      console.log(s.playerData);
      console.log('socket.lastPlayerData : ');
      console.log(s.lastPlayerData);
      s.isInitialized = true;
      
    }else{
      
      s.playerData = {position:{},rotation:{},faceIndex:0};
      s.lastPlayerData = {position:{},rotation:{},faceIndex:0};
      //REVISIT
      CS1.game.login = (un,pw)=>{
        s.emit('login',{name:un,pw:pw});
       }  
      
    }
    
    
    
  })
    

  s.on('disconnect', ()=>{
    console.log('I have disconnected.');
  });
  

  s.on('new-player', newPlayerObject=>{
    if(CS1.debug)console.log('New player object received: ', newPlayerObject);
    if(CS1.game.hasBegun && newPlayerObject.id != CS1.socket.id) {
      setTimeout(()=>{CS1.say(`${newPlayerObject.name} has joined the game!`)},1000);
      CS1.__addOtherPlayer(newPlayerObject);
    }
  });
    
 
  s.on('failed-socket',()=>{
    window.location.reload();
  });
    
  s.on('login-results',data=>{
    if(data.success) {
      //document.querySelector('#login').style.zIndex = -1;
      //document.querySelector('#login').style.display = 'none'; 
      //document.querySelector('#login').setAttribute('hidden','');
      //CS1.myPlayer.name = data.name;
      CS1.scene.clock.start();
      s.authid=s.id;
    }
    else {
       //document.getElementById('login-msg').innerHTML = data.msg;
      console.error(data.msg);
     }
  });
  
  s.on('log',msg=>{console.log(msg)});
  
  s.on('say',data=>{
    CS1.say(data.msg,data.name);
  });
  
    
 
  
  
  
}



if( typeof io=='undefined'){
    
     utils.loadScript('/socket.io/socket.io.js')
      .then(e=>{ setup() })
    
  }else{
    
     setup();
    
  }