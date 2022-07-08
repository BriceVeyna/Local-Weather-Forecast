// Global variables
var cityInputEl = document.getElementById('inputCity');
var cityListEl = document.getElementById('city-list')
var mainCardEl = document.getElementById('card-main');
var bodyCardEl = document.getElementById('forecast')
var searchBtn = document.getElementById('search-btn');

// Global location variables, initially created empty
var storedCities = [];
var city;
var state;
var latitude;
var longitude;

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
    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=d76d8eb1dc0344e4e9577142cd0e98dd";

    fetch(requestUrl).then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            weatherData = data;
            addWeatherData();
        }).catch(function (error) {
            console.log(error);
        });
}

// Add weather data to cards
function addWeatherData () {

    // Today's weather
    var currentDate = moment.unix(weatherData.daily[0].dt).format('MM/DD/YYYY');
    var currentIcon = weatherData.daily[0].weather[0].icon;
    var currentTemp = weatherData.daily[0].temp.day;
    var currentWind = weatherData.daily[0].wind_speed;
    var currentHumidity = weatherData.daily[0].humidity;
    var currentUV = weatherData.daily[0].uvi;

    mainCardEl.children[0].textContent = city + ' (' + currentDate + ')';
    mainCardEl.children[1].src = 'http://openweathermap.org/img/wn/' + currentIcon + '@2x.png';
    mainCardEl.children[2].innerHTML = 'Temp: ' + currentTemp + ' &deg;F';
    mainCardEl.children[3].textContent = 'Wind: ' + currentWind + ' MPH';
    mainCardEl.children[4].textContent = 'Humidity: ' + currentHumidity + ' %';
    mainCardEl.children[5].innerHTML = 'UV Index: <span id="uvi">' + currentUV + '<span/>';

    // 5-day forecast
    for (var i = 1; i < 6; i++) {
        var forecastDate = moment.unix(weatherData.daily[i].dt).format('MM/DD/YYYY');
        var forecastIcon = weatherData.daily[i].weather[0].icon;
        var forecastTemp = weatherData.daily[i].temp.day;
        var forecastWind = weatherData.daily[i].wind_speed;
        var forecastHumidity = weatherData.daily[i].humidity;

        bodyCardEl.children[i-1].children[0].children[0].textContent = forecastDate;
        bodyCardEl.children[i-1].children[0].children[1].src = 'http://openweathermap.org/img/wn/' + forecastIcon + '@2x.png';
        bodyCardEl.children[i-1].children[0].children[2].innerHTML = 'Temp: ' + forecastTemp + ' &deg;F';
        bodyCardEl.children[i-1].children[0].children[3].textContent = 'Wind: ' + forecastWind + ' MPH';
        bodyCardEl.children[i-1].children[0].children[4].textContent = 'Humidity: ' + forecastHumidity + ' %';
    }

}

function getStoredCities() {
    storedCities = localStorage.getItem('City');
    console.log(storedCities);

    // 
    for (var i = 0; i < storedCities.length; i++) {
        var storedCity = storedCities[i];
        console.log(storedCity);
    
        var li = document.createElement('li');
        li.textContent = storedCity;
        li.setAttribute('data-index', i);
        cityListEl.appendChild(li);
    }
}

// Start initSearch function when search button is clicked
searchBtn.addEventListener('click', function (event) {

    // Prevents default behavior of the button
    event.preventDefault();

    // Store raw input (City, ST) in variable, log to verify
    var fullCity = cityInputEl.value.trim();
    console.log(fullCity);

    // Reassign city & state variables to input before & after comma respectively, log to verify
    city = fullCity.split(', ')[0];
    console.log(city);
    state = fullCity.split(', ')[1];
    console.log(state);

    // Store searched city in existing array
    var fullCityArray = [fullCity];
    console.log(storedCities);
    console.log(fullCityArray);
    var newCitiesArray = storedCities.concat(fullCityArray);
    console.log(newCitiesArray);

    localStorage.setItem('City', newCitiesArray);

    // Clear search Field
    cityInputEl.value = '';

    // Initialize getCityData function
    getCityData();

});

// Initialize getStoredCities function
getStoredCities();