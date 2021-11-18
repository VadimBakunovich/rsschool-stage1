export default class ViewResults {
  constructor(lapRes) {
    this.lapRes = lapRes;
    this.template = `
      <div class="results">
        <div class="results__head">
          <button class="home-btn" id="homeBtn"></button>
          <p class="results-head__text">Результаты</p>
          <button class="categ-btn" id="categBtn"></button>
        </div>
        <ul class="results__list"></ul>
      </div>
    `;
  }

  render(elem) {
    elem.innerHTML = this.template;
    
    const resList = document.querySelector('.results__list');
    
    this.lapRes.forEach(i => {
      const classActive = i.isRight ? 'active' : '';
      const listItem = `
        <li
          data-result="result"
          class="results__item ${classActive}"
          style="background-image: ${`url(../assets/img/${i.imageNum}.webp)`}"
        >
          <div class="res-item__wrapper">
            <p class="res-item__name">${i.name}</p>
            <p class="res-item__author">${i.author}</p>
            <p class="res-item__year">${i.year}</p>
          </div>
        </li>
      `;
      resList.innerHTML += listItem;
    });
    
  }
}