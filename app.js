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

function getWeather(cb) {
  const xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "http://api.openweathermap.org/data/2.5/weather?q=Мядель&appid=9fcc82b3417048f0f7b58aa6dc1ad2b3&units=metric&lang=ru"
  );
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.send();
}

getWeather((response) => {
  tempAverage.textContent = Math.round(response.main.temp);

  console.log(Math.round(response.main.temp));
});

weatherIconBox.insertAdjacentHTML("beforeend", images.sun);
