function MusicManager() {
	this.name = "";
	this.audio = document.createElement("audio");
	this.audio.loop = true;
	this.audio.hidden = true;

	this.playMusic = function(name) {
		if (this.name != name) {
			this.name = name;
			this.audio.src = "music/" + this.name + ".mp3";
			this.audio.play();
		}
	}
}