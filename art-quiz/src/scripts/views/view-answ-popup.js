export default class ViewAnswPopup {
  constructor(data) {
    this.template = `
      <div class="answ-popup__content">
        <p class="answ-popup__title ${data.classWrong}">${data.result}!</p>
        <img class="answ-popup__img" src="./assets/img/${data.imgNum}.webp" alt="painting">
        <div class="answ-popup__wrapper">
          <p class="answ-popup__name">${data.name}</p>
          <p class="answ-popup__author">${data.author}</p>
          <p class="answ-popup__year">${data.year}</p>
        </div>
        <button class="popup__next text-answ__btn" id="nextBtn">Продолжить</button>
      </div>
    `;
  }

  render(elem) {
    elem.innerHTML = this.template;
  }
}