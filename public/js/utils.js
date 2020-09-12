
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((reg) => { console.log('Service Worker Registered', reg) })
            .catch((err) => { console.log('Service Worker Not Registered', err) })
    }
    
)} else {
    alert("This Browser does not support service worker, You may not be able to get weather information Offline")
}


function unixConvert(unixTimestamp) {
    // Unixtimestamp
    let unixtimestamp = unixTimestamp
    // Months array
    let months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Convert timestamp to milliseconds
    let date = new Date(unixtimestamp * 1000);
    // Year
    let year = date.getFullYear();
    // Month
    let month = months_arr[date.getMonth()];
    // Day
    let day = date.getDate();
    // Hours
    let hours = date.getHours();
    // Minutes
    let minutes = "0" + date.getMinutes();
    // Seconds
    let seconds = "0" + date.getSeconds();
    // Display date time in MM-dd-yyyy h:m:s format
    let convdataTime = month + '-' + day + '-' + year;

    return convdataTime
}

const updateCurrentForcast = (data, currentDescription, currentIconId, currentMainTemprature, currentMinTemprature, currentMaxTemprature, currentCityCountry) => {
    currentDescription.innerText = data.weather[0].description
    // icon

    switch (data.weather[0].icon) {
        case '01d':
            currentIconId.setAttribute('src', `img/icons/animated/01d.svg`)
            break;
        case '01n':
            currentIconId.setAttribute('src', `img/icons/animated/01n.svg`)
            break;
        case '02d':
            currentIconId.setAttribute('src', `img/icons/animated/02d.svg`)
            break;
        case '02n':
            currentIconId.setAttribute('src', `img/icons/animated/02n.svg`)
            break;
        case '03n':
            currentIconId.setAttribute('src', `img/icons/animated/03n.svg`)
            break;
        default:
            currentIconId.setAttribute('src', `img/icons/animated/${data.weather[0].id}.svg`)
            break;
    }
    // currentTemp
    currentMainTemprature.innerText = `${Math.floor(data.main.temp - kelvin)}°c`
    // mintemp
    currentMinTemprature.innerText = `${Math.floor(data.main.temp_min - kelvin)}°c`
    // maxTemp
    currentMaxTemprature.innerText = `${Math.floor(data.main.temp_max - kelvin)}°c`
    // cityCountry
    currentCityCountry.innerText = `${data.name}, ${data.sys.country}`
};



const updateDailyForcast = (data, dailyDate, dailyIconId, dailyDescription, dailyMinTemprature, dailyMaxTemprature) => {
    for (let index = 0; index < data.daily.length; index++) {
        const date = data.daily[index].dt;
        dailyDate[index].innerText = unixConvert(date)
    };



    for (let index = 0; index < data.daily.length; index++) {
        const iconId = data.daily[index].weather[0].id;
        // icons
        switch (data.daily[index].weather[0].icon) {
            case '01d':
                dailyIconId[index].setAttribute('src', `img/icons/animated/01d.svg`)
                break;
            case '01n':
                dailyIconId[index].setAttribute('src', `img/icons/animated/01n.svg`)
                break;
            case '02d':
                dailyIconId[index].setAttribute('src', `img/icons/animated/02d.svg`)
                break;
            case '02n':
                dailyIconId[index].setAttribute('src', `img/icons/animated/02n.svg`)
                break;
            case '03n':
                dailyIconId[index].setAttribute('src', `img/icons/animated/03n.svg`)
                break;
            default:
                dailyIconId[index].setAttribute('src', `img/icons/animated/${iconId}.svg`)
                break;
        }
    }



    for (let index = 0; index < data.daily.length; index++) {
        const description = data.daily[index].weather[0].description;
        dailyDescription[index].innerText = description
    }



    for (let index = 0; index < data.daily.length; index++) {
        const minTemp = data.daily[index].temp.min;
        dailyMinTemprature[index].innerText = `${Math.floor(minTemp - kelvin)}°c`
    }



    for (let index = 0; index < data.daily.length; index++) {
        const maxTemp = data.daily[index].temp.max;
        dailyMaxTemprature[index].innerText = `${Math.floor(maxTemp - kelvin)}°c`
    }

    return data
};

const emptyCurrentWeatherOutput = (currentDescription, currentIconId, currentMainTemprature, currentMinTemprature, currentMaxTemprature, currentCityCountry) => {
    currentDescription.innerText = ' -- -- '
    // icon
    currentIconId.setAttribute('src', 'img/icons/unknown.png')
    // currentTemp
    currentMainTemprature.innerText = ' - - °c'
    // mintemp
    currentMinTemprature.innerText = ' - - °c'
    // maxTemp
    currentMaxTemprature.innerText = ' - - °c'
    // cityCountry
    currentCityCountry.innerText = ' -- , -- '
};

const emptyDailyWeatherOutput = (dailyDate, dailyIconId, dailyDescription, dailyMinTemprature, dailyMaxTemprature) => {
    for (let index = 0; index < dailyDate.length; index++) {
        dailyDate[index].innerText = '- - -'
    };

    for (let index = 0; index < dailyIconId.length; index++) {
        dailyIconId[index].setAttribute('src', 'img/icons/unknown.png')
    };

    for (let index = 0; index < dailyDescription.length; index++) {
        dailyDescription[index].innerText = ' - - '
    }

    for (let index = 0; index < dailyMinTemprature.length; index++) {
        dailyMinTemprature[index].innerText = '- -°c'
    }

    for (let index = 0; index < dailyMaxTemprature.length; index++) {
        dailyMaxTemprature[index].innerText = '- -°c'
    }
};

