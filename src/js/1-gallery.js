import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import data from './data';

const gallery = document.querySelector('.gallery');

const markup = data.map(({ preview, original, description }) => {
  return `<li class="gallery-item hvr-grow">
  <a class="gallery-link " href="${original}">
    <img
      class="gallery-image"
      src="${preview}"
      alt="${description}"
    />
  </a>
</li>`;
});

gallery.insertAdjacentHTML('beforeend', markup.join(''));

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
