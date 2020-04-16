const axios = require('axios')

const getLatitudeAndLongitude = async (address) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmVlY2VlNDI0IiwiYSI6ImNrOGFveWV0MDA0N2czZHBpejc4YWNpODMifQ.eAVpJ72QdWxvv7D0hlQsoA&limit=1`
    try {
       
        const responseData = await axios.get(url)
        if(responseData.data.features.length !== 0) {
            let latitude = responseData.data.features[0].center[1]
            let longitude = responseData.data.features[0].center[0]
            let location = responseData.data.features[0].place_name

                return data = {
                    'latitude': latitude,
                    'longitude': longitude,
                    'location': location
                }
        } 

        return 'Unable to find location, try another search'
        

    }
    catch (error) {
           
            return 'Unable to connect to the location server' 
        
    }
    
}


module.exports = getLatitudeAndLongitude;