import CountryMeteoIndex from '../data/CountryMeteoIndex.json';

// Fonction pour calculer la moyenne mensuelle de tmax qui exclut les valeurs "null" de tmax
function calculateMonthlyTmaxAverage(weatherData) {
  let monthlyTmaxAverages = {};
  weatherData.forEach(data => {
      let month = data.date.substring(5, 7);
      if (data.tmax !== null) {
          monthlyTmaxAverages[month] = monthlyTmaxAverages[month] || [];
          monthlyTmaxAverages[month].push(data.tmax);
      }
  });

  for (let month in monthlyTmaxAverages) {
    if (monthlyTmaxAverages[month].length > 0) {
        let sum = monthlyTmaxAverages[month].reduce((a, b) => a + b, 0);
        let average = sum / monthlyTmaxAverages[month].length;
        monthlyTmaxAverages[month] = average;
    } else {
        // Attribuer -21 pour les mois sans données valides (uniquement des données "null")
        monthlyTmaxAverages[month] = -21;
    }
}

return monthlyTmaxAverages;
}

// Fonction pour calculer la moyenne mensuelle de prcp (précipitations)
function calculateMonthlyPrcpAverage(weatherData) {
  let monthlyPrcpAverages = {};
  weatherData.forEach(data => {
    let month = data.date.substring(5, 7);
    if (data.prcp !== null) {
      monthlyPrcpAverages[month] = monthlyPrcpAverages[month] || [];
      monthlyPrcpAverages[month].push(data.prcp);
    }
  });

  for (let month in monthlyPrcpAverages) {
    if (monthlyPrcpAverages[month].length > 0) {
      let sum = monthlyPrcpAverages[month].reduce((a, b) => a + b, 0);
      let average = sum / monthlyPrcpAverages[month].length;
      monthlyPrcpAverages[month] = average;
    } else {
      monthlyPrcpAverages[month] = -1; // Indique l'absence de données
    }
  }

  return monthlyPrcpAverages;
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

       // Calculer les moyennes mensuelles de précipitations (prcp)
       const monthlyAvgPrcp = calculateMonthlyPrcpAverage(weatherData.data);
 
       // Stocker les moyennes mensuelles de tmax et prcp dans l'objet résultat
       results.push({
         Country,
         weatherData: {
           monthlyTmaxAverages: monthlyAvgTmax,
           monthlyPrcpAverages: monthlyAvgPrcp
         }
       });
     }
   }
 
   return results;
 }

export { getAllWeatherData };

