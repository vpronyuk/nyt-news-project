import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_KEY = 'AKwAkjVAbzaYm1bK9yzcr2BnwjHsxavz';
const BASE_URL = 'https://api.nytimes.com/svc/';
const CATEGORY_NEWS = 'news/v3/content/inyt/';
const CATEGORY_LIST = `https://api.nytimes.com/svc/news/v3/content/section-list.json?`;

const categoriesList = document.querySelector('.category_list');
const dropDownContent = document.querySelector('.dropdown_content');
const mobileCatList = document.querySelector('.mobile_category_list');
const otherBtn = document.querySelector('.category_btn');
const mobCatBtn = document.querySelector('.mobile_category_btn');
const mobCatBtnIcon = document.querySelector('.category_mob_icon');
const mobBtnSpan = document.querySelector('.mob-btn-span');
const catBtnIcon = document.querySelector('.category_icon');
const newsList = document.querySelector('.list-news');
const emptyPage = document.querySelector('.empty');

async function getNewsByCategory(query) {
  try {
    const url = `${BASE_URL}${CATEGORY_NEWS}${query}.json?api-key=${API_KEY}`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getCategoryList() {
  try {
    const url = `${CATEGORY_LIST}api-key=${API_KEY}`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//---------------------- Mobile categories menu -------------------------------------//

mobCatBtn.addEventListener('click', onClickMobileBtn);
mobileCatList.addEventListener('click', onClickMobileCat);

function onClickMobileBtn(event) {
  mobileCatList.classList.toggle('category_hidden');

  if (mobBtnSpan.textContent === 'Categories') {
    mobCatBtn.classList.toggle('is-active');
    mobCatBtnIcon.classList.toggle('rotate');
  } else {
    mobCatBtnIcon.classList.toggle('rotate');
  }
}

function onClickMobileCat(event) {
  console.dir(event.target);
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  const query = event.target.dataset.section;
  const text = event.target.dataset.name;
  mobileCatList.classList.add('category_hidden');
  mobCatBtn.classList.add('is-active');
  mobCatBtnIcon.classList.remove('rotate');
  mobCatBtnIcon.style.fill = 'white';

  console.log(query);

  if (text != undefined && text.length < 11) {
    mobBtnSpan.textContent = text;
  } else {
    mobBtnSpan.textContent = `${text.substring(0, 9)}...`;
  }

  getNewsByCategory(query).then(data => {
    if (data.results === null) {
      newsList.innerHTML = '';
      emptyPage.style.display = 'block';
    } else {
      const cards = data.results.reduce((markup, card) => {
        return markup + createCard(card);
      }, '');
      emptyPage.style.display = 'none';
      newsList.innerHTML = cards;
    }
  });
}

getCategoryList().then(response => {
  const array = response.results;

  const mobileMenu = array.reduce((markup, card) => {
    return markup + createMarkup(card);
  }, '');

  mobileCatList.insertAdjacentHTML('beforeend', mobileMenu);

  const firstBtns = array.splice(0, 6);
  const otherBtns = array;

  const mainBtn = firstBtns.reduce((markup, card) => {
    return markup + createMarkup(card);
  }, '');
  const listBtn = otherBtns.reduce((markup, card) => {
    return markup + createMarkup(card);
  }, '');

  categoriesList.insertAdjacentHTML('afterbegin', mainBtn);
  dropDownContent.insertAdjacentHTML('beforeend', listBtn);
});

function createMarkup({ section, display_name }) {
  return `
  <li>
  <button type="button" data-section="${section}" data-name='${display_name}'> ${display_name}</button>
  </li>
  `;
}

//------------------------- categories menu -------------------------------------//

otherBtn.addEventListener('click', onClickOtherBtn);
categoriesList.addEventListener('click', onClickCatBtn);

function onClickOtherBtn(event) {
  dropDownContent.classList.toggle('category_hidden');
  catBtnIcon.classList.toggle('rotate');
  otherBtn.classList.toggle('is-active');
}

function onClickCatBtn(event) {
  if (
    event.target.classList.contains('category_btn') ||
    event.target.classList.contains('desk-btn-span') ||
    event.target.classList.contains('category_icon')
  ) {
    return;
  }

  if (!dropDownContent.classList.contains('category_hidden')) {
    dropDownContent.classList.add('category_hidden');
    catBtnIcon.classList.remove('rotate');
  }

  const query = event.target.dataset.section;
  console.log(query);

  getNewsByCategory(query).then(data => {
    if (data.results === null) {
      newsList.innerHTML = '';
      emptyPage.style.display = 'block';
    } else {
      const cards = data.results.reduce((markup, card) => {
        return markup + createCard(card);
      }, '');
      emptyPage.style.display = 'none';
      newsList.innerHTML = cards;
    }
  });
}

function createCard({
  title,
  multimedia,
  section,
  abstract,
  published_date,
  url,
}) {
  const id = uuidv4();
  const imageUrl = multimedia?.[2]?.url || '';
  return `<li class="list-news__item" data-id="${id}">
      <article class="item-news__article">
        <div class="item-news__wrapper-img">
          <img class="item-news__img" src="${imageUrl}" alt="photo">
          <p class="item-news__category">${section}</p>
          <button class="item-news__add-to-favorite"
          <svg class="heart-icon">
                <use
                  href="./images/symbol-defs.svg#icon-heart-empty"
                ></use></svg>Add to favorite
          </button>
        </div>
        <h2 class="item-news__title">${title}</h2>
        <p class="item-news__description">${abstract}</p>
        <div class="item-news__info">
          <span class="item-news__info-date">${published_date}</span>
          <a class="item-news__info-link" href="${url}" target="_blank" rel="noreferrer noopener">Read more</a>
        </div>
      </article>
    </li>`;
}

function readmoreHandler(e) {
  if (e.target.nodeName === 'A') {
    const readMoreLink = e.target;
    readMoreLink.setAttribute('data-is-read', true);

    const ulItem = e.target.parentElement.parentElement.parentElement;
    console.log(ulItem);
    const read = document.createElement('p');
    read.innerText = 'Already read';
    read.classList.add('have-read');
    ulItem.appendChild(read);
    const ID = ulItem.getAttribute('data-id');
  }
  return;
}

newsList.addEventListener('click', readmoreHandler);

localStorage.setItem('cards', '[]');
