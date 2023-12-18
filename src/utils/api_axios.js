import axios from 'axios';
import 'babel-polyfill';

async function requestApi(url, params) {
  let options = {
    method: 'GET',
    url: '',
    params: {},
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'meteostat.p.rapidapi.com',
    },
  };
  options.url = url;
  options.params = params;
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default requestApi;
