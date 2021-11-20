export default class ViewLapPopup {
  constructor(rightAnswSum) {
    this.template = `
      <div class="lap-popup__content">
        <p class="lap-popup__title">Раунд завершён</p>
        <div datares="${rightAnswSum}/10" class="medal"></div>
        <button class="popup__next text-answ__btn" id="lapEndBtn">Продолжить</button>
      </div>
    `;
  }

  render(elem) {
    elem.innerHTML = this.template;
  }
}