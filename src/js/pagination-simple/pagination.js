import {
  handleSubmit,
  fetchContinue,
  fetchBack,
  handleInput,
} from './pagination-functions';
import { loadMoreBtnRight, loadMoreBtnLeft } from './pagination-functions';
import debounce from 'lodash.debounce';

const formEl = document.querySelector('.header__form');

formEl.addEventListener('submit', handleSubmit);

loadMoreBtnRight.button.addEventListener('click', fetchContinue);

loadMoreBtnLeft.button.addEventListener('click', fetchBack);

formEl.addEventListener(
  'input',
  debounce(handleInput, 300, {
    leading: true,
    trailing: false,
  })
);
