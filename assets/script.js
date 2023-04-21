var searchFormEl = document.querySelector('#search-form');
var weatherContainerEl = document.querySelector('#weather-container');
var resultTextEl = document.querySelector('#result-text');
var cityInputEl = document.querySelector('#search-input');
apiKey = '21adf659df66103262a537b3b37fad51';

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getGeo(cityName);

    resultTextEl.textContent = '';
    cityInputEl.value = '';

  } else {
    alert('Please enter a city');
  }

};

var getGeo = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ city + '&appid=' + apiKey;

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayWeather(data, city);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to get your weather based on city name');
    });
};

// var getWeather = function (lat, lon) {
//     var apiUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
// }

var displayWeather = function(days, searchTerm) {
    if (days.length ===0) {
        weatherContainerEl.textContent = 'No weather data found for the next 5 days.';
        return;
    }

    resultTextEl.textContent = searchTerm;

    for (var i = 0; i < 5; i++) {
        
        var weatherDate = days[i].main;
        var weatherEl = document.createElement('div');
        weatherEl.classList = 'list-item flex-row justify-space-between align-center';

        var dateEl = document.createElement('span');
        dateEl.textContent = weatherDate;

        weatherEl.appendChild(dateEl);

        var statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';
    }
};

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
