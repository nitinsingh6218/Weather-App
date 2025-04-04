import React, { useEffect, useState } from "react";
import "./Weather.css";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function Weather() {
  const [weatherData, setWeatherData] = useState(false);
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const handleSearch = async (searchValue) => {
    try {
      const searchUrl = `${VITE_BASE_URL}/current?query=${searchValue}&access_key=${VITE_API_KEY}`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      setWeatherData({
        location: data.location.name,
        temperature: data.current.temperature,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        weatherIcon: data.current.weather_icons[0],
        weatherDescription: data.current.weather_descriptions[0],
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    handleSearch("Varanasi");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchFieldValue}
          onChange={(e) => setSearchFieldValue(e.target.value)}
        ></input>
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/search--v1.png"
          alt="search icon"
          onClick={() => handleSearch(searchFieldValue)}
        ></img>
      </div>
      <div className="weather-icon">
        <img src={weatherData.weatherIcon} alt="weather icon"></img>
      </div>
      <div className="weather-info">
        <div className="location">{weatherData.location}</div>
        <div className="temperature">{weatherData.temperature}'c</div>
        <div className="weather-details">
          <div className="humidity">
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/humidity.png"
              alt="humidity icon"
            ></img>
            <div className="humidity-value">
              <span>{weatherData.humidity}%</span>
              <br />
              <span>Humidity</span>
            </div>
          </div>
          <div className="wind-speed">
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/wind.png"
              alt="wind icon"
            ></img>
            <div className="wind-speed-value">
              <span>{weatherData.windSpeed} km/h</span>
              <br />
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
