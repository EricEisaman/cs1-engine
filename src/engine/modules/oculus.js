export const oculus = {
  
  init: function(){
    console.log('Initializing Oculus device.')
    CS1.device = 'Oculus'
    //const c = document.querySelector("[cursor]")
    //c.setAttribute("visible", false);
    //c.setAttribute("fuse", false);
    //c.pause();
    
    
    CS1.myPlayer.lh = document.createElement('a-entity');
    CS1.myPlayer.lh.setAttribute('laser-controls','hand:left');
    //self.lh.setAttribute('position','-1 0 0');
    //self.lh.setAttribute('oculus-touch-controls','hand:left');
    CS1.myPlayer.lh.setAttribute('raycaster',`objects:.rayobject;far:4.0;useWorldCoordinates:false`);
    CS1.myPlayer.rh = document.createElement('a-entity');
    CS1.myPlayer.rh.setAttribute('laser-controls','hand:right');
    //self.rh.setAttribute('position','1 0 0');
    //self.rh.setAttribute('oculus-touch-controls','hand:right');
    CS1.myPlayer.rh.setAttribute('raycaster',`objects:.rayobject;far:4.0;useWorldCoordinates:false`);
    
    console.log('CS1.game.view.type : ', CS1.game.view.type)
    
    if(CS1.game.view.type=='THIRD_PERSON'){
      console.log('Customizing Oculus Cam!');
      const rig = document.createElement('a-entity');
      CS1.scene.appendChild(rig);
      rig.object3D.add(CS1.cam.object3D);
      // rig.appendChild(CS1.myPlayer.lh );
      // rig.appendChild(CS1.myPlayer.rh );
    
      /*
      const rs = document.createElement('a-sphere');
      rs.setAttribute('color','red');
      rs.setAttribute('radius','1');
      rs.object3D.position.set(0,2,-3)
      CS1.cam.appendChild(rs);
      */
      
      //CS1.cam.setAttribute('camera','active',true)
      
      /*
      const log = document.createElement('a-log');
      log.setAttribute('max', 10);
      CS1.scene.appendChild(log);
      
      setInterval(e=>{
        if(!CS1.log)return
        CS1.log(CS1.cam.object3D.getWorldPosition().z)
        CS1.log(AFRAME.scenes[0].camera.el.id)
      },3000)
      */
      const ops = [0,0.05,0.08,0.11,0.14,0.2,0.3,1.0]
      let count = 0;
      CS1.myPlayer.lh.addEventListener('xbuttondown',e=>{
      count++;  
      CS1.myPlayer.avatar.object3D.traverse(o=>{
              if(o.type=='Mesh'){
               o.material.transparent = true
               o.material.opacity = ops[count%ops.length]
              }
            })
      })
      
      const zf = [0,1,2,3,4,5]
      let zcount = 0;
      CS1.myPlayer.lh.addEventListener('ybuttondown',e=>{
        zcount++;  
        CS1.myPlayer.components.follow.data.zFactor = zf[zcount%zf.length]
      })
      
      //CS1.myPlayer.avatar.setAttribute('visible', false);
      const playerTarget = document.createElement('a-entity')
      playerTarget.object3D.position.set(0,0,-3)
      playerTarget.setAttribute('id','player-target')
      rig.appendChild(playerTarget)
      CS1.myPlayer.setAttribute('follow','yFactor:0; target:#player-target; strength:0.2')
      CS1.cam.removeAttribute('follow');
      CS1.myPlayer.lhc = document.createElement('a-entity')
      CS1.myPlayer.rhc = document.createElement('a-entity')
      CS1.myPlayer.lhc.appendChild(CS1.myPlayer.lh)
      CS1.myPlayer.rhc.appendChild(CS1.myPlayer.rh)
      rig.appendChild(CS1.myPlayer.lhc );
      rig.appendChild(CS1.myPlayer.rhc);
      
      CS1.game.view.toggle();
      rig.set('movement-controls',''); 
      
    }else{
      CS1.myPlayer.avatar.appendChild(CS1.myPlayer.lh );
      CS1.myPlayer.avatar.appendChild(CS1.myPlayer.rh );
    
    }
    
    
    
    
  }
  

}

/*
<a-entity id="rig"
          movement-controls
          position="25 0 25">
  <a-entity camera
            position="0 1.6 0"
            look-controls="pointerLockEnabled: true"></a-entity>
</a-entity>
*/