/*
Add as a component to scene in cs1scene.js
__________________________________________
In response to the game-start event, this component scans
all registered components checking for those with a share 
property. The value of this share property is expected to be
an object representing the data to be shared across the network. 
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
    },
    scan: function() {},
    registerSocket: function(coredata) {
      //This is called when the cs1-game-socket fires up.
      //CS1.socket will be defined at this point.
      //All core data will be sent via server connection
      if (CS1.game.flags.peer) {
        CS1.utils.loadScript('')
        .then(e=>{
          this.peers = p2p.init();
        })   
      }
      this.sharing = true;
    },
    lfUpdate: function() {},
    mfUpdate: function() {},
    hfUpdate: function() {},
    lfPeerUpdate: function() {
      if(!this.peers)return
    },
    mfPeerUpdate: function() {
      if(!this.peers)return
    },
    hfPeerUpdate: function() {
      if(!this.peers)return
    },
    once: function(data, target) {},
    registerData: function(data, frequency = "hf", conn = "server") {
      //conn can be 'server' or 'peer'
    },
    tick: function() {if(!this.sharing)return}
  });
})();
