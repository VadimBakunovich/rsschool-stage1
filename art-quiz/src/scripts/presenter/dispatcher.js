import Model from '../model';
import Sounds from '../utils/sounds';
import ViewTitle from '../views/title';
import ViewSettings from '../views/settings';
import ViewResults from '../views/results';
import Quiz from './quiz';
import Question from './question';
import Answer from './answer';
import ViewLapPopup from '../views/lap-popup';

const state = new Model();
state.getDb();
const startPage = new ViewTitle(true);
state.tickSound = new Sounds(state, 'assets/sounds/tick-tick.mp3');

const layer1 = document.querySelector('.layer1');
const layer2 = document.querySelector('.layer2');
const answPopup = document.querySelector('.answ-popup');
const lapPopup = document.querySelector('.lap-popup');

startPage.render(layer1, layer2);

document.addEventListener('click', e => {
  if (window.scrollY) window.scroll(0, 0); // bugfix для анимации при скролле

  if (e.target.id === 'backBtn' || e.target.id === 'homeBtn') {
    clearTimeout(window.quizTimer);
    state.tickSound.stop();
    const titlePage = new ViewTitle();
    titlePage.render(layer1, layer2);
  } // переход к титульной странице

  if (e.target.id === 'settingsBtn') {
    const settings = new ViewSettings(state.settings);
    settings.render(layer1, layer2);
  } // переход к настройкам

  if (e.target.id === 'artCatBtn' || e.target.id === 'paintCatBtn') {
    state.currData.quizType = e.target.dataset.catType;
    const quiz = new Quiz(state);
    quiz.showCategories(layer1, layer2);
  } // выбор типа викторины и переход к категориям

  if (e.target.id === 'categBtn') {
    clearTimeout(window.quizTimer);
    state.tickSound.stop();
    const quiz = new Quiz(state);
    quiz.showCategories(layer1, layer2);
  } // возврат к категориям

  // переход к вопросу категории или к итогу раунда
  if (e.target.dataset.catNum || e.target.id === 'nextBtn') {
    if (state.settings.toggleTimer) state.tickSound.play(state);
    if (e.target.dataset.catNum) {
      state.currData.questNum = 0; // обнуляем текущее состояние перед началом новой игры
      state.currData.lapStatus = [];
      state.currData.lapRes = [];
      state.paintData = {};
      state.currData.catNum = +e.target.dataset.catNum;
    }
    if (e.target.id === 'nextBtn') state.currData.questNum++;
    if (state.currData.questNum < 10) {
      const rigthAnswIdx = state.currData.quizType === 'Художники'
        ? (state.currData.catNum - 1) * 10 + state.currData.questNum
        : 120 + (state.currData.catNum - 1) * 10 + state.currData.questNum;
      state.paintData = state.db[rigthAnswIdx];
      const question = new Question(state);
      question.createQuest(layer1, layer2);
      answPopup.classList.remove('open');
    } else {
      state.tickSound.stop();
      const lapEndSound = new Sounds(state, 'assets/sounds/lap-end.mp3');
      lapEndSound.play();
      answPopup.classList.remove('open');
      const rightAnsw = state.currData.lapStatus.filter(i => i !== 'wrong');
      const lapEnd = new ViewLapPopup(rightAnsw.length);
      lapEnd.render(lapPopup);
      lapPopup.classList.add('open');
    }
  }

  if (e.target.classList.contains('answ-btn')) { // проверка ответа на вопрос
    clearTimeout(window.quizTimer);
    state.tickSound.stop();
    const answer = new Answer(state);
    answer.checkAnswer(e.target.dataset.author, answPopup, e.target);
    state.currData.lapRes.push(answer.data);
    answPopup.classList.add('open');
  }

  if (e.target.id === 'lapEndBtn') { // переход на страницу категорий после окончания раунда
    if (state.currData.quizType === 'Художники') {
      state.artQuizRes[state.currData.catNum - 1] = state.currData.lapRes;
    } else {
      state.paintQuizRes[state.currData.catNum - 1] = state.currData.lapRes;
    }
    const quiz = new Quiz(state);
    quiz.showCategories(layer1, layer2);
    lapPopup.classList.remove('open');
  }

  if (e.target.dataset.btnNum) { // переход на страницу результатов категории
    const lapRes = state.currData.quizType === 'Художники'
      ? state.artQuizRes[e.target.dataset.btnNum - 1]
      : state.paintQuizRes[e.target.dataset.btnNum - 1];
    const results = new ViewResults(lapRes);
    results.render(layer1, layer2);
  }

  if (e.target.classList.contains('results__item')) { // отображение(сокрытие)
    e.target.lastElementChild.classList.toggle('--show'); // информации о картине
  }

  const clickSound = new Sounds(state, 'assets/sounds/click.mp3');
  switch (e.target.tagName) {
    case 'BUTTON':
    case 'A':
    case 'INPUT': 
    case 'LI':
    case 'IMG':
      clickSound.play();
      break;
    default: break;
  }
});

document.addEventListener('animationend', e => {
  if (e.target.classList.contains('front')) {
    if (e.target.classList.contains('layer1')) {
      layer2.innerHTML = '';
      layer2.className = 'layer2';
      layer1.classList.remove('noClick');
    } else {
      layer1.innerHTML = '';
      layer1.className = 'layer1';
      layer2.classList.remove('noClick');
    }
  }
});

document.addEventListener('keyup', e => {
  const fullScreenEl = document.querySelector('body');
  if (e.code === 'KeyF') {
    if (document.fullscreenElement) document.exitFullscreen();
    else fullScreenEl.requestFullscreen();
  }
});

document.addEventListener('change', e => {
  const settings = new ViewSettings(state.settings);
  const { target } = e;
  switch (target.id) {
    case 'soundToggler':
      state.settings.toggleSound = target.checked ? 'checked' : '';
      settings.renderOpt(state.settings);
      break;
    case 'volProgr':
      state.settings.volume = target.value;
      settings.renderOpt(state.settings);
      break;
    case 'timerToggler':
      state.settings.toggleTimer = target.checked ? 'checked' : '';
      settings.renderOpt(state.settings);
      break;
    case 'timeProgr':
      state.settings.time = target.value;
      state.currData.timeLeft = target.value;
      settings.renderOpt(state.settings);
      break;
    default: break;
  }
});

window.onunload = () => {
  localStorage.setItem('BVA_settings', JSON.stringify(state.settings));
  localStorage.setItem('BVA_artQuizRes', JSON.stringify(state.artQuizRes));
  localStorage.setItem('BVA_paintQuizRes', JSON.stringify(state.paintQuizRes));
};