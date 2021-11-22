export default class ViewPaintQuest {
  constructor(data) {
    this.lapStatus = data.lapStatus;
    this.timerState = data.timerState;
    this.timeLeft = data.timeLeft > 9 ? `0:${data.timeLeft}` : `0:0${data.timeLeft}`;
    this.template = `
      <div class="q-paint">
        <div class="q-paint__wrapper">
          <p class="q-paint__text">Какую из этих картин написал ${data.author}?</p>
          <div class="paint-answ">
            <img
              data-author="${data.answer0.author}"
              class="paint-answ__btn answ-btn"
              src="./assets/img/${data.answer0.imageNum}.webp"
              alt="painting"
            >
            <img
              data-author="${data.answer1.author}"
              class="paint-answ__btn answ-btn"
              src="./assets/img/${data.answer1.imageNum}.webp"
              alt="painting"
            >
            <img
              data-author="${data.answer2.author}"
              class="paint-answ__btn answ-btn"
              src="./assets/img/${data.answer2.imageNum}.webp"
              alt="painting"
            >
            <img
              data-author="${data.answer3.author}"
              class="paint-answ__btn answ-btn"
              src="./assets/img/${data.answer3.imageNum}.webp"
              alt="painting"
            >
          </div>
        </div>
        <ul class="status paint-status">
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