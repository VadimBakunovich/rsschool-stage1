import ViewArtQuest from '../views/art-quest';
import ViewPaintQuest from '../views/paint-quest';
import Answer from './answer';

export default class Question {
  static shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    } return arr;
  }

  static getRndIdx(arrLength) {
    return Math.floor(Math.random() * arrLength);
  }

  constructor(state) {
    this.state = state;
    this.soundState = state.settings.toggleSound;
    this.timerState = state.settings.toggleTimer;
    this.time = state.settings.time;
    this.timeLeft = state.currData.timeLeft;
    this.quizType = state.currData.quizType;
    this.lapStatus = state.currData.lapStatus;
    this.db = state.db;
    this.rightAnsw = state.paintData;
    this.author = state.paintData.author;
    this.imageNum = +state.paintData.imageNum;
    this.questData = {}; // объект данных для ArtQuest и PaintQuest Views
  }

  fillAnswObj(arr, rightAnsw) {
    const answers = [];
    answers.push(rightAnsw);
    answers.push(Question.shuffle(arr)[Question.getRndIdx(arr.length)]); // ультра
    answers.push(Question.shuffle(arr)[Question.getRndIdx(arr.length)]); // рандомный
    answers.push(Question.shuffle(arr)[Question.getRndIdx(arr.length)]); // вариант ответа
    Question.shuffle(answers).map((i, idx) => this.questData[`answer${idx}`] = i);
  }

  createQuest(layer1, layer2) {
    this.questData.lapStatus = [...this.lapStatus];
    this.questData.lapStatus.push('current'); // добавляем в массив текущее состояние
    
    if (this.quizType === 'Художники') {
      this.questData.imgNum = this.imageNum;
      let acceptOpt = this.db.map(i => i.author); // массив авторов картин
      acceptOpt = acceptOpt.filter(i => i !== this.author); // массив допустимых ответов
      acceptOpt = Array.from(new Set(acceptOpt)); // убираем повторения авторов
      this.fillAnswObj(acceptOpt, this.author);
      const artQuest = new ViewArtQuest(this.questData);
      artQuest.render(layer1, layer2);
    }

    if (this.quizType === 'Картины') {
      this.questData.author = this.author;
      const acceptOpt = this.db.filter(i => i.author !== this.author);
      this.fillAnswObj(acceptOpt, this.rightAnsw);
      const paintQuest = new ViewPaintQuest(this.questData);
      paintQuest.render(layer1, layer2);
    }
    if (this.timerState === 'checked') this.runTimer();
  }

  runTimer() {
    if (this.timeLeft) {
      ViewArtQuest.renderTimer(this.timeLeft, this.time);
      this.timeLeft--;
      window.quizTimer = setTimeout(this.runTimer.bind(this), 1000);
    } else {
      ViewArtQuest.renderTimer(this.timeLeft, this.time);
      const answPopup = document.querySelector('.answ-popup');
      const answer = new Answer(this.state);
      answer.checkAnswer('Время истекло', answPopup);
    }
  }
}