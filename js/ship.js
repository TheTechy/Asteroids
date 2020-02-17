class Ship {
	constructor() {
		this.pos = new Vector(canvas.width / 2, canvas.height / 2);
		this.r = 18;
		this.heading = 0;
		this.rotation = 0;
		this.velocity = new Vector(0, 0);
		this.score = 0;
		this.level = 1;
		this.lives = 3;
		this.thrusting = false;
		this.strokeStyle = 'rgb(255, 255, 255)';
		this.fillStyle = 'rgb(0, 0, 0)';
		this.lineWidth = 4;
	};

	resetShip() {
		this.pos = new Vector(canvas.width / 2, canvas.height / 2);
		this.heading = 0;
		this.rotation = 0;
		this.velocity = new Vector(0, 0);
	};

	testEdges() {
		if (this.pos.x > canvas.width + this.r) {
			this.pos.x = -this.r;
		} else if (this.pos.x < -this.r) {
			this.pos.x = canvas.width + this.r;
		};

		if (this.pos.y > canvas.height + this.r) {
			this.pos.y = -this.r;
		} else if (this.pos.y < -this.r) {
			this.pos.y = canvas.height + this.r;
		};
	};

	thrust() {
		let force = Vector.fromAngle(this.heading);
		force.multiply(0.15);
		this.velocity.add(force);
	};

	turn(angle) {
		this.heading += angle;
	};

	update() {
		this.pos.add(this.velocity);
		this.velocity.multiply(0.99);
	};

	hits(asteroid) {
		let d = getDistance(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		if (d < this.r + asteroid.r) {
			return true;
		};
	};

	draw() {
		ctx.save();
		ctx.translate(this.pos.x,this.pos.y);
		ctx.rotate(this.heading + Math.PI / 2);
		ctx.beginPath();
		ctx.moveTo(0, -this.r);
		ctx.lineTo(this.r-2, this.r);
		ctx.lineTo(0, this.r/2);
		ctx.lineTo(-this.r+2, this.r);
		ctx.closePath();
		ctx.fillStyle = this.fillStyle;
		ctx.strokeStyle = this.strokeStyle;
		ctx.lineWidth = this.lineWidth;
		ctx.stroke();
		ctx.fill();
		ctx.restore();
		this.testEdges();
	};
};