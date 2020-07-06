export const oculus = (()=>{


AFRAME.registerComponent('oculus', {

	schema: {
		
	},
  
   init: function(){
    CS1.log('Initializing Oculus device.')
    CS1.device = 'Oculus'
    CS1.log('device-declared')
    document.body.dispatchEvent( new Event('device-declared'))
    //const c = document.querySelector("[cursor]")
    //c.setAttribute("visible", false);
    //c.setAttribute("fuse", false);
    //c.pause();
     
     
    document.body.addEventListener('game-start',e=>{
    
      
    CS1.log('Oculus game-start handler.')
      
    CS1.myPlayer.lh = document.createElement('a-entity');
    CS1.myPlayer.lh.setAttribute('laser-controls','hand:left');
    CS1.myPlayer.lh.setAttribute('raycaster','objects: .jukebox , .clickable; far: 5')
      
      
    //ATTEMPT THUMBSTICK CONTROLLER  
    CS1.myPlayer.lh.addEventListener('axismove',e=>{
      
      if(CS1.rig && CS1.rig.rotateInSteps){
        
        if(  (e.detail.axis[2]>.5) && !CS1.rig.isRotating ){
          CS1.rig.object3D.rotateY(-CS1.rig.rotateStep)
          CS1.myPlayer.object3D.rotateY(-CS1.rig.rotateStep)
          CS1.rig.isRotating = true
          setTimeout(e=>{CS1.rig.isRotating=false},1000)
        }else if(  (e.detail.axis[2]<-.5) && !CS1.rig.isRotating  ){
          CS1.rig.object3D.rotateY(CS1.rig.rotateStep)
          CS1.myPlayer.object3D.rotateY(CS1.rig.rotateStep)
          CS1.rig.isRotating = true
          setTimeout(e=>{CS1.rig.isRotating=false},1000)
        } 
        
      }else{
        
        if(  e.detail.axis[2]>.5 ){
          CS1.rig.object3D.rotateY(-CS1.myPlayer.rotSpeed)
          CS1.myPlayer.object3D.rotateY(-CS1.myPlayer.rotSpeed)
        }else if(  e.detail.axis[2]<-.5  ){
          CS1.rig.object3D.rotateY(CS1.myPlayer.rotSpeed)
          CS1.myPlayer.object3D.rotateY(CS1.myPlayer.rotSpeed)
        }
       
      }
      
      if( e.detail.axis[3]>.5 ){
        CS1.myPlayer.object3D.translateZ(CS1.myPlayer.speed)
      }else if( e.detail.axis[3]<-.5 ){
        CS1.myPlayer.object3D.translateZ(-CS1.myPlayer.speed)
      }
    })
      
      
      
    //self.lh.setAttribute('position','-1 0 0');
    //self.lh.setAttribute('oculus-touch-controls','hand:left');
    //CS1.myPlayer.lh.setAttribute('raycaster',`objects:.rayobject;far:4.0;useWorldCoordinates:false`);
      
    CS1.myPlayer.rh = document.createElement('a-entity');
    CS1.myPlayer.rh.setAttribute('laser-controls','hand:right');
    //self.rh.setAttribute('position','1 0 0');
    //self.rh.setAttribute('oculus-touch-controls','hand:right');
    //CS1.myPlayer.rh.setAttribute('raycaster',`objects:.rayobject;far:4.0;useWorldCoordinates:false`);
    CS1.myPlayer.rh.setAttribute('raycaster','objects: .jukebox , .clickable; far: 5')
    
    
    CS1.myPlayer.avatar.appendChild(CS1.myPlayer.lh );
    CS1.myPlayer.avatar.appendChild(CS1.myPlayer.rh ); 
      
    
    
    if(CS1.game.view.type=='THIRD_PERSON'){
      
      CS1.log('Customizing Oculus Touch Controls for THIRD PERSON!');
      
//       const ops = [0,0.05,0.08,0.11,0.14,0.2,0.3,1.0]
//       let count = 0;
//       CS1.myPlayer.lh.addEventListener('xbuttondown',e=>{
//       count++;  
//       CS1.myPlayer.avatar.object3D.traverse(o=>{
//               if(o.type=='Mesh'){
//                o.material.transparent = true
//                o.material.opacity = ops[count%ops.length]
//               }
//             })
//       })
      
//       const zf = [0,1,2,3,4,5]
//       let zcount = 0;
//       CS1.myPlayer.lh.addEventListener('ybuttondown',e=>{
//         zcount++;  
//         CS1.myPlayer.components.follow.data.zFactor = zf[zcount%zf.length]
//       })
      
      CS1.myPlayer.lh.addEventListener('xbuttondown',e=>{ 
    
        CS1.game.view.toggle();

      })  
      
      CS1.myPlayer.lh.addEventListener('ybuttondown',e=>{ 
        CS1.cam.matrixSweep();
      })  
      
    
      
    }
      
      
      
    
    })
     
     
    // document.body.addEventListener('my-avatar-ready',e=>{
    //   const cs1cursor = document.querySelector('cs1-cursor');
    //   if(cs1cursor)  cs1cursor.parentEl.removeChild(cs1cursor);
    //   CS1.log('Removing cs1cursor.');
    // })
    
    
  },
  
  update: function () {
    
  },

	tick: function () {
		
	}
  
});
  
 
  
})()