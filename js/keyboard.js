let keys = {};

function checkKeyboardInput() {
	for (const key in keys) {
		if(key == 37) {
			ship.turn(-0.07);
		} else if(key == 38) {
			ship.thrust();
		} else if(key == 39) {
			ship.turn(0.07);
		} else if(key == 40) {
			
		} else if(key == 82) {
			initGame();
		}
	};
};

document.addEventListener('keydown', (evt) => {
	keys[evt.which] = true;
}, true);

document.addEventListener('keyup', (evt) => {
	if(evt.keyCode == 32 && gameState == 0 && ship.lives == 3) { // start game
		gameState = 1;
	} else
	if(evt.keyCode == 32 && gameState == 1) {
		rockets.push(new Rocket(ship.pos, ship.heading));
		sounds[1].play();
	} else if(evt.keyCode == 32 && gameState == 0 && ship.lives > 0) {
		nextLife();
		gameState = 1; // im still in the asteroid????
		loop();
	}
	delete keys[evt.which];
}, true);