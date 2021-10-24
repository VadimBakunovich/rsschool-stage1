const getWeather = (city, lang) => {
  const humidLang = lang === 'en' ? 'Humidity: ' : 'Влажность: ';
  const windSpdLang = lang === 'en' ? 'Wind speed: ' : 'Скорость ветра: ';
  const speedMetric = lang === 'en' ? ' m/s' : ' м/с';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=5538bd69cb63701d95409db4f6982484&units=metric`)
  .then(response => response.json())
  .then(obj => {
    if (obj.cod > 299) {
      weatherIcon.className = 'weather-icon owf';
      temperature.textContent = '';
      weatherDescr.textContent = '';
      humidity.textContent = '';
      wind.textContent = '';
      cityError.textContent = 'Error: ' + obj.message;
    }
    else {
      cityError.textContent = '';
      weatherIcon.classList.add(`owf-${obj.weather[0].id}`);
      temperature.textContent = Math.round(obj.main.temp) + '°C';
      weatherDescr.textContent = obj.weather[0].description;
      humidity.textContent = humidLang + obj.main.humidity + '%';
      wind.textContent = windSpdLang + Math.round(obj.wind.speed) + speedMetric;
    }
  });
}
if (localStorage.city) inputCity.value = localStorage.getItem('city');
else inputCity.value = lang === 'ru' ? 'Минск' : 'Minsk';

getWeather(inputCity.value, lang);

inputCity.onchange = _ => {
  getWeather(inputCity.value, lang);
  localStorage.setItem('city', inputCity.value);
}
btnEn.addEventListener('click', _ => {
  if (inputCity.value === 'Минск') inputCity.value = 'Minsk';
  getWeather(inputCity.value, lang);
});

btnRu.addEventListener('click', _ => {
  if (inputCity.value === 'Minsk') inputCity.value = 'Минск';
  getWeather(inputCity.value, lang)
});