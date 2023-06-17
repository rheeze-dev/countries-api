const inputCountry = document.querySelector("#input-country");
const inputNeighbor = document.querySelector("#input-neighbor");
const btnSubmit = document.querySelector("#btn-submit");

inputCountry.addEventListener("input", buttonListener);
inputNeighbor.addEventListener("input", buttonListener);
btnSubmit.addEventListener("click", submitButton);
window.addEventListener("keypress", (e) => {
    if(e.key === "Enter" && btnSubmit.getAttribute("disabled") == null) {
        submitButton();
    }
});

async function getCountryApi(country, numberOfNeighbors = 0) {
	const response = await fetch(
        "https://countries-api-836d.onrender.com/countries/name/" + country
	);
	if(!response.ok) {
        document.querySelector("#main-country").innerHTML = 
            `<div class="error-message">The country you entered does not exist, please enter a valid country!</div>`;
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
    const neighborsArr = data[0].borders;
    console.log(data[0]);
    console.log(data[0].area);
    displayCountries(data, numberOfNeighbors, neighborsArr);
}

async function displayCountries(country, numberOfNeighbors, bordersArr) {
    document.querySelector("#main-country").innerHTML =
    `
    <div>
        <div><img class="country-img" src="${country[0].flags.png}" /></div>
        <div class="total-borders-text">Total number of borders:</div>
        <div class="total-borders">${country[0].borders.length}</div>
    </div>
    <article class="country">
    <div class="country-data">
        <h3 class="country-name">${country[0].name}</h3>
        <h4 class="country-region">${country[0].region}</h4>
        <p class="country-row"><span>🏙</span> ${country[0].capital}</p>
        <p class="country-row"><span>👫</span>${country[0].population.toLocaleString()}</p>
        <p class="country-row"><span>🌎</span>${country[0].area.toLocaleString()} sq km</p>
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
            <img class="neighbor-img" src="${neighbor.flags.png}" />
            <article class="neighbor">
                <div class="neighbor-data">
                <h3 class="neighbor-name">${neighbor.name}</h3>
                <h4 class="neighbor-region">${neighbor.region}</h4>
                <p class="neighbor-row"><span>🏙</span> ${neighbor.capital}</p>
                <p class="neighbor-row"><span>👫</span>${neighbor.population.toLocaleString()}</p>
                <p class="country-row"><span>🌎</span>${country[0].area.toLocaleString()} sq km</p>
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

function submitButton() {
    if(document.querySelector("article")) clearNeighbors();
    getCountryApi(inputCountry.value, inputNeighbor.value);
}

async function getFactsApi() {
	const response = await fetch(
    "https://api.api-ninjas.com/v1/trivia?category=geography",
    {
        method: "GET",
        headers: {
            "X-Api-Key": "54/p8rt+p9QhgeN9G/Z5Sg==wrJ1tX7OT2EAdJcR",
            "Content-type": "application/json; charset=UTF-8"
        }
    });
	if(!response.ok) {
        document.querySelector("#main-country").innerHTML = 
        `<div class="error-message">Please check your internet connection!</div>`;
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
    document.querySelector("#facts-api").innerHTML = `
        <div class="questions">${data[0].question}?</div>`;
    setTimeout(() => {
        document.querySelector("#facts-api").innerHTML = `
        <div class="questions">${data[0].question}?</div>
        <div class="answers">-${data[0].answer}-</div>
        <button class="btn-next">Next</button>`;
    }, 8000);
}
getFactsApi();