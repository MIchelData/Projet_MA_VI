import 'babel-polyfill';

async function connection() {
  const url = 'https://meteostat.p.rapidapi.com/stations/monthly?station=10637&start=2020-01-01&end=2020-12-31';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'meteostat.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// async function getData() {
//   const response = await fetch('https://ghibli.rest/films');
//   const data = await response.json();
// }

export default connection;