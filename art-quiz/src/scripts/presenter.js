import Model from './model';
import ViewTitle from './views/view-title';
import ViewSettings from './views/view-settings';
import ViewCategory from './views/view-category';

const root = document.querySelector('.root');
const appState = new Model();
const startPage = new ViewTitle();

class Sound {
  constructor(url) {
    this.audio = new Audio(url);
  }

  play() {
    this.audio.volume = appState.settings.volume / 100;
    this.audio.play();
  }

  pause() { this.audio.pause(); }
}

const clickSound = new Sound('../assets/sounds/click.ogg');

const observer = new MutationObserver(() => {
  const artCatPage = new ViewCategory('Художники', appState.artQuest);
  const paintCatPage = new ViewCategory('Картины', appState.paintQuest);
  const settingsPage = new ViewSettings(appState.settings);
  const backBtn = document.querySelector('.settings__back');

  document.addEventListener('click', e => {
    switch (e.target.id) {
      case 'artCatBtn':
        artCatPage.render(root);
        break;
      case 'paintCatBtn':
        paintCatPage.render(root);
        break;
      case 'settingsBtn':
        settingsPage.render(root);
        break;
      case 'backBtn':
      case 'homeBtn':
        startPage.render(root);
        break;
      default: break;
    }
  });

  if (backBtn) {
    const soundToggler = document.querySelector('.toggle-sound');
    const volProgr = document.querySelector('.vol-progr');
    const timerToggler = document.querySelector('.toggle-timer');
    const timeProgr = document.querySelector('.time-progr');

    soundToggler.onchange = () => {
      volProgr.disabled = !soundToggler.checked;
      appState.settings.toggleSound = soundToggler.checked ? 'checked' : '';
      settingsPage.renderOpt(appState.settings);
    };

    volProgr.onchange = () => {
      appState.settings.volume = volProgr.value;
      settingsPage.renderOpt(appState.settings);
    };

    timerToggler.onchange = () => {
      timeProgr.disabled = !timerToggler.checked;
      appState.settings.toggleTimer = timerToggler.checked ? 'checked' : '';
      settingsPage.renderOpt(appState.settings);
    };

    timeProgr.onchange = () => {
      appState.settings.time = timeProgr.value;
      settingsPage.renderOpt(appState.settings);
    };
  }
});

observer.observe(root, { childList: true });

startPage.render(root);

document.addEventListener('click', e => {
  if (appState.settings.toggleSound) {
    switch (e.target.tagName) {
      case 'BUTTON':
      case 'A':
      case 'INPUT': 
        clickSound.play();
        break;
      default: break;
    }
  }
});

window.onunload = () => {
  localStorage.setItem('BVA_settings', JSON.stringify(appState.settings));
  localStorage.setItem('BVA_artQuest', JSON.stringify(appState.artQuest));
  localStorage.setItem('BVA_paintQuest', JSON.stringify(appState.paintQuest));
};