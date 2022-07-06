// Global variables
var searchBtn = document.getElementsById('search-btn')

// Global variables
var city = ;
var state = ;

// Initialize search
function initSearch () {

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