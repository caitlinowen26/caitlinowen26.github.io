/*
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');



const newImage = document.createElement('img');
newImage.setAttribute('src', xxx);
newImage.setAttribute('alt', xxx);
thumbBar.appendChild(newImage);


*/

const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Array of image filenames and alt text
const images = [
  { src: 'images/pic1.jpg', alt: 'Closeup of a human eye' },
  { src: 'images/pic2.jpg', alt: 'Wood grain surface' },
  { src: 'images/pic3.jpg', alt: 'Purple and white flowers' },
  { src: 'images/pic4.jpg', alt: 'Egyptian wall painting' },
  { src: 'images/pic5.jpg', alt: 'Butterfly on a leaf' }
];

// Initialize the displayed image with the first image
displayedImage.src = images[0].src;
displayedImage.alt = images[0].alt;

// Populate the thumbnail bar
for (let i = 0; i < images.length; i++) {
  const newImage = document.createElement('img');
  newImage.src = images[i].src;
  newImage.alt = images[i].alt;
  newImage.addEventListener('click', function(e) {
    displayedImage.src = e.target.src;
    displayedImage.alt = e.target.alt;
  });
  thumbBar.appendChild(newImage);
}

// Darken/Lighten button
btn.addEventListener('click', () => {
  const btnClass = btn.getAttribute('class');
  if (btnClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    btn.textContent = 'Darken';
  }
});