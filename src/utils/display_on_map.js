import * as d3 from 'd3';
import getPriceIndex from './price_index';
import { forEach } from 'lodash-es';

function displayMap(budget = 'all') {
  // ajoutez les paramètres precipitation et température
  let priceIndex = getPriceIndex();
  let countries = d3.select('#map');
  let paths = countries.selectAll('path');
  if (budget == 'all') {
    paths.attr('fill', 'lightgreen');
  } else {
    paths.attr('fill', 'grey');
    paths.each(function (d, i) {
      let matchingCountry = priceIndex.find((priceid) => priceid.country == d.properties.admin);
      if (matchingCountry && matchingCountry.indexPrice == budget) {
        d3.select(this).attr('fill', 'lightgreen');
      }
    });
  }
}

export default displayMap;
