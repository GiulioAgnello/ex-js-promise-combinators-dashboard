async function cityFetch(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

async function getDashboardData(query) {
  let cityAll;
  try {
    const place = cityFetch(
      `http://localhost:3333/destinations?search=${query}`
    );
    let weathers = cityFetch(`http://localhost:3333/weathers?search=${query}`);
    let airPort = cityFetch(`http://localhost:3333/airports?search=${query}`);
    cityAll = await Promise.all([place, weathers, airPort]);
  } catch (error) {
    throw new Error(console.error(error));
  }

  return {
    ...cityAll,
  };
}

getDashboardData("london")
  .then((data) => {
    const city = data[0];
    const weathers = data[1];
    const airport = data[2];
    console.log("Dasboard data:", data);
    console.log(
      `${city[0].name} is in ${city[0].country}.\n` +
        `Today there are ${weathers[0].temperature} degrees and the weather is ${weathers[0].weather_description}.\n` +
        `The main airport is ${airport[0].name}.\n`
    );
  })
  .catch((error) => console.error(error));
