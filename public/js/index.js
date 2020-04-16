


let weatherForm = document.querySelector('.form');
let forecastContainer = document.querySelector(".forecast");
let span = document.querySelector('.spanForecast')

weatherForm.addEventListener('submit', (e) => {
    span.textContent = 'Please wait...'
   forecastContainer.textContent = '' 
})

