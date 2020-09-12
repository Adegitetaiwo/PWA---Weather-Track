
// app key and constant
const kelvin = 273
let key = '751f7a0b8dba53261d72fe31c6466efb'


cityForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let cityForm = document.getElementById('cityForm'),
        city = document.getElementById('city'),
        currentDescription = document.getElementById('description'),
        currentIconId = document.getElementById('icon_img'),
        currentMainTemprature = document.getElementById('active_temp'),
        currentMinTemprature = document.getElementById('min_temp'),
        currentMaxTemprature = document.getElementById('max_temp'),
        currentCityCountry = document.getElementById('city_country'),
        errorMessageBox = document.getElementById('error-message-box'),
        errorMessage = document.getElementById('error-message-text')

    let dailyDate = document.getElementsByClassName('dailyDate'),
        dailyIconId = document.getElementsByClassName('icon_img'),
        dailyDescription = document.getElementsByClassName('dailyDescription'),
        dailyMinTemprature = document.getElementsByClassName('daily_min_temp'),
        dailyMaxTemprature = document.getElementsByClassName('daily_next_temp')


    if (!city.value) {
        console.log('Input cannot be Empty')
    } else {


        city = document.getElementById('city').value.toLowerCase()
        let api = `//api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
        let updateWeather = (function(api) {
            fetch(api).then(
            (response)=> {
                let currentData = response.json();
                console.log(currentData)

                return currentData;
            }
            ).then(
                (currentData)=> {
                    errorMessageBox.style.display = 'none'

                    // handle one call api for 7days data
                    let cityLatitude = currentData.coord.lat
                    let cityLongitude = currentData.coord.lon

                        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&exclude=hourly&appid=${key}`)
                            .then((response) => {
                                let data = response.json();

                                return data;
                            }).then(data => {
                               let dataResp = updateDailyForcast(data, dailyDate, dailyIconId, dailyDescription, dailyMinTemprature, dailyMaxTemprature);
                                return dataResp
                            }).then(data => {
                                localStorage.setItem( `${city}_daily`, JSON.stringify(data))
                            }).catch(err =>{
                                console.log('Error at One-call api', err)
                            })
                                updateCurrentForcast(currentData, currentDescription, currentIconId, currentMainTemprature, currentMinTemprature, currentMaxTemprature, currentCityCountry);

                                // store current data in Localstorage
                                localStorage.setItem(`${city}_current`, JSON.stringify(currentData))
            }).catch((err)=>{
                errorMessageBox.style.display = 'block'
                  
                let backupDataCurrent = JSON.parse(localStorage.getItem(`${city}_current`))
                let backupDataDaily = JSON.parse(localStorage.getItem(`${city}_daily`))

                
                if (err != "" && backupDataCurrent != null ) {
                    errorMessage.innerText = 'Opps you\'re Offline!, But you have a backuped Search'

                    // return the backedUp data to the user
                    // current Data first
                    updateCurrentForcast(backupDataCurrent, currentDescription, currentIconId, currentMainTemprature, currentMinTemprature, currentMaxTemprature, currentCityCountry);

                    // return Daily Forcast to the User
                    updateDailyForcast(backupDataDaily, dailyDate, dailyIconId, dailyDescription, dailyMinTemprature, dailyMaxTemprature);
                      
                } else {
                    errorMessage.innerText = "Ah! You entered an unknown city name or there was a bad internet Connection."
                    emptyCurrentWeatherOutput(currentDescription, currentIconId, currentMainTemprature, currentMinTemprature, currentMaxTemprature, currentCityCountry);
                    emptyDailyWeatherOutput(dailyDate, dailyIconId, dailyDescription, dailyMinTemprature, dailyMaxTemprature);
                }

            }
)})(api);


        // reset form after submiting
        cityForm.reset();
    }
})



