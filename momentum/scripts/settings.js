let lang = 'ru';

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