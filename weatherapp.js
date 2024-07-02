
    const apiKey = '6f93c2351ce0c04e867d551b63a23087';


    const searchBox = document.getElementById('zipCode');
    const searchBtn = document.getElementById('searchBtn');
    const weatherIcon = document.getElementById("weather-icon");


    async function checkWeather(zipCode){
        try{
        const apiUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        const lat = data.lat;
        const lon = data.lon;
        console.log(`Longitude: ${lon}, Latitude: ${lat}`);
        const weatherUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        

        return weatherData;
} catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Optional: rethrow the error to handle it in the click event listener
    }
}
    

    function updateWeatherUI(data) {
        console.log(data);

        // Update DOM elements with weather data
        document.getElementById("zipCode").innerHTML =data.zipCode;
        document.getElementById("temp").innerHTML =Math.round(data.main.temp) + "°F";
        document.getElementById("humidity").innerHTML =data.main.humidity + "%";
        document.getElementById("wind").innerHTML =data.wind.speed + "mph";

            // Weather icon based on weather condition
        const weatherCondition = data.weather[0].main.toLowerCase();
        document.getElementById("weather-icon").src = getWeatherIcon(weatherCondition);
    }


function getWeatherIcon(weatherCondition) {
    switch (weatherCondition) {
        case "clouds":
            return "clouds.png";
        case "clear":
            return "clear.png";
        case "rain":
            return "rain.png";
        case "drizzle":
            return "drizzle.png";
        case "mist":
            return "mist.png";
        default:
            return "clear.png";
    }
}

searchBtn.addEventListener("click", async(e)=>{
    e.preventDefault();
    try { 
        const weatherData = await checkWeather(searchBox.value);
        updateWeatherUI(weatherData);
    } catch (error) {
        console.error('Error handling weather data:', error);
        // Handle the error (e.g., display a message to the user)
    }
});