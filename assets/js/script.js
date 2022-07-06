// Global variables
var cityInputEl = document.getElementById('inputCity');
var searchBtn = document.getElementById('search-btn');

// Global variables
var city;
var state;

// Initialize search, store city and state variables
function initSearch () {

    // Store raw input (City, ST) in variable, log to verify
    var fullCity = cityInputEl.value.trim();
    console.log(fullCity);

    // Reassign city variable to input before comma, log to verify
    city = fullCity.split(',')[0];
    console.log(city);

    // Reassign state variable to input after comma, log to verify
    state = fullCity.split(',')[1];
    console.log(state);

    // Initialize getCityData function
    getCityData();
}

// Get city data
function getCityData () {
    var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "&appid=d76d8eb1dc0344e4e9577142cd0e98dd";

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

// Get weather data
function getWeatherData () {
    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=d76d8eb1dc0344e4e9577142cd0e98dd";

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

// Start initSearch function when search button is clicked
searchBtn.addEventListener('click', initSearch);