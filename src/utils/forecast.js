const axios = require('axios')
const getLatAndLong = require('./geocode')

const getWeatherForecast = async (latitude, longitude) => {
    
    try {

            let url = `https://api.darksky.net/forecast/4e8217c1703bc4fa6468bd76349cb1e1/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`
            const responseData = await axios.get(url)
            if (responseData) {
                let currentData = responseData.data.currently;
                return `The weather is ${currentData.summary}, and temperature is currently ${currentData.temperature} degrees. There is ${currentData.precipProbability}% chance it'd rain`
            }
         
    }
    catch(error) {
        if (error.response) {
           return 'Invalid location cordinates, try another search'
        } 
            return 'Unable to connect to weather service'
        }
}



module.exports = getWeatherForecast;