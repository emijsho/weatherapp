function showWeatherDetails(response) {
  console.log(response);
  document.querySelector(
    "#location"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} Windspeed`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}% Humidity`;
  document.querySelector(
    "#location"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
}
function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "3dce9b1c66837262a25b3f448d354a76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
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
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayTime = document.querySelector("h3");
dayTime.innerHTML = `${day} / ${hours}:${minutes}`;
//submit search form
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
