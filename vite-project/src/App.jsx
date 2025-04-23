import React, { useEffect, useState } from 'react'
import './App.css';
const App = () => {
  const [weather, setWeather]=useState(null)
  const [city, setCity] =useState("Vegas")
  const _baseUrl = "https://api.openweathermap.org/data/2.5/weather?q="
  const myApi = "d8aeae6cfda6fe04d8c0fa9a6f05d624"

  const getWeather=async(cityName)=>{
    const res = await fetch (_baseUrl+cityName+"&appid="+myApi)
    const data = await res.json()
    setWeather(data)
  }

  const handle = (e)=>{
    e.preventDefault()
    if (city.trim()) {
      getWeather(city)
    }
  } 

  useEffect(()=>{
    getWeather(city)
  }, [])
  if(weather==null){
    return <h1>Loading</h1>
  }

  return (
    <div>
      <div className='head'>
        <h1>Прогноз погоды</h1>
        <div className='center-container'>
          <form onSubmit={handle} className='input-container'>
            <input
              id="countryInput"
              type="text"
              placeholder="Введите название города"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button id="countryBtn" type="submit">Показать</button>
          </form>
        </div>
      </div>

      <div className='main' style={{ display: weather ? "flex" : "none" }}>
        <div id='list'>
          {weather && weather.main ? (
            <>
              <div>
                <h1>{weather.name} <span>{weather.sys.country}</span></h1>
                <h1 className='temp'><strong>{weather.main.temp}°C</strong></h1>
                <p>Ветер: {weather.wind.speed} м/с</p>
                <p>Влажность: {weather.main.humidity}%</p>
              </div>
              <div>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
              </div>
            </>
          ) : (
            <h2>Введите корректный город</h2>
          )}
        </div>
        <div className='list-2'></div>
      </div>
    </div>
  )
}

export default App