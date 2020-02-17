class Sound {
	constructor(src) {
		this.sound = new Audio()
		this.sound.src = src;
		this.sound.setAttribute("preload", "auto");
		this.sound.setAttribute("controls", "none");
		this.sound.style.display = "none";
	};

	play() {
		this.sound.play();
		this.sound.currentTime = 0;
	};

	stop() {
		this.sound.pause();
		this.sound.currentTime = 0;
	};

	setVolume(volume) {
		this.volume = volume;
	};
};