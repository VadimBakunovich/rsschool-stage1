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

console.log(`
Результаты самооценки:

1. Часы и календарь +15
2. Приветствие +10
3. Смена фонового изображения +20
4. Виджет погоды +15
5. Виджет цитата дня +10
6. Аудиоплеер +15
7. Продвинутый аудиоплеер (реализуется без использования библиотек) +20
8. Перевод приложения на два языка (en/ru) +15
9. Получение фонового изображения от API +10
10. Настройки приложения +20
11. Дополнительный функционал на выбор (ToDo List - список дел) +10

Итого: 160 баллов.

Дополнительно:

1. Аудиоплеер: при нажатии mute запоминается громкость до нажатия и возвращается после отмены mute
2. Приветствие: после ввода имени автоматически добавляется восклицательный знак
3. Цитаты: в случае отказа API реализовано получение цитат из JSON-файла с цитатами
4. Фоновые изображения: В случае отказа любого из API реализовано получение изображений из резервного API Pixels,
    при этом все требования к получаемым изображениям соответствуют ТЗ

Важное замечание: получение фонового изображения по API требует времени от 2 до 5 сек. Прошу отнестись с пониманием.

Если будут вопросы, прошу написать мне в discord: VadimBakunovich#0228
Благодарю за проверку моей работы!
`);