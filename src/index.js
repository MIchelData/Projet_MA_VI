import css from './css/main.css';

import * as map from './objects/Map';

import * as rangeInput from './objects/DataInputs/rangeInput';

import * as d3 from 'd3';
import { json } from 'd3-fetch';

import getDataPoints from './utils/meteo';
import requestApi from './utils/api_axios';
import 'babel-polyfill';

import getPriceIndex from './utils/price_index';

import displayMap from './utils/display_on_map';

// await getDataPoints('https://meteostat.p.rapidapi.com/point/normals', '');

// connection();
// requestAPI('https://meteostat.p.rapidapi.com/stations/hourly')

getPriceIndex();

async function fetchData() {
  let results = await requestApi(`${process.env.BASE_URL}/point/normals`, {
    lat: '51.5085',
    lon: '-0.1257',
  });
  console.log(results.data);
}

fetchData();
displayMap();

document.querySelectorAll('.budget_input input').forEach((buton) => {
  buton.addEventListener('click', (event) => {
    let budget = event.target.id;
    displayMap(budget);
  });
});
