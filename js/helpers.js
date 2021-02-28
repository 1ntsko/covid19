import { countryData } from './config.js';

export const lastUpdate = () => {
  const date = document.querySelector('.date');
  date.textContent = new Date();
};

const modalClose = () => {
  const modal = document.getElementById('myModal');
  document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
    document.querySelector('.modal-content').style.display = 'none';
  });
  window.addEventListener('click', e => {
    if (e.target == modal) {
      document.querySelector('.modal-content').style.display = 'none';
      modal.style.display = 'none';
    }
  });
};

const modalTemplate = data => {
  const html = `
  <div class="modal-content">
    <div class="modal-body">
      <div class="modal-header">
        <span class="close" id="times">&times;</span>
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
  modalClose();
};

export const findCountry = e => {
  document.getElementById('myModal').style.display = 'block';
  const countryName = e.target.textContent;
  const foundCountry = countryData.data.result.find(
    entry => entry.country === countryName
  );
  modalTemplate(foundCountry);
};
