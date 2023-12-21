import * as d3 from 'd3';
import getPriceIndex from './price_index';
<<<<<<< HEAD
import { forEach } from 'lodash-es';

function displayMap(budget = 'all') {
  // ajoutez les paramètres precipitation et température
  let priceIndex = getPriceIndex();
  let countries = d3.select('#map');
  let paths = countries.selectAll('path');
  if (budget == 'all') {
    paths.attr('fill', 'white').attr('opacity', '0.7');
    paths.attr('stroke', 'black').attr('fill', 'rgba(81, 212, 55, 0.8)');
  } else {
    paths.attr('fill', 'white').attr('opacity', '0.7');
    paths.each(function (d, i) {
      let matchingCountry = priceIndex.find((priceid) => priceid.country == d.properties.admin);
      if (matchingCountry && matchingCountry.indexPrice == budget) {
        d3.select(this).attr('stroke', 'black').attr('fill', 'rgba(81, 212, 55, 0.8)');
      }
    });
  }
=======
import { getAllWeatherData } from './api_axios';

async function displayMap(budget = 'all', tempMin = null, tempMax = null, selectedMonth = '01', climate = 'all') {
  // ajoutez les paramètres precipitation
  let priceIndex = getPriceIndex();
  let countries = d3.select('#map');
  let paths = countries.selectAll('path');

  const allWeatherData = await getAllWeatherData();

  paths.each(function(d) {
      let isBudgetMatch = false;
      let isTempMatch = false;
      let isClimateMatch = false;

      // Vérifier si le pays correspond au budget sélectionné
      const matchingCountryPrice = priceIndex.find(priceid => priceid.country == d.properties.admin);
      if (budget === 'all' || (matchingCountryPrice && matchingCountryPrice.indexPrice === budget)) {
          isBudgetMatch = true;
      }

      // Vérifier si les températures correspondent à la sélection de l'utilisateur
      const countryWeatherData = allWeatherData.find(data => data.Country === d.properties.admin);
      if (countryWeatherData && countryWeatherData.weatherData) {
            const monthlyAverageTmax = countryWeatherData.weatherData.monthlyTmaxAverages[selectedMonth];
            if (monthlyAverageTmax >= tempMin && monthlyAverageTmax <= tempMax) {
                isTempMatch = true;
            }
      

            // Vérifier si les précipitations correspondent à la sélection de l'utilisateur
            const monthlyAveragePrcp = countryWeatherData.weatherData.monthlyPrcpAverages[selectedMonth];
            switch (climate) {
                case 'pluvieux':
                    isClimateMatch = monthlyAveragePrcp > 150;
                    break;
                case 'moyen':
                    isClimateMatch = monthlyAveragePrcp >= 50 && monthlyAveragePrcp <= 150;
                    break;
                case 'ideal':
                    isClimateMatch = monthlyAveragePrcp < 50;
                    break;
                case 'all':
                default:
                    isClimateMatch = true;
                    break;
            }
      }


      // Appliquer la couleur en fonction des conditions de budget, de température et des précipitations
      if (isBudgetMatch && isTempMatch && isClimateMatch) {
          d3.select(this).attr('fill', 'rgba(81, 212, 55, 0.8)').attr('stroke', 'black').attr('opacity', '0.7');
      } else {
          d3.select(this).attr('fill', 'white').attr('opacity', '0.7');
      }
  });
>>>>>>> master
}

export default displayMap;
