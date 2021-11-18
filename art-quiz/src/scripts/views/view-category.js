export default class ViewCategory {
  constructor(quizType, quizRes) {
    this.template = `
      <div class="categ">
        <div class="categ__head">
          <p class="categ-head__text">${quizType}</p>
          <button class="home-btn" id="homeBtn"></button>
        </div>
        <ul class="categ__list"></ul>
      </div>
    `;
    this.quizType = quizType;
    this.quizRes = quizRes;
  }

  render(elem) {
    elem.innerHTML = this.template;
    
    const categories = document.querySelector('.categ__list');
    const shift = this.quizType === 'Художники' ? 0 : 120;

    this.quizRes.forEach((item, idx) => {
      const activeClass = item.length ? 'active' : '';
      const rightAnswNum = item.length
        ? item.reduce((acc, el) => (el.isRight ? acc + 1 : acc), 0)
        : 0;
      const listItem = `
        <li
          data-cat-num="${idx + 1}"
          data-score="${rightAnswNum}/10"
          class="categ__item ${activeClass}"
          style="background-image: ${`url(../assets/img/${(shift + (idx + 1) * 10) - 1}.webp)`}"
        >
          <button class="categ-item__btn">Результаты</button>
        </li>
      `;
      categories.innerHTML += listItem;
    });
  }
}