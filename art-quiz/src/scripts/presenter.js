import ViewTitle from './views/view-title';
import ViewSettings from './views/view-settings';

const titlePage = new ViewTitle();
const settingsPage = new ViewSettings();

const root = document.querySelector('.root');

const observer = new MutationObserver(() => {
  const settingsBtn = document.querySelector('.footer__settings');
  const backBtn = document.querySelector('.settings__back');
  if (settingsBtn) {
    settingsBtn.onclick = () => settingsPage.render(root);
  }
  if (backBtn) {
    backBtn.onclick = () => titlePage.render(root);
  }
});

observer.observe(root, { childList: true });

titlePage.render(root);

// class App {
//   constructor(view, state) {

//   }
// }