'use strict';

import { lastUpdate, findCountry } from './helpers.js';

import {
  WORLD_API_URL,
  SINGLE_COUNTRY_API_URL,
  API_KEY,
  WORLD_HOST_URL,
  COUNTRY_HOST_URL,
} from './config.js';

import { createElemets, completeData } from './view.js';

lastUpdate();

const getAllCountriesData = () => {
  try {
    fetch(`${WORLD_API_URL}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': `${API_KEY}`,
        'x-rapidapi-host': `${WORLD_HOST_URL}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        completeData(data);
      });
  } catch (err) {
    console.error(err);
  }
};
getAllCountriesData();

const getSingleCountryData = () => {
  fetch(`${SINGLE_COUNTRY_API_URL}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': `${API_KEY}`,
      'x-rapidapi-host': `${COUNTRY_HOST_URL}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      createElemets(data);
    })
    .catch(err => {
      console.log(err);
    });
};
getSingleCountryData();

const favCountries = [];
document.querySelector('.list-content').addEventListener('click', e => {
  if (e.target.classList.contains('single-country')) {
    findCountry(e);
  }

  if (e.target.classList.contains('favorite')) {
    favCountries.push(e.target.closest('.single-country').textContent);
    const li = document.createElement('li');
    li.classList.add('single-country');
    li.textContent = favCountries[favCountries.length - 1];
    document.querySelector('.fav-list').append(li);
    const favouriteIcon = document.createElement('i');
    favouriteIcon.classList.add('far', 'fa-star', 'favorite');
    li.appendChild(favouriteIcon);
  }
});

document.querySelector('.favourite-countries').addEventListener('click', e => {
  if (e.target.classList.contains('single-country')) {
    findCountry(e);
  } else {
    e.target.closest('.single-country').style.display = 'none';
  }
});
