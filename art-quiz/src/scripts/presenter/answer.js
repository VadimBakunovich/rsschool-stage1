import ViewAnswPopup from '../views/answ-popup';
import ViewArtQuest from '../views/art-quest';

export default class Answer {
  constructor(state) {
    this.author = state.paintData.author;
    this.lapStatus = state.currData.lapStatus;
    this.currData = state.currData;
    this.data = state.paintData;
  }

  checkAnswer(author, elem) { // проверяем ответ на вопрос и отображаем результат ответа
    if (author === this.author) {
      this.data.classWrong = '';
      this.data.result = 'Верно';
      this.lapStatus.push('right');
      const rightAnswPopup = new ViewAnswPopup(this.data);
      rightAnswPopup.render(elem);
    } else {
      this.data.classWrong = 'wrongAnsw';
      if (author === 'Время истекло') {
        this.data.result = author;
      } else this.data.result = 'Не верно';
      this.lapStatus.push('wrong');
      const rightAnswPopup = new ViewAnswPopup(this.data);
      rightAnswPopup.render(elem);
    }
    if (this.lapStatus.length === 10) {
      const artQuest = new ViewArtQuest(this.currData);
      artQuest.renderStatus(this.lapStatus);
    }
    elem.classList.add('open');
  }
}