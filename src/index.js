import css from './css/main.css';

import * as map from './objects/Map';

import * as rangeInput from './objects/DataInputs/rangeInput';

import * as d3 from 'd3';
import { json } from 'd3-fetch';

import { getAllWeatherData } from './utils/api_axios';

import 'babel-polyfill';

import getPriceIndex from './utils/price_index';

import displayMap from './utils/display_on_map';

getPriceIndex();

// Fonction pour mettre à jour la carte en fonction des curseurs, du mois et du budget
function updateMap() {
  const tempMin = parseInt(document.getElementById('fromInput').value, 10);
  const tempMax = parseInt(document.getElementById('toInput').value, 10);
  let selectedMonth = document.getElementById('select_month').value;

  selectedMonth = selectedMonth.padStart(2, '0');
  
  const budget = document.querySelector('input[name="budget"]:checked').value;
  const climate = document.querySelector('input[name="climate"]:checked').value;

  displayMap(budget, tempMin, tempMax, selectedMonth, climate);
}

// Ajout des écouteurs d'événements pour les curseurs de température et le sélecteur de mois
document.getElementById('fromSlider').addEventListener('change', updateMap);
document.getElementById('toSlider').addEventListener('change', updateMap);
document.getElementById('select_month').addEventListener('change', updateMap);

// Ajout des écouteurs d'événements pour les options de budget
document.querySelectorAll('.budget_input input').forEach((button) => {
  button.addEventListener('click', updateMap);
});
// Ajout des écouteurs d'événements pour les options de climat
document.querySelectorAll('.climate_input input').forEach((button) => {
  button.addEventListener('click', updateMap);
});

// Initialiser la carte avec les valeurs par défaut
updateMap();

// Code pour synchroniser les curseurs et les champs d'entrée
const fromSlider = document.getElementById('fromSlider');
const toSlider = document.getElementById('toSlider');
const fromInput = document.getElementById('fromInput');
const toInput = document.getElementById('toInput');

function updateInputValues() {
    fromInput.value = fromSlider.value;
    toInput.value = toSlider.value;
}

function updateSliderValues() {
    fromSlider.value = fromInput.value;
    toSlider.value = toInput.value;
}

fromSlider.addEventListener('input', updateInputValues);
toSlider.addEventListener('input', updateInputValues);
fromInput.addEventListener('input', updateSliderValues);
toInput.addEventListener('input', updateSliderValues);

updateInputValues();