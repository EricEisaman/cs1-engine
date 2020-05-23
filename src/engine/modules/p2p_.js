import '../../../com/lib/simplepeer';
import ui from "./ui.html";

export default(()=>{

AFRAME.registerComponent('p2p', {
  schema: {
    ringtone: {default:'https://cdn.glitch.com/1c17f551-0c43-4849-b4b8-037e93bc3101%2Fringtone1.mp3?v=1581262788541'}
  },
  
  init: function(){
    const self = this;
    
    self.modeUI = document.createElement('span');
    self.modeUI.innerHTML = ui;
    self.mode = 'video';
    self.peerUI = document.createElement('span');
    self.peerUI.innerHTML = '<h1>👥Choose Peer👥</h1>';
    self.addVRUI();
    self.setupRing();
 
    document.addEventListener('gameStart',e=>{
      
      const hiddenDiv = document.querySelector('#hidden-div');
      hiddenDiv.appendChild(self.modeUI);
      Object.keys(CS1.otherPlayers).forEach(key=>{
        const b = document.createElement('button');
        b.style.width = '20%';
        b.classList = 'menu';
        b.innerHTML = CS1.otherPlayers[key].name;
        b.setAttribute('id',CS1.otherPlayers[key].name);
        self.peerUI.appendChild(b);
      })
      const vidBtn = document.querySelector('#video-call-btn');
      CS1.ui.controls.addHoverSound(vidBtn);
      vidBtn.addEventListener('click', e=>{
        self.mode = 'video';
        self.peerUI.querySelector('h1').innerHTML = '🎥Choose Peer🎥';
        const mainPanel = document.querySelector('#main');
        hiddenDiv.appendChild(mainPanel.firstChild);
        mainPanel.innerHTML = '';
        mainPanel.appendChild(self.peerUI);   
      })
      if(CS1.device=='Oculus Quest')vidBtn.remove();
      const voiceBtn = document.querySelector('#voice-call-btn');
      voiceBtn.addEventListener('click', e=>{
        self.mode = 'voice';
        self.peerUI.querySelector('h1').innerHTML = '🔊Choose Peer🔊';
        const mainPanel = document.querySelector('#main');
        hiddenDiv.appendChild(mainPanel.firstChild);
        mainPanel.innerHTML = '';
        mainPanel.appendChild(self.peerUI);   
      })
      CS1.ui.controls.addHoverSound(voiceBtn);
      

      CS1.p2p = self;
    
      
      CS1.socket.on('offer', d=>{
          

          CS1.log(`P2P offer received from ${d.id}`)
        
          if(!CS1.p2p.busy){
            CS1.p2p.offerData = d;
            CS1.p2p.ring(d);
          } 
   
      })
          

        
      CS1.socket.on('answer', d=>{
        CS1.log(`P2P answer received from player with socket id : ${d.id}`)
        CS1.p2p.peer.signal(d.answer)
      })
      
      function addPeerBtn(name){
        const b = document.createElement('button');
        b.style.width = '20%';
        b.classList = 'menu';
        b.innerHTML = name;
        b.setAttribute('id', name);
        self.peerUI.appendChild(b);
        b.addEventListener('click',e=>{
          if(b.blinking&&CS1.p2p.offerData){
            CS1.p2p.accept(CS1.p2p.offerData);
            CS1.p2p.ringtone.pause();
            CS1.p2p.stopBlink(name);
            CS1.p2p.peerUI.querySelector('h1').innerHTML = (CS1.p2p.mode=='video')?'🎥Choose Peer🎥':'🔊Choose Peer🔊';
          }else{
            CS1.p2p.call(name);
          } 
        })
      }
      
      CS1.socket.on('new-player', o=>{
        if(o.name==CS1.myPlayer.name)return;
        // add ui element
        addPeerBtn(o.name);    
      })
      
      CS1.socket.on('players-already-here', o=>{
        // add ui elements
        Object.keys(o).forEach(key=>{
          addPeerBtn(o[key].name);
        })
      })
      
      CS1.scene.addEventListener('before-remove-player', e=>{
        if(e.detail.player==CS1.myPlayer)return;
        // remove ui element
        const b = CS1.p2p.peerUI.querySelector(`#${e.detail.player.name}`);
        if(b){
          b.remove();
        }
        if(e.detail.player.name==CS1.p2p.nameOfConnection){
          const v = document.getElementById('peer-video');
          if(v)v.remove();  
          if(CS1.p2p.videoEntity)CS1.p2p.videoEntity.remove();
          CS1.p2p.busy = false;
        }
      })
    
      
    })
    
    
    
  },
  
  call: function(name){
        const self = this;
    
       
      
        navigator.getUserMedia({ video: (CS1.p2p.mode=='video'), audio: true }, gotMedia, () => {})
        
    
        function gotMedia (stream) {
          
          CS1.log('Got media stream on the initiator end.')
          CS1.log('Setting peer as new initiator.')
          CS1.p2p.peer = new SimplePeer({
            initiator: true,
            stream: stream,
            trickle: false
          })
          
          // data received from STUN server
          // set timeout for 31 seconds then destroy if no connect made
          CS1.p2p.peer.on('signal', offer => {
            CS1.log(`P2P offer sent to ${name}.`);
            CS1.socket.emit('offer', {name:name,offer:offer,mode:CS1.p2p.mode})
          })
          
          CS1.p2p.busy = true
          
          // handle error in setting up peer
          CS1.p2p.peer.on('error', err => CS1.log('error', err))
          
          CS1.p2p.peer.on('connect', () => {
            const dataToSend = `Thanks for accepting my ${CS1.p2p.mode} connection request.`
            CS1.p2p.peer.send(dataToSend)
            CS1.log(`Sending data: ${dataToSend}`)
          })
          
          CS1.p2p.peer.on('disconnect', () => {
            CS1.p2p.busy = false;
            const v = document.getElementById('peer-video');
            if(v)v.remove(); 
            if(CS1.p2p.videoEntity)CS1.p2p.videoEntity.remove();
          })

          CS1.p2p.peer.on('data', data => {
            CS1.log(`Received data: ${data}`);
            if(data=='deny')CS1.p2p.busy = false
          })
          
          CS1.p2p.peer.on('stream', stream => {
             CS1.p2p.nameOfConnection = name;
             CS1.p2p.handleStream(stream);
          })

          
        } 
          
        
   
    },
  
  ring: function(d){
    // switch main panel to CS1.p2p.peerUI
    CS1.p2p.peerUI.querySelector('h1').innerHTML = (d.mode=='video')?'🎥Peer Calling🎥':'🔊Peer Calling🔊';
    const hiddenDiv = document.querySelector('#hidden-div');
    const mainPanel = document.querySelector('#main');
    hiddenDiv.appendChild(mainPanel.firstChild);
    mainPanel.innerHTML = '';
    mainPanel.appendChild(CS1.p2p.peerUI); 
    // blink the button of the calling peer
    CS1.p2p.blink(CS1.otherPlayers[d.id].name)
    // repeat ringtone
    this.ringtone.play();
    // allow 30 seconds to accept, otherwise stop blink and stop ringtone
    CS1.log(`Ringing notification for call from ${CS1.otherPlayers[d.id].name}.`)
    
    
    //CS1.log('Auto-accepting call.');
    //CS1.p2p.accept(d);
    
  },
  
  accept: function(d){
    
    navigator.getUserMedia({ video: (CS1.p2p.mode=='video'), audio: true }, gotMedia, () => {})
        
    
    function gotMedia (stream) {
      
      
    CS1.log('Setting peer as new responder in accept function.')
    //creating responder peer
    CS1.p2p.peer = new SimplePeer({
      initiator: false,
      stream: stream,
      trickle: false
    })
        
    CS1.p2p.peer.on('error', err => CS1.log('error', err))
          
    CS1.log(`Responder peer now signaling.`)
    CS1.p2p.peer.signal(d.offer)
          
    // print out data received from STUN server
    CS1.p2p.peer.on('signal', answer => {
      CS1.log(`P2P answer sent to player with socket id : ${d.id}`)
      CS1.socket.emit('answer', {id:d.id,answer:answer})
    })
          
    CS1.p2p.peer.on('connect', () => {
      CS1.p2p.busy = true;
      const dataToSend = `I accept the ${d.mode} connection.`
      CS1.log(`Sending P2P data: ${dataToSend}`)
      CS1.p2p.peer.send(dataToSend)
    })
      
    CS1.p2p.peer.on('disconnect', () => {
      CS1.p2p.busy = false;
      const v = document.getElementById('peer-video');
      if(v)v.remove(); 
      if(CS1.p2p.videoEntity)CS1.p2p.videoEntity.remove();
    })
 
    CS1.p2p.peer.on('data', data => {
      CS1.log(`P2P data received: ${data}`)
    })
        
    CS1.p2p.peer.on('stream', stream => {
       CS1.p2p.nameOfConnection = CS1.otherPlayers[d.id].name;
       CS1.p2p.handleStream(stream);
    })
  
         
    }//end gotMedia
       
  },
  
  deny: function(d){
    CS1.p2p.busy = false;
  },
  
  blink: function(name){
    const self = this;
    CS1.log(`Blink ${name} caller button function called.`)
    const btn = document.querySelector(`#${name}`)
    if(btn){
      
      CS1.p2p.busy = true;
      CS1.p2p.blinkId = setInterval(e=>{
        const c = btn.style.backgroundColor;
        btn.style.backgroundColor = (c=='lime')?'black':'lime'
        btn.blinking = true;
      },1000)
      
      setTimeout(e=>{
        if(CS1.p2p.blinkId){
          self.ringtone.pause();
          CS1.p2p.stopBlink(name);
        }
      },30000)
      
    }
    
  },
  
  stopBlink: function(name){
    clearInterval(CS1.p2p.blinkId)
    CS1.p2p.blinkId = false
    const btn = document.querySelector(`#${name}`)
    if(btn){
      btn.style.backgroundColor = 'black';
      btn.blinking = false;
    }
  },
  
  addVRUI: function(){
    const self = this;
    const mainPanel = document.querySelector('#main');
    const m1ul = document.querySelector('#menu1 ul');
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerHTML = 'P2P';
    btn.addEventListener('click', e=>{
      const hiddenDiv = document.querySelector('#hidden-div');
      hiddenDiv.appendChild(mainPanel.firstChild);
      mainPanel.innerHTML = '';
      mainPanel.appendChild(self.modeUI);   
    });
    li.appendChild(btn);
    m1ul.appendChild(li);
    
  },
  
  setupRing: function(){
    this.ringtone = document.createElement('audio');
    this.ringtone.setAttribute('src',this.data.ringtone);
    this.ringtone.setAttribute('loop',true);
    document.body.appendChild(this.ringtone);
  },
  
  handleStream: function(stream){
    
     CS1.log('Remote stream received.')
        CS1.p2p.stream = stream
        let video = document.querySelector('video')
        if(!video){
          video = document.createElement('video')
          video.setAttribute('crossorigin','anonymous');
          video.setAttribute('autoplay', true);
          video.setAttribute('playsinline', true);
          video.setAttribute('id','peer-video');
        if ('srcObject' in video) {
          video.srcObject = stream
        } else {
          video.src = window.URL.createObjectURL(stream) // for older browsers
        }
        document.body.appendChild(video)
        if(CS1.p2p.mode=='video')
          setTimeout( _=>{
              video.play();

              CS1.p2p.videoEntity = document.createElement('a-plane')
              CS1.p2p.videoEntity.object3D.position.set(2,0.9,-2)
              CS1.p2p.videoEntity.setAttribute('src','#peer-video')
              CS1.cam.appendChild(CS1.p2p.videoEntity)                  

          }, 2000);

        }
    
  }
  
  
})
  
})()