import { countryData } from './config.js';

export const completeData = data => {
  const confirmedCases = document.querySelector('.cofirmed-cases');
  const recovered = document.querySelector('.recovered-cases');
  const critical = document.querySelector('.critical-cases');
  const deaths = document.querySelector('.death-cases');
  const recoverInProgress = document.getElementById('recover-in-progress');
  const inMild = document.getElementById('mild-condition');
  const criticalCases = document.getElementById('critical');
  const closed = document.getElementById('closed');
  const recoveredCases = document.getElementById('recovered');
  const deathCases = document.getElementById('deaths');
  const formatter = new Intl.NumberFormat('en');

  data = data[0];

  confirmedCases.textContent = formatter.format(data.confirmed);
  recovered.textContent = formatter.format(data.recovered);
  critical.textContent = formatter.format(data.critical);
  deaths.textContent = formatter.format(data.deaths);

  recoverInProgress.textContent = formatter.format(
    data.confirmed - (data.deaths + data.recovered)
  );
  inMild.textContent = formatter.format(
    data.confirmed - (data.deaths + data.recovered - data.critical)
  );
  criticalCases.textContent = critical.textContent;
  closed.textContent = formatter.format(data.recovered + data.deaths);
  recoveredCases.textContent = recovered.textContent;
  deathCases.textContent = deaths.textContent;
};

export const createElemets = data => {
  const list = document.querySelector('.list');
  countryData.data = data;
  [data][0].result.map(i => {
    countryData.country.push(i.country);
    countryData.country.sort((a, b) => (a > b ? 1 : -1));
  });
  countryData.country.forEach(i => {
    const listCountry = document.createElement('li');
    listCountry.classList.add('single-country');
    list.appendChild(listCountry);
    listCountry.textContent = i;
    const favouriteIcon = document.createElement('i');
    favouriteIcon.classList.add('far', 'fa-star', 'favorite');
    listCountry.appendChild(favouriteIcon);
  });
};
