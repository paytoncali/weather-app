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
        var iconEl = document.createElement("img");
        var weatherIconEl = document.querySelector(".weathericon");

        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log(lat);
        console.log(lon);

        iconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
        weatherIconEl.append(iconEl);
        cityName.textContent = data.name;
        temp.textContent = "Temperature: " + data.main.temp + "°F";
        humidity.textContent = "Humidity: " + data.main.humidity + "%";
        windSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";
        
        currentUV(lat, lon)
    });
    
}

function currentUV (lat, lon) {

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&units=imperial&appid=73764a83501606e04b74a8e0281a654b")
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var uvIndex = document.querySelector(".uv");
        uvIndex.textContent = "UV Index " + data.current.uvi;
        console.log(data.current.uvi);
        // if statement here
    })

}


searchBtn.addEventListener("click", currentApi, currentUV);

