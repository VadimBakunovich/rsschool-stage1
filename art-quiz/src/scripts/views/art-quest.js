export default class ViewArtQuest {
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
    this.lapStatus = data.lapStatus;
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
          <input class="progress progr-timer" type="range" value="30">
          <button class="categ-btn" id="categBtn"></button>
        </div>
      </div>
    `;
  }

  render(elem) {
    elem.innerHTML = this.template;
    this.renderStatus();
  }

  renderStatus(lapStatus = this.lapStatus) {
    const statusItems = document.querySelectorAll('.status-item');
    lapStatus.map((i, idx) => statusItems[idx].className = `status-item --${i}`);
  }
}