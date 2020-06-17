const axios = require('axios')



module.exports = async function getcurrentLocationForcast(res, { longtitude, latitude }) {
    let token = "1a6bdf269c71dae79383eb6d0111865c"

    const url = `https://api.darksky.net/forecast/${token}/${latitude},${longtitude}?units=si`;
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
            return data

        })


        console.log(data,"helloooooooo")
     
        
      res.json(data)

    } catch (err) {
        console.log(err)
    }

}