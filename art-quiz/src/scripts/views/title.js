export default class ViewTitle {
  constructor(isFirstLoad = false) {
    this.isFirstLoad = isFirstLoad;
    this.template = `
      <div class="title">
        <div class="title__wrapper">
          <h1><span class="h1-begin">Art</span>Quiz</h1>
          <button
            data-cat-type="Художники"
            class="text-btn"
            id="artCatBtn"
          >
          Викторина "Художники"
          </button>
          <button
            data-cat-type="Картины"
            class="text-btn"
            id="paintCatBtn"
          >
          Викторина "Картины"
          </button>
        </div>
        <footer class="footer">
          <a
            class="footer__link-course"
            href="https://rs.school/js/"
            target="_blank"
            title="front-end JS course"
            rel="noopener noreferrer"
          ></a>
          <p class="footer-year">© 2021</p>
          <a
            class="footer__link-github"
            href="https://github.com/VadimBakunovich"
            target="_blank"
            title="follow me on github"
            rel="noopener noreferrer"
          ></a>
          <button class="footer__settings" id="settingsBtn" title="settings"></button>
        </footer>
      </div>
    `;
  }

  render(layer1, layer2) {
    if (this.isFirstLoad) {
      layer2.innerHTML = this.template;
    } else if (layer1.innerHTML && !this.isFirstLoad) {
      layer2.innerHTML = this.template;
      layer1.className = 'layer1 back noClick';
      layer2.className = 'layer2 front noClick';
    } else {
      layer1.innerHTML = this.template;
      layer2.className = 'layer2 back noClick';
      layer1.className = 'layer1 front noClick';
    }
  }
}