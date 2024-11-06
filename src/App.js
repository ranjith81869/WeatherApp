import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const App = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cbf36d5422607a9b65d2b151e615835c`)
      .then((response) => response.json())
      .then((data) => {
        const kelvin = data.main.temp;
        const celcius = kelvin - 273.15;
        const feelsLike = data.main.feels_like - 273.15;
        const humidity = data.main.humidity;
        const windSpeed = (data.wind.speed * 2.237).toFixed(1); // Convert m/s to MPH
        const weatherDescription = data.weather[0].description;

        // Choose a relevant weather icon based on the description
        let weatherIconUrl = '';
        if (weatherDescription.includes('cloud')) {
          weatherIconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/svgs/solid/cloud.svg'; // Cloudy icon
        } else if (weatherDescription.includes('rain')) {
          weatherIconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/svgs/solid/cloud-showers-heavy.svg'; // Rain icon
        } else if (weatherDescription.includes('clear')) {
          weatherIconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/svgs/solid/sun.svg'; // Clear weather icon
        } else if (weatherDescription.includes('snow')) {
          weatherIconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/svgs/solid/snowflake.svg'; // Snow icon
        } else {
          weatherIconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/svgs/solid/cloud-sun.svg'; // Default weather icon
        }

        setResult(
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h3>{city}</h3>

            {/* Weather details displayed side by side with icons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px', marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', flex: '1 1 200px' }}>
                <i className="fas fa-thermometer-half" style={{ fontSize: '40px', marginRight: '10px' }}></i> {/* Temperature icon */}
                <div>
                  <h2>{Math.round(celcius)}°C</h2>
                  <p>Temperature</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', flex: '1 1 200px' }}>
                <i className="fas fa-temperature-high" style={{ fontSize: '40px', marginRight: '10px' }}></i> {/* Feels Like icon */}
                <div>
                  <h2>{Math.round(feelsLike)}°C</h2>
                  <p>Feels Like</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', flex: '1 1 200px' }}>
                <i className={`fas ${weatherDescription.includes('cloud') ? 'fa-cloud' : weatherDescription.includes('rain') ? 'fa-cloud-showers-heavy' : weatherDescription.includes('clear') ? 'fa-sun' : weatherDescription.includes('snow') ? 'fa-snowflake' : 'fa-cloud-sun'}`} style={{ fontSize: '40px', marginRight: '10px' }}></i> {/* Weather icon */}
                <div>
                  <h2>{weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}</h2>
                  <p>Weather</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', flex: '1 1 200px', marginRight: '20px' }}> {/* Increased marginRight for Humidity */}
                <i className="fas fa-tint" style={{ fontSize: '40px', marginRight: '10px' }}></i> {/* Humidity icon */}
                <div>
                  <h2>{humidity}%</h2>
                  <p>Humidity</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', flex: '1 1 200px' }}>
                <i className="fas fa-wind" style={{ fontSize: '40px', marginLeft: '10px' }}></i> {/* Wind Speed icon */}
                <div>
                  <h2>{windSpeed} MPH</h2>

                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        );
      })
      .catch((error) => console.log(error));

    setCity("");
  };

  return (
    <div style={{
      backgroundImage: `url('http://wallup.net/wp-content/uploads/2016/03/10/328637-nature-landscape-Deep_Space-galaxy-stars-universe-Hubble_Deep_Field-NASA.jpg')`,
      backgroundSize: 'cover',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', // Prevents overflow of the background
      animation: 'moveBackground 30s infinite linear', // Applying animation
      position: 'relative'
    }}>
      <center>
        <div className="card" style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '50px',
          position: 'relative', // Ensure relative positioning
          zIndex: 1 // Keep card below the h4
        }}>
          <h4 style={{
            position: 'relative',
            fontSize: '2rem',
            marginBottom: '20px', // Space between h4 and card content
            color: '#333',
            zIndex: 2 // Ensure it's above the card content
          }}>
            Weather App
          </h4>
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <input size="30" type="text" name="city" onChange={changeHandler} value={city} /> <br /><br />
              <input type="submit" value="Get Weather Info" />
            </form><br />
            <br />
            <div>
              {result}
            </div>
          </div>
        </div>
      </center>

      {/* Adding the animation using CSS */}
      <style>{`
        @keyframes moveBackground {
          0% { background-position: 0 0; }
          100% { background-position: -1000px 0; }
        }
        /* Add Font Awesome CSS link in HTML or import in your project */
      `}</style>
    </div>
  );
};

export default App;