# weather-app

This website was created to give you a overview of the weather for the current day and a 5 day forecast for the city that you search. In this overview, you see temperature, humidity, wind speed, an icon, and the UV Index for the current day. In the 5 day forecast, you are able to see tempature, date, humidity and an icon showing you what kind of day to expect. The UV Index also changes colors depending on the severity of the UV during the current day.

I created this website by first being an HTML document that holds 5 cards for my forecast, my search button and form, and some additional divs to hold the elements I called in my javascript. I then styled a few of the elements to my preference. After this, I started working on the javascript. First I completed the current weather function by fetching the Open Weather API. I used the data log to find which elements I was looking for and used textcontent to add them into the empty divs I created on my index.html file. Once I was happy with this, I moved on to the UV Index. I used a function to call a second weather API and used the current weather API to recieve log and lat for my All Call API that I used to get the UV Index number. Once I was able to add this into my current weather container, I added an if statement to apply a color rule. 
My next step was to create another function for my five day forecast. I fetched the All Call API again in this function and created a loop to loop through 5 different days and used textcontent to add them onto the cards. 

## usage

The use of this program is to show you the current day weather and a 5 day forecast of a city you search. 


[weather dashboard.pdf](https://github.com/paytoncali/weather-app/files/5923453/weather.dashboard.pdf)

https://github.com/paytoncali/weather-app.git
https://paytoncali.github.io/weather-app/