import Model from './model';
import Sounds from './utils/sounds';
import ViewTitle from './views/view-title';
import ViewSettings from './views/view-settings';
import ViewCategory from './views/view-category';
import ViewArtQuest from './views/view-art-quest';
import ViewPaintQuest from './views/view-paint-quest';
import ViewAnswPopup from './views/view-answ-popup';
import ViewLapPopup from './views/view-lap-popup';
import ViewResults from './views/view-results';

const root = document.querySelector('.root');
const answPopup = document.querySelector('.answ-popup');
const lapPopup = document.querySelector('.lap-popup');
const appState = new Model();
const startPage = new ViewTitle();
let artCatPage = {};
let paintCatPage = {};
let settingsPage = {};

startPage.render(root);

class Quiz {
  static shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    } return arr;
  }

  static getRndIdx(arrLength) {
    return Math.floor(Math.random() * arrLength);
  }

  static showCategories() {
    if (appState.quizType === 'Художники') {
      artCatPage = new ViewCategory(appState.quizType, appState.artQuizRes);
      artCatPage.render(root);
    } else {
      paintCatPage = new ViewCategory(appState.quizType, appState.paintQuizRes);
      paintCatPage.render(root);
    }
  }

  constructor(state) {
    this.db = [...JSON.parse(localStorage.getItem('BVA_db'))];
    this.type = state.quizType;
    this.currData = state.currData;
    this.questData = {}; // объект данных для ViewArtQuest
  }

  createQuest() {
    const { catNum, questNum, lapRes } = this.currData;
    const rigthAnswIdx = this.type === 'Художники'
      ? (catNum - 1) * 10 + questNum
      : 120 + (catNum - 1) * 10 + questNum; // индекс правильного ответа
    const {
      author, name, year, imageNum, 
    } = this.db[rigthAnswIdx];
    const answers = []; // массив вариантов ответов
    this.questData.lapRes = [...lapRes];
    this.questData.lapRes.push('current'); // добавляем в массив результатов текущее состояние

    if (this.type === 'Художники') {
      this.questData.imgNum = rigthAnswIdx;
      let acceptOpt = this.db.map(i => i.author); // массив авторов картин
      acceptOpt = acceptOpt.filter(i => i !== author); // массив допустимых ответов
      acceptOpt = Array.from(new Set(acceptOpt)); // убираем повторения авторов
      answers.push(author);
      answers.push(Quiz.shuffle(acceptOpt)[Quiz.getRndIdx(acceptOpt.length)]); // ультра
      answers.push(Quiz.shuffle(acceptOpt)[Quiz.getRndIdx(acceptOpt.length)]); // рандомный
      answers.push(Quiz.shuffle(acceptOpt)[Quiz.getRndIdx(acceptOpt.length)]); // вариант
      Quiz.shuffle(answers).map((i, idx) => this.questData[`answer${idx}`] = i);
      const artQuest = new ViewArtQuest(this.questData);
      artQuest.render(root);
    }
    if (this.type === 'Картины') {
      this.questData.author = author;
      const acceptOpt = this.db.filter(i => i.author !== author);
      answers.push(this.db[rigthAnswIdx]);
      answers.push(Quiz.shuffle(acceptOpt)[Quiz.getRndIdx(acceptOpt.length)]); // ультра
      answers.push(Quiz.shuffle(acceptOpt)[Quiz.getRndIdx(acceptOpt.length)]); // рандомный
      answers.push(Quiz.shuffle(acceptOpt)[Quiz.getRndIdx(acceptOpt.length)]); // вариант
      Quiz.shuffle(answers).map((i, idx) => this.questData[`answer${idx}`] = i);
      const paintQuest = new ViewPaintQuest(this.questData);
      paintQuest.render(root);
    }
    appState.currData.author = author;
    appState.currData.name = name;
    appState.currData.year = year;
    appState.currData.imgNum = imageNum;
    answPopup.classList.remove('open');
  }

  checkQuest(author) { // проверяем ответ на вопрос и отображаем результат ответа
    const data = this.currData;
    if (author === data.author) {
      data.classWrong = '';
      data.result = 'Верно';
      appState.currData.lapRes.push('right');
      const rightAnswPopup = new ViewAnswPopup(data);
      rightAnswPopup.render(answPopup);
    } else {
      data.classWrong = 'wrongAnsw';
      data.result = 'Не верно';
      appState.currData.lapRes.push('wrong');
      const rightAnswPopup = new ViewAnswPopup(data);
      rightAnswPopup.render(answPopup);
    }
    const artQuest = new ViewArtQuest(this.questData);
    if (appState.currData.lapRes.length === 10) artQuest.renderStatus(appState.currData.lapRes);
    answPopup.classList.add('open');
  }

  updateResults() { // сохраняем результаты раунда в appState
    const { catNum, lapRes } = this.currData;
    const n = +catNum;
    const lapRightAnsw = this.type === 'Художники'
      ? this.db.filter((i, idx) => idx >= (n - 1) * 10 && idx / n < 10)
      : this.db.filter((i, idx) => idx >= 120 + (n - 1) * 10 && idx / (12 + n) < 10);
    lapRes.forEach((i, idx) => lapRightAnsw[idx].isRight = i !== 'wrong');
    if (this.type === 'Художники') appState.artQuizRes[catNum - 1] = lapRightAnsw;
    else appState.paintQuizRes[catNum - 1] = lapRightAnsw;
  }
}

document.addEventListener('click', e => {
  switch (e.target.id) {
    case 'artCatBtn':
      appState.quizType = 'Художники';
      artCatPage = new ViewCategory(appState.quizType, appState.artQuizRes);
      artCatPage.render(root);
      break;
    case 'paintCatBtn':
      appState.quizType = 'Картины';
      paintCatPage = new ViewCategory(appState.quizType, appState.paintQuizRes);
      paintCatPage.render(root);
      break;
    case 'settingsBtn':
      settingsPage = new ViewSettings(appState.settings);
      settingsPage.render(root);
      break;
    case 'backBtn':
    case 'homeBtn':
      startPage.render(root);
      break;
    case 'categBtn':
      Quiz.showCategories();
      break;
    default: break;
  }

  if (e.target.dataset.catNum) {
    appState.currData.catNum = e.target.dataset.catNum;
    appState.currData.questNum = 0;
    appState.currData.lapRes = [];
    const quiz = new Quiz(appState);
    quiz.createQuest();
  }

  if (e.target.classList.contains('answ-btn')) {
    const quiz = new Quiz(appState);
    if (appState.quizType === 'Художники') quiz.checkQuest(e.target.textContent);
    else quiz.checkQuest(e.target.dataset.author);
  }

  if (e.target.id === 'nextBtn') {
    appState.currData.questNum++;
    const quiz = new Quiz(appState);
    if (appState.currData.questNum < 10) quiz.createQuest();
    else {
      const rightAnsw = appState.currData.lapRes.filter(i => i !== 'wrong');
      const lapEnd = new ViewLapPopup(rightAnsw.length);
      answPopup.classList.remove('open');
      lapEnd.render(lapPopup);
      lapPopup.classList.add('open');
    }
  }

  if (e.target.id === 'lapEndBtn') {
    lapPopup.classList.remove('open');
    const quiz = new Quiz(appState);
    quiz.updateResults();
    Quiz.showCategories();
  }
  
  if (e.target.dataset.btnNum) {
    const lapRes = appState.quizType === 'Художники'
      ? appState.artQuizRes[e.target.dataset.btnNum - 1]
      : appState.paintQuizRes[e.target.dataset.btnNum - 1];
    const results = new ViewResults(lapRes);
    results.render(root);
  }

  if (e.target.classList.contains('results__item')) {
    e.target.firstElementChild.classList.toggle('--show');
  }

  if (appState.settings.toggleSound) {
    const clickSound = new Sounds('../assets/sounds/click.ogg', appState.settings.volume);
    switch (e.target.tagName) {
      case 'BUTTON':
      case 'A':
      case 'INPUT': 
      case 'LI':
        clickSound.play();
        break;
      default: break;
    }
  }
});

root.addEventListener('change', e => {
  const { target } = e;
  switch (target.id) {
    case 'soundToggler':
      appState.settings.toggleSound = target.checked ? 'checked' : '';
      settingsPage.renderOpt(appState.settings);
      break;
    case 'volProgr':
      appState.settings.volume = target.value;
      settingsPage.renderOpt(appState.settings);
      break;
    case 'timerToggler':
      appState.settings.toggleTimer = target.checked ? 'checked' : '';
      settingsPage.renderOpt(appState.settings);
      break;
    case 'timeProgr':
      appState.settings.time = target.value;
      settingsPage.renderOpt(appState.settings);
      break;
    default: break;
  }
});

window.onunload = () => {
  localStorage.setItem('BVA_settings', JSON.stringify(appState.settings));
  localStorage.setItem('BVA_artQuizRes', JSON.stringify(appState.artQuizRes));
  localStorage.setItem('BVA_paintQuizRes', JSON.stringify(appState.paintQuizRes));
};