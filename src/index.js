import css from './css/main.css';

import * as map from './objects/Map';

import * as rangeInput from './objects/DataInputs/rangeInput';

import * as d3 from 'd3';
import { json } from 'd3-fetch';

import getDataPoints from './utils/meteo';
import requestApi from './utils/api_axios';
import 'babel-polyfill';

// getDataPoints();

// connection();
// requestAPI('https://meteostat.p.rapidapi.com/stations/hourly')

async function fetchData() {
  let results = await requestApi(`${process.env.BASE_URL}/stations/nearby`, { lat: '51.5085', lon: '-0.1257' });
  console.log(results.data);
}

fetchData();
