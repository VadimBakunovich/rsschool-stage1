import Model from './model';
import Sounds from './utils/sounds';
import ViewTitle from './views/view-title';
import ViewSettings from './views/view-settings';
import ViewCategory from './views/view-category';
import ViewArtQuest from './views/view-art-quest';
import ViewAnswPopup from './views/view-answ-popup';

const root = document.querySelector('.root');
const answPopup = document.querySelector('.answ-popup');
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

  constructor(state) {
    this.db = state.db;
    this.artQuizRes = state.artQuizRes;
    this.paintQuizRes = state.paintQuizRes;
    this.type = state.quizType;
    this.currData = state.currData;
  }

  startQuiz(catNum) {
    const rigthAnswIdx = (catNum - 1) * 10; // индекс правильного ответа
    const questData = {}; // объект данных для ViewArtQuest
    const {
      author, name, year, imageNum, 
    } = this.db[rigthAnswIdx];
    const answers = []; // массив вариантов ответов
    questData.imgNum = rigthAnswIdx;
    
    let acceptOpt = this.db.map(i => i.author); // массив авторов картин
    acceptOpt = acceptOpt.filter(i => i !== author); // массив допустимых ответов
    acceptOpt = Array.from(new Set(acceptOpt)); // убираем повторения авторов

    if (this.type === 'Художники') {
      answers.push(author);
      answers.push(Quiz.shuffle(acceptOpt)[Quiz.getRndIdx(acceptOpt.length)]); // ультра
      answers.push(Quiz.shuffle(acceptOpt)[Quiz.getRndIdx(acceptOpt.length)]); // рандомный
      answers.push(Quiz.shuffle(acceptOpt)[Quiz.getRndIdx(acceptOpt.length)]); // вариант
      Quiz.shuffle(answers).map((i, idx) => questData[`answer${idx}`] = i);
      const artQuest = new ViewArtQuest(questData);
      artQuest.render(root);
    }
    appState.currData.author = author;
    appState.currData.name = name;
    appState.currData.year = year;
    appState.currData.imgNum = imageNum;
  }

  checkQuest(author) {
    const data = this.currData;
    if (author === data.author) {
      data.classWrong = '';
      data.result = 'Верно';
      const rightAnswPopup = new ViewAnswPopup(data);
      rightAnswPopup.render(answPopup);
    } else {
      data.classWrong = 'wrongAnsw';
      data.result = 'Не верно';
      const rightAnswPopup = new ViewAnswPopup(data);
      rightAnswPopup.render(answPopup);
    }
    answPopup.classList.add('open');
  }
}

root.addEventListener('click', e => {
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
      if (appState.quizType === 'Художники') {
        artCatPage = new ViewCategory(appState.quizType, appState.artQuizRes);
        artCatPage.render(root);
      } else {
        paintCatPage = new ViewCategory(appState.quizType, appState.paintQuizRes);
        paintCatPage.render(root);
      } break;
    default: break;
  }

  if (e.target.dataset.catNum) {
    const quiz = new Quiz(appState);
    quiz.startQuiz(e.target.dataset.catNum);
  }

  if (e.target.dataset.answNum) {
    const quiz = new Quiz(appState);
    quiz.checkQuest(e.target.textContent);
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
  localStorage.setItem('BVA_artQuest', JSON.stringify(appState.artQuest));
  localStorage.setItem('BVA_paintQuest', JSON.stringify(appState.paintQuest));
};