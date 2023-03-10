import { handleSubmit, fetchPhotos, handleInput } from './pagination-functions';
import { loadMoreBtnRight, loadMoreBtnLeft } from './pagination-functions';
import debounce from 'lodash.debounce';

const formEl = document.querySelector('.search-form');

formEl.addEventListener('submit', handleSubmit);

loadMoreBtn.button.addEventListener('click', fetchPhotos);

formEl.addEventListener(
  'input',
  debounce(handleInput, 300, {
    leading: true,
    trailing: false,
  })
);
