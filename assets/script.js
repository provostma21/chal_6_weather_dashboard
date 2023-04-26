var searchFormEl = $('#search-form');
var weatherContainer = $('.weather-container');
var resultTextEl = $('#result-text');
var cityInputEl = $('#search-input');
var cityName = $('.todayCity');
var cityInput = $('#cityInput');
var forecastContainer = $(".forecast-container");
var weatherIcon = $("#weatherIcon");
var cityList = [];
apiKey = '21adf659df66103262a537b3b37fad51';
var searchHistory = [];
temperature = 0;
wind = 0;
humidity = 0;
forecastCycle = 0;

var currentDate = dayjs().format("dddd, MM/DD/YYYY");

$('#currentDate').text("(" + currentDate + ")");

loadSearchHistory();


function GetInfo() {
  event.preventDefault();
    var newName= cityInput.val().trim();
    currentWeatherRequest(newName);
    searchHistory(newName);

};

function currentWeatherRequest(newName) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + newName + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryUrl,
        method: 'GET',
    }).then(function(response) {
        console.log(response);
        cityName.text(response.name);
        $('#currentDate').text('(' + currentDate + ')');
        cityName.append(
            "<img src='https://openweathermap.org/img/w/'" + response.weather[0].icon + ".png' alt=''" + response.weather[0].main +"' />"
        );

        $('#currentTemp').text(response.main.temp + " °F");
        $('#currentWind').text(response.wind.speed + " MPH");
        $('#currentHumidity').text(response.main.humidity + " %");
        


        var lat = response.coord.lat;
        var lon = response.coord.lon;

        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid="+ apiKey + "&lat=" +  lat +  "&lon=" + lon + '';
        
        
        $.ajax({
            url: forecastUrl,
            method: 'GET',
        }).then(function (response) {
            console.log(response);
            for (var i = 1; i < 40; i++) {
                if (i % 8 ===0) {
                var dateString = dayjs(response.list[i].dt_txt).format("dddd, MM/DD/YYYY"
                
                );
                console.log(dateString);

                $("#weatherIcon").attr("src","http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
                $('#forecastDate').text(dateString);
                $('#temp').text("Temp: " + response.list[i].main.temp + " °F");
                $('#wind').text("Wind: " + response.list[i].wind.speed + " MPH");
                $('#humidity').text("Humidity: " + response.list[i].main.humidity + " %");
            }};
        });    
    });  
};

  
function searchHistory(newName) {
    if (newName) {
        if (cityList.indexOf(newName) === -1) {
            cityList.push(newName);

            listArray();
            
        } else {
            var removeIndex = cityList.indexOf(newName);
            cityList.splice(removeIndex, 1);
            cityList.push(newName);

            listArray();
        }
    }
}

function listArray() {
    $('#result-history').empty();

    cityList.forEach(function (city) {
        var resultHistoryItem = $('<li></li>');
        resultHistoryItem.text(city);
        $('#result-history').prepend(resultHistoryItem);
    });
    localStorage.setItem("cities", JSON.stringify(cityList));
}

function loadSearchHistory() {
    if (localStorage.getItem("cities")) {
        cityList = JSON.parse(localStorage.getItem("cities"));
        var lastIndex = cityList.length -1;

        listArray();

        if (cityList.length !== 0) {
            currentWeatherRequest(cityList[lastIndex]);
        }
    }
 }
