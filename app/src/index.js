import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WidgetMeteo from './components/WidgetMeteo/WidgetMeteo';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <WidgetMeteo zipCode="33000" city="Bordeaux" />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
