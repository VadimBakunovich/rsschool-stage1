export default class ViewTitle {
  constructor() {
    this.template = `
      <div class="title">
        <div class="title__wrapper">
          <h1><span class="h1-begin">Art</span>Quiz</h1>
          <button class="artist-btn text-btn">Викторина "Художники"</button>
          <button class="paint-btn text-btn">Викторина "Картины"</button>
        </div>
        <footer class="footer">
          <a class="footer__link-course" href="https://rs.school/js/" target="_blank" title="front-end JS course"></a>
          <a class="footer__link-github" href="https://github.com/VadimBakunovich" target="_blank" title="follow me on github"></a>
          <button class="footer__settings"></button>
        </footer>
      </div>
    `;
  }

  render(elem) {
    elem.innerHTML = this.template;
  }
}