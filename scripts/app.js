function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temp");
  displayTemp.innerHTML = `${currentTemp}°C`;

  let humidityLevel = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityLevel.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  windSpeed.innerHTML = `Wind Speed: ${wind} km/h`;

  let descr = document.querySelector("h3");
  let description = response.data.weather[0].description;
  descr.innerHTML = `${description}`;

  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
}

function currentLocation(position) {
  let apiKey = "5e822b1f123b2af45eff6380d0a24de6";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let locButton = document.querySelector("#loc");
locButton.addEventListener("click", currentPosition);

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  let apiKey = "5e822b1f123b2af45eff6380d0a24de6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
