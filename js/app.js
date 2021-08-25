const cityForm = document.querySelector("form");

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
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
