function showWeatherDetails(response) {
  console.log(response);
  console.log(response.data.name);
  document.querySelector(
    "#location"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}MPH`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#celcius-link").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  let localTime = new Date(response.data.dt * 1000);
  console.log(response.data.dt);
  let localHours = localTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let localMinutes = localTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  document.querySelector(
    "#local-timeDay"
  ).innerHTML = `Local Time: ${localHours}:${localMinutes}`;
  document
    .querySelector("#weather-app-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  displayForecast(response.data.name);
}

function updateIcon() {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "494f3181eb1oe9bfae0t4f2214913d5b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherDetails);
}
function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "3dce9b1c66837262a25b3f448d354a76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeatherDetails);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
// location search bar.
function search(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#searchCityInput");
  searchCity(searchCityInput.value);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "3dce9b1c66837262a25b3f448d354a76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherDetails);
}
function getForecast(city) {
  let units = "metric";
  let apiKey = "494f3181eb1oe9bfae0t4f2214913d5b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response);
  let forcastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";
  forcastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
<div class="forecast-day">${day}</div>
<div class="forecast-icon"></div>
<div class="forecast temperature">
<span class="forecast-temperature-max"><strong>High</strong></span>
<span class="forecast-temperature-min">Low</span>
</div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

//date and hours
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let year = now.getFullYear();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayTime = document.querySelector("#timeDay");
dayTime.innerHTML = `${day} ${month} ${year} / ${hours}:${minutes}`;
//submit search form
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

searchCity("Boston");
