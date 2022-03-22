'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const language = Object.values(data.languages);
  const currency = Object.values(data.currencies);
  const html = `
          <article class="country ${className}">
            <img class="country__img" src="${data.flags.svg}" />
            <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)} million</p>
              <p class="country__row"><span>🗣️</span>${language[0]}</p>
              <p class="country__row"><span>💰</span>${currency[0].name}</p>
            </div>
          </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //countriesContainer.style.opacity = 1;
};
///////////////////////////////////////

/* const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const language = Object.values(data.languages);
    const currency = Object.values(data.currencies);
    renderCountry(data);
  });
}; */

/* const getCountryDataAndNeighbor = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //Render country 1
    renderCountry(data);

    //Get neighbor country
    const [neighbor] = data.borders;
    console.log(neighbor);

    //guard clause
    if (!neighbor) return;

    //AJAX call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
}; 
getCountryDataAndNeighbor('usa');
getCountryData('portugal');
getCountryData('germany');
*/
/* const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
request.send(); */

//Transmission Control Protocol / Internet Protocol
//HTTP HyperText Transfer Protocol
//Code that is hard to understand = bad code
//To escape "callback hell" you can use Promises to chain the async calls

//Using the Fetch API

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`Country not found ${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  //Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      // const neighbor = 'afje';
      if (!neighbor) throw new Error('No neighbor found.');

      //Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      // console.log(`Something went wrong ${err}`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};
btn.addEventListener('click', function () {
  getCountryData('usa');
});

//getCountryData('australia');

//Coding Challenge #1

/* const whereAmI = function (lat, long) {
  fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
    .then(res => {
      if (!res.ok)
        throw new Error(
          `The data was not retrieved (${res.status}) from the API`
        );
      return res.json();
    })
    .then(data => {
      console.log(
        `Welcome to ${data.city}, ${data.country}. Your coordinates are at ${data.latt}, ${data.longt}`
      );
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok)
        throw new Error(
          `Could not retrieve the country data from API ${res.status}`
        );
      return res.json();
    })
    .then(data => {
      renderCountry(data[0]);
      countriesContainer.style.opacity = 1;
    })

    .catch(err => console.error(`Something went wrong - ${err.message}`));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474); */
//Success!

//Promises take an executor function
/* const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN!'); //this will mark the promise as a fulfilled promise and set the result value of the promise
    } else {
      reject('You lost at the game!');
    }
  }, 2000);
}); */

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

/* wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));
 */
// Promise.resolve('abe').then(x => console.log(x));
// Promise.reject('abc').catch(err => console.log(err));

//Promisifying the Geolocation API

//getPosition().then(pos => console.log(pos));

//Coding Challenge #2
//My solution
/* const createImage = function (imgPath) {
  const newImg = document.createElement('img');
  newImg.src = imgPath;
  const images = document.getElementsByClassName('images')[0];
  //Wait till done loading then append to DOM
  return new Promise(function (resolve, reject) {
    if (!imgPath) {
      //unneccessary?, the implied guard is passing the imgPath in the first place
      reject('There was no image to render');
      return;
    } else {
      newImg.addEventListener('load', function () {
        images.appendChild(newImg); //insertAdjacentHTML didn't work here
        resolve(newImg);
      });
      wait(2)
        .then(() => {
          newImg.style.display = 'none';
          newImg.src = 'img/img-2.jpg';
          newImg.style.display = 'block';
          return wait(2);
        })
        .then(() => (newImg.style.display = 'none'));
    }
  }).catch(err => {
    console.error(`This my test error: ${err.message}`);
  });
};
createImage('img/img-1.jpg'); */
//Jonas' solution
/* const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};
let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => (currentImg.style.display = 'none'))
  .catch(err => console.error(err));
 */

/* //My 2nd Attempt
const images = document.querySelector('.images');
//Coding Challenge #2
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const newImg = document.createElement('img');
    newImg.src = imgPath;

    newImg.addEventListener('load', function () {
      images.append(newImg);
      resolve(newImg);
    });
    newImg.addEventListener('error', function () {
      reject('Image not found');
    });
  });
};

let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
 */

// Consuming Promises with Async/Await

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: long } = pos.coords;

    //Reverse Geocoding
    const geo = await fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
    if (!geo.ok) throw new Error('The location data could not be obtained.');
    const dataGeo = await geo.json();
    //console.log(dataGeo);

    //Country Data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.prov}`
    );
    if (!res.ok) throw new Error('Country could not be found.'); //currently doesn't work b/c they changed the API, may need to find a new one. Returns 'US' instead of 'USA' //FIX THIS
    const data = await res.json();
    //console.log(data);
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(`🎉 ${err.message}`);

    //reject promise returned from Async function.
    throw err;
  }
};
//console.log('1. Will get location');
/* const city = whereAmI();
console.log(city); */
/* whereAmI()
  .then(city => console.log(`2: ${city}`))
  .catch(err => `2: ${err.message}`)
  .finally(() => console.log('3. Finished getting location')); */

//Using an IIFE (immediately invoked function expressions)
/* (async function () {
  try {
    const wRes = await whereAmI();
    console.log(`2: ${wRes}`);
  } catch (err) {
    console.error(`2: ${err.messgae}`);
  }
  console.log('3. Finished getting location');
}); */

//Try / Catch

/* try {
  let a = 1;
  const b = 2;
  b = 4;
} catch (err) {
  alert(err.message);
}
 */

//Running Promises in Parallel
/* const get3Countries = async function (c1, c2, c3) {
  try {
    /* const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
 
    //run all promises at the same time
    const data = await Promise.all(
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`)
    );
    console.log(data.map(d => d[0].capital));
    //console.log([data1.capital, data2.capital, data3.capital]);
  } catch (err) {
    console.error(err);
  }
};
get3Countries('usa', 'portugal', 'spain');

//Promise.race (First settled promise wins the race)
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long'));
    }, sec);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/france`),
  timeout(20),
])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

//Promise.allSettled
Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

//Promise.any [ES2021]
Promise.any([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res)); 
*/

const images = document.querySelector('.images');
//Coding Challenge #2
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const newImg = document.createElement('img');
    newImg.src = imgPath;

    newImg.addEventListener('load', function () {
      images.append(newImg);
      resolve(newImg);
    });
    newImg.addEventListener('error', function () {
      reject('Image not found');
    });
  });
};
/*
let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
 */
/* const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
}; */

/* const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg');
    await wait(2);

    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
loadNPause(); //SO EASY WOW */

//Part 2

const loadAll = async function (imgArr) {
  try {
    const images = imgArr.map(async img => await createImage(img));
    console.log(images);

    const imgsEL = await Promise.all(images);
    console.log(imgsEL);
    imgsEL.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
