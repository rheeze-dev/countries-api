async function getResponse(country, neighbors = 0) {
	const response = await fetch(
        "https://countries-api-836d.onrender.com/countries/name/" + country,
		{
			method: 'GET',
			headers: {
				'X-Api-Key': '54/p8rt+p9QhgeN9G/Z5Sg==wrJ1tX7OT2EAdJcR',
                "Content-type": "application/json; charset=UTF-8"
			}
		}
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
    const neighborsArr = data[0].borders;
    console.log(neighborsArr);
    displayCountries(data, neighbors, neighborsArr)
}

async function displayCountries(country, neighbors, bordersArr) {
    document.querySelector("#main-country").insertAdjacentHTML("beforeend", 
    `
    <img class="country-img" src="${country[0].flag}" />
    <article class="country">
    <div class="country-data">
        <h3 class="country-name">${country[0].name}</h3>
        <h4 class="country-region">${country[0].region}</h4>
        <p class="country-row"><span>🏙</span> ${country[0].capital}</p>
        <p class="country-row"><span>👫</span>${country[0].population}</p>
        <p class="country-row"><span>🗣️</span>${country[0].languages[0].name}</p>
        <p class="country-row"><span>💰</span>${country[0].currencies[0].name}</p>
    </div>
    </article>`);
    if(neighbors >= bordersArr.length) neighbors = bordersArr.length;
    for(let i = 0; i < neighbors; i++) {
    const res = await fetch(`https://countries-api-836d.onrender.com/countries/alpha/${bordersArr[i]}`);
    if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}
    const data = await res.json();
    // console.log(data);
    const neighbour = data;
    
    document.querySelector(`.neighbor${i+1}`).insertAdjacentHTML("beforeend", 
        `
        <img class="neighbor-img" src="${neighbour.flag}" />
        <article class="neighbor">
            <div class="neighbor-data">
            <h3 class="neighbor-name">${neighbour.name}</h3>
            <h4 class="neighbor-region">${neighbour.region}</h4>
            <p class="neighbor-row"><span>🏙</span> ${neighbour.capital}</p>
            <p class="neighbor-row"><span>👫</span>${neighbour.population}</p>
            <p class="neighbor-row"><span>🗣️</span>${neighbour.languages[0].name}</p>
            <p class="neighbor-row"><span>💰</span>${neighbour.currencies[0].name}</p>
            </div>
        </article>`);
    }
}

getResponse("usa", 2);