let lang = 'en';

const getWeather = (city, lang) => {
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
      humidity.textContent = 'Humidity: ' + obj.main.humidity + '%';
      wind.textContent = 'Wind speed: ' + Math.round(obj.wind.speed) + ' m/s';
    }
  });
}
if (localStorage.city) inputCity.value = localStorage.getItem('city');

getWeather(inputCity.value, lang);

inputCity.onchange = _ => {
  getWeather(inputCity.value, lang);
  localStorage.setItem('city', inputCity.value);
}