
    const apiKey = '6f93c2351ce0c04e867d551b63a23087';
    const apiUrl = "http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search input");
    const weatherIcon = document.querySelector(".weather-icon");


    async function checkWeather(zipCode){
        const response = await fetch(apiUrl + zipCode `&appid=${apiKey}` );
        var data = await response.json();
        console.log(data);
        document.querySelector(".zipCode").innerHTML =data.name;
        document.querySelector(".temp").innerHTML =Math(round.main.temp) + "°F";
        document.querySelector(".humidity").innerHTML =data.main.humidity + "%";
        document.querySelector(".wind").innerHTML =data.wind.speed + "mph";

        if(data.Weather[0].main == "Clouds"){
            weatherIcon.src = "weather_app/clouds.png"    
        }
        else if (data.Weather[0].main == "Clear"){
            weatherIcon.src = "weather_app/clear.png"
        }
        else if (data.Weather[0].main == "Rain"){
            weatherIcon.src = "weather_app/rain.png"
        }
        else if (data.Weather[0].main == "Drizzle"){
            weatherIcon.src = "weather_app/drizzle.png"
        }
        else if (data.Weather[0].main == "Mist"){
            weatherIcon.src = "weather_app/mist.png"
        }


    }
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.Value);
})