const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;
const canvas = document.getElementById("cnv");
const ctx = canvas.getContext('2d');
const FPS = 60;

let frameCount = 0;
let fpsInterval, startTime, now, then, elapsed;
let drawLoop = true;
let gameState = 0; // 0 = loading, 1 = started, 2 = player died

// game assests
let ship;
let asteroids = [];
let numAsteroids = 7;
let rockets = [];
let sounds = [];
let spriteSheet = new Image();
spriteSheet.src = 'imgs/sprites.png';

function toggleFullScreen() {
	console.log(`8`)
	var doc = window.document;
	var docEl = doc.documentElement;

	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);
	}
	else {
		cancelFullScreen.call(doc);
	};
};

function clearScreen() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function resizeCanvas(w, h) {
	canvas.style.cursor = 'none';
	canvas.width = window.innerWidth / 100 * w;
	canvas.height = window.innerHeight / 100 * h;
};

/** Display text on canvas
 * @param {*} textObj.text: Text to be dislayed
 * @param {*} textObj.x: x for canvas
 */
function drawText(textToDisplay, xPos, yPos) {
	let numArr = Array.from(textToDisplay.toString()).map(Number);
	const SPRITE_WIDTH = 70;
	const SPRITE_HEIGHT = 70;

	//image, sourcex, sourcey, sourceWidth, sourceHeight, destX, destY, destWidth, detsHeight
	for (let i = 0; i < numArr.length; i++) {
		ctx.drawImage(spriteSheet, SPRITE_WIDTH*numArr[i], 0, SPRITE_WIDTH, SPRITE_HEIGHT, 10+SPRITE_WIDTH*i, 20, SPRITE_WIDTH/1.2, SPRITE_HEIGHT/1.5);
	};

};
/** Display text on canvas
 * @param {*} textObj.text: Text to be dislayed
 * @param {*} textObj.x: x for canvas
 */
function displayText(textObj) {
	typeof textObj.text === `undefined` ? textObj.text = `` : textObj.text = textObj.text;
	typeof textObj.x === `undefined` ? textObj.x = 0 : textObj.x = textObj.x;
	typeof textObj.y === `undefined` ? textObj.y = 0 : textObj.y = textObj.y;
	typeof textObj.maxSize === `undefined` ? textObj.maxSize = canvas.width / 100 * 90 : textObj.maxSize = textObj.maxSize;
	typeof textObj.fontSize === `undefined` ? textObj.fontSize = `40` : textObj.fontSize = textObj.fontSize;
	typeof textObj.textAlign === `undefined` ? textObj.textAlign = `left` : textObj.textAlign = textObj.textAlign;
	typeof textObj.textBaseline === `undefined` ? textObj.textBaseline = `top` : textObj.textBaseline = textObj.textBaseline;
	typeof textObj.fillStyle === `undefined` ? textObj.fillStyle = `rgb(255, 255, 255)` : textObj.fillStyle = textObj.fillStyle;

	ctx.font = `100 ${textObj.fontSize}px Arial Narrow`;
	ctx.textAlign = textObj.textAlign;
	ctx.textBaseline = textObj.textBaseline;
	ctx.fillStyle = textObj.fillStyle;
	ctx.fillText(textObj.text, textObj.x, textObj.y, textObj.maxSize);
};

function displayLives() {
	// ctx.font = `42px Arial`;
	// ctx.textAlign = 'right';
	// ctx.textBaseline = 'top';
	// ctx.fillStyle = 'rgb(240, 240, 240)';
	// ctx.fillText(`Lives: ${ship.lives}`, canvas.width-30, 30);

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.strokeStyle = 'rgb(255, 255, 255)';
	
	let x = canvas.width - 40;
	let y = 30;
	ctx.save();
	for (let i = 0; i < ship.lives; i++) {
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.moveTo(x, y);
		ctx.lineTo((x-10), (y*2));
		ctx.lineTo((x+10), (y*2));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		x -= 30;
	};
	ctx.restore();
};

// initialize the timer variables and start the animation
function startAnimating(FPS) {
    fpsInterval = 1000 / FPS;
    then = performance.now();
    startTime = then;
    draw();
};

function loop() {
	drawLoop = true;
};

function noLoop() {
	drawLoop = false;
};

function initAsteroids() {
	numAsteroids++; // increment asteroid count
	asteroids = [];
	for (let i = 0; i < numAsteroids; i++) {
		asteroids.push(new Asteroid());
	};
};

function loseLife() {
	ship.lives--;
	gameState = 0;
	rockets = [];
	noLoop();
};

function nextLife() {
	initAsteroids();
	ship.resetShip();
};

function setup() {
	sounds[0] = new Sound('sounds/blast.mp3');
	sounds[1] = new Sound('sounds/rocket.mp3');
	sounds[1].setVolume(0.1);
	resizeCanvas(100, 100);
	ship = new Ship();
	gameState = 0;
	startAnimating(FPS);
	initGame();
	document.getElementById('cnv').requestFullscreen();
};

function initPlayer() {
	ship.score = 0;
	ship.level = 1;
	ship.lives = 3;
};

function initGame() {
	initAsteroids();
};

function draw() {
	// request another frame
	requestAnimationFrame(draw);

    // calc elapsed time since last loop
    now = performance.now();
    elapsed = now - then;

	if(!drawLoop) return;

	//** DRAW START **/
    if (elapsed > fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your specified fpsInterval not being a multiple of RAF's interval (16.7ms)
		then = now - (elapsed % fpsInterval);

		// clear the screen
		clearScreen();

		// check keyboard input
		checkKeyboardInput();

		// have we shot all the asteroids
		if(asteroids.length < 1) {
			ship.level++
			initAsteroids();
		};

		for (let i = 0; i < asteroids.length; i++) {
			if(gameState == 1) {
				if (ship.hits(asteroids[i])) {
					loseLife();
				};
			};
			asteroids[i].update();
			asteroids[i].draw();
		};

		for (let i = rockets.length-1; i >= 0; i--) {
			rockets[i].update();
			rockets[i].draw();
			if (rockets[i].detectEdges()) {
				rockets.splice(i, 1);
			} else {
				for (let j = asteroids.length -1; j >= 0; j--) {
					if(rockets[i].hits(asteroids[j])) {
						if(asteroids[j].r >= 15 && asteroids[j].r <= 25) {
							ship.score += 100;
						} else if (asteroids[j].r >= 25 && asteroids[j].r <= 40) {
							ship.score += 50;
						} else {
							ship.score += 20;
						};

						sounds[0].play();

						if (asteroids[j].r > 15) {
							let newAsteroids = asteroids[j].breakup();
							asteroids = asteroids.concat(newAsteroids);
						};
						asteroids.splice(j, 1);
						rockets.splice(i, 1);
						break;
					};
				};
			};
		};

		ship.update();
		ship.draw();

		drawText(ship.score, 10, 10);

		displayLives();

		if(gameState == 0 && ship.lives > 0) {
			// loading screen text
			displayText({
				text: `PRESS SPACEBAR TO START`,
				x: canvas.width/2,
				y: canvas.height / 2,
				fontSize: 60,
				textAlign: `center`, //
				textBaseline: `middle`,
				fillStyle: `rgb(255, 255, 255)`
			});
		} else if(gameState == 0 && ship.lives == 0) {
			// loading screen text
			displayText({
				text: `PRESS R TO RESTART`,
				x: canvas.width/2,
				y: canvas.height / 2,
				fontSize: 60,
				textAlign: `center`, //
				textBaseline: `middle`,
				fillStyle: `rgb(255, 255, 255)`
			});
		};
	};
};

document.addEventListener('DOMContentLoaded', (evt) => {
	resizeCanvas(100, 100);
}, true);

window.addEventListener('resize', (evt) => {
	//resize the canvas here
	resizeCanvas(100, 100);
}, true);

setup();