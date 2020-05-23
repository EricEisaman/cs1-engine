export const p2p = {
  
init: function(){
  //CS1.socket will be available here.
  CS1.p2p = p2p;
  CS1.p2p.me = new Peer({ initiator: true })
  CS1.p2p.me.on('signal', data => {
    CS1.p2p.me.connectionInfo = data;
  })
},
  
getPeers: function(){
  //CS1.socket will be available here.
},
  
getStream: function(video=true,audio=true){
  
  navigator.mediaDevices.getUserMedia({
      video: video,
      audio: audio
    }).then(s=>{
      //adding a stream from self for others to consume
      CS1.p2p.me.addStream(s) 
    }).catch(reject)
},
  
onStream: function(cb){
  CS1.p2p.me.on('stream', cb)
}



}

/*
EXAMPLE onStream callback
stream => {
    // got remote video stream, now let's show it in a video tag
    var video = document.querySelector('video')

    if ('srcObject' in video) {
      video.srcObject = stream
    } else {
      video.src = window.URL.createObjectURL(stream) // for older browsers
    }

    video.play()
}
*/