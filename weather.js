const http = require('http')
require('dotenv').load()

// process, global object
const cityInput = process.argv[2]

getWeather(cityInput)

function getWeather(city){
  let queryUrl =
    'http://api.openweathermap.org/data/2.5/weather?q=' +
    city.split(' ').join('+') +
    '&APPID=' + process.env.API_KEY

  http.get(queryUrl, response => {
    let body = ''
    // concatenates the stream of data
    response.on('data', data => {
      body += data
    })

    response.on('end', () => {
      //uses the native JSON object to parse data into object
      let json = JSON.parse(body)
      let farenheit = convertKtoF(json.main.temp)
      console.log(`Temperature in ${city}: ${farenheit}`)
    })
  })
}

function convertKtoF(kelvin){
  return Math.round(kelvin * 9/5 - 459.67)
}
