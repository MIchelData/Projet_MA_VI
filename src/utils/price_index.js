import priceIndex from '../data/CountryPriceIndex2023.json';
function getPriceIndex() {
  let price_category = [900, 1800];
  let country_by_cost = { petit: [], regular: [], large: [], all: [] };
  let country_price_index = [];
  priceIndex.forEach((elem) => {
    if (elem.Price <= 900) {
      country_by_cost.petit.push(elem);
      country_price_index.push({ price: elem.Price, country: elem.Country, indexPrice: 'petit' });
    }
    if (elem.Price > 900 && elem.Price <= 1800) {
      country_by_cost.regular.push(elem);
      country_price_index.push({ price: elem.Price, country: elem.Country, indexPrice: 'regular' });
    }
    if (elem.Price > 1800) {
      country_by_cost.large.push(elem);
      country_price_index.push({ price: elem.Price, country: elem.Country, indexPrice: 'large' });
    }
    country_by_cost.all.push(elem);
  });
  return country_price_index;
}
export default getPriceIndex;
