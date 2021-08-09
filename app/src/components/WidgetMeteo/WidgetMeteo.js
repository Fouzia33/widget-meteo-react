import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './widgetMeteo.scss';

const WidgetMeteo = ({ zipCode, city }) => {

  const [ temperature, setTemperature ] = useState('-');

  console.log('API_URL', process.env.REACT_APP_API_URL);

  useEffect(() => {
    let url;
    // si on est en mode dev on utilise l'URL de l'API de dev
    if (process.env.NODE_ENV === 'development') {
      url = process.env.REACT_APP_API_URL;
    } else {
      /* si on est en mode production, construction avec URL de l'API de 
      production */
      url = `${process.env.REACT_APP_API_URL}?q=${zipCode},fr&APPID=${process.env.REACT_APP_API_KEY}&units=metric`;
    }
      
    axios.get(url)
      .then((response) => {
        const temperatureFromAPI = response.data.main.temp;
       
        const temperatureToDisplay = temperatureFromAPI.toFixed(0);
        setTemperature(temperatureToDisplay);
      })
  }, [city, zipCode]);
  
  return (
    <article className="weather-widget">
      <div className="weather-container">
        <div className="weather-infos">
          <h3 className="weather-city">{city}</h3>
          <p className="weather-zipcode">{zipCode}</p> 
        </div>
        <div className="weather-temperature">
          {temperature}
        </div>
      </div>
    </article>
  );
};

WidgetMeteo.propTypes = {
  zipCode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default WidgetMeteo;
