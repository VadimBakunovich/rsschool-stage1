export default class ViewCategories {
  constructor(quizType, quizRes) {
    this.quizType = quizType;
    this.quizRes = quizRes;
    this.template = `
      <div class="categ">
        <div class="categ__head">
          <p class="categ-head__text">${quizType}</p>
          <button class="home-btn" id="homeBtn"></button>
        </div>
        <ul class="categ__list"></ul>
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
    const categories = document.querySelector('.categ__list');
    const shift = this.quizType === 'Художники' ? 54 : 0;
    this.quizRes.forEach((item, idx) => {
      const activeClass = item.length ? 'active' : '';
      const rightAnswNum = item.length
        ? item.reduce((acc, el) => (el.classWrong ? acc : acc + 1), 0)
        : 0;
      const listItem = `
        <li
          data-cat-num="${idx + 1}"
          data-score="${rightAnswNum}/10"
          class="categ__item ${activeClass}"
          style="background-image: ${`url(assets/img/${(shift + (idx + 1) * 10) - 1}.webp)`}"
        >
          <button data-btn-num="${idx + 1}" class="categ-item__btn">Результаты</button>
        </li>
      `;
      categories.innerHTML += listItem;
    });
  }
}