let now = new Date();

function formatDate() {
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let month = months[now.getMonth()];
  let date = now.getDate();

  let todaysDate = `${day}, <br> ${month} ${date}, ${hours}:${minutes}`;
  return todaysDate;
  return `${day} ${formatHours(timestamp)}`;
}
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(new Date());

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function showTemp(response) {
  let todaysTemp = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  todaysTemp.innerHTML = temperature;
  let cityEntered = document.querySelector("#city-entered");
  cityEntered.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#mainIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  function toCelsius(event) {
    event.preventDefault();
    let tempDisplay = document.querySelector("#temp");
    tempDisplay.innerHTML = temperature;
  }

  function toFahrenheit(event) {
    event.preventDefault();
    let tempDisplay = document.querySelector("#temp");
    tempDisplay.innerHTML = Math.round((temperature / 5) * 9 + 32);
  }

  let degreesC = document.querySelector("#degrees-c");
  degreesC.addEventListener("click", toCelsius);

  let degreesF = document.querySelector("#degrees-f");
  degreesF.addEventListener("click", toFahrenheit);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let cityEntered = document.querySelector("#city-entered");
  cityEntered.innerHTML = searchInput.value;
  searchResult(searchInput.value);
}

function searchResult(city) {
  let apiKey = "fc2b2675a903fad5be91075495d02e43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let cityForm = document.querySelector("#city-search");
cityForm.addEventListener("submit", search);

function getLocationTemperature(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "fc2b2675a903fad5be91075495d02e43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function getTemp() {
  navigator.geolocation.getCurrentPosition(getLocationTemperature);
}

let locationSearch = document.querySelector("#current-location");
locationSearch.addEventListener("click", getTemp);
// default city
https: searchCity("Ljubljana");
