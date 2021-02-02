var currentCityApi = document.querySelector("#search");
var searchBtn = document.querySelector("#searchbtn");


function currentApi (event) {
    event.preventDefault();
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + currentCityApi.value + "&units=imperial&appid=73764a83501606e04b74a8e0281a654b")
    .then(function (response) {
        // console.log(response)
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        var temp = document.querySelector(".temp");
        var humidity = document.querySelector(".humidity");
        var windSpeed = document.querySelector(".windspeed");
        var cityName = document.querySelector(".city");
        var iconEl = document.createElement("img");
        var weatherIconEl = document.querySelector(".weathericon");

        var lat = data.coord.lat;
        var lon = data.coord.lon;
        // console.log(lat);
        // console.log(lon);

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
        // console.log(response);
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        // var uvIndex = document.querySelector(".uv");
        var setColor = document.createElement("div")

        setColor.textContent = data.current.uvi;
        // if statement here
        if (data.current.uvi < 2) {
            setColor.style.backgroundColor = "green";
        } if (data.current.uvi == 3) {
            setColor.style.backgroundColor = "yellow";
        } if (data.current.uvi > 4) {
            setColor.style.backgroundColor = "red";
        }
        fiveDayForecast(lat, lon)
    });
}

function fiveDayForecast (lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,current,alerts&units=imperial&appid=73764a83501606e04b74a8e0281a654b")
    .then(function (response){
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var oneDayEl = document.createElement("img");
        var secondDayEl = document.createElement("img");
        var thirdDayEl = document.createElement("img");
        var fourDayEl = document.createElement("img");
        var fiveDayEl = document.createElement("img");

        var firstDayIconEl = document.querySelector(".dateone");
        var secondDayIconEl = document.querySelector(".datetwo");
        var thirdDayIconEl = document.querySelector(".datethree");
        var fourthDayIconEl = document.querySelector(".datefour");
        var fifthDayIconEl = document.querySelector(".datefive");

        oneDayEl.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png");
        firstDayIconEl.append(oneDayEl);

        secondDayEl.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png");
        secondDayIconEl.append(secondDayEl);

        thirdDayEl.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png");
        thirdDayIconEl.append(thirdDayEl);

        fourDayEl.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png");
        fourthDayIconEl.append(fourDayEl);

        fiveDayEl.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png");
        fifthDayIconEl.append(fiveDayEl);
        // for (i=1; i < 6; i++) {


            var Humidity1 = document.querySelector("#one");
            Humidity1.textContent = "Temp: " + data.daily[1].temp.day + "°F" + " " + "Humidity: " + data.daily[1].humidity + "%";
            var Humidity2 = document.querySelector("#two");
            Humidity2.textContent = "Temp: " + data.daily[2].temp.day + "°F" + " " + "Humidity: " + data.daily[2].humidity + "%";
            var Humidity3 = document.querySelector("#three");
            Humidity3.textContent = "Temp: " + data.daily[3].temp.day + "°F" + " " + "Humidity: " + data.daily[3].humidity + "%";
            var Humidity4 = document.querySelector("#four");
            Humidity4.textContent = "Temp: " + data.daily[4].temp.day + "°F" + " " + "Humidity: " + data.daily[4].humidity + "%";
            var Humidity5 = document.querySelector("#five");
            Humidity5.textContent = "Temp: " + data.daily[5].temp.day + "°F" + " " + "Humidity: " + data.daily[5].humidity + "%";
        // }


    });
}

searchBtn.addEventListener("click", currentApi, currentUV, fiveDayForecast, function () {
    document.querySelector(".card-group").hidden = false;

});

