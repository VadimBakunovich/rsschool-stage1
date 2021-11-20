import ViewAnswPopup from '../views/answ-popup';
import ViewArtQuest from '../views/art-quest';
import Sounds from '../utils/sounds';

export default class Answer {
  constructor(state) {
    this.author = state.paintData.author;
    this.lapStatus = state.currData.lapStatus;
    this.currData = state.currData;
    this.data = state.paintData;
    this.tickSound = state.tickSound;
    this.rightAnswSound = new Sounds(state, '../assets/sounds/right.mp3');
    this.wrongAnswSound = new Sounds(state, '../assets/sounds/wrong.mp3');
    this.timeOverSound = new Sounds(state, '../assets/sounds/time-over.mp3');
  }

  checkAnswer(author, elem) { // проверяем ответ на вопрос и отображаем результат ответа
    if (author === this.author) {
      this.data.classWrong = '';
      this.data.result = 'Верно';
      this.lapStatus.push('right');
      const rightAnswPopup = new ViewAnswPopup(this.data);
      rightAnswPopup.render(elem);
      this.rightAnswSound.play();
    } else {
      this.data.classWrong = 'wrongAnsw';
      if (author === 'Время истекло') {
        this.data.result = author;
        this.tickSound.stop();
        this.timeOverSound.play();
      } else this.data.result = 'Не верно';
      this.lapStatus.push('wrong');
      const rightAnswPopup = new ViewAnswPopup(this.data);
      rightAnswPopup.render(elem);
      this.wrongAnswSound.play();
    }
    if (this.lapStatus.length === 10) {
      const artQuest = new ViewArtQuest(this.currData);
      artQuest.renderStatus(this.lapStatus);
    }
    elem.classList.add('open');
  }
}