(function () {
	'use strict';

	//Set up your scene
	const instances = document.createElement('gltf-instances');
	CS1.scene.appendChild(instances);
	CS1.myPlayer.setAttribute('jump','speed:25');
	// DEFAULT IS  SINGLE_PLAYER, other options are MULTIPLAYER and SINGLE_PLAYER_SERVER
	CS1.game.addEnvironment();
	//CS1.game.addParticles();
	CS1.game.start();

}());
