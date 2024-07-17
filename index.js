const apiKey = 'dd636ad28cfe3ceb40ecc58e060e4637'
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`

const searchInput = document.querySelector('.search input')
const searchButton = document.querySelector('.search button');
const weatherImg = document.querySelector('.weather img');
const temp = document.querySelector('.temp');
const cityname = document.querySelector('.city');
const humidity = document.querySelector('.humidity')
const speed = document.querySelector('.speed')
const errorMessage = document.querySelector('.error');

// Query functions
// const params = new URLSearchParams(window.location.search)
// params.searchParams.set('giyos', 'dada')
// console.log(params.toString());



async function checkWeather(city = 'berlin') {
    const response = await fetch(apiUrl + `&q=${city}&appid=${apiKey}`)
    const data = await response.json()
    if (data.cod == 200) {
        weatherImg.src = `/assets/${data.weather?.[0].main.toLowerCase()}.png`;
        temp.textContent = data?.main?.temp.toFixed(0) + '°C';
        cityname.textContent = data?.name
        humidity.textContent = data?.main?.humidity + '%';
        speed.textContent = data?.wind?.speed + 'km/h'
        errorMessage.classList.add('none')
    } else if (data.cod != 200) {
        errorMessage.classList.remove('none')
    }
}


document.addEventListener('DOMContentLoaded', function () {
    checkWeather()
    // searchInput.value = 'Berlin'
})

searchButton.addEventListener('click', function (e) {
    e.stopPropagation();
    const value = searchInput.value;
    checkWeather(value)
})

document.addEventListener('keydown', function (e) {
    e.key == 'Enter' && checkWeather(searchInput.value)
})


