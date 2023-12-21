import * as d3 from 'd3';
import getPriceIndex from './price_index';
import { getAllWeatherData } from './api_axios';

async function displayMap(budget = 'all', tempMin = null, tempMax = null, selectedMonth = '01') {
  // ajoutez les paramètres precipitation
  let priceIndex = getPriceIndex();
  let countries = d3.select('#map');
  let paths = countries.selectAll('path');

  const allWeatherData = await getAllWeatherData();

  paths.each(function(d) {
      let isBudgetMatch = false;
      let isTempMatch = false;

      // Vérifier si le pays correspond au budget sélectionné
      const matchingCountryPrice = priceIndex.find(priceid => priceid.country == d.properties.admin);
      if (budget === 'all' || (matchingCountryPrice && matchingCountryPrice.indexPrice === budget)) {
          isBudgetMatch = true;
      }

      // Vérifier si les températures correspondent à la sélection de l'utilisateur
      const countryWeatherData = allWeatherData.find(data => data.Country === d.properties.admin);
      if (countryWeatherData && countryWeatherData.weatherData) {
          const monthlyAverageTmax = countryWeatherData.weatherData.monthlyAverages[selectedMonth];
          if (monthlyAverageTmax >= tempMin && monthlyAverageTmax <= tempMax) {
              isTempMatch = true;
          }
      }

      // Appliquer la couleur en fonction des conditions de budget et de température
      if (isBudgetMatch && isTempMatch) {
          d3.select(this).attr('fill', 'rgba(81, 212, 55, 0.8)').attr('stroke', 'black').attr('opacity', '0.7');
      } else {
          d3.select(this).attr('fill', 'white').attr('opacity', '0.7');
      }
  });
}

export default displayMap;
