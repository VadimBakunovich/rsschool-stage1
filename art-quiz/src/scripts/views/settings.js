export default class ViewSettings {
  constructor(data) {
    this.data = data;
    this.template = `
      <div class="settings">
        <p class="settings__title">настройки</p>
        <div class="settings__item">
          <span class="settings-item__text">Звуки</span>
          <label class="switch">
            <input type="checkbox" class="toggle-sound" id="soundToggler" ${data.toggleSound}>
            <span class="slider"></span>
          </label>
        </div>
        <div class="settings__progr --mb">
          <span class="volume"></span>
          <input class="progress vol-progr" id="volProgr" type="range" value="${data.volume}">
          <span class="volume vol-up"></span>
        </div>
        <div class="settings__item">
          <span class="settings-item__text">Игра на время</span>
          <label class="switch">
            <input type="checkbox" class="toggle-timer" id="timerToggler" ${data.toggleTimer}>
            <span class="slider"></span>
          </label>
        </div>
        <div class="settings__progr">
          <input class="progress time-progr" id="timeProgr" type="range" min="5" max="30" value="${data.time}" step="5" disabled>
          <span class="time-dig">${data.time} сек.</span>
        </div>
        <p class="setting__fullscreen">Полноэкранный режим вкл(выкл): клавиша "F"</p>
        <button class="settings__back text-btn" id="backBtn">назад</button>
      </div>
    `;
  }

  render(layer1, layer2) {
    if (layer1.innerHTML) {
      layer2.innerHTML = this.template;
      layer1.className = 'layer1 back noClick';
      layer2.className = 'layer2 front noClick';
    } else {
      layer1.innerHTML = this.template;
      layer2.className = 'layer2 back noClick';
      layer1.className = 'layer1 front noClick';
    }
    this.renderOpt();
  }

  renderOpt(data = this.data) {
    const volProgr = document.querySelector('.vol-progr');
    const timeProgr = document.querySelector('.time-progr');
    const timeDig = document.querySelector('.time-dig');

    if (data.toggleSound === 'checked') {
      volProgr.disabled = false;
      volProgr.style.background = `
        linear-gradient(to right, #FDAC53 0%, #FDAC53 ${data.volume}%, #c4c4c4 ${data.volume}%, #c4c4c4 100%)`;
    } else volProgr.disabled = true;

    if (data.toggleTimer === 'checked') {
      timeProgr.disabled = false;
      timeProgr.style.background = `
        linear-gradient(to right, #FDAC53 0%, #FDAC53 ${(data.time - 5) * 4}%, #c4c4c4 ${(data.time - 5) * 4}%, #c4c4c4 100%)`;
    } else timeProgr.disabled = true;

    timeDig.textContent = `${data.time} сек.`;
  }
}