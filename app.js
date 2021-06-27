// function getWeather(cb) {
//   const xhr = new XMLHttpRequest();
//   xhr.open(
//     "GET",
//     "http://api.openweathermap.org/data/2.5/weather?q=Минск&appid=9fcc82b3417048f0f7b58aa6dc1ad2b3&units=metric&lang=ru"
//   );
//   xhr.addEventListener("load", () => {
//     const response = JSON.parse(xhr.responseText);
//     cb(response);
//   });

//   xhr.send();
// }

// getWeather((response) => {
//   console.log(response);
// });
