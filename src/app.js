const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser');
const getLatitudeAndLongitude = require('./utils/geocode')
const getWeatherForecast = require('./utils/forecast')

//Use public folders to serve static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

//Specify the view engine to be used
app.set('view engine', 'hbs')

//Register partials directory
hbs.registerPartials(path.join(__dirname, "../views/partials"))

app.get('/', (req, res) => {
    res.render('index', {title: 'Home'})
})

app.get('/weather', (req, res) => {
    res.render('weather', {title: 'Forecast weather'})
})

app.post('/weather', async (req, res) => {

    try {
        let address = await req.body.address; 
        if(!address) {
          return res.send({'error':'enter an address'})
        }
            let geocodeInfo = await getLatitudeAndLongitude(address)
            let latitude = await geocodeInfo.latitude;
            let longitude = await geocodeInfo.longitude;
            let location = await geocodeInfo.location;
           
            if(!latitude || !longitude) {
                return res.render('weather', {weatherForecast: geocodeInfo})
            }
            
        let weatherForecast = await getWeatherForecast(latitude, longitude)
        return res.render('weather', {weatherForecast, title: 'Forecast weather', location, forecastTag: 'Forecast: ', locationTag: 'Location: '})
    }
    catch (error) {
        console.log(error)
       return res.send('Something went wrong');
    }

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Valentine',
        title: 'About'
    })
})

app.get('*', (req, res) => {
    res.render('404')
})


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})