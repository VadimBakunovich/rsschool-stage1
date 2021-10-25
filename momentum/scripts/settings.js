let lang = localStorage.language ? localStorage.getItem('language') : 'ru';

const translateSettings = lang => {
  if (lang === 'ru') {
    btnEn.classList.remove('highlighted');
    btnRu.classList.add('highlighted');
    langTitle.textContent = 'Язык';
    elemsPlayer.textContent = 'Проигрыватель';
    elemsWeather.textContent = 'Погода';
    elemsTime.textContent = 'Время';
    elemsDate.textContent = 'Дата';
    elemsGreet.textContent = 'Приветствие';
    elemsTodo.textContent = 'Список дел';
    elemsQuote.textContent = 'Цитаты';
    bgSrcTitle.textContent = 'Источник фоновых изображений';
    selTagTxt.textContent = 'Выберите тэг (только для API):';
    selectTag.options[0].textContent = 'время суток';
    selectTag.options[1].textContent = 'природа';
    selectTag.options[2].textContent = 'лес';
    selectTag.options[3].textContent = 'море';
    selectTag.options[4].textContent = 'пляж';
    selectTag.options[5].textContent = 'небо';
    selectTag.options[6].textContent = 'поля';
    selectTag.options[7].textContent = 'луга';
    selectTag.options[8].textContent = 'цветы';
    selectTag.options[9].textContent = 'горы';
    selectTag.options[10].textContent = 'автомобили';
    selectTag.options[11].textContent = 'спорт';
    selectTag.options[12].textContent = 'город';
    selectTag.options[13].textContent = 'еда';
    selectTag.options[14].textContent = 'лошади';
    selectTag.options[15].textContent = 'собаки';
    selectTag.options[16].textContent = 'кошки';
    selectTag.options[17].textContent = 'птицы';
    selectTag.options[18].textContent = 'фильмы';
  } else {
      btnRu.classList.remove('highlighted');
      btnEn.classList.add('highlighted');
      langTitle.textContent = 'Language';
      elemsPlayer.textContent = 'Audio player';
      elemsWeather.textContent = 'Weather';
      elemsTime.textContent = 'Time';
      elemsDate.textContent = 'Date';
      elemsGreet.textContent = 'Greetings';
      elemsTodo.textContent = 'To-do list';
      elemsQuote.textContent = 'Quotes';
      bgSrcTitle.textContent = 'Source of background images';
      selTagTxt.textContent = 'Select tag (only for API):';
      selectTag.options[0].textContent = 'times of day';
      for (let i = 1; i < selectTag.options.length; i++) {
        selectTag.options[i].textContent = selectTag.options[i].value;
      }
    }
}
translateSettings(lang);

btnEn.addEventListener('click', _ => {
  lang = 'en';
  localStorage.setItem('language', 'en');
  translateSettings('en');
});
btnRu.addEventListener('click', _ => {
  lang = 'ru';
  localStorage.setItem('language', 'ru');
  translateSettings('ru');
});

const getTimeOfDay = lang => {
  const objTimeOfDay = {};
  switch(lang) {
    case 'en':
      objTimeOfDay.night = 'night';
      objTimeOfDay.morning = 'morning';
      objTimeOfDay.afternoon = 'afternoon';
      objTimeOfDay.evening = 'evening';
      break;
    case 'ru':
      objTimeOfDay.night = 'ночи';
      objTimeOfDay.morning = 'утро';
      objTimeOfDay.afternoon = 'день';
      objTimeOfDay.evening = 'вечер';
      break;
    default: break;
  }
  const hours = new Date().getHours();
  if (hours < 6) return objTimeOfDay.night;
  else if (hours < 12) return objTimeOfDay.morning;
  else if (hours < 18) return objTimeOfDay.afternoon;
  else return objTimeOfDay.evening;
}
// audio player hide handling

if (localStorage.playerClassName) audioPlayer.className = localStorage.getItem('playerClassName');
if (audioPlayer.classList.contains('hidden'))  hidePlayer.checked = false;

hidePlayer.onchange = _ => {
  audioPlayer.classList.toggle('hidden');
  localStorage.setItem('playerClassName', audioPlayer.className);
}
// weather widget hide handling

if (localStorage.weatherClassName) weather.className = localStorage.getItem('weatherClassName');
if (weather.classList.contains('hidden'))  hideWeather.checked = false;

hideWeather.onchange = _ => {
  weather.classList.toggle('hidden');
  localStorage.setItem('weatherClassName', weather.className);
}
// time hide handling

if (localStorage.currTimeClassName) currTime.className = localStorage.getItem('currTimeClassName');
if (currTime.classList.contains('hidden'))  hideTime.checked = false;

hideTime.onchange = _ => {
  currTime.classList.toggle('hidden');
  localStorage.setItem('currTimeClassName', currTime.className);
}
// date hide handling

if (localStorage.currDateClassName) currDate.className = localStorage.getItem('currDateClassName');
if (currDate.classList.contains('hidden'))  hideDate.checked = false;

hideDate.onchange = _ => {
  currDate.classList.toggle('hidden');
  localStorage.setItem('currDateClassName', currDate.className);
}
// handling hiding greetings

if (localStorage.greetingsClassName) greetings.className = localStorage.getItem('greetingsClassName');
if (greetings.classList.contains('hidden'))  hideGreet.checked = false;

hideGreet.onchange = _ => {
  greetings.classList.toggle('hidden');
  localStorage.setItem('greetingsClassName', greetings.className);
}
// to-do list hide handling

if (localStorage.toDoClassName) toDo.className = localStorage.getItem('toDoClassName');
if (toDo.classList.contains('hidden'))  hideToDo.checked = false;

hideToDo.onchange = _ => {
  toDo.classList.toggle('hidden');
  localStorage.setItem('toDoClassName', toDo.className);
}
// quotes hide handling

if (localStorage.quotesClassName) quoteWrp.className = localStorage.getItem('quotesClassName');
if (quoteWrp.classList.contains('hidden'))  hideQuote.checked = false;

hideQuote.onchange = _ => {
  quoteWrp.classList.toggle('hidden');
  localStorage.setItem('quotesClassName', quoteWrp.className);
}
// Bg src

switch (localStorage.bgSrc) {
  case 'Unsplash':
    srcUnsplash.checked = true;
    break;
  case 'Flickr':
    srcFlickr.checked = true;
    break;
  default: break;
}
srcGitHub.checked ? selectTag.disabled = true : selectTag.disabled = false;

if (localStorage.bgTag) selectTag.value = localStorage.getItem('bgTag');

srcGitHub.addEventListener('change', _ => {
  selectTag.disabled = true;
  localStorage.setItem('bgSrc', 'GitHub');
});

srcUnsplash.addEventListener('change', _ => {
  selectTag.disabled = false;
  localStorage.setItem('bgSrc', 'Unsplash');
});

srcFlickr.addEventListener('change', _ => {
  selectTag.disabled = false;
  localStorage.setItem('bgSrc', 'Flickr');
});

selectTag.addEventListener('change', _ => {
  localStorage.setItem('bgTag', selectTag.value);
});

btnSettings.onclick = _ => settings.classList.toggle('hidden');