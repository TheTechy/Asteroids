class Vector {
	constructor(x, y) {
		if(typeof x != 'number') {
			throw new Error('Invalid x value.');
		}
		if(typeof y != 'number') {
			throw new Error('Invalid y value.');
		}
		
		// Store the (x, y) coordinates
		this.x = x;
		this.y = y;
	};
	
	/** Create a new vector from an angle
	 * @param {*} angle 
	 * @param {*} length 
	 */
	static fromAngle(angle, length) {
		if(typeof length === 'undefined') {
			length = 1;
		};
		return new Vector(length * Math.cos(angle), length * Math.sin(angle), 0);
	};

	/** Return the radians from two vectors
	 * @param {*} targetY 
	 * @param {*} sourceY 
	 * @param {*} targetX 
	 * @param {*} sourceX 
	 */
	static radiansFromVectors(targetY, sourceY, targetX, sourceX) {
		return Math.atan2(targetY - sourceY, targetX - sourceX);
	};

	/** Returns a new vector based on an angle and a length.
	 * @param	{Number}	angle	The angle, in radians.
	 * @param	{Number}	length	The length.
	 * @return	{Vector}	A new vector that represents the (x, y) of the specified angle and length.
	 * */
	static fromBearing(angle, length) {
		if(typeof length === 'undefined') {
			length = 1;
		};
		return new Vector(
			length * Math.cos(angle),
			length * Math.sin(angle)
		)
	};

	/** Generate a random vector */
	static random2D() {
		return Vector.fromAngle(Math.random() * Math.PI*2);
	};

	/** Add second vector to this vector
	 * @param	{Vector} The vector to add
	 * @return	{Vector} The current vector
	 * */
	add(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	};
	
	/** Subtract a vector from this vector
	 * @param  {Vector} The vector to Subtract from this
	 * @return {Vector} The current vector
	 * */
	subtract(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	};

	/** Divide the current vector by a given value.
	 * @param  {Number|Vector} value The number (or Vector) to divide by.
	 * @return {Vector}	   The current vector. Useful for daisy-chaining calls.
	 * */
	divide(value) {
		if(value instanceof Vector) {
			this.x /= value.x;
			this.y /= value.y;
		} else if(typeof value == "number") {
			this.x /= value;
			this.y /= value;
		} else {
			throw new Error("Can't divide by non-number value.");
		};
		return this;
	};

	/** Multiply the current vector by a given value.
	 * @param  {Number|Vector} The number (or Vector) to multiply the current vector by.
	 * @return {Vector} The current vector. useful for daisy-chaining calls.
	 * */
	multiply(value) {
		if(value instanceof Vector) {
			this.x *= value.x;
			this.y *= value.y;
		} else if(typeof value == "number") {
			this.x *= value;
			this.y *= value;
		} else {
			throw new Error("Can't multiply by non-number value.");
		};
		return this;
	};

	/** Copies the current vector.
	 * @return {Vector} A clone of the current vector. Very useful for passing around copies of a vector if you don't want the original to be altered.
	 * */
	copy() {
		return new Vector(this.x, this.y);
	};

	/** Rounds the x and y components of this vector down to the next integer.
	 * @return	{Vector}	This vector - useful for diasy-chaining.
	 * */
	floor() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	};

	/** Rounds the x and y components of this vector up to the next integer.
	 * @return	{Vector}	This vector - useful for diasy-chaining.
	 * */
	ceil() {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		return this;
	};

	/** Rounds the x and y components of this vector to the nearest integer.
	 * @return	{Vector}	This vector - useful for diasy-chaining.
	 * */
	round() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	};

	/** Calculates the 'area' of this vector and returns the result.
	 * In other words, returns x * y. Useful if you're using a Vector to store a size.
	 * @return {Number} The 'area' of this vector.
	 * */
	area() {
		return this.x * this.y;
	};

	/** Move the vector towards the given vector by the given amount
	 * @param  {Vector} v      The vector to move towards.
	 * @param  {Number} amount The distance to move towards the given vector.
	 * */
	moveTowards(v, amount) {
		var dir = new Vector(
			v.x - this.x,
			v.y - this.y
		).limitTo(amount);
		this.x += dir.x;
		this.y += dir.y;
		return this;
	};

	/** Snaps this vector to an imaginary square grid with the specified sized squares
	 * @param	{Number}	grid_size	The size of the squares on the imaginary grid to which to snap
	 * @return	{Vector}	The current vector - useful for daisy-chaining
	 * */
	snapTo(grid_size) {
		this.x = Math.floor(this.x / grid_size) * grid_size;
		this.y = Math.floor(this.y / grid_size) * grid_size;
		return this;
	};

	/** Limit the length of the current vector to value without changing the direction in which the vector is pointing
	 * @param  {Number} value The number to limit the current vector's length to
	 * @return {Vector}	   The current vector. useful for daisy-chaining calls
	 * */
	limitTo(value) {
		if(typeof value != "number") {
			throw new Error("Can't limit to non-number value.");
		};
		this.divide(this.length);
		this.multiply(value);
		return this;
	};

	/** Return the dot product of the current vector and another vector
	 * @param  {Vector} v   The other vector we should calculate the dot product with.
	 * @return {Vector}	 The current vector. Useful for daisy-chaining calls
	 * */
	dotProduct(v) {
		return (this.x * v.x) + (this.y * v.y);
	};
	
	/** Whether the vector is equal to another vector
	 * @param  {Vector} v The vector to compare to
	 * @return {boolean}  Whether the current vector is equal to the given vector
	 * */
	equalTo(v) {
		return this.x == v.x && this.y == v.y;
	};

	/** Get the length of the current vector.
	 * @return {Number} The length of the current vector
	 * */
	get length() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	};

	/** Get the value of the minimum component of the vector.
	 * @return {Number} The minimum component of the vector.
	 * */
	get minComponent() {
		return Math.min(this.x, this.y);
	};

	/** Get the value of the maximum component of the vector.
	 * @return {Number} The maximum component of the vector.
	 * */
	get maxComponent() {
		return Math.min(this.x, this.y);
	};
}