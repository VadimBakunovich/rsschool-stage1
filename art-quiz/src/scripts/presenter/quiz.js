import ViewCategories from '../views/categories';

export default class Quiz {
  constructor(state) {
    this.quizType = state.currData.quizType;
    this.artQuizRes = state.artQuizRes;
    this.paintQuizRes = state.paintQuizRes;
  }

  showCategories(layer1, layer2) {
    const quizRes = this.quizType === 'Художники'
      ? this.artQuizRes
      : this.paintQuizRes;
    const categories = new ViewCategories(this.quizType, quizRes);
    categories.render(layer1, layer2);
  }
}