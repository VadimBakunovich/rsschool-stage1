export default class Sound {
  constructor(state, url) {
    this.audio = new Audio(url);
    this.state = state;
  }

  play(state = this.state) {
    const { volume, toggleSound } = state.settings;
    if (toggleSound) {
      this.audio.volume = volume / 100;
      this.audio.play();
    }
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}