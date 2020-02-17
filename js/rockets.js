class Rocket {
	constructor(shipPos, heading) {
		this.pos = new Vector(shipPos.x, shipPos.y)
		this.velocity = Vector.fromAngle(heading);
		this.velocity.multiply(5);
		this.r = 2;
	};

	detectEdges() {
		if(this.y + this.r*2 >= canvas.height) {
			return true;
		} else if(this.y - this.r*2 <= 0 ) {
			return true;
		};

		if(this.x + this.r*2 >= canvas.width) {
			return true;
		} else if(this.x - this.r*2 <= 0 ) {
			return true;
		};
	};

	update() {
		this.pos.add(this.velocity);
	};

	hits(asteroid) {
		let d = getDistance(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		if(d < asteroid.r) {
			return true;
		}
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.r * 2, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'rgb(255, 255, 255)';
		ctx.lineWidth = 2;
		ctx.fill();
		ctx.stroke();
	};
};