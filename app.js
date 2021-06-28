const images = {
  sun: '<div class="weather-icon__wrapper--sun roll-in-right"><img class="weather-icon__img _sun" src="/images/sun.png" alt=""></div>',
  cloud:
    '<div class="weather-icon__wrapper--cloud slide-in-left"><img class="weather-icon__img _cloud-white" src="/images/cloud-white.png" alt=""></div>',
  clouds:
    '<div class="weather-icon__wrapper--cloud slide-in-left"><img class="weather-icon__img _cloud-white" src="/images/cloud-white.png" alt=""><img class="weather-icon__img _cloud-dark" src="/images/cloud-dark.png" alt=""></div>',
  lighting:
    '<div class="weather-icon__wrapper--lighting slide-in-left"><img class="weather-icon__img _lighting" src="/images/lighting.png" alt=""></div>',
  wind: '<div class="weather-icon__wrapper--wind slide-in-right"><img class="weather-icon__img _wind" src="/images/wind.png" alt=""></div>',
  rain: '<div class="weather-icon__wrapper--rain slide-in-left"><img class="weather-icon__img _drop-1" src="/images/drop.png" alt=""><img class="weather-icon__img _drop-2" src="/images/drop.png" alt=""><img class="weather-icon__img _drop-3" src="/images/drop.png" alt=""></div>',
  snow: '<div class="weather-icon__wrapper--snow slide-in-left"><img class="weather-icon__img _snowflake-1" src="/images/snowflake.png" alt=""><img class="weather-icon__img _snowflake-2" src="/images/snowflake.png" alt=""><img class="weather-icon__img _snowflake-3" src="/images/snowflake.png" alt=""></div>',
};

//elements
const weatherIconBox = document.querySelector(".weather-icon");
const sityName = document.querySelector(".sity");
const dayName = document.querySelector(".day__name");
const dayDate = document.querySelector(".day__date");
const tempAverage = document.querySelector(".temperature__average");
const tempRangeFrom = document.querySelector(".range-from");
const tempRangeTo = document.querySelector(".range-to");
const weatherDescr = document.querySelector(".weather-descr");
const windData = document.querySelector("#wind");
const humidityData = document.querySelector("#humidity");
const sunriseData = document.querySelector("#sunrise");
const sunsetData = document.querySelector("#sunset");
const rainData = document.querySelector("#rain");
const snowData = document.querySelector("#snow");
const form = document.forms.weatherControls;
const searchInput = form.elements.search;

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
        `http://api.openweathermap.org/data/2.5/weather?q=${sity}&appid=${apiKey}&units=metric&lang=en`,
        cb
      );
    },
  };
})();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loadWeather();
});

document.addEventListener("DOMContentLoaded", () => {
  loadWeather();
});

function loadWeather() {
  let sity = searchInput.value || "Минск";

  weatherService.currentWeather(sity, onGetResponse);
}

function onGetResponse(err, res) {
  if (err) {
    console.log(err, "error-msg");
    return;
  }
  console.log(res);
  renderWeather(res, images);
}

function renderWeather(
  response,
  { sun, cloud, clouds, lighting, wind, rain, snow }
) {
  setSityName(response, sityName);
  setTempAverage(response, tempAverage);
  setTempRange(response, tempRangeFrom, tempRangeTo);
  setWeatherDescr(response, weatherDescr);
  setWindData(response, windData);
  setHumidData(response, humidityData);
  setRainData(response, rainData);
  setSnowData(response, snowData);

  setDayDate(response, dayDate);
  setSunrise(response, sunriseData);
  setSunset(response, sunsetData);

  addWeatherImg(sun, weatherIconBox);
}

function addWeatherImg(img, wthIconBox) {
  wthIconBox.insertAdjacentHTML("beforeend", img);
}

function setSityName(res, sity) {
  sity.textContent = res.name;
}

function setTempAverage(res, tempAver) {
  tempAver.textContent = Math.round(res.main.temp);
}

function setTempRange(res, tempFrom, tempTo) {
  tempFrom.textContent = Math.floor(res.main.temp_min);
  tempTo.textContent = Math.ceil(res.main.temp_max);
}

function setWeatherDescr(res, wthDescr) {
  wthDescr.textContent = res.weather[0].description;
}

function setWindData(res, windData) {
  windData.textContent = Math.round(res.wind.speed);
}

function setHumidData(res, humidData) {
  humidData.textContent = res.main.humidity;
}

function setRainData(res, rainData) {
  if (res.rain !== undefined) {
    rainData.textContent = res.rain["1h"].toFixed(1);
  } else {
    rainData.textContent = 0;
  }
}

function setSnowData(res, snowData) {
  if (res.snow !== undefined) {
    snowData.textContent = res.snow["1h"];
  } else {
    snowData.textContent = 0;
  }
}

function setDayDate(res, dayDate) {
  const d = new Date(res.dt * 1000);

  const day = ("0" + d.getDate()).slice(-2);
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();

  const timeStamp = `${day}/${month}/${year}`;

  dayDate.textContent = timeStamp;
}

function setSunrise(res, sunriseData) {
  const d = new Date((res.sys.sunrise + res.timezone) * 1000);

  const hours = d.getUTCHours();
  const minuts = ("0" + d.getUTCMinutes()).slice(-2);

  const time = `${hours}:${minuts}`;

  sunriseData.textContent = time;
}

function setSunset(res, sunsetData) {
  const d = new Date((res.sys.sunset + res.timezone) * 1000);

  const hours = d.getUTCHours();
  const minuts = ("0" + d.getUTCMinutes()).slice(-2);

  const time = `${hours}:${minuts}`;

  sunsetData.textContent = time;
}
