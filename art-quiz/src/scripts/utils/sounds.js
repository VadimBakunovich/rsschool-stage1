export default class Sound {
  constructor(url) {
    this.audio = new Audio(url);
  }

  play(volume) {
    this.audio.volume = volume / 100;
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}