import Model from './model';
import Sounds from './utils/sounds';
import ViewTitle from './views/view-title';
import ViewSettings from './views/view-settings';
import ViewCategory from './views/view-category';

const root = document.querySelector('.root');
const appState = new Model();
const startPage = new ViewTitle();
let artCatPage = {};
let paintCatPage = {};
let settingsPage = {};

startPage.render(root);

root.addEventListener('click', e => {
  switch (e.target.id) {
    case 'artCatBtn':
      artCatPage = new ViewCategory('Художники', appState.artQuest);
      artCatPage.render(root);
      break;
    case 'paintCatBtn':
      paintCatPage = new ViewCategory('Картины', appState.paintQuest);
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
    default: break;
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