//Move the comment section to try my jQuery code vs Vanilla Javascript.
$(function () {

    key = "b637be93921b95367db68b9d6ae5ae88";

    // jQuery code
    let result = $("#result")
    let searchBtn = $("#search-btn")
    let cityRef = $("#city")

    searchBtn.on("click", getWeather);
    $(window).load(getWeather());

    function getWeather() {
        let cityValue = cityRef.val();
        if (cityValue.length == 0) {
            result.text("Please enter a city name")
        } else {
            const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`
            fetch(API_WEATHER)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(response.status)
                    } else {
                        return response.json()
                    }
                })
                .then((data) => {
                    console.log(data);
                    $(".name").text(data.name);
                    $(".weather").text(data.weather[0].description);
                    $(".icon").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
                    $(".main-temp").text(data.main.temp + "°");
                    $(".title-min").text("min");
                    $(".temp-min").text(data.main.temp_min + "°")
                    $(".title-max").text("max");
                    $(".temp-max").text(data.main.temp_max + "°")
                })
                // ?
                .catch(() => {
                    result.text("City not found")
                })
                .catch(error => {
                    $("main").append($("<div class='error'>").text("Something went wrong: " + error));
                })
        }
    }



    // Vanilla Javascript code
    /*
    
    let result = document.getElementById("result");
    let searchBtn = document.getElementById("search-btn");
    let cityRef = document.getElementById("city");
    key = "b637be93921b95367db68b9d6ae5ae88";
    
    
    
    let getWeather = () => {
        let cityValue = cityRef.value;
        if (cityValue.length == 0) {
            result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`
        } else {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
            cityRef.value = "";
            fetch(url)
            .then((resp) => resp.json())
            .then(data => {
                console.log(data);
                result.innerHTML = `
                <h2>${data.name}</h2>
                <h4 class="weather">${data.weather[0].description}</h4>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
                <h1>${data.main.temp} &#176;</h1>
                <div class="temp-container">
                    <div>
                        <h4 class="title">min</h4>
                        <h4 class="temp">${data.main.temp_min} &#176;</h4>
                    </div>
                    <div>
                    <h4 class="title">max</h4>
                    <h4 class="temp">${data.main.temp_max} &#176;</h4>
                </div>
                </div>`
    
            })
            .catch(() => {
                result.innerHTML = `<h3 class="msg">City not found</h3>`
            })
        }
    };
    
    searchBtn.addEventListener("click", getWeather);
    window.addEventListener("load", getWeather);
    
    */

});


