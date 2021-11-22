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
    const resList = document.querySelector('.results__list');
    
    this.lapRes.forEach(i => {
      const classActive = i.classWrong ? '' : 'active';
      const listItem = `
        <li
          class="results__item ${classActive}"
          style="background-image: ${`url(../assets/img/${i.imageNum}.webp)`}"
        >
          <a
            class="res-item__download"
            href="/assets/img/${i.imageNum}full.webp"
            download
            title="download image"
          ></a>
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