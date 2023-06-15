let limit  = 1;
let country = "Philippines";
async function getResponse(country, neighbors = 0) {
	const response = await fetch(
		// "https://api.api-ninjas.com/v1/dadjokes?limit=" + limit,
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
    console.log(data[0]);
    displayCountries(data)
}

function displayCountries(country) {
    console.log(country[0]);
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
}

getResponse("Philippines");