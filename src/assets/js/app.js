const images = {
  sun: '<div class="weather-icon__wrapper--sun roll-in-right"><img class="weather-icon__img _sun" src="assets/images/sun.png" alt=""></div>',
  cloud:
    '<div class="weather-icon__wrapper--cloud slide-in-left"><img class="weather-icon__img _cloud-white" src="assets/images/cloud-white.png" alt=""></div>',
  clouds:
    '<div class="weather-icon__wrapper--cloud slide-in-left"><img class="weather-icon__img _cloud-white" src="assets/images/cloud-white.png" alt=""><img class="weather-icon__img _cloud-dark" src="assets/images/cloud-dark.png" alt=""></div>',
  lighting:
    '<div class="weather-icon__wrapper--lighting slide-in-left"><img class="weather-icon__img _lighting" src="assets/images/lighting.png" alt=""></div>',
  wind: '<div class="weather-icon__wrapper--wind slide-in-right"><img class="weather-icon__img _wind" src="assets/images/wind.png" alt=""></div>',
  rain: '<div class="weather-icon__wrapper--rain slide-in-left"><img class="weather-icon__img _drop-1" src="assets/images/drop.png" alt=""><img class="weather-icon__img _drop-2" src="assets/images/drop.png" alt=""><img class="weather-icon__img _drop-3" src="assets/images/drop.png" alt=""></div>',
  snow: '<div class="weather-icon__wrapper--snow slide-in-left"><img class="weather-icon__img _snowflake-1" src="assets/images/snowflake.png" alt=""><img class="weather-icon__img _snowflake-2" src="assets/images/snowflake.png" alt=""><img class="weather-icon__img _snowflake-3" src="assets/images/snowflake.png" alt=""></div>',
};

const week = [
  { full: "Sunday", abb: "SUN" },
  { full: "Monday", abb: "MON" },
  { full: "Tuesday", abb: "TUE" },
  { full: "Wednesday", abb: "WED" },
  { full: "Thursday", abb: "THU" },
  { full: "Friday", abb: "FIR" },
  { full: "Saturday", abb: "SAT" },
];

const weekImages = {
  sun: '<img src="assets/images/data-icons/sun.png" alt="sun">',
  sunCloud:
    '<img src="assets/images/data-icons/sun-cloud.png" alt="sun cloud">',
  cloud: '<img src="assets/images/data-icons/cloud.png" alt="cloud">',
  rainSunCloud:
    '<img src="assets/images/data-icons/rain-sun-cloud.png" alt="rain sun cloud">',
  rainCloud:
    '<img src="assets/images/data-icons/rain-cloud.png" alt="rain cloud">',
  lighCloud:
    '<img src="assets/images/data-icons/ligh-cloud.png" alt="lighting cloud">',
  lighRainCloud:
    '<img src="assets/images/data-icons/ligh-cloud-rain.png" alt="lighting rain cloud">',
};

//elements
const weatherIconBox = document.querySelector(".weather-icon");
const sityName = document.querySelector(".city");
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
const weekIconList = document.querySelectorAll(".week__icon");
const weekTempList = document.querySelectorAll(".week__temp");
const weekDayName = document.querySelectorAll(".week__item-day");

function customHttp() {
  return {
    get(url, cb) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.addEventListener("load", () => {
        if (Math.floor(xhr.status / 100) !== 2) {
          cb("The city doesn`t exist. Check the city name or choose another");
          return;
        }
        const response = JSON.parse(xhr.responseText);
        cb(null, response);
      });

      xhr.send();
    },
  };
}

const http = customHttp();

const weatherServiceCurent = (function () {
  const apiKey = "9fcc82b3417048f0f7b58aa6dc1ad2b3";

  return {
    currentWeather(city, cb) {
      http.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`,
        cb
      );
    },
    forecast(lat, lon, cb) {
      http.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=metric&lang=en`,
        cb
      );
    },
  };
})();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!searchInput.value) {
    return;
  }

  loadWeather();
});

searchInput.addEventListener("input", () => {
  if (searchInput.value.length > 0) {
    searchInput.style.maxWidth = "300px";
  } else if (searchInput.value.length === 0) {
    searchInput.style.maxWidth = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadWeather();
});

function loadWeather() {
  let city = searchInput.value || "Минск";

  weatherServiceCurent.currentWeather(city, onGetResponseCurrent);
  weatherServiceCurent.currentWeather(city, (err, res) => {
    if (err) {
      return;
    }
    weatherServiceCurent.forecast(
      res.coord.lat,
      res.coord.lon,
      onGetResponseForecast
    );
  });
}

function onGetResponseCurrent(err, res) {
  if (err) {
    alert(err);
    return;
  }

  console.log(res);

  renderCurrentWeather(res, images);
}

function onGetResponseForecast(err, res) {
  renderForecastWeather(res, images);
}

function renderCurrentWeather(
  response,
  { sun, cloud, clouds, lighting, wind, rain, snow }
) {
  setSityName(response, sityName);
  setCurDayName(response, dayName);
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

  setWeatherIcons(
    response,
    sun,
    cloud,
    clouds,
    lighting,
    wind,
    rain,
    snow,
    weatherIconBox
  );
}

function renderForecastWeather(response) {
  setWeekNameTempIcon(response, weekTempList, weekIconList, weekDayName);
}

function setSityName(res, city) {
  city.textContent = res.name;
}

function setCurDayName(res, dayName) {
  const d = new Date(res.dt * 1000);
  const dayNum = d.getDay();

  dayName.textContent = week[dayNum].full;
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

// Set Weather Data

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

// Set today weather icons

function setWeatherIcons(
  res,
  sun,
  cloud,
  clouds,
  lighting,
  wind,
  rain,
  snow,
  wthIconBox
) {
  wthIconBox.innerHTML = "";

  checkClouds(res, sun, cloud, clouds, wthIconBox);
  checkThunderstorm(res, clouds, lighting, wthIconBox);

  checkWind(res, wind, wthIconBox);
  checkSnow(res, snow, wthIconBox);
  checkRain(res, rain, wthIconBox);
}

function checkClouds(res, sun, cloud, clouds, wthIconBox) {
  const cloudsPerc = res.clouds.all;

  if (cloudsPerc < 11) {
    wthIconBox.insertAdjacentHTML("beforeend", sun);
  } else if (cloudsPerc >= 11 && cloudsPerc <= 25) {
    wthIconBox.insertAdjacentHTML("beforeend", sun);
    wthIconBox.insertAdjacentHTML("beforeend", cloud);
  } else if (cloudsPerc >= 26 && cloudsPerc <= 50) {
    wthIconBox.insertAdjacentHTML("beforeend", cloud);
  } else if (cloudsPerc > 51) {
    wthIconBox.insertAdjacentHTML("beforeend", clouds);
  }
}

function checkThunderstorm(res, clouds, lighting, wthIconBox) {
  let mainWth = res.weather[0].main;

  if (mainWth.includes("hunderstorm")) {
    wthIconBox.innerHTML = "";
    wthIconBox.insertAdjacentHTML("beforeend", clouds);
    wthIconBox.insertAdjacentHTML("beforeend", lighting);
  }
}

function checkRain(res, rain, wthIconBox) {
  if (res.rain && res.rain["1h"] > 0) {
    wthIconBox.insertAdjacentHTML("beforeend", rain);
  }
}

function checkSnow(res, snow, wthIconBox) {
  if (res.snow && res.snow["1h"] > 0) {
    wthIconBox.insertAdjacentHTML("beforeend", snow);
  }
}

function checkWind(res, wind, wthIconBox) {
  if (res.wind.speed > 6) {
    wthIconBox.insertAdjacentHTML("beforeend", wind);
  }
}

// Set name and temp on day of the week

function setWeekNameTempIcon(res, weekList, weekIconList, weekDay) {
  let dayTemp = res.daily;

  weekList.forEach((dayItem, ind) => {
    const d = new Date(dayTemp[ind + 1].dt * 1000);
    const dayNum = d.getDay();

    weekDay[ind].textContent = week[dayNum].abb;
    dayItem.textContent = Math.round(dayTemp[ind + 1].temp.day);
  });

  weekIconList.forEach((item, ind) => {
    setWeekWthIcons(dayTemp[ind + 1], weekImages, item);
  });
}

// set week weather icons

function setWeekWthIcons(res, img, weekImgbox) {
  const lighting = res.weather[0].main.includes("hunderstorm");
  const clouds = res.clouds;
  const rain = res.rain;

  weekImgbox.innerHTML = "";

  if (lighting) {
    weekImgbox.insertAdjacentHTML("afterbegin", img.lighCloud);
  } else if (lighting && rain > 0) {
    weekImgbox.insertAdjacentHTML("afterbegin", img.lighRainCloud);
  }

  if (clouds <= 25 && !rain) {
    weekImgbox.insertAdjacentHTML("afterbegin", img.sun);
  } else if (clouds > 26 && clouds < 60 && !rain) {
    weekImgbox.insertAdjacentHTML("afterbegin", img.sunCloud);
  } else if (clouds > 60 && !rain) {
    weekImgbox.insertAdjacentHTML("afterbegin", img.cloud);
  }

  if (rain && rain > 0 && clouds < 50) {
    weekImgbox.insertAdjacentHTML("afterbegin", img.rainSunCloud);
  } else if (rain && rain > 0 && clouds > 50) {
    weekImgbox.insertAdjacentHTML("afterbegin", img.rainCloud);
  }
}
