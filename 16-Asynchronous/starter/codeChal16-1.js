'use strict';
const whereAmI = function (lat, long) {
  fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(
          `The data was not successfully returned (${response.status})`
        );
      return response.json();
    })
    .then(data => {
      console.log(`Welcome to ${data.city}, ${data.country}`);
      getCountryData(data.country);
    })
    .catch(err =>
      console.error(`Something went wrong - ${err.message} dis me`)
    );
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
