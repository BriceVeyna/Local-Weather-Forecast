// Global variables
var cityInputEl = document.getElementById('inputCity');
var searchBtn = document.getElementById('search-btn');

// Global location variables, initially created empty
var city;
var state;
var latitude;
var longitude;

// Initialize search, store city and state variables
function initSearch (event) {

    // Prevents default behavior of the button
    event.preventDefault();

    // Store raw input (City, ST) in variable, log to verify
    var fullCity = cityInputEl.value.trim();
    console.log(fullCity);

    // Reassign city variable to input before comma, log to verify
    city = fullCity.split(', ')[0];
    console.log(city);

    // Reassign state variable to input after comma, log to verify
    state = fullCity.split(', ')[1];
    console.log(state);

    // Initialize getCityData function
    getCityData();
}

// Get city data
function getCityData () {
    var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + ",US&appid=d76d8eb1dc0344e4e9577142cd0e98dd";

    fetch(requestUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            latitude = data[0].lat;
            console.log(latitude);
            longitude = data[0].lon;
            console.log(longitude);
            getWeatherData(latitude, longitude);
        }).catch(function (error) {
            console.log(error);
        });
}

// Get weather data
function getWeatherData (lat, lon) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=d76d8eb1dc0344e4e9577142cd0e98dd";

    fetch(requestUrl).then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            addWeatherData();
        }).catch(function (error) {
            console.log(error);
        });
}

// Add weather data to cards
function addWeatherData () {

}

// Start initSearch function when search button is clicked
searchBtn.addEventListener('click', initSearch);