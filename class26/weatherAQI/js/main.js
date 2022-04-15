//fetch(`https://rickandmortyapi.com/api/character`)
//  .then(res => res.json())
//  .then(data => {
//    console.log(data)
//  })
//  .catch(err => {
//    console.log(`error ${err}`)
//  })

const REGION = document.querySelector('#region')
const CURRENT= document.querySelector('#current')
const MAX = document.querySelector('#max')
const MIN = document.querySelector('#min')
const HUMIDITY = document.querySelector('#humidity')
const MAIN = document.querySelector('#main')
const DESCRIPTION = document.querySelector('#description')
const AQI = document.querySelector('#aqi')
ERRORDISPLAY = document.querySelector('#error')

function clearFields() {
  REGION.innerHTML = ``
  CURRENT.innerHTML = ``
  MAX.innerHTML = ``
  MIN.innerHTML = ``
  HUMIDITY.innerHTML = ``
  MAIN.innerHTML = ``
  DESCRIPTION.innerHTML = ``
  AQI.innerHTML = ``
  ERRORDISPLAY.innerHTML = ``
}

function getLocation() {
  clearFields()
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);
  locationWeather(position.coords.latitude, position.coords.longitude);
  locationAQI(position.coords.latitude, position.coords.longitude);
}

function getCity() {
  clearFields()
  let cityName = document.querySelector("#city").value
  if (cityName !== '') {
   cityWeather(cityName)
   cityAQI(cityName)
  }
}

function cityWeather(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ed15da7cf2f11da138edf397aec2b973`)
    .then(res => res.json())
    .then(data => {
      console.log(`City Weather Data:`);
      console.log(data)
      displayWeather(data)
    })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

function locationWeather(latitude, longitude) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ed15da7cf2f11da138edf397aec2b973`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(`Location Weather Data:`);
      console.log(data)
      displayWeather(data)
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function displayWeather(data) {
  if (data.cod === `404`)
  {
    ERRORDISPLAY.innerHTML = data.message
  } else {
    REGION.innerHTML = data.name
    CURRENT.innerHTML = data.main.temp + ` &deg;C`
    MAX.innerHTML = data.main.temp_max + ` &deg;C`
    MIN.innerHTML = data.main.temp_min + ` &deg;C`
    HUMIDITY.innerHTML = data.main.humidity + `%`
    MAIN.innerHTML = data.weather[0].main  
    DESCRIPTION.innerHTML = data.weather[0].description
  }
}

function displayAQI(data) {
  if(! data === `Unknown station`) {
    AQI.innerHTML = data.aqi
  }
}

function cityAQI(cityName) {
  fetch(
    `https://api.waqi.info/feed/${cityName}/?token=4d9881561d7102906a7c4f751aa5ef8f5d025678`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(`City AQI Data:`);
      console.log(data);
      displayAQI(data.data)
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}

function locationAQI(latitude, longitude) {
  fetch(
    `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=4d9881561d7102906a7c4f751aa5ef8f5d025678`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(`Location AQI Data:`);
      console.log(data);
      displayAQI(data.data)
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}

document.querySelector("#cityWeather").addEventListener("click", getCity);
document.querySelector("#localWeather").addEventListener("click", getLocation);
