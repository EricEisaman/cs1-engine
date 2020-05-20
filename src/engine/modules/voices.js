export const voices = (()=>{
  
function say(msg,name){
  var msg = new SpeechSynthesisUtterance(msg);
  if (name == "none given")
    msg.voice = speechSynthesis.getVoices().filter(function(voice) {
    return voice.name == 'Oliver';
  })[0];
  else
  msg.voice = speechSynthesis.getVoices().filter(function(voice) {
    return voice.name == name;
  })[0];
  msg.pitch = 1;
  msg.rate = 1;
  msg.volume = 1;
  speechSynthesis.speak(msg);
  
}

CS1.say = function(msg, name = "none given") {
  if(typeof msg == 'array'){
    msg.forEach(m=>{
      say(msg,name);
    });
  }else{
    say(msg,name);
  }
};

CS1.sayall = function(msg, name) {
  if(CS1.socket){
    CS1.socket.emit("sayall", { msg: msg, name: name });
  }else{
    console.error('You do not have a socket connection to use CS1.sayall()!');
  }
};

CS1.printVoices = () => {
  speechSynthesis.getVoices().forEach(v => {
  console.log(v.name, v.lang);
  });
};

})()