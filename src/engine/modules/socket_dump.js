import {utils} from './utils'


export const socket = CS1=>{

  
  utils.loadScript('/socket.io/socket.io.js')
  .then(e=>{

  CS1.socket = io()
  
  let s = CS1.socket
    
  s.on('connect',()=>{
    console.log('CS1 Game Server Socket Established.')
      
    if(socket.authid){
      
      socket.emit('reauth',socket.authid);
      socket.id = socket.authid;
      console.log('Emitting reauth!');
      console.log('socket.id : ',socket.id);
      console.log('socket.playerData : ');
      console.log(socket.playerData);
      console.log('socket.lastPlayerData : ');
      console.log(socket.lastPlayerData);
      socket.isInitialized = true;
      
    }else{
      
      socket.playerData = {position:{},rotation:{},faceIndex:0};
      socket.lastPlayerData = {position:{},rotation:{},faceIndex:0};
      //REVISIT
      CS1.login = (un,pw)=>{
          socket.emit('login',{name:un,pw:pw});
        }  
      
    }
    
    
    
  })
    
  s.on('login-results',data=>{
    //console.log(data);
    if(data.success) {
      document.querySelector('#login').style.zIndex = -1;
      document.querySelector('#login').style.display = 'none'; 
      document.querySelector('#login').setAttribute('hidden','');
      CS1.myPlayer.name = data.name;
      CS1.game.start();
      s.authid=s.id;
    }
    else document.getElementById('login-msg').innerHTML = data.msg;
  });
  
  s.on('anim', data=>{
    if(CS1.otherPlayers[data.id]){
      
      CS1.otherPlayers[data.id].isWalking = (data.anim=='walk');
      if(CS1.otherPlayers[data.id].avatarType===1)
        CS1.otherPlayers[data.id].firstElementChild.setAttribute('animation-mixer',`clip:${data.anim}`);
      
    }
  });
  
  s.on('avatar', data=>{
    if(CS1.otherPlayers[data.id])
      CS1.otherPlayers[data.id].components.player.setAvatar(data.avatar);
  });
    
  s.on('disconnect', ()=>{
    console.log('I have disconnected.');
    //s.isInitialized = false;
  });
  
  s.initializePlayerData = playerData=>{
    s.isInitialized = true;
    s.playerData = playerData;
    s.playerData.faceIndex = 0;
    s.emit('new-player', playerData);
  }
  
  s.setPlayerData = playerData=>{
    s.playerData = Object.assign({},playerData);
  }
  
  s.on('new-player', newPlayerObject=>{
    if(CS1.debug)console.log('New player object received: ', newPlayerObject);
    if(CS1.game.hasBegun && newPlayerObject.id != CS1.socket.id) {
      setTimeout(()=>{CS1.say(`${newPlayerObject.name} has joined the game!`)},1000);
      CS1.__addOtherPlayer(newPlayerObject);
    }
  });
  
  s.on('initial-bodies-state', data=>{
    if(CS1.debug){
      console.warn('SETTING INITIAL BODIES STATE');
      console.log(data);
    }
    CS1.__updateGrabbables(data);
  });
  
  s.sendUpdateToServer = ()=>{
    
    
    if(!AFRAME.utils.deepEqual( s.lastPlayerData , s.playerData )){
      
      
      s.emit('send-update',s.playerData);
      
      s.lastPlayerData = Object.assign({},s.playerData);
      
      let bodiesData = [];
      for(var name in CS1.grabbables){
        let b = CS1.grabbables[name];
        if(b.states.includes("moving") || b.dirty){
          let d = {
            name: name,
            position: b.object3D.position,
            scale: b.object3D.scale,
            rotation: { 
              x: b.object3D.quaternion.x,
              y: b.object3D.quaternion.y,
              z: b.object3D.quaternion.z,
              w: b.object3D.quaternion.w,
            },
            soundState: b.soundState
          };
          b.dirty = false;
          bodiesData.push(d);
        }
      }
      if(bodiesData.length > 0) {
        s.emit('update-bodies',bodiesData);
        if(CS1.debug){
          console.log(`SENDING ${bodiesData[0].name} DATA TO SERVER`);
          console.log(bodiesData);
        } 
      }
      
      
      
    }
    

    
  }
  
  s.on('players-already-here', o=>{
    if(CS1.debug){
      console.log('receiving players already here');
      console.log(o);
    }
    Object.keys(o).forEach(function(key,index) {
      CS1.__addOtherPlayer({"id":key,
        "name":o[key].name,
        "data":{"position": o[key].position,
                "rotation": o[key].rotation,
                "faceIndex":o[key].faceIndex}
        });
    });
    setTimeout(()=>{CS1.say(CS1.game.announcements.welcome);},CS1.game.welcomeDelay);
  });
  
  s.on('request-for-bodies', ()=>{
  let ibs = {};
  for(name in CS1.grabbables){
    if (!CS1.grabbables.hasOwnProperty(name)) continue;
    let b = CS1.grabbables[name];
    ibs[name] = {
          name: name,
          position: b.object3D.position,
          scale: b.object3D.scale,
          rotation: { 
            x: b.object3D.quaternion.x,
            y: b.object3D.quaternion.y,
            z: b.object3D.quaternion.z,
            w: b.object3D.quaternion.w,
          },
          soundState: b.soundState
        };
  }
    s.emit('initial-bodies-state',ibs);
    if(CS1.debug){
      console.warn('SENDING INITIAL BODIES STATE TO SERVER');
      console.log(ibs);
    }
});
  
  s.on('update-bodies', grabbablesData=>{
    if(CS1.game.hasBegun)CS1.__updateGrabbables(grabbablesData);
  });
  
  s.on('update-players', playersObject=>{
    if(CS1.game && CS1.game.hasBegun)CS1.__updateOtherPlayers(playersObject);
  });

  s.on('remove-player',id=>{
    if(CS1.game.hasBegun && CS1.otherPlayers[id]){
      let name = CS1.otherPlayers[id].name;
      CS1.__removePlayer(id);
      setTimeout(()=>{CS1.say(`${name} ${config.playerLeftMsg}`)},1500);
    }
  });
  
  s.on('msg',data=>{
    if(CS1.game.hasBegun)CS1.__setPlayerMessage(data);
  });
  
  s.on('failed-socket',()=>{
    window.location.reload();
  });
  
  s.on('log',msg=>{console.log(msg)});
  
  s.on('say',data=>{
    CS1.say(data.msg,data.name);
  });
  
    
    
    

  })

}