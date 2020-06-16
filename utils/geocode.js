const axios = require('axios')


module.exports = async function getGeocode(res, address) {
    let token = "pk.eyJ1IjoidHJhbmhhaWJhbzE5OTciLCJhIjoiY2s3b3Ric2FwMGQyMTNubzZ4MWE0cjVsZiJ9.3FR12lKyGIdMT9OkBXqvqg"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=${token}`;
    try {
        let response = await axios.get(url)
        let data = response.data
        console.log(data.features[0], "this is data")
        let myObj = {
            coords: data.features[0].geometry.coordinates,
            location: data.features[0].place_name
        }
        return myObj



    }
    catch (err) {
               console.log(err)
    }

}


