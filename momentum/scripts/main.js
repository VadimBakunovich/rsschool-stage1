const getLocale = lang => lang === 'en' ? 'en-US' : 'ru-RU';

const getStartGreet = lang => {
  if (lang === 'en') return 'Good';
  else {
    switch(getTimeOfDay(lang)) {
      case 'ночи': return 'Доброй';
      case 'утро': return 'Доброе';
      case 'день':
      case 'вечер': return 'Добрый';
      default: break;
    }
  }
}
const getDate = _ => {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString(getLocale(lang), options);
}
const timeMonitor = _ => {
  lang === 'ru' ? userName.placeholder = '[Введите имя]': userName.placeholder = '[Enter name]';
  currTime.textContent = new Date().toLocaleTimeString('en-GB');
  if (currDate.textContent !== getDate()) currDate.textContent = getDate();
  if (greeting.textContent !== `${getStartGreet(lang)} ${getTimeOfDay(lang)},`) {
    greeting.textContent = `${getStartGreet(lang)} ${getTimeOfDay(lang)},`;
  }
  setTimeout(timeMonitor, 1000);
};
timeMonitor();

if (localStorage.userName) {
  userName.value = localStorage.getItem('userName') + '!';
  userName.value.length > 2 ? userName.size = userName.value.length - 2 : userName.size = userName.value.length;
}
userName.oninput = _ => {
  if (userName.value) {
    if (userName.value.length > 2) userName.size = userName.value.length - 1;
    else userName.size = userName.value.length;
  } else userName.size = 9;
  localStorage.setItem('userName', userName.value);
}
userName.onchange = _ => userName.value ? userName.value += '!' : '';

//console.log('https://discord.com/channels/516715744646660106/873089666394513429/901725685582790656')