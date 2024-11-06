import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherWidget() {
  const [city, setCity] = useState('New York'); // Default city
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching

      try {
        const apiKey = cbf36d5422607a9b65d2b151e615835c; // Replace with your OpenWeatherMap API key
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        setWeather(response.data);
      } catch (err) {
        setError('Error fetching weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="Weather icon"
          />
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
