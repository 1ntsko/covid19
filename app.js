'use strict';

const countryData = {
  country: [],
  data: [],
};

const date = document.querySelector('.date');
let confirmedCases = document.querySelector('.cofirmed-cases');
const recovered = document.querySelector('.recovered-cases');
const critical = document.querySelector('.critical-cases');
let deaths = document.querySelector('.death-cases');

const recoverInProgress = document.getElementById('recover-in-progress');
const inMild = document.getElementById('mild-condition');
const criticalCases = document.getElementById('critical');
const closed = document.getElementById('closed');
let recoveredCases = document.getElementById('recovered');
let deathCases = document.getElementById('deaths');

const modal = document.getElementById('myModal');

const lastUpdate = () => {
  date.textContent = new Date();
};
lastUpdate();

const getAllCountriesData = () => {
  fetch(`https://covid-19-data.p.rapidapi.com/totals`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '116b50ddaamshe0ab2cc6645175dp164d7fjsn99faffc2cab6',
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
    },
  })
    .then(res => res.json())
    .then(data => {
      const formatter = new Intl.NumberFormat('en');

      confirmedCases.textContent = formatter.format(data[0].confirmed);
      recovered.textContent = formatter.format(data[0].recovered);
      critical.textContent = formatter.format(data[0].critical);
      deaths.textContent = formatter.format(data[0].deaths);

      recoverInProgress.textContent = formatter.format(
        data[0].confirmed - (data[0].deaths + data[0].recovered)
      );
      inMild.textContent = formatter.format(
        data[0].confirmed -
          (data[0].deaths + data[0].recovered - data[0].critical)
      );
      criticalCases.textContent = critical.textContent;
      closed.textContent = formatter.format(data[0].recovered + data[0].deaths);
      recoveredCases.textContent = recovered.textContent;
      deathCases.textContent = deaths.textContent;
    })
    .catch(err => console.error(err));
};
getAllCountriesData();

const list = document.querySelector('.list');

const getSingleCountryData = () => {
  fetch(
    'https://covid-19-coronavirus-statistics2.p.rapidapi.com/countriesData',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '116b50ddaamshe0ab2cc6645175dp164d7fjsn99faffc2cab6',
        'x-rapidapi-host': 'covid-19-coronavirus-statistics2.p.rapidapi.com',
      },
    }
  )
    .then(res => res.json())
    .then(data => {
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
    })
    .catch(err => {
      console.log(err);
    });
};
getSingleCountryData();

document.querySelector('.list-content').addEventListener('click', e => {
  if (e.target.classList == 'single-country') {
    document.getElementById('myModal').style.display = 'block';
    const countryName = e.target.textContent;
    const foundCountry = countryData.data.result.find(
      entry => entry.country === countryName
    );
    modalTemplate(foundCountry);
  } else {
    const favoriteCountryContainer = document.querySelector('.fav-list');
    favoriteCountryContainer.append(e.target.closest('.single-country'));
  }
});
////////////////// MODAL ///////////////

const modalClose = () => {
  const modal = document.getElementById('myModal');
  document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
    document.querySelector('.modal-content').style.display = 'none';
  });

  window.onclick = function (event) {
    if (event.target == modal) {
      document.querySelector('.modal-content').style.display = 'none';
      modal.style.display = 'none';
    }
  };
};
const modalTemplate = data => {
  const html = `
  <div class="modal-content">
    <div class="modal-body">
      <div class="modal-header">
        <span class="close" id="times" onclick='modalClose()'>&times;</span>
      </div>
      <span class="country">${data.country}</span>
      <div class="single-cases">
        <div class="confirmed_c">
          <span class="confirmed-title_c">Coronavirus cases:</span>
          <span class="cofirmed-cases_c">${data.totalCases}</span>
        </div>
        <div class="recovered_c">
          <span class="recovered-title_c">Recovered:</span>
          <span class="recovered-cases_c">${data.totalRecovered}</span>
        </div>
        <div class="critical_c">
          <span class="critical-title_c">New Deaths:</span>
          <span class="critical-cases_c">${data.newDeaths}</span>
        </div>
        <div class="deaths_c">
          <span class="death-title_c">Deaths:</span>
          <span class="death-cases_c">${data.totalDeaths}</span>
        </div>
      </div>
    </div>
    <div class="modal-footer"></div>
  </div>
  `;
  document.getElementById('myModal').insertAdjacentHTML('afterbegin', html);
};
