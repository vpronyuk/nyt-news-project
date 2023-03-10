import { AxiosPhotos } from './api';
import { LoadMoreBtnRight, LoadMoreBtnLeft } from './button-upload';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

export const loadMoreBtnRight = new LoadMoreBtnRight({
  selector: '.load-left',
  isHidden: true,
});

export const loadMoreBtnLeft = new LoadMoreBtnLeft({
  selector: '.load-right',
  isHidden: true,
});

const newsBlock = document.querySelector('.list-news');
// const axiosPhotos = new AxiosPhotos();
// const activePicture = new SimpleLightbox(
//   '.gallery a'
//   // , {
//   // captionsData: 'alt',
//   // captionDelay: 250,
//   // }
// );

async function handleSubmit(event) {
  event.preventDefault();
  window.scrollTo(0, 0);
  axiosPhotos.q = event.currentTarget.elements.searchQuery.value.trim();
  axiosPhotos.page = 0;
  const data = await processTheRequest();
  const markup = await createMarkupCardPhotos(data);
  cleanMarkup();
  await uploadMarkupFirst(markup);
  Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
  activePicture.refresh();
  loadMoreBtn.show();
  loadMoreBtn.enable();
}

async function fetchPhotos() {
  loadMoreBtn.disable();
  const data = await processTheRequest();
  if ((axiosPhotos.page - 1) * 40 > data.totalHits) {
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    loadMoreBtn.hide();
    return;
  }
  const markup = await createMarkupCardPhotos(data);
  const nextPhotos = await appendNewsToList(markup);
  activePicture.refresh();
  loadMoreBtn.enable();
  return nextPhotos;
}

function handleInput() {
  // cleanMarkup();
  loadMoreBtn.isHidden = true;
  loadMoreBtn.hide();
}

async function processTheRequest() {
  try {
    const data = await axiosPhotos.getPhotos();
    if (!data.totalHits) {
      throw new Error('No data');
    }
    return data;
  } catch (error) {
    cleanMarkup();
    loadMoreBtn.hide();
    Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query "${axiosPhotos.q}". Please try again.`
    );
  }
}

function createMarkupCardPhotos(arr) {
  const { hits } = arr;
  const markup = hits.reduce(
    (markup, namePhoto) => markup + createMarkupCardPhoto(namePhoto),
    ''
  );
  return markup;
}

function createMarkupCardPhoto({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
  <a class="gallery-item" href="${largeImageURL}">
  <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
    </div>
    </a>
  `;
}

function cleanMarkup() {
  gallery.innerHTML = '';
}

function uploadMarkupFirst(markup) {
  gallery.innerHTML = markup;
}

function appendNewsToList(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

export { handleSubmit, fetchPhotos, handleInput };
