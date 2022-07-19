import showAlert from "./alert.js";
import {createSpinner, removeSpinner} from './spinner.js';

const GIFController = (() => {
    const defaultKeyWord = ["cat", "dog", "mouse", "rabbit", "giraffe", "sheep", "goat", "goose", "duck", "bonk"];
    let currentWord;

    const pickDefaultKeyWord = function() {
        const word = defaultKeyWord[Math.floor(Math.random() * defaultKeyWord.length)];
        currentWord = word;
        return currentWord;
    }
    const getCurrentWord = function() {
        return currentWord;
    }
    const setCurrentWord = function(word) {
        currentWord = word;
    }
    return {
        pickDefaultKeyWord,
        setCurrentWord,
        getCurrentWord
    }
})();

async function fetchGifLink(word) {
    try {
        const data = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=96iS1m6XsSIX1IAZQL91Ua1fcd0ofe2o&s=${word}`, {mode: "cors"});
        const JSON = await data.json();
        console.log(JSON)
        const {url, title} = getData(JSON);
        return {url, title};
    } catch (error) {

        showAlert("Please try again or reload the page");
    }
}

function getData(JSON) {
    const url = JSON.data.images.original.url;
    const title = JSON.data.title;
    console.log(url)
    console.log(title);
    return {url, title};
}

async function pickRandomGIF() {
    await refreshImageHolder();
    const {url, title} = await fetchGifLink(GIFController.pickDefaultKeyWord());
    displayGIF(url, title);
}

async function reloadCurrentWord() {
    await refreshImageHolder();
    const {url, title} = await fetchGifLink(GIFController.getCurrentWord());
    displayGIF(url, title);
}

async function searchGIF() {
    await refreshImageHolder();
    const value = getFormInput();
    GIFController.setCurrentWord(value);
    if (value === "") {
        showAlert("Input shouldn't be blank. We picked a random GIF for you instead");
        pickRandomGIF();
        return;
    }
    const {url, title} = await fetchGifLink(value);
    displayGIF(url, title);
}

function getFormInput() {
    const value = document.getElementById('search-box').value.trim();
    document.querySelector('form').reset();
    return value;
}

function displayGIF(imageURL, title) {
    removeSpinner();
    showImage();
    const image = document.querySelector('img');
    const titleContainer = document.getElementById('title');
    image.setAttribute('src', imageURL);
    titleContainer.textContent = title;       
}

async function refreshImageHolder() {
    hideImage();
    await loadSpinner();
    const titleContainer = document.getElementById('title');
    titleContainer.textContent = "";
}

function hideImage() {
    const image = document.querySelector('img');
    image.style.display = "none";
}

function showImage() {
    const image = document.querySelector('img');
    image.style.display = "inline-block";
}

async function loadSpinner() {
    const container = document.querySelector('.img-container');
    container.append(await createSpinner());
}

function addEventListeners() {
    const element = document.getElementById('control');
    element.addEventListener('click', (e) => {
        if (e.target.id === 'refresh-button') {
            reloadCurrentWord();
        }
        if (e.target.id === 'search-button') {
            e.preventDefault();
            searchGIF();
        }
    })
}


pickRandomGIF();
addEventListeners();