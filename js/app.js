const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  console.log(data);
  // Destructure Properties
  const { cityDetails, weather } = data;

  //   Update details template
  details.innerHTML = `
      <h5 class="my-3">${cityDetails.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</h5>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;</span>
`;

  // Update the night/day icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "img/night.svg";
  } else {
    timeSrc = "img/day.svg";
  }
  time.setAttribute("src", timeSrc);

  // Remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  // Prevent default action
  e.preventDefault();

  // Get the City Value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //   Update the UI w/a New City
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
