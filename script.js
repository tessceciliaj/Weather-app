//Move the comment section to try my jQuery code vs Vanilla Javascript.
$(function () {
 
    key = "b637be93921b95367db68b9d6ae5ae88";

    // jQuery code
    let result = $("#result")
    let cityRef = $("#city")
    let error = $(".error")
    // Indentation is a little odd and some empty lines can be removed
       $("#search-container").click(function(event) {
        event.preventDefault();
        getWeather();
       })
  
     
    
    function getWeather() {
        let cityValue = cityRef.val();
        if (cityValue.length == 0) {
            error.text("Please enter a city name").show()
            result.hide()
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
                    error.text("City not found").hide() // You probably donät need to add any text here since it will not be seen
                    error.text("Please enter a city name").hide()
                    result.show()
                    $(".name").text(data.name);
                    $(".weather").text(data.weather[0].description);
                $(".icon").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"); // Nice!
                    $(".main-temp").text(data.main.temp + "°");
                    $(".title-min").text("min");
                    $(".temp-min").text(data.main.temp_min + "°")
                    $(".title-max").text("max");
                    $(".temp-max").text(data.main.temp_max + "°")
                })
                .catch(() => {
                    error.text("City not found").show()
                    result.hide()
                })
                .catch(error => {
                    $("main").append($("<div class='error'>").text("Something went wrong: " + error));
                })
        }
    }

  getWeather()


    // Vanilla Javascript code
   /*
    
    let result = document.getElementById("result");
    let searchBtn = document.getElementById("search-btn");
    let cityRef = document.getElementById("city");
    key = "b637be93921b95367db68b9d6ae5ae88";
    
      document.getElementById("search-container").addEventListener("submit", function(event) {
       event.preventDefault() 
       getWeather();
       console.log(event);
    })
    
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


