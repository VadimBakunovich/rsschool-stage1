export default class ViewSettings {
  constructor(toggleSound = '', volume = 0, toggleTimer = '', time = 0) {
    this.template = `
      <div class="settings">
        <p class="settings__title">настройки</p>
        <div class="settings__item">
          <span class="settings-item__text">Звуки</span>
          <label class="switch">
            <input type="checkbox" class="toggle-sound" ${toggleSound}>
            <span class="slider"></span>
          </label>
        </div>
        <div class="settings__progr">
          <span class="volume"></span>
          <input class="progress vol-progr" id="volume" type="range" value=${volume} step="1" disabled>
          <span class="volume vol-up"></span>
        </div>
        <div class="settings__item">
          <span class="settings-item__text">Игра на время</span>
          <label class="switch">
            <input type="checkbox" class="toggle-timer" ${toggleTimer}>
            <span class="slider"></span>
          </label>
        </div>
        <div class="settings__progr">
          <input class="progress time-progr" id="timer" type="range" min="5" max="30" value=${time} step="5" disabled>
          <span class="time-dig">${time} сек.</span>
        </div>
        <button class="settings__back text-btn">назад</button>
      </div>
    `;
    this.toggleSound = toggleSound;
    this.volume = volume;
    this.toggleTimer = toggleTimer;
    this.time = time;
  }

  render(elem) {
    elem.innerHTML = this.template;
    const volProgr = document.querySelector('.vol-progr');
    const timeProgr = document.querySelector('.time-progr');
    if (this.toggleSound === 'checked') {
      volProgr.disabled = false;
      volProgr.style.background = `
        linear-gradient(to right, #FDAC53 0%, #FDAC53 ${this.volume}%, #c4c4c4 ${this.volume}%, #c4c4c4 100%)`;
    }
    if (this.toggleTimer === 'checked') {
      timeProgr.disabled = false;
      timeProgr.style.background = `
        linear-gradient(to right, #FDAC53 0%, #FDAC53 ${this.time * 3}%, #c4c4c4 ${this.time * 3}%, #c4c4c4 100%)`;
    }
  }
}