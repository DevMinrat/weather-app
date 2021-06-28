const images = {
  sun: '<div class="weather-icon__wrapper--sun roll-in-right"><img class="weather-icon__img _sun" src="/images/sun.png" alt=""></div>',
  cloud:
    '<div class="weather-icon__wrapper--cloud slide-in-left"><img class="weather-icon__img _cloud-white" src="/images/cloud-white.png" alt=""><img class="weather-icon__img _cloud-dark" src="/images/cloud-dark.png" alt=""></div>',
  clouds:
    '<div class="weather-icon__wrapper--cloud slide-in-left"><img class="weather-icon__img _cloud-white" src="/images/cloud-white.png" alt=""></div>',
  lighting:
    '<div class="weather-icon__wrapper--lighting slide-in-left"><img class="weather-icon__img _lighting" src="/images/lighting.png" alt=""></div>',
  wind: '<div class="weather-icon__wrapper--wind slide-in-right"><img class="weather-icon__img _wind" src="/images/wind.png" alt=""></div>',
  rain: '<div class="weather-icon__wrapper--rain slide-in-left"><img class="weather-icon__img _drop-1" src="/images/drop.png" alt=""><img class="weather-icon__img _drop-2" src="/images/drop.png" alt=""><img class="weather-icon__img _drop-3" src="/images/drop.png" alt=""></div>',
  snow: '<div class="weather-icon__wrapper--snow slide-in-left"><img class="weather-icon__img _snowflake-1" src="/images/snowflake.png" alt=""><img class="weather-icon__img _snowflake-2" src="/images/snowflake.png" alt=""><img class="weather-icon__img _snowflake-3" src="/images/snowflake.png" alt=""></div>',
};

// Elements
const search = document.querySelector("#search");
const weatherIconBox = document.querySelector(".weather-icon");
const sity = document.querySelector(".sity");
const dayName = document.querySelector(".day__name");
const dayDate = document.querySelector(".day__date");
const tempAverage = document.querySelector(".temperature__average");
const tempRangeFrom = document.querySelector(".range-from");
const tempRangeTo = document.querySelector(".range-to");
const weatherDescr = document.querySelector(".weather-descr");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const rain = document.querySelector("#rain");
const snow = document.querySelector("#rain");

function customHttp() {
  return {
    get(url, cb) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.addEventListener("load", () => {
        if (Math.floor(xhr.status / 100) !== 2) {
          cb(`Error. Status code: ${xhr.status}`, xhr);
          return;
        }
        const response = JSON.parse(xhr.responseText);
        cb(null, response);
      });

      xhr.addEventListener("error", () => {
        cb(`Error. Status code: ${xhr.status}`, xhr);
      });

      xhr.send();
    },
  };
}

const http = customHttp();

const weatherService = (function () {
  const apiKey = "9fcc82b3417048f0f7b58aa6dc1ad2b3";

  return {
    currentWeather(sity, cb) {
      http.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${sity}&appid=${apiKey}&units=metric&lang=ru`,
        cb
      );
    },
  };
})();

// events
loadWeather();

function loadWeather() {
  weatherService.currentWeather("Мядель", onGetResponse);
}

function onGetResponse(err, res) {
  if (err) {
    alert(err, "error-msg");
    return;
  }

  console.log(res);

  renderWeather(res.main);
}

function renderWeather(response) {
  tempAverage.textContent = Math.round(response.temp);

  console.log(Math.round(response.temp));
}

weatherIconBox.insertAdjacentHTML("beforeend", images.sun);
