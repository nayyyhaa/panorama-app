const API_KEY = config.API_KEY;
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const galleryGrid = document.querySelector(".gallery-grid");
const searchedHeader = document.querySelector(".searched-header");
let imageValue;

/* Functions */
async function fetchPhotos(url) {
    searchedHeader.innerText ="...Loading";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: API_KEY
        }
    });
    return await response.json();
}

async function displayPhotos(data) {
    const photos = data.photos;
    if(!photos || photos.length < 1) { 
        let resultsMsg = document.createElement("h1");
        resultsMsg.innerText = "No Results found!"
        galleryGrid.appendChild(resultsMsg);
        return;
    }
    photos.forEach(photo => {
        const gallery = document.createElement("div");
        gallery.classList.add("gallery-img");
        gallery.innerHTML = 
            `<div class="gallery-container">
                <p>${photo.photographer}</p>
                <a href="${photo.src.original}">download</a>
            </div>
            <img src="${photo.src.portrait}"/>`;
        galleryGrid.appendChild(gallery);
    })
}

async function getCuratedPhotos() {
    let data = await fetchPhotos("https://api.pexels.com/v1/curated");
    displayPhotos(data);
    searchedHeader.innerText ="Popular Images";
}

async function getSearchedPhotos(e) {
    e.preventDefault();
    clear();
    let data = await fetchPhotos(`https://api.pexels.com/v1/search?query=${searchedValue}`);
    displayPhotos(data);
    searchedHeader.innerText = `Results for: ${searchedValue}`;
}

function clear() {
    galleryGrid.innerHTML = "";
    searchInput.value = "";
}

/* Event Listeners */
searchInput.addEventListener("input", (e) => {
    searchedValue = e.target.value;
});

searchBtn.addEventListener("click", (e) => {
    getSearchedPhotos(e);
});

getCuratedPhotos();