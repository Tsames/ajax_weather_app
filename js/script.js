//Global Variables
const API_KEY = '2235a334db1d5212c49deb967be3f9c2';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`
const results = {city: null, temperature: 0, feelsLike: 0, weather: null, unit: null}

//DOM Elements
const $cityName = $('#city-name');
const $temperature = $('#temperature');
const $feelsLike = $('#feels-like');
const $weather = $('#weather');
const $search = $('#lookup');
const $searchButton = $('#lookup-button');
const $farenheitButton = $('#convertF');
const $celsiusButton = $('#convertC');

//Callback Functions
const saveResults = (data) => {
  results.city = data.name;
  results.temperature = Math.round((data.main.temp - 273.15) * 1.8 + 32);
  results.feelsLike = Math.round((data.main.feels_like - 273.15) * 1.8 + 32);
  results.weather = data.weather[0].main;
  results.unit = 'F';
}

const postResults = () => {
  $cityName.text(results.city);
  $temperature.text(`${results.temperature}°${results.unit}`);
  $feelsLike.text(`${results.feelsLike}°${results.unit}`);
  $weather.text(results.weather);
}

const convertToFarenheit = () => {
  if (results.unit === 'C') {
    results.unit = 'F'
    results.temperature = Math.round((results.temperature * 1.8) + 32);
    results.feelsLike = Math.round((results.feelsLike * 1.8) + 32);
  }
}

const convertToCelsius = () => {
  if (results.unit === 'F') {
    results.unit = 'C'
    results.temperature = Math.round((results.temperature - 32) / 1.8);
    results.feelsLike = Math.round((results.feelsLike - 32) / 1.8);
  }
}

//Event Listeners Search Button to API
$searchButton.on('click', function (event) {
  const promise = $.ajax({
    url: `${BASE_URL}q=${$search.val()}&appid=${API_KEY}`
  }).then(
    (data) => {
      console.log(data)
      saveResults(data);
      postResults();
    }, (error) => {
      console.log('bad request', error);
    }
  );
})

//Event Listeners Conversion Buttons
$farenheitButton.on('click', function (event) {
  convertToFarenheit();
  postResults();
});

$celsiusButton.on('click', function (event) {
  convertToCelsius();
  postResults();
});