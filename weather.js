const http = require('http')
require('dotenv').load()

const cityInput = process.argv[2]

getWeather(cityInput)

function getWeather(city){
  const request =
    http.request('http://api.openweathermap.org/data/2.5/weather?q=' +
    city.split(' ').join('+') +
    '&APPID=' + process.env.API_KEY,
    res => {
      var body = ''
      res.on('data', data => {
        body += data
      })
      res.on('end', () => {
        let json = JSON.parse(body)
        let farenheit = convertKtoF(json.main.temp)
        console.log(`Temperature in ${city}: ${farenheit}`)
      })
    })
  request.end()
}

function convertKtoF(kelvin){
  return Math.round(kelvin * 9/5 - 459.67)
}
