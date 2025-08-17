import SearchBox from './SearchBox'
import InfoBox from './Infobox'
import { useState } from 'react'

export default function WeatherApp(){

    const [weatherInfo,setWeatherInfo]=useState({
        city: "Delhi",
        temp: 98,
        feelslike: 29,
        humidity: 54,
        tempMax: 24.0,
        tempMin: 98.0,
        weather: "haze"
    })

    let updateInfo=(newinfo)=>{
        setWeatherInfo(newinfo)
    }
    return(
        <div style={{textAlign:"center"}}>
            <h2>Weather App By Rohan</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}