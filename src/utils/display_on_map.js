import * as d3 from 'd3';
import getPriceIndex from './price_index';
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
      let hasNoWeatherData = true;  // Nouvelle variable pour vérifier l'existence des données météo

      const countryWeatherData = allWeatherData.find(data => data.Country === d.properties.admin);

      // Vérifier si le pays a des données météo
      if (countryWeatherData && countryWeatherData.weatherData && Object.keys(countryWeatherData.weatherData.monthlyTmaxAverages).length > 0) {
          hasNoWeatherData = false; // Il y a des données météo

            // Vérifier si le pays correspond au budget sélectionné
             const matchingCountryPrice = priceIndex.find(priceid => priceid.country == d.properties.admin);
            if (budget === 'all' || (matchingCountryPrice && matchingCountryPrice.indexPrice === budget)) {
                isBudgetMatch = true;
            }

            // Vérifier si les températures correspondent à la sélection de l'utilisateur
            if (countryWeatherData && countryWeatherData.weatherData) {
                    const monthlyAverageTmax = countryWeatherData.weatherData.monthlyTmaxAverages[selectedMonth];
                    if (monthlyAverageTmax >= tempMin && monthlyAverageTmax <= tempMax) {
                        isTempMatch = true;
                    }
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


      // Appliquer la couleur en fonction des conditions de budget, de température, des précipitations et de la disponibilité des données météo
      if (hasNoWeatherData) {
          d3.select(this).attr('fill', 'turquoise').attr('stroke', 'black').attr('opacity', '0.7'); // Couleur pour les pays sans données météo
      } else if (isBudgetMatch && isTempMatch && isClimateMatch) {
          d3.select(this).attr('fill', 'rgba(81, 212, 55, 0.8)').attr('stroke', 'black').attr('opacity', '0.7');
      } else {
          d3.select(this).attr('fill', 'white').attr('opacity', '0.7');
      }
  });
}

export default displayMap;
