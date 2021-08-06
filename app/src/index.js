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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
