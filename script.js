const inputCountry = document.querySelector("#input-country");
const inputNeighbor = document.querySelector("#input-neighbor");
const btnSubmit = document.querySelector("#btn-submit");

inputCountry.addEventListener("input", buttonListener);
inputNeighbor.addEventListener("input", buttonListener);
btnSubmit.onclick = () => {
    if(document.querySelector("article")) clearNeighbors();
    getResponse(inputCountry.value, inputNeighbor.value);
}

async function getResponse(country, numberOfNeighbors = 0) {
	const response = await fetch(
        "https://countries-api-836d.onrender.com/countries/name/" + country
	);
	if (!response.ok) {
        document.querySelector("#main-country").innerHTML = 
            `<div class="error-message">The country you entered does not exist, please enter a valid country!</div>`;
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
    const neighborsArr = data[0].borders;
    displayCountries(data, numberOfNeighbors, neighborsArr)
}

async function displayCountries(country, numberOfNeighbors, bordersArr) {
    document.querySelector("#main-country").innerHTML =
    `
    <div>
        <img class="country-img" src="${country[0].flag}" />
        <h3 class="country-name">Total number of borders: ${country[0].borders.length}</h3>
    </div>
    <article class="country">
    <div class="country-data">
        <h3 class="country-name">${country[0].name}</h3>
        <h4 class="country-region">${country[0].region}</h4>
        <p class="country-row"><span>🏙</span> ${country[0].capital}</p>
        <p class="country-row"><span>👫</span>${country[0].population}</p>
        <p class="country-row"><span>🗣️</span>${country[0].languages[0].name}</p>
        <p class="country-row"><span>💰</span>${country[0].currencies[0].name}</p>
    </div>
    </article>
    `;
    if(numberOfNeighbors >= bordersArr.length) numberOfNeighbors = bordersArr.length;
    for(let i = 0; i < numberOfNeighbors; i++) {
        const res = await fetch(`https://countries-api-836d.onrender.com/countries/alpha/${bordersArr[i]}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const neighbor = await res.json();
        
        document.querySelector(`.neighbor${i+1}`).innerHTML =  
            `
            <img class="neighbor-img" src="${neighbor.flag}" />
            <article class="neighbor">
                <div class="neighbor-data">
                <h3 class="neighbor-name">${neighbor.name}</h3>
                <h4 class="neighbor-region">${neighbor.region}</h4>
                <p class="neighbor-row"><span>🏙</span> ${neighbor.capital}</p>
                <p class="neighbor-row"><span>👫</span>${neighbor.population}</p>
                <p class="neighbor-row"><span>🗣️</span>${neighbor.languages[0].name}</p>
                <p class="neighbor-row"><span>💰</span>${neighbor.currencies[0].name}</p>
                </div>
            </article>
            `;
    }
}

function clearNeighbors() {
    for(let i = 1; i <= 5; i++) {
        document.querySelector(`.neighbor${i}`).innerHTML = "";
    }
}

function buttonListener() {
    if(inputNeighbor.value <= 5 && inputCountry.value != "") btnSubmit.disabled = false; 
    else if(inputNeighbor.value > 5 || inputCountry.value == "") btnSubmit.disabled = true;
};