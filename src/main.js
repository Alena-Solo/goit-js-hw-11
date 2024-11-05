import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

const form = document.querySelector('#search-form');
const galleryElement = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let currentQuery = '';
let page = 1;

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.currentTarget.elements.query.value.trim();
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search term' });
    return;
  }

  galleryElement.innerHTML = '';
  currentQuery = query;
  page = 1;

  loader.style.display = 'block';

  fetchImages(currentQuery, page)
    .then(images => {
      loader.style.display = 'none';
      if (images.length === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      renderGallery(images, galleryElement);
    })
    .catch(error => {
      loader.style.display = 'none';
      iziToast.error({ title: 'Error', message: error.message });
    });
});
