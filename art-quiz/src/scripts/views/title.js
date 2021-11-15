export default class Title {
  constructor() {
    this.template = `
      <div class="title hidden">
        <div class="title__wrapper">
          <h1><span class="h1-begin">Art</span>Quiz</h1>
          <button class="text-btn">Викторина "Художники"</button>
          <button class="text-btn">Викторина "Картины"</button>
        </div>
        <button class="title__settings"></button>
      </div>
    `;
  }
}