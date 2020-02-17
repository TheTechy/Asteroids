class Asteroid {
	constructor(pos, r) {
		if (pos) {
			this.pos = pos.copy();
		} else {
			let x = randomInteger(0, canvas.width);
			let y = randomInteger(0, canvas.height);
			let d = getDistance(ship.pos.x+ship.r, ship.pos.y+ship.r, x, y);
			if(d < ship.r) {
				x += ship.r*2;
				y += ship.r*2;
			}
			this.pos = new Vector(x, y);
		}
		if (r) {
			this.r = r * 0.5;
		} else {
			this.r = randomInteger(15, 50);
		};

		this.heading = randomInteger(0, 5);
		this.rotation = 0;
		this.velocity = Vector.random2D();
		this.velocity.multiply(1.5);
		this.totalFaces = randomInteger(7, 18);
		this.offset = [];
		for (let i = 0; i < this.totalFaces; i++) {
			this.offset[i] = randomInteger(-5, 15);
		};
		this.strokeStyle = 'rgb(255, 255, 255)';
		this.fillStyle = 'rgb(0, 0, 0)';
		this.lineWidth = 2;
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

	update() {
		this.pos.add(this.velocity);
	};

	breakup() {
		var newA = [];
		newA[0] = new Asteroid(this.pos, this.r);
		newA[1] = new Asteroid(this.pos, this.r);
		return newA;
	}

	draw() {
		ctx.save();
		ctx.translate(this.pos.x,this.pos.y);
		ctx.moveTo(0, -this.r);
		ctx.beginPath();
		for (let l = 0; l <= this.totalFaces; l++) {
			let angle = mapRange(l, 0, this.totalFaces, 0, Math.PI *2);
			// let r = this.r;
			let r = this.r + this.offset[l];
			let x = r * Math.cos(angle);
			let y = r * Math.sin(angle);
			ctx.lineTo(x, y);
		};
		ctx.fillStyle = this.fillStyle;
		ctx.strokeStyle = this.strokeStyle;
		ctx.lineWidth = this.lineWidth;
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.restore();
		this.testEdges();
	};
};