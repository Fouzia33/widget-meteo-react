import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/*
Surge : outil pour déployer un projet front en static
https://surge.sh/
- il faut avoir un build de production ('yarn build')
- il faut avoir installé surge en global sur la machine ('npm install --global surge')
=> accessible depuis n'importe quel projet
- pour déployer un projet : 'surge nom-du-dossier' avec le dossier qu'on veut 
dépler (par exemple dist ou build), appuyer sur Entrée quand il propose
un nom de domaine
- la première fois qu'on lance la commande 'surge' sur la machine il faut
indiquer des identifiants pour créer un compte
- il est possible qu'il y ait une erreur si le nom de domaine est déjà pris
"Aborted - you do not have permission to publish to untidy-disgust.surge.sh"
=> dans ce cas, relancer la commande jusqu'à ce que ça marche

Pour lister nos projets : `surge list`
Pour dépublier un projet : `surge teardown nom-de-domaine`
*/

import './widgetMeteo.scss';

const WidgetMeteo = ({ zipCode, city }) => {
  /*
  useState : crée une case dans le state
  En argument on fournit la valeur initiale pour la case du state
  useState retourne un tableau avec 2 informations :
    - valeur actuelle de la case
    - fonction qui permet de changer la valeur
  Quand on fait appel à la fonction qui permet de changer la valeur, React
  fait automatiquement un rendu du composant
  */
  const [ temperature, setTemperature ] = useState('-');

  // variable d'environnement : variable qui change de valeur en fonction
  // de l'environnement dans lequel on est (dev ou prod)
  // console.log('environnement: ', process.env.NODE_ENV);

  // objectif : on a une API différente en dev et en prod, on voudrait que
  // quand on est en mode dev (yarn start) ce soit l'API de dev qui soit
  // utilisée, et quand on est en mode production (yarn build et déployé)
  // ce soit l'API de production, ET on voudrait que ce soit automatique
  
  // variables d'environnement avec create-react-app :
  // https://create-react-app.dev/docs/adding-custom-environment-variables/

  console.log('API_URL', process.env.REACT_APP_API_URL);

  /*
  deuxième argument de useEffect :
   - si pas indiqué => après chaque rendu du composant
   - si tableau de dépendances vide, [] => après le premier rendu du composant, et plus jamais ensuite
   - si tableau de dépendances non vide => après le premier rendu du composant, et ensuite l'effet sera
   appliqué conditionnellement après les rendus suivants, si l'une des dépendances change de valeur
  */
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
        // console.log(response);

        const temperatureFromAPI = response.data.main.temp;
        // on arrondit à zéro décimale
        // retourne une chaîne de caractères
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
        const temperatureToDisplay = temperatureFromAPI.toFixed(0);
        setTemperature(temperatureToDisplay);
      })
  }, [city, zipCode]);
  // ici on veut réappliquer l'effet si l'une des props change de valeur
  
  
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
