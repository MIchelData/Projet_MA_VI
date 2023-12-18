import requestAPI from './api';
async function getDataPoints() {
  //   let results = requestAPI('https://meteostat.p.rapidapi.com/stations/nearby?lat=51.5085&lon=-0.1257');
  let results = await requestAPI('https://meteostat.p.rapidapi.com/stations/monthly?station=10637&start=2020-01-01&end=2020-12-31');

  print('la', results);
}

export default getDataPoints;
