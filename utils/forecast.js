const axios = require('axios')
const getGeocode = require("./geocode")


module.exports = async function getForeCast(res, address) {
    let token = "1a6bdf269c71dae79383eb6d0111865c"
    let myObject = await getGeocode(res, address)
    const url = `https://api.darksky.net/forecast/${token}/${myObject.coords[1]},${myObject.coords[0]}?units=si`;
    try {
        let response = await axios.get(url)
        let data = await response.data
        console.log(data, "my data")
        res.render("index", {
            myWeather: {
                location: address,
                temperature: data.currently.temperature,
                summary: data.currently.summary,
                uvIndex: data.currently.uvIndex,
                hourly: data.hourly
            }
        })

    }
    catch (err) {

    }

}