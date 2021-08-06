import React from 'react';
import PropTypes from 'prop-types';

import './widgetMeteo.scss';

const WidgetMeteo = ({ zipCode, city }) => (
 <article className="weather-widget">
   <div className="weather-container">
     <div className="weather-infos">
       <h3 className="wheather-city">{city}</h3>
       <p className="wheather-zipCode">{zipCode}</p>
     </div>
     <div className="weather-temperature">
        25°
      </div>
   </div>
 </article>
);

WidgetMeteo.propTypes = {
  zipCode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default WidgetMeteo;
