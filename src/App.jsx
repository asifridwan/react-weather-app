import React, { useState } from 'react';

const api = {
  key: "db97f18a10c5c7aae4bc1474da2d1123",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 25) ? 'app warm' : 'app') : 'app'}>
      <>
        <input 
          className="search-box" 
          type="text" 
          placeholder="Enter Location..." 
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </>
      {(typeof weather.main != "undefined") ? (
        <div>
          <div className="result-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className="temperature">{Math.round(weather.main.temp)}° C</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
          <div className="author-name">
            Created by <span>Asif Ridwan</span>
          </div>
        </div>
      ) : ('')}
    </div>
  );
}

export default App;