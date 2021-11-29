let Conditions = {
    "Clear":"wi wi-day-sunny",
    "Rain":"wi wi-day-rain",
    "Clouds":"wi wi-day-cloudy",
    "Snow":"wi wi-day-snow",
    "Mist":"wi wi-day-fog",
    "Drizzle":"wi wi-day-sleet"
}

const ipinfo_API_Key = "a0ed8c22b4ed6d"
const openweather_API_Key = "c9e6e304673711b76ad5f246ef30dd0c"

async function weather(withIp = true){
    let ville;
    if(withIp)
    {
        const ip = await fetch("https://api.ipify.org?format=json")
        .then(results => results.json())
        .then(myIp => myIp.ip)
    
        ville = await fetch(`http://ipinfo.io/${ip}?token=${ipinfo_API_Key}`)
        .then(results => results.json())
        .then(myCity => myCity.city)
    }
    else
    {
        ville = document.querySelector('#ville').textContent
    }

    const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${openweather_API_Key}&lang=fr&units=metrics`)
    .then(results => results.json())
    .then(myMeteo => myMeteo)

    //console.log(meteo.weather[0].main.toLowerCase())
    schowWeatherInfos(meteo)

}

function schowWeatherInfos(data){
    const name = data.name
    const temperature = Math.round(data.main.temp - 273.15)
    const condition = data.weather[0].main
    const description = data.weather[0].description

    document.querySelector('#ville').textContent = name
    document.querySelector('#temperature').textContent = temperature
    document.querySelector('#description').textContent = description
    document.querySelector('i.wi').className = Conditions[condition]
    document.querySelector('body').className = condition.toLowerCase()
}

const city = document.querySelector('#ville');

city.addEventListener("click",() => {
    city.contentEditable = true;
});

city.addEventListener("keydown",(e) => {
    if(e.keyCode === 13)
    {
        e.preventDefault()
        city.contentEditable = false;
        weather(false);
    }
})

weather()
