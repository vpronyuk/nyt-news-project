const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const weatherIcon = document.querySelector('.weather-icon');
const dateEl = document.querySelector('.date');
const weekDay = document.querySelector(`.week-day`);
const monthAndYear = document.querySelector(`.month-year`);
const weatherCard = document.querySelector(`.weather-card`);
const weekWeatherBtn = document.querySelector(`week-weather-btn`);
const API_KEY = 'e47ed3661eb61aefd3a2374eeeb0d76d';

function getWeatherData(latitude, longitude) {
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  fetch(BASE_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(error);
      }
      return response.json();
    })
    .then(data => {
      const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      cityName.textContent = data.name;
      temperature.innerHTML = `${Math.round(data.main.temp)}&deg`;
      description.textContent = data.weather[0].description;
      weatherIcon.setAttribute('src', iconUrl);
      // console.log(cityName);
    })
    .catch(error => {
      console.log(error);
    });
}

function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeatherData(latitude, longitude);
}

function errorCallback() {
  const urlKyiv = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&units=metric&appid=${API_KEY}`;
  fetch(urlKyiv)
    .then(response => {
      if (!response.ok) {
        throw new Error(error);
      }
      return response.json();
    })
    .then(data => {
      const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      cityName.textContent = `Kyiv`;
      temperature.innerHTML = `${Math.round(data.main.temp)}&deg`;
      description.textContent = data.weather[0].description;
      weatherIcon.setAttribute('src', iconUrl);
    })
    .catch(error => {
      console.error(error);
    });
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

function displayDate() {
  const date = new Date();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  weekDay.textContent = dayOfWeek;
  monthAndYear.textContent = `${dayOfMonth} ${month} ${year}`;
}

displayDate();

// weekWeatherBtn.addEventListener(`submit`, getWeekWeather);

function getWeekWeather() {
  //
}
