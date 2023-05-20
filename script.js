// //GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that 
// city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon
// representation of weather conditions, the temperature, the humidity,
//  and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date,
// an icon representation of weather conditions, the temperature, 
// the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for 
// that city

//Storing cities in local storage

var cityList = JSON.parse(localStorage.getItem('userInput')) || [];



var apiKey = "884b48a666f77e7182db403200d6c4bc"

// function storeCities() {
//     var input = document.getElementById("#userInput");
// localStorage.setItem("cities", input.val());
//     localStorage.setItem("cities", JSON.stringify(cityList));
//     for (var i = 0; i < localStorage.length; i++){
//         // do something with localStorage.getItem(localStorage.key(i));
//     }
// }
// function createCityList() {
//     $("#userInput").empty();
//     cityList.forEach(function(city)
//      {$('#history').prepend($('#history'));})
// }

// var storedCities = JSON.parse(localStorage.getItem("cities"));



const storedCities = document.querySelector("#userInput");
const forget = document.querySelector("#forget");
const searchBtn = document.querySelector('#search')

userInput.addEventListener('#search', function (e) { // switch user input for search?
    e.preventDefault();
});
// clicking on the user input saves, i cant get to save more then 1 at a time and display them appended.
searchBtn.addEventListener('click', function () {
    cityList.push(storedCities.value);
    localStorage.setItem('userInput', JSON.stringify(cityList));
    displayCities();
});

function displayCities() {
    // var storedCities = JSON.parse(localStorage.getItem(''));
    // for (var i = 0; i < storedCities.length; i++)
    // if (storedCities !== null) {
    //     var showCities = document.createElement('p');
    //     displayCities.append(showCities)
    var display = document.querySelector('#history');


    //cannot figure out how to get appended text to be clickable


    display.innerHTML = '';

    for (var i = 0; i < cityList.length; i++) {
        var displayCities = document.createElement('p');
        displayCities.textContent = cityList[i];
        display.append(displayCities);
    }
}
forget.addEventListener('#forget', function (e) {
    e.preventDefault();
});

forget.addEventListener('click', function () {
    localStorage.removeItem('userInput')
    var display = document.querySelector('#history');
    display.innerHTML = "";
});


var search = function () {
    var cityName = document.querySelector('#userInput').value
    console.log(cityName)
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // getting current day forcast
            fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + response[0].lat + "&lon=" + response[0].lon + "&units=imperial&appid=" + apiKey)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {

                    console.log(response)
                    var temp = document.querySelector('#temp')
                    temp.textContent = "Temperature " + response.main.temp + "\u00B0"
                    var humidity = document.querySelector('#humidity')
                    humidity.textContent = "Humidity " + response.main.humidity + " %"
                    var windspeed = document.querySelector("#wind")
                    windspeed.textContent = "Wind Speed " + response.wind.speed + " MPH"
                    var icon = document.querySelector("#icon")
                    icon.src = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"


                })
            fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + response[0].lat + "&lon=" + response[0].lon + "&units=imperial&appid=" + apiKey) // future forcast here
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    for (var i = 1; i <= 5; i++) {
                        var h = (i - 1) * 8;
                        var futureIcon = document.querySelector('#futureIcon' + i)
                        console.log("103", response)
                        var futureForcast = document.querySelector('#futureForcast' + i)

                        const a = dayjs()
                        const b = a.add(1, 'd')
                        const c = b.add(1, 'd')
                        const d = c.add(1, 'd')
                        const e = d.add(1, 'd')
                        const f = e.add(1, 'd')
                        var dateDisplay1 = document.querySelector('#futureForcast1')
                        var dateDisplay2 = document.querySelector('#futureForcast2')
                        var dateDisplay3 = document.querySelector('#futureForcast3')
                        var dateDisplay4 = document.querySelector('#futureForcast4')
                        var dateDisplay5 = document.querySelector('#futureForcast5')


                        dateDisplay1.innerHTML = b
                        dateDisplay2.innerHTML = c
                        dateDisplay3.innerHTML = d
                        dateDisplay4.innerHTML = e
                        dateDisplay5.innerHTML = f

                        futureIcon.src = "https://openweathermap.org/img/w/" + response.list[h].weather[0].icon + ".png" // need future
                        var futureHumidity = document.querySelector('#futureHumidity' + i)
                        futureHumidity.textContent = "Humidity " + response.list[h].main.humidity + " %" // need future
                        var futureWind = document.querySelector('#futureWind' + i)
                        futureWind.textContent = "Wind Speed " + response.list[h].wind.speed + " MPH" // Need future
                        var futureTemp = document.querySelector('#futureTemp' + i)
                        futureTemp.textContent = "Temperature " + response.list[h].main.temp + "\u00B0"

                        var history = document.querySelector('#history')
                    }
                })

        });



}


document.querySelector('#search').addEventListener('click', search)