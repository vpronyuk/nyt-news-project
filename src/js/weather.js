const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const weatherIcon = document.querySelector('.weather-icon');
const dateEl = document.querySelector('.date');
const weekDay = document.querySelector(`.week-day`);
const monthAndYear = document.querySelector(`.month_year`);
const weatherCard = document.querySelector(`.weather-card`);
const weekWeatherBtn = document.querySelector(`.week-weather-btn`);
const todayWeatherBtn = document.querySelector(`.today-forecast-btn`);
const weekWeatherCard = document.querySelector(`.week-forecast`);
const weekWeatherList = document.querySelector(`.week-forecast-list`);
const API_KEY = 'e47ed3661eb61aefd3a2374eeeb0d76d';

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
      cityName.insertAdjacentHTML(`beforeend`, data.name);
      temperature.innerHTML = `${Math.round(data.main.temp)}&deg`;
      description.textContent = data.weather[0].description;
      weatherIcon.setAttribute('src', iconUrl);
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
      cityName.insertAdjacentHTML(`beforeend`, `Kyiv`);
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
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  weekDay.textContent = dayOfWeek;
  monthAndYear.innerHTML = `${dayOfMonth} ${month} ${year}`;
}

displayDate();

weekWeatherBtn.addEventListener(`click`, () => {
  weatherCard.style.display = 'none';
  weekWeatherCard.style.display = 'block';
  const newApiKey = `494cc86ea4be4942a2ea7eae8a726091`;
  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          reject(error);
        }
      );
    });
  }

  function getWeatherData(location) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${location.latitude}&lon=${location.longitude}&key=${newApiKey}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => data.data.slice(0, 7));
  }

  function displayWeatherData(weatherData) {
    const weekWeatherMarkup = weatherData
      .map(day => {
        const date = new Date(day.valid_date).toLocaleDateString();
        const minTemp = day.min_temp;
        const maxTemp = day.max_temp;
        const descriptionWeek = day.weather.description;
        const iconWeek = day.weather.icon;
        return `
            <li class="icon-item"> 
             <img class="week-weather-icon" src="https://www.weatherbit.io/static/img/icons/${iconWeek}.png">
             <div class="week-weather-item">
              <div class="week-weather-date">${date}</div>
              <div class="week-weather-body">
               <div class="week-weather-temp">${Math.round(
                 minTemp
               )}° / ${Math.round(maxTemp)}°</div>
               <div class="week-weather-desc">${descriptionWeek}</div>
              </div>
             </div>
        </li>`;
      })
      .join('');
    weekWeatherList.innerHTML = weekWeatherMarkup;
  }

  getCurrentLocation()
    .then(location => getWeatherData(location))
    .catch(() => getWeatherData({ latitude: '50.45466', longitude: '30.5238' }))
    .then(weatherData => displayWeatherData(weatherData));
});

todayWeatherBtn.addEventListener(`click`, () => {
  weekWeatherCard.style.display = 'none';
  weatherCard.style.display = 'block';
});
