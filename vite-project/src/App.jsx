import React, { useEffect, useState } from 'react'

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
      <form onSubmit={handle}>
        <input type="text" placeholder='Search country' value={city}
          onChange={(e) => setCity(e.target.value)}/>
      </form>
      <h2>{weather.name}</h2>
      <h4>{Math.round(weather.main.temp-273.15)}°C</h4>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <div>{weather.weather[0].main}</div>
    </div>
  )
}

export default App