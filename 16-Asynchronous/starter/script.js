'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      response => response.json() //JSON method available on all responses from fetch functions | This also returns a promise
    )
    .then(data => renderCountry(data[0]));
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
  countriesContainer.style.opacity = 1;
};
getCountryData('usa');
