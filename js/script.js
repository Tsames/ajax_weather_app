//Saving our API key as a global variable
const API_KEY = '2235a334db1d5212c49deb967be3f9c2';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`

//Grabbing </p>s from DOM as jQuery Objects
const $cityName = $('#city-name');
const $temperature = $('#temperature');
const $feelsLike = $('#feels-like');
const $weather = $('#weather');
const $search = $('#lookup');
const $searchButton = $('#lookup-button');
const $farenheitButton = $('#convertF');
const $celsiusButton = $('#convertC');

//Callback Functions
const convertToFarenheit = (kelvin, target) => {
  let temperature = Number(target.text());
  if (kelvin) {
    temperature = ((temperature - 273.15) * 1.8) + 32;
  } else {
    temperature = (temperature * 1.8) - 32;
  }
  target.text(`${Math.round(temperature)} F`);
}

const convertToCelsius = (kelvin) => {
  let temperature = Number($temperature.text());
  if (kelvin) {
    temperature = temperature - 273.15;
  } else {
    temperature = (temperature - 32) / 1.8
  }
  $temperature.text(`${Math.round(temperature)} C`);
}

const postResults = (data) => {
  $cityName.text(data.name);
  $temperature.text(data.main.temp);
  convertToFarenheit(true, $temperature);
  $feelsLike.text(data.main.feels_like);
  convertToFarenheit(true, $feelsLike)
  $weather.text(data.weather[0].main);
}

//jQuery Event Listener to Send User Input to API
$searchButton.on('click', function (event) {
  console.log($search.val())
  const promise = $.ajax({
    url: `${BASE_URL}q=${$search.val()}&appid=${API_KEY}`
  }).then(
    (data) => {
      postResults(data);
    }, (error) => {
      console.log('bad request', error);
    }
  );
})

//jQuery Event Listener for Conversion Buttons
$farenheitButton.on('click', convertToFarenheit);
$celsiusButton.on('click', convertToCelsius);



