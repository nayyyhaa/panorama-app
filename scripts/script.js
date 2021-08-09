const API_KEY = config.API_KEY;
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const galleryGrid = document.querySelector(".gallery-grid");
let imageValue;

async function getCuratedPhotos() {
    const response = await fetch("https://api.pexels.com/v1/curated", {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: API_KEY
        }
    });
    return await response.json();
}

async function displayPhotos() {
    const data = await getCuratedPhotos();
    const photos = data.photos;
    console.log(photos);
    photos.forEach(photo => {
        const gallery = document.createElement("div");
        gallery.classList.add("gallery-img");
        gallery.innerHTML = `<img src="${photo.src.medium}"/>
            <p>${photo.photographer}</p>`;
        galleryGrid.appendChild(gallery);
    })
}

displayPhotos();