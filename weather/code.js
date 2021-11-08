const day = document.querySelector(".day")
const hamburger = document.querySelector("#hamburger")
const gradus = document.querySelector(".gradus")
const forecast = document.querySelector(".forecast")
const city = document.querySelector(".city")

getWeather()

hamburger.addEventListener("click", ()=>{
    day.childNodes[1].classList.toggle('hide')
    day.childNodes[3].classList.toggle('hide')
    day.childNodes[3].addEventListener('keyup', (e)=>{
                if (e.key == 'Enter') {
                    getWeather(day.childNodes[3].value)
                    day.childNodes[3].classList.toggle('hide')
                    day.childNodes[1].classList.toggle('hide')
                }
            })
    })

async function getWeather(place='minsk'){
    const url =`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=bf9d673488df4611ad6162034212710&q=${place}&num_of_days=5&format=json`;
    const res = await fetch(url);
    const data = await res.json(); 
    render(data)
    console.log(data)
}


function render(data) {

    gradus.innerHTML = `${data.data.current_condition[0].temp_C}℃`
    console.log(forecast.childNodes);
    for (let i = 0; i < 5; i++) {
        
        forecast.childNodes[1+6*i].innerHTML = transformDate(data.data.weather[i].date)
        forecast.childNodes[5+6*i].innerHTML = `${data.data.weather[i].mintempC}/${data.data.weather[i].maxtempC}℃`
        forecast.childNodes[3+6*i].src = `./pic/day/${data.data.weather[i].hourly[4].weatherCode}.png`
        forecast.childNodes[3+6*i].width = "50"
        forecast.childNodes[3+6*i].height = "50"
    }
    city.innerHTML = data.data.request[0].query

}


function transformDate(time) {
    let date = new Date(time)
    return(date.toLocaleDateString('en-GB', {month:'short', day:'2-digit', weekday:'short'}));
}

