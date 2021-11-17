export default class Sound {
  constructor(url, volume) {
    this.audio = new Audio(url);
    this.volume = volume;
  }

  play() {
    this.audio.volume = this.volume / 100;
    this.audio.play();
  }
}