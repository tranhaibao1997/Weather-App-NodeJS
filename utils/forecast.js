const axios = require('axios')
const getGeocode = require("./geocode")


module.exports = async function getForeCast(res, address) {
    let token = "1a6bdf269c71dae79383eb6d0111865c"
    let myObject = await getGeocode(res, address)
    const url = `https://api.darksky.net/forecast/${token}/${myObject.coords[1]},${myObject.coords[0]}?units=si`;
    console.log(url)
    try {
        let response = await axios.get(url)
        let data = await response.data
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
            console.log(data)
            return data

        })

        res.render("index", {
            myWeather: {
                location: address,
                temperature: data.currently.temperature,
                summary: data.currently.summary,
                uvIndex: data.currently.uvIndex,
                hourly: data.hourly,
                data: data.hourly.data


            }

        })

    } catch (err) {

    }

}