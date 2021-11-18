export default class ViewArtQuest {
  constructor(data) {
    this.lapRes = data.lapRes;
    this.template = `
      <div class="q-art">
        <div class="q-art__wrapper">
          <p class="q-art__text">Кто автор этой картины?</p>
          <div
            class="q-art__img"
            style="background-image: ${`url(../assets/img/${data.imgNum}full.webp)`}"
          ></div>
          <div class="text-answ">
            <button data-answ-num="1" class="text-answ__btn answ-btn">${data.answer0}</button>
            <button data-answ-num="2" class="text-answ__btn answ-btn">${data.answer1}</button>
            <button data-answ-num="3" class="text-answ__btn answ-btn">${data.answer2}</button>
            <button data-answ-num="4" class="text-answ__btn answ-btn">${data.answer3}</button>
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