const API_KEY = config.API_KEY;
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const galleryGrid = document.querySelector(".gallery-grid");
const searchedHeader = document.querySelector(".searched-header");
let moreBtn = document.querySelector(".more-btn");
let imageValue;
let pageCount = 1;
let currentSearch;
let fetchLink;

/* Functions */
async function fetchPhotos(url) {
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
    clear();
    let data = await fetchPhotos(`https://api.pexels.com/v1/curated?page=${pageCount}`);
    displayPhotos(data);
    searchedHeader.innerText ="Popular Images";
}

async function getSearchedPhotos(e) {
    clear();
    let data = await fetchPhotos(`https://api.pexels.com/v1/search?query=${searchedValue}&per_page=15&page=${pageCount}`);
    displayPhotos(data);
    searchedHeader.innerText = `Results for: ${searchedValue}`;
    currentSearch = searchedValue;
}

function clear() {
    searchedHeader.innerText ="...Loading";
    pageCount = 1;
    galleryGrid.innerHTML = "";
    searchInput.value = "";
}

async function loadMoreImages() {
    pageCount++;
    if(currentSearch) fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${pageCount}`;
    else fetchLink = `https://api.pexels.com/v1/curated?page=${pageCount}`;
    let data = await fetchPhotos(fetchLink);
    displayPhotos(data);
}

/* Event Listeners */
searchInput.addEventListener("input", (e) => {
    searchedValue = e.target.value;
});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getSearchedPhotos(e);
});

moreBtn.addEventListener("click", loadMoreImages);

getCuratedPhotos();