export default class ViewArtQuest {
  static renderTimer(timeLeft, time) {
    const timerProgress = document.querySelector('.progr-timer');
    const timeLeftCount = document.querySelector('.time-left');
    timeLeftCount.textContent = timeLeft > 9 ? `0:${timeLeft}` : `0:0${timeLeft}`;
    timerProgress.max = time;
    timerProgress.value = timeLeft;
    const coeff = (100 * timeLeft) / time;
    if (timeLeft > 5) {
      timerProgress.style.background = `
        linear-gradient(to right, #006B54 0%, #006B54 ${coeff}%, #c4c4c4 ${coeff}%, #c4c4c4 100%)
      `;
    } else {
      timerProgress.style.background = `
        linear-gradient(to right, #A2242F 0%, #A2242F ${coeff}%, #c4c4c4 ${coeff}%, #c4c4c4 100%)
      `;
    }
  }

  constructor(data) {
    this.lapStatus = data.lapStatus;
    this.timerState = data.timerState;
    this.timeLeft = data.timeLeft > 9 ? `0:${data.timeLeft}` : `0:0${data.timeLeft}`;
    this.template = `
      <div class="q-art">
        <div class="q-art__wrapper">
          <p class="q-art__text">Кто автор этой картины?</p>
          <div
            class="q-art__img"
            style="background-image: ${`url(../assets/img/${data.imgNum}full.webp)`}"
          ></div>
          <div class="text-answ">
            <button
              data-author="${data.answer0}"
              class="text-answ__btn answ-btn"
            >${data.answer0}</button>
            <button
              data-author="${data.answer1}"
              class="text-answ__btn answ-btn"
            >${data.answer1}</button>
            <button
              data-author="${data.answer2}"
              class="text-answ__btn answ-btn"
            >${data.answer2}</button>
            <button
              data-author="${data.answer3}"
              class="text-answ__btn answ-btn"
            >${data.answer3}</button>
          </div>
        </div>
        <ul class="status">
          <li class="status-item"></li>
          <li class="status-item"></li>
          <li class="status-item"></li>
          <li class="status-item"></li>
          <li class="status-item"></li>
          <li class="status-item"></li>
          <li class="status-item"></li>
          <li class="status-item"></li>
          <li class="status-item"></li>
          <li class="status-item"></li>
        </ul>
        <div class="q__controls">
          <button class="home-btn" id="homeBtn"></button>
          <div class="timer-wrapper">
            <input class="progress progr-timer" type="range" value="30">
            <span class="time-left">${this.timeLeft}</span>
          </div>
          <button class="categ-btn" id="categBtn"></button>
        </div>
      </div>
    `;
    this.layer = null;
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
    if (layer1.classList.contains('front')) this.layer = layer1;
    else this.layer = layer2;
    this.renderStatus();
    const timerWrp = this.layer.querySelector('.timer-wrapper');
    if (this.timerState) timerWrp.style.display = 'flex';
  }

  renderStatus(lapStatus = this.lapStatus) {
    const statusEl = this.layer ? this.layer : document;
    const statusItems = statusEl.querySelectorAll('.status-item');
    lapStatus.map((i, idx) => statusItems[idx].className = `status-item --${i}`);
  }
}