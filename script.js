"use strict";

const search = document.querySelector(".btn");
const input = document.getElementById("search-box");
const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const min = document.querySelector(".min");
const max = document.querySelector(".max");
const cloud = document.querySelector(".clouds");
const imageicon = document.querySelector(".icon");

async function weather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eaae316c87604e24ea934190f1b1b36d`
    );
    const data = await response.json();

    // handling error
    if (!response.ok) throw new Error(data.message);

    // updating ui
    document.body.style.backgroundImage =
      "linear-gradient(to right,rgb(121, 195, 251), rgb(72, 127, 240))";
    imageicon.width = 130;
    imageicon.height = 110;
    cityName.innerHTML = data.name;
    temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°`;
    min.innerHTML = `${data.main.humidity}%`;
    max.innerHTML = `${data.wind.speed}Km/h`;
    cloud.innerHTML = data.weather[0].description;

    switch (data.weather[0].main) {
      case "Haze":
        imageicon.src = "https://img.icons8.com/color/96/fog-day--v1.png";
        imageicon.alt = "Haze";
        break;

      case "Clouds":
        imageicon.src =
          "https://img.icons8.com/color/96/partly-cloudy-day--v1.png";
        imageicon.alt = "partly-cloudy-day--v1";
        break;

      case "Clear":
        imageicon.src = "https://img.icons8.com/color/96/smiling-sun.png";
        imageicon.alt = "smiling-sun";
        break;

      case "Rain":
        imageicon.src = "https://img.icons8.com/color/96/fog-day--v1.png";
        imageicon.alt = "rain";
        break;

      case "Mist":
        imageicon.src = "https://img.icons8.com/color/96/fog-day--v1.png";
        imageicon.alt = "mist";
        break;

      case "Snow":
        imageicon.src = "https://img.icons8.com/color/96/snow--v1.png";
        imageicon.alt = "snow";
        break;

      default:
        imageicon.src = "https://img.icons8.com/color/96/fog-day--v1.png";
        imageicon.alt = "sky-image";
    }
  } catch (error) {
    cityName.innerHTML = error;
    temp.innerHTML = "";
    min.innerHTML = "";
    max.innerHTML = "";
    cloud.innerHTML = "";
    imageicon.src = "https://img.icons8.com/color/96/nothing-found.png";
    imageicon.alt = "nothing-found";
    imageicon.width = 200;
    imageicon.height = 200;
    document.body.style.backgroundImage =
      "linear-gradient(to right, rgb(250,128,114), rgb(186,22,27))";
  }
}

search.addEventListener("click", (e) => {
  e.preventDefault();
  weather(input.value);
  input.value = "";
});
