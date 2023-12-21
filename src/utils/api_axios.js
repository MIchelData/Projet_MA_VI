import CountryMeteoIndex from '../data/CountryMeteoIndex.json';

// Fonction pour calculer la moyenne mensuelle de tmax qui exclut les valeurs "null" de tmax
function calculateMonthlyTmaxAverage(weatherData) {
  let monthlyAverages = {};
  weatherData.forEach(data => {
      let month = data.date.substring(5, 7);
      if (data.tmax !== null) {
          monthlyAverages[month] = monthlyAverages[month] || [];
          monthlyAverages[month].push(data.tmax);
      }
  });

  for (let month in monthlyAverages) {
    if (monthlyAverages[month].length > 0) {
        let sum = monthlyAverages[month].reduce((a, b) => a + b, 0);
        let average = sum / monthlyAverages[month].length;
        monthlyAverages[month] = average;
    } else {
        // Attribuer -21 pour les mois sans données valides (uniquement des données "null")
        monthlyAverages[month] = -21;
    }
}

return monthlyAverages;
}

// Fonction pour obtenir les données météorologiques
async function getWeatherData(URL) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
    }
  };

try {
  const response = await fetch(URL, options);
  const result = await response.json();
  console.log(result);
  return result;
} catch (error) {
  console.error('Erreur lors de la récupération des données météo:', error);
  return null;
}

}

// Fonction pour obtenir les données météorologiques pour tous les pays
async function getAllWeatherData() {
  const results = [];

  for (const countryData of CountryMeteoIndex) {
    const { Country, URL } = countryData;
    const weatherData = await getWeatherData(URL);
    if (weatherData && weatherData.data) {
        // Calculer les moyennes mensuelles de tmax
        const monthlyAvgTmax = calculateMonthlyTmaxAverage(weatherData.data);
        results.push({ Country, weatherData: { monthlyAverages: monthlyAvgTmax } });
    }
}

return results;
}

export { getAllWeatherData };

