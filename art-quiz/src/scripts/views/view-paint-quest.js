export default class ViewPaintQuest {
  static renderTimer(timeLeft, time) {
    const timerProgress = document.querySelector('.progr-timer');
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
    this.lapRes = data.lapRes;
    this.template = `
      <div class="q-paint">
        <div class="q-paint__wrapper">
          <p class="q-paint__text">Какую из этих картин написал ${data.author}?</p>
          <div class="paint-answ">
            <button
              data-author="${data.answer0.author}"
              class="paint-answ__btn answ-btn"
              style="background-image: ${`url(../assets/img/${data.answer0.imageNum}full.webp)`}"
            ></button>
            <button
              data-author="${data.answer1.author}"
              class="paint-answ__btn answ-btn"
              style="background-image: ${`url(../assets/img/${data.answer1.imageNum}full.webp)`}"
            ></button>
            <button
              data-author="${data.answer2.author}"
              class="paint-answ__btn answ-btn"
              style="background-image: ${`url(../assets/img/${data.answer2.imageNum}full.webp)`}"
            ></button>
            <button
              data-author="${data.answer3.author}"
              class="paint-answ__btn answ-btn"
              style="background-image: ${`url(../assets/img/${data.answer3.imageNum}full.webp)`}"
            ></button>
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
          <input class="progress progr-timer" id="timer" type="range" min="0" max="30" value="30" step="1">
          <button class="categ-btn" id="categBtn"></button>
        </div>
      </div>
    `;
  }

  render(elem) {
    elem.innerHTML = this.template;
    this.renderStatus();
  }

  renderStatus(lapRes = this.lapRes) {
    const statusItems = document.querySelectorAll('.status-item');
    lapRes.map((i, idx) => statusItems[idx].className = `status-item --${i}`);
  }
}