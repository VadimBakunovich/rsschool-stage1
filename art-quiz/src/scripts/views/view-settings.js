export default class ViewSettings {
  constructor(obj) {
    this.template = `
      <div class="settings">
        <p class="settings__title">настройки</p>
        <div class="settings__item">
          <span class="settings-item__text">Звуки</span>
          <label class="switch">
            <input type="checkbox" class="toggle-sound" id="soundToggler" ${obj.toggleSound}>
            <span class="slider"></span>
          </label>
        </div>
        <div class="settings__progr">
          <span class="volume"></span>
          <input class="progress vol-progr" id="volProgr" type="range" value=${obj.volume} step="1" disabled>
          <span class="volume vol-up"></span>
        </div>
        <div class="settings__item">
          <span class="settings-item__text">Игра на время</span>
          <label class="switch">
            <input type="checkbox" class="toggle-timer" id="timerToggler" ${obj.toggleTimer}>
            <span class="slider"></span>
          </label>
        </div>
        <div class="settings__progr">
          <input class="progress time-progr" id="timeProgr" type="range" min="5" max="30" value=${obj.time} step="5" disabled>
          <span class="time-dig">${obj.time} сек.</span>
        </div>
        <button class="settings__back text-btn" id="backBtn">назад</button>
      </div>
    `;
    this.toggleSound = obj.toggleSound;
    this.volume = obj.volume;
    this.toggleTimer = obj.toggleTimer;
    this.time = obj.time;
  }

  render(elem) {
    elem.innerHTML = this.template;
    this.renderOpt();
  }

  renderOpt(obj = this) {
    const volProgr = document.querySelector('.vol-progr');
    const timeProgr = document.querySelector('.time-progr');
    const timeDig = document.querySelector('.time-dig');

    if (obj.toggleSound === 'checked') {
      volProgr.disabled = false;
      volProgr.style.background = `
        linear-gradient(to right, #FDAC53 0%, #FDAC53 ${obj.volume}%, #c4c4c4 ${obj.volume}%, #c4c4c4 100%)`;
    } else volProgr.disabled = true;

    if (obj.toggleTimer === 'checked') {
      timeProgr.disabled = false;
      timeProgr.style.background = `
        linear-gradient(to right, #FDAC53 0%, #FDAC53 ${(obj.time - 5) * 4}%, #c4c4c4 ${(obj.time - 5) * 4}%, #c4c4c4 100%)`;
    } else timeProgr.disabled = true;

    timeDig.textContent = `${obj.time} сек.`;
  }
}