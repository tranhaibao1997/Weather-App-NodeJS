getWeather = async (longtitude, latitude) => {

    let body = { longtitude, latitude }
    try {

        const response = await fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(body)
        });
        let data = await response.json()
        data.hourly.data.map(data => {
            let date = new Date(data.time * 1000);
            // Hours part from the timestamp
            let hours = date.getHours();
            // Minutes part from the timestamp
            let minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            let seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
            let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

            data.time = formattedTime

            return data

        })
        let myWeather = {
            location: "Current Location",
            temperature: data.currently.temperature,
            summary: data.currently.summary,
            uvIndex: data.currently.uvIndex,
            hourly: data.hourly,
            data: data.hourly.data


        }

        document.getElementById("current-weather").innerHTML = `
        <h2>Weather at ${myWeather.location}</h2>
        <div class="weather-info">
            <div class="icon">
                <img src="https://darksky.net/images/weather-icons/${myWeather.hourly.icon}.png" alt="icon">
            </div>
            <div class="info">
                <p>Summary: ${myWeather.summary}</p>
                <p>Temperature: ${myWeather.temperature}</p>
                <p>UV Index: ${myWeather.uvIndex}</p>
            </div>

        </div>
        <h3>${myWeather.hourly.summary}</h3>

        `



    } catch (err) {
        console.log(err)
    }
}

showLocation = (position) => {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    getWeather(longitude, latitude)
};
errorHandler = (err) => {
    if (err.code == 1) {
        alert("Error: Access is denied!");
    } else if (err.code == 2) {
        alert("Error: Position is unavailable!");
    }
};

getLocation = () => {
    if (navigator.geolocation) {
        // timeout at 60000 milliseconds (60 seconds)
        var options = { timeout: 60000 };
        navigator.geolocation.getCurrentPosition(
            showLocation,
            errorHandler,
            options
        );
    } else {
        alert("Sorry, browser does not support geolocation!");
    }
};

getLocation()