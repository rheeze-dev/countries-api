const inputCountry = document.querySelector("#input-country");
const inputNeighbor = document.querySelector("#input-neighbor");
const btnSubmit = document.querySelector("#btn-submit");
const aboutModal = document.querySelector("#about-modal");
const contactModal = document.querySelector("#contact-modal");
const btnAbout = document.querySelector(".about");
const btnContact = document.querySelector(".contact");
const btnClose = document.querySelectorAll(".close");

getFactsApi();
document.querySelector("footer").innerHTML = "Copyright &copy; " + new Date().getFullYear();
inputCountry.addEventListener("input", buttonListener);
inputNeighbor.addEventListener("input", buttonListener);
btnSubmit.addEventListener("click", submitButton);

btnAbout.onclick = () => {
    aboutModal.style.display = "block";
    document.querySelector(".about-modal-text").innerHTML = 
    `This app is powered by web API. All informations here are being fetched in 2 different API servers. The countries and its neighbors are being fetched at https://countries-api-836d.onrender.com/countries/name/{country}. The facts are being fetched at https://api.api-ninjas.com/v1/trivia?category=geography. Entering an invalid country name in the input field will display a text saying you entered an invalid country name. Leaving it empty will make the submit button disabled. Number of neighbors input field only accept numbers and the maximum number it will take is 5. Any number below 0 and above 5 will make the submit button disabled. You can hit the enter key on your keyboard to submit. Enter key will not do anything if the submit button is disabled. The maximum neighbors shown on this app is limited to only 5. The facts area will display a question and the answer together with the next button will pop-up after 10 seconds. Click the next button to display another fact.`;
}

btnContact.onclick = () => {
    contactModal.style.display = "block";
    document.querySelector(".contact-modal-text").innerHTML = 
    `You can contact me on my phone number at 443-577-8160 or send me an email at <a href = "mailto: ggybzz2297@gmail.com">ggybzz2297@gmail.com</a>. Visit my online portfolio at <a href="https://rheeze-dev.github.io/" target="_blank">https://rheeze-dev.github.io/</a>. Checkout my accounts on: <a href="https://github.com/rheeze-dev" target="_blank">Github, </a><a href="https://bitbucket.org/rheeze-dev/workspace/overview" target="_blank">Bitbucket, </a><a href="https://www.linkedin.com/in/rheeze-gyver-kalahi-a372aa185/" target="_blank">and LinkedIn.</a>`;
}

btnClose.forEach((btn) => {
    btn.addEventListener("click", () => {
        aboutModal.style.display = "none";
        contactModal.style.display = "none";
    });
});

window.onclick = (event) => {
  if(event.target == aboutModal) {
    aboutModal.style.display = "none";
  }
  else if(event.target == contactModal) {
    contactModal.style.display = "none";
  }
}

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
    displayCountries(data, numberOfNeighbors, neighborsArr);
}

async function displayCountries(country, numberOfNeighbors, bordersArr) {
    document.querySelector("#main-country").innerHTML =
    `<div>
        <div><img class="country-img" src="${country[0].flags.png}" /></div>
        <div class="total-borders-text">Total number of neighbors:</div>
        <div class="total-borders">${country[0].borders.length}</div>
    </div>
    <article class="country">
        <div class="country-data">
            <h3 class="country-name">${country[0].name}</h3>
            <h4 class="country-region">${country[0].subregion}</h4>
            <p class="country-row"><span>🏙</span> ${country[0].capital}</p>
            <p class="country-row"><span>👫</span>${country[0].population.toLocaleString()}</p>
            <p class="country-row"><span>🌎</span>${country[0].area.toLocaleString()} sq km</p>
            <p class="country-row"><span>🗣️</span>${country[0].languages[0].name}</p>
            <p class="country-row"><span>💰</span>${country[0].currencies[0].name}</p>
        </div>
    </article>`;
    if(numberOfNeighbors >= bordersArr.length) numberOfNeighbors = bordersArr.length;
    for(let i = 0; i < numberOfNeighbors; i++) {
        const res = await fetch(`https://countries-api-836d.onrender.com/countries/alpha/${bordersArr[i]}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const neighbor = await res.json();
        document.querySelector(`.neighbor${i+1}`).innerHTML =  
        `<img class="neighbor-img" src="${neighbor.flags.png}" />
        <article class="neighbor">
            <div class="neighbor-data">
                <h3 class="neighbor-name">${neighbor.name}</h3>
                <h4 class="neighbor-region">${neighbor.subregion}</h4>
                <p class="neighbor-row"><span>🏙</span> ${neighbor.capital}</p>
                <p class="neighbor-row"><span>👫</span>${neighbor.population.toLocaleString()}</p>
                <p class="country-row"><span>🌎</span>${country[0].area.toLocaleString()} sq km</p>
                <p class="neighbor-row"><span>🗣️</span>${neighbor.languages[0].name}</p>
                <p class="neighbor-row"><span>💰</span>${neighbor.currencies[0].name}</p>
            </div>
        </article>`;
    }
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
        document.querySelector("#facts-api").innerHTML = 
        `<div class="error-message">Please check your internet connection!</div>`;
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
    document.querySelector("#facts-api").innerHTML = 
    `<div class="questions">${data[0].question}?</div>`;
    setTimeout(() => {
        document.querySelector("#facts-api").innerHTML = 
        `<div class="questions">${data[0].question}?</div>
        <div class="answers">-${data[0].answer}-</div>
        <button class="btn-next">Next</button>`;
        document.querySelector(".btn-next").addEventListener("click", getFactsApi);
    }, 10000);
}

function clearNeighbors() {
    for(let i = 1; i <= 5; i++) {
        document.querySelector(`.neighbor${i}`).innerHTML = "";
    }
}

function buttonListener() {
    if(inputNeighbor.value > 5 || inputNeighbor.value < 0 || inputCountry.value == "") btnSubmit.disabled = true;
    else if(inputNeighbor.value <= 5 && inputCountry.value != "") btnSubmit.disabled = false; 
    
};

function submitButton() {
    if(document.querySelector("article")) clearNeighbors();
    getCountryApi(inputCountry.value, inputNeighbor.value);
}