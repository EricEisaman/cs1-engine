const instances = document.createElement('gltf-instances');
console.log('Calling append instances');
CS1.add(instances);
CS1.myPlayer.setAttribute('jump','speed:25');
CS1.game.addEnvironment();
CS1.game.start();
