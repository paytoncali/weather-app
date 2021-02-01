var currentCityApi = document.querySelector("#search");
var searchBtn = document.querySelector("#searchbtn");


function currentApi (event) {
    event.preventDefault();
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + currentCityApi.value + "&units=imperial&appid=73764a83501606e04b74a8e0281a654b")
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var temp = document.querySelector(".temp");
        var humidity = document.querySelector(".humidity");
        var windSpeed = document.querySelector(".windspeed");
        var cityName = document.querySelector(".city");
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        cityName.textContent = data.name + data.weather[0].icon;
        temp.textContent = "Temperature: " + data.main.temp + "°F";
        humidity.textContent = "Humidity: " + data.main.humidity + "%";
        windSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";
        
        currentUV(lat, lon)
    });
    
}

function currentUV (lat, lon) {

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&appid=73764a83501606e04b74a8e0281a654b")
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data){
        console.log(data);
    })
    var uvIndex = document.querySelector(".uv");

    uvIndex.textContent = "UV Index " + data.current.uvi;
}


searchBtn.addEventListener("click", currentApi, currentUV);

