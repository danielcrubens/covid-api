/* import { ApiKey } from "./config.js";
 */const apiKey = process.env.API_KEY;

let covid19data;

const init = async () => {
    await Covid();
    await getLatestCOVID19Data();
}
init();

function Covid() {

    const countries = document.querySelector('#countries')

    countries.addEventListener('change', () => {
        const selectedValue = document.querySelector('#countries').value;
        const countryData = covid19data.filter(c => c.country == selectedValue)[0];

        const newConfirmed = document.querySelector('#covidNewConfirmed');
        const totalConfirmed = document.querySelector('#covidTotalConfirmed');
        const covidNewDeaths = document.querySelector('#covidNewDeaths');
        const covidTotalDeaths = document.querySelector('#covidTotalDeaths');
        const lastUpdated = document.querySelector('#covidLastUpdate');

        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const lastUpdatedDate = new Date(countryData.day);
        const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(lastUpdatedDate);


        (countryData.cases.new) ? newConfirmed.innerHTML = '<strong> Novos casos confirmados: </strong>' + countryData.cases.new : newConfirmed.innerHTML = '<strong>Novos casos confirmados: </strong> 0';
        (countryData.cases.total) ? totalConfirmed.innerHTML = '<strong>Total de casos confirmados</strong>: ' + countryData.cases.total : totalConfirmed.innerHTML = '<strong>Total de casos confirmados</strong>: 0';
        (countryData.deaths.new) ? covidNewDeaths.innerHTML = '<strong>Novas mortes</strong>: ' + countryData.deaths.new : covidNewDeaths.innerHTML = '<strong>Novas mortes</strong>: 0';
        (countryData.deaths.total) ? covidTotalDeaths.innerHTML = '<strong>Total mortes</strong>: ' + countryData.deaths.total : covidTotalDeaths.innerHTML = '<strong>Total mortes</strong>: 0';
        lastUpdated.innerHTML = '<strong>Ultimas atualização:</strong> ' + formattedDate;
    })

}

async function getLatestCOVID19Data() {

    await fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.response.forEach(c => {
                const option = document.createElement('option');
                option.innerHTML = c.country;
                document.getElementById('countries').appendChild(option);
            })
            covid19data = data.response;
        })
        .catch(err => {
            console.log(err);
        });
}


