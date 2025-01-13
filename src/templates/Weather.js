import axios from 'axios';
import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { FaCloudSun, FaSun, FaCloudRain, FaSmog, FaCloud } from 'react-icons/fa';
import AirIcon from '@mui/icons-material/Air';

export default function Weather() {

  const [formData, setFormData] = useState('');
  const [weatherData, setWeatherdata] = useState('');
  const data = formData;

  const {

    name,
    main,
    weather,
    wind,
    visibility,
  } = weatherData || {};

  const { temp } = main || {};
  const { description } = weather ? weather[0] : {};
  const { speed } = wind || {};

  const fatchWeather = async () => {

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=2cc711b1a7ffa12a235ee3b46f4e21c5&units=metric`)

      if (response) {
        const weatherData = response.data;
        console.log(response.data);
        setWeatherdata(weatherData);

      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData', formData);
    fatchWeather();
    setFormData('');
  }
  return (
    <div>
       <div>
        <h2 className='weather-heading'>Check Weather Application</h2>
        <div className='waether-show-div'>
          <form onSubmit={handleSubmit}>
            <input type="text" name='name' value={formData} onChange={(e) => setFormData(e.target.value)} required />
            <button type="submit">Submit</button>
          </form>
        </div>

        {/* ==========Weather Template========== */}

        {weatherData ?
        <div className="main">
          <div className="details">
            {name ? <h3>City: {name}</h3> : ''}
            {temp ? <strong>Temperature: {temp}°C</strong> : ''}
            <div className="forecast">
              <div className="forecast-item">
                <p>Cloud</p>
                {description ? <div> {description === 'clear sky' ? <FontAwesomeIcon icon={faSun} size="2x" color="#FDB813" />: description === 'fog'? <FaSmog size={50} color="#808080" />: <FaCloudSun size={50} color="#FDB813" /> } 
                  <p className="temp">{description}</p></div> : ''}
              </div>
              <div className="forecast-item">
                <p>Visibility</p>
                {visibility ? <div>{visibility > 8000?<FaSun size={50} color="#FDB813" />: visibility > 3000?<FaCloud size={50} color="#B0C4DE" />: visibility > 1000?<FaCloudRain size={50} color="#4682B4" />:<FaSmog size={50} color="#808080" />}
                  <p className="temp">{visibility} km</p></div> : ''}
              </div>
              <div className="forecast-item">
                <p>Wind</p>
                {speed ? <div> <AirIcon fontSize="large" color="primary" />
                  <p className="temp">Speed {speed} /H</p></div> : ''}
              </div>
            </div>
          </div>
        </div> : <p className='before-cheack-weather-desc'>Please Enter the city name in above input for check the weather.</p>}
      </div> 
    </div>
  )
}
