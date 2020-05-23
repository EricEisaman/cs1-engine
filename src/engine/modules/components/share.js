/*
Add as a component to scene in cs1scene.js

This component manages time-based data sharing among players.

__________________________________________
In response to the game-start event, this component scans
all registered components checking for those with a share 
property. The value of this share property is expected to be
an object including the data to be shared by sending updates
across the network and the resolvers which run when updates are received. 
The cs1-game-socket will implement a core set of shared data.
Upon initial execution of the cs1-game-socket, the client socket will 
register with the share component singleton on the scene at which time
the CS1.socket will be defined and the share component can begin
managing the shared data.
*/
import { p2p } from "../p2p";
export const component = (() => {
  AFRAME.registerComponent("share", {
    schema: {
      lf: { default: 0.5 }, //updates once ever 2 seconds
      mf: { default: 2 }, //updates 2 times per second
      hf: { default: 10 } //updates 10 times per second
    },
    init: function() {
      this.el.addEventListener("game-start", this.scan);
      this.sharing = false;
      CS1.share = this;
      //based upon tick running 60fps
      this.lfc = 60/this.data.lf;
      this.mfc = 60/this.data.mf;
      this.hfc = 60/this.data.hf;
    },
    scanAll: function() {
      //run algorithm to pool the data into 6 objects
      //lfd,mfd,hfd,lfpd,mfpd,and hfpd
      //expecting:
      /*
      share: {
              
        pos: {frequency:'mf',conn:'server'}, // pos resolves to this.el.object3D.position,
             //frequency default is 'hf' and conn default is 'server'
        rot: {}, // rot resolves to this.el.object3D.rotation
      
      }
      
      */
    },
    scanOne: function(){
      
    },
    registerSocket: function(coredata) {
      //This is called when the cs1-game-socket fires up.
      //CS1.socket will be defined at this point.
      //All core data will be sent via server connection
      if (CS1.game.flags.peer) {
        CS1.utils.loadScript('https://cdnjs.cloudflare.com/ajax/libs/simple-peer/9.7.2/simplepeer.min.js')
        .then(e=>{
          this.peers = p2p.init();
        })   
      }
      this.sharing = true;
      this.count = 0;
    },
    lfUpdate: function() {
      CS1.socket.emit('lfUpdate',this.lfd)
    },
    mfUpdate: function() {
      CS1.socket.emit('mfUpdate',this.lfd)
    },
    hfUpdate: function() {
      CS1.socket.emit('hfUpdate',this.lfd)
    },
    lfPeerUpdate: function() {
      if(!this.peers)return
      CS1.socket.emit('lfPeerUpdate',this.lfd)
    },
    mfPeerUpdate: function() {
      if(!this.peers)return
      CS1.socket.emit('mfPeerUpdate',this.lfd)
    },
    hfPeerUpdate: function() {
      if(!this.peers)return
      CS1.socket.emit('hfPeerUpdate',this.lfd)
    },
    registerData: function(data, frequency = "hf", conn = "server") {
      if(!this.sharing)return
      //conn can be 'server' or 'peer'
      //add property to the appropriate data object such as this.lfd
    },
    tick: function() {
      if(!this.sharing)return
      if(this.count%this.lfc===0){
        this.lfUpdate()
        this.lfPeerUpdate()
      }
      if(this.count%this.mfc===0){
        this.mfUpdate()
        this.mfPeerUpdate()
      }
      if(this.count%this.hfc===0){
        this.mfUpdate()
        this.mfPeerUpdate()
      }
      this.count++;
    }
  });
})();
