var currentCityApi = document.querySelector("#search");
var searchBtn = document.querySelector("#searchbtn");
var iconEl; 
var pastCity = "";

function currentApi(event) {
    event.preventDefault();
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + currentCityApi.value + "&units=imperial&appid=73764a83501606e04b74a8e0281a654b")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var temp = document.querySelector(".temp");
            var humidity = document.querySelector(".humidity");
            var windSpeed = document.querySelector(".windspeed");
            var cityName = document.querySelector(".city");
            var weatherIconEl = document.querySelector(".weathericon");
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var dateForToday = new Date(data.dt*1000).toLocaleDateString("en-US");

            console.log(data)
            weatherIconEl.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            weatherIconEl.style = "width: 45px; height: 45px; display: inline-block;";
            cityName.textContent = data.name + " " + dateForToday;

            temp.textContent = "Temperature: " + data.main.temp + "°F";
            humidity.textContent = "Humidity: " + data.main.humidity + "%";
            windSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";

            localStorage.setItem("SearchedCity", currentCityApi.value);

            currentUV(lat, lon)
        });
}

function currentUV(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&units=imperial&appid=73764a83501606e04b74a8e0281a654b")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var uvIndex = document.querySelector(".uv");

            uvIndex.textContent = "UV Index" + data.current.uvi;
            if (data.current.uvi < 2) {
                uvIndex.style.backgroundColor = "green";
            } if (data.current.uvi == 3) {
                uvIndex.style.backgroundColor = "yellow";
            } if (data.current.uvi > 4) {
                uvIndex.style.backgroundColor = "red";
            }
            fiveDayForecast(lat, lon)
        });
}

function fiveDayForecast(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,current,alerts&units=imperial&appid=73764a83501606e04b74a8e0281a654b")
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            for (i = 1; i < 6; i++) {
                var imgIcon = document.createElement("img")
                var Icon = document.getElementById(i);

                var newDate = new Date(data.daily[i].dt*1000).toLocaleDateString("en-US");
                console.log(newDate);
                Icon.textContent = newDate;

                imgIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
                imgIcon.style = "width: 45px; height: 45px; display: inline-block;"
                Icon.append(imgIcon);

                var weatherDiv = document.createElement("div");
                weatherDiv.innerHTML = "Temp: " + data.daily[i].temp.day + "°F" + " " + "Humidity: " + data.daily[i].humidity + "%";
                Icon.append(weatherDiv);
            }
            document.querySelector(".forecast").hidden = false;
            document.querySelector(".card-group").hidden = false;
        });
}


function init() {
    // get items from local storage load onto the page
    // parse array from ls
    // for each item in the array we need a button 
    // each button needs an event listener
    var searchedCityPlaceHolder = document.querySelector("#previouscity");
    var searchedCities = localStorage.getItem("SearchedCity");
    console.log(searchedCities);
    
    searchedCityPlaceHolder.append(searchedCities);
    

    searchBtn.addEventListener("click", currentApi, currentUV, fiveDayForecast)
}

init();