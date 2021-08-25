const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");

const updateUI = (data) => {
  const cityDetails = data.cityDetails;
  const weather = data.weather;

  //   Update details template
  details.innerHTML = `
      <h5 class="my-3">${cityDetails.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</h5>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;</span>
`;

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
