export default class ViewCategory {
  constructor(type, arr) {
    this.template = `
      <div class="categ">
        <div class="categ__head">
          <p class="categ-head__text">${type}</p>
          <button class="home-btn" id="homeBtn"></button>
        </div>
        <ul class="categ__list"></ul>
      </div>
    `;
    this.type = type;
    this.catData = arr;
  }

  render(elem) {
    elem.innerHTML = this.template;
    
    const categories = document.querySelector('.categ__list');

    this.catData.forEach((item, idx) => {
      const activeClass = item.length ? 'active' : '';
      const rightAnswNum = item.length
        ? item.reduce((el, acc) => (el.isRight ? acc + 1 : acc), 0)
        : 0;
      const listItem = `
        <li dataNum="${idx + 1}" dataScore="${rightAnswNum}/10" class="categ__item ${activeClass}" id="cat${idx}">
          <button class="categ-item__btn">Результаты</button>
        </li>
      `;
      categories.innerHTML += listItem;

      const category = document.getElementById(`cat${idx}`);
      const shift = this.type === 'Художники' ? 0 : 120;
      category.style.backgroundImage = `url(../assets/img/${shift + (idx + 1) * 10}.webp)`;
    });
  }
}