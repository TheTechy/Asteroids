function draw() {

		// clear the screen
		clearScreen();

		player.update();
		player.draw();

		ctx.font = '40px Arial';
		ctx.textAlign = 'left';
		ctx.textBaseline = "top"; 
		ctx.fillStyle = 'rgb(255, 255, 255)';
		ctx.fillText(seconds, 10, 10, 800);
		
		if (counter % timeInterval == 0) {
			seconds++;
		};
		counter++;
		if(showFPS) {
			displayFPS();
		};
	};
};