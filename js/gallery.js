"use strict";

/**
 * Selects a random thumbnail image at the start and displays it.
 */
function showRandomImageAtStart() {
    const links = document.querySelectorAll('.card-link'); // Search thumbnails and save elements as node list
    const randomIndex = getRandomInt(0, links.length);
    const randomThumbLink = links[randomIndex];
    const thumbUrl = randomThumbLink.href; // Get href link to random thumbnail image
    const imageDescription = randomThumbLink.lastElementChild.alt;
//  


    switchFullImage(thumbUrl, imageDescription);
    randomThumbLink.parentElement.classList.add('bg-dark', 'text-white');
}

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
    const links = document.querySelectorAll('.card-link');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            
            event.preventDefault();

            const currentCard = document.querySelector('.card.bg-dark.text-white');

            if (currentCard) {
                currentCard.classList.remove('bg-dark', 'text-white');
            }
            this.parentElement.classList.add('bg-dark', 'text-white');
            const imageUrl = this.href;
            const imageDescription = this.lastElementChild.alt;
            switchFullImage(imageUrl, imageDescription);
            loadNotes(imageUrl);
            event.preventDefault();
        });
    });
}

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
    const notesField = document.getElementById('notes');
    notesField.addEventListener('blur', function() {
        const imageUrl = document.querySelector('#fullImage img').src;
        const notes = this.textContent.trim(); // extracts text content from current element
        if (notes !== '') {
            localStorage.setItem(imageUrl, notes);
        } else {
            localStorage.removeItem(imageUrl);
        }
    });
}

/**
 * Switches the thumbnail element and updates the image's alt text
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's alt text (used for the alt attribute/caption).
 */
function switchFullImage(imageUrl, imageDescription) {

    // set up variables for changing image
    const fullImage = document.querySelector('#fullImage img');
    const caption = document.querySelector('.figure-caption');

    // set new content
    fullImage.src = imageUrl;
    fullImage.alt = imageDescription;

    caption.textContent = imageDescription;
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    const notesField = document.getElementById('notes');
    const notes = localStorage.getItem(key);
    notesField.value = notes ?? 'Enter your notes here!';
    notesField.textContent = notesField.value;
}

/**
 * Taken from external source (ChatGPT)
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();