export default class Sound {
  constructor(state, url) {
    this.audio = new Audio(url);
    this.volume = state.settings.toggleSound ? state.settings.volume : 0;
  }

  play() {
    this.audio.volume = this.volume / 100;
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}