/** return the mousex, mousey of the canvas passed in
 * @param {element} canvas 
 * @param {event} evt 
 */
function getCanvasMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
};

/** maps a number from one range to another
 * @param {*} number to map
 * @param {*} Minimum value in old range
 * @param {*} Maximum value in old range
 * @param {*} Minimum value in new range 
 * @param {*} Maximum value in new range 
 * @param {*} withinBounds 
 */
function mapRange(n, start1, stop1, start2, stop2, withinBounds) {
	var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
	if (!withinBounds) {
		return newval;
	};

	if (start2 < stop2) {
		return Math.max(Math.min(newval, start2), stop2);
	} else {
		return Math.max(Math.min(newval, stop2), start2);
	}
};

/** round up to the nearest factor e.g. 49, 50 rounds up to 50
 * @param {number} number 
 * @param {number} factor 
 */
function roundUp(number, factor) {
	return Math.ceil(number / factor) * factor;
};

/** round down to the nearest factor e.g. 49, 10 rounds to 40
 * @param {number} number 
 * @param {number} factor 
 */
function roundDown(number, factor) {
	return Math.floor(number / factor) * factor;
};

/** Generate a random integer between min and max
 * @param {number} min 
 * @param {number} max 
 */
function randomInteger(min, max) {
	return Math.floor(min + Math.random()*(max + 1 - min))
};

/** Generate a random float between min and max
 * @param {number} min 
 * @param {number} max 
 */
function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
};

function randomGaussian(mean, sd) {
	let y2;
	let previous = false
	var y1, x1, x2, w;
	if (previous) {
	  y1 = y2;
	  previous = false;
	} else {
	  do {
		x1 = this.random(2) - 1;
		x2 = this.random(2) - 1;
		w = x1 * x1 + x2 * x2;
	  } while (w >= 1);
	  w = Math.sqrt(-2 * Math.log(w) / w);
	  y1 = x1 * w;
	  y2 = x2 * w;
	  previous = true;
	}
  
	var m = mean || 0;
	var s = sd || 1;
	return y1 * s + m;
  };

function getDistance(x1, y1, x2, y2) {
	let xDist = x2 - x1;
	let yDist = y2 - y1;
	return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};