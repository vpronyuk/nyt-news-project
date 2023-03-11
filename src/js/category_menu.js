// import axios, { all } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { getCategoryList, getNewsByCategory } from '../api/newsApi';

const mobileMenu = document.querySelector('.mobile_category_menu');
const categoriesList = document.querySelector('.category_list');
const dropDownMenu = document.querySelector('.dropdown');
const dropDownContent = document.querySelector('.dropdown_content');
const mobileCatList = document.querySelector('.mobile_category_list');
const otherBtn = document.querySelector('.category_btn');
const mobCatBtn = document.querySelector('.mobile_category_btn');
const mobCatBtnIcon = document.querySelector('.category_mob_icon');
const mobBtnSpan = document.querySelector('.mob-btn-span');
const catBtnIcon = document.querySelector('.category_icon');
const newsList = document.querySelector('.list-news');
const emptyPage = document.querySelector('.empty');
const darkModeDeskCheckbox = document.querySelector('.checkbox-header__input');
const darkModeMobCheckbox = document.querySelector('.mob-menu__checkbox-input');
const weatherCard = document.querySelector('.weather-card');
const dateCalendarInput = document.querySelector('.calendar__input');
const btnNext = document.querySelector('.next-page');
const btnPrevious = document.querySelector('.prev-page');

btnPrevious.disabled = true;

const noImage =
  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
const noNews =
  'https://cdn.dribbble.com/users/2382015/screenshots/6065978/media/8b4662f8023e4e2295f865106b5d3aa7.gif';

mobileCatList.classList.remove('category_hidden');
mobileCatList.classList.add('category_mobile_hidden');

let newsPerPage = 0;
let currentNewsCount = 0;

if (window.matchMedia('(max-width: 767.98px)').matches) {
  newsPerPage = 4;
} else if (window.matchMedia('(min-width: 1280px)').matches) {
  newsPerPage = 9;
} else if (window.matchMedia('(min-width: 768px)').matches) {
  newsPerPage = 8;
}

//---------------------- Mobile categories menu -------------------------------------//

mobCatBtn.addEventListener('click', onClickMobileBtn);
mobileCatList.addEventListener('click', onClickMobileCat);

function onClickMobileBtn(event) {
  mobileCatList.classList.toggle('category_mobile_hidden');
  document.addEventListener('click', closeMobileMenu);

  if (mobBtnSpan.textContent === 'Categories') {
    mobCatBtn.classList.toggle('is-active-category-btn');
    mobCatBtnIcon.classList.toggle('rotate');
  } else {
    mobCatBtnIcon.classList.toggle('rotate');
  }
}

function closeMobileMenu(e) {
  const withinMobileMenu = e.composedPath().includes(mobileMenu);

  if (
    !withinMobileMenu &&
    !mobileCatList.classList.contains('category_mobile_hidden') &&
    mobBtnSpan.textContent === 'Categories'
  ) {
    mobileCatList.classList.add('category_mobile_hidden');
    mobCatBtn.classList.remove('is-active-category-btn');
    mobCatBtnIcon.classList.remove('rotate');
    document.removeEventListener('click', closeMobileMenu);
  } else if (!withinMobileMenu && mobBtnSpan.textContent !== 'Categories') {
    mobileCatList.classList.add('category_mobile_hidden');
    mobCatBtnIcon.classList.remove('rotate');
    document.removeEventListener('click', closeMobileMenu);
  }
}

function onClickMobileCat(event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  const query = event.target.dataset.section;
  const text = event.target.dataset.name;
  mobileCatList.classList.add('category_mobile_hidden');
  mobCatBtn.classList.add('is-active-category-btn');
  mobCatBtnIcon.classList.remove('rotate');
  mobCatBtnIcon.style.fill = 'white';

  if (text != undefined && text.length < 11) {
    mobBtnSpan.textContent = text;
  } else {
    mobBtnSpan.textContent = `${text.substring(0, 9)}...`;
  }

  renderNewsCard(query);
}

///------------------------   Отримання даних з бекенденду та рендеринг кнопок меню ----------//////

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

  //--- Перевірка встановленного режиму теми в локал localstorage і встановлення фону кнопки при рендеру--//

  const catMenuBtnList = document.querySelectorAll('.cat-menu-btn');
  const darkMode = JSON.parse(localStorage.getItem('isDarkMode'));

  if (darkMode) {
    for (let btn of catMenuBtnList) {
      btn.classList.add('dark-categories-btn');
    }
    otherBtn.classList.add('dark-categories-btn');
    mobCatBtn.classList.add('dark-categories-btn');
  }

  darkModeDeskCheckbox.addEventListener('click', () => {
    switchDarkBtnMode(catMenuBtnList, otherBtn, mobCatBtn);
  });

  darkModeMobCheckbox.addEventListener('click', () => {
    switchDarkBtnMode(catMenuBtnList, otherBtn, mobCatBtn);
  });
});

function createMarkup({ section, display_name }) {
  return `
  <li>
  <button class="cat-menu-btn" type="button" data-section="${section}" data-name='${display_name}'> ${display_name}</button>
  </li>
  `;
}

//--------Функція зміни фону кнопок при переключення світлого або темного режиму -------//

function switchDarkBtnMode(array, deskBtn, MobBtn) {
  for (const btn of array) {
    btn.classList.toggle('dark-categories-btn');
  }
  deskBtn.classList.toggle('dark-categories-btn');
  MobBtn.classList.toggle('dark-categories-btn');
}

//------------------------- Блок коду десктопного меню -------------------------------------------/;

otherBtn.addEventListener('click', onClickOtherBtn);
categoriesList.addEventListener('click', onClickCatBtn);

function onClickOtherBtn(event) {
  dropDownContent.classList.toggle('category_hidden');
  catBtnIcon.classList.toggle('rotate');
  otherBtn.classList.toggle('is-active-other-btn');
  document.addEventListener('click', closeDesktopMenu);
}

function closeDesktopMenu(e) {
  const withinDesktopMenu = e.composedPath().includes(dropDownMenu);

  if (
    !withinDesktopMenu &&
    !otherBtn.classList.contains('has-active-button-inside')
  ) {
    dropDownContent.classList.add('category_hidden');
    otherBtn.classList.remove('is-active-other-btn');
    catBtnIcon.classList.remove('rotate');
    document.removeEventListener('click', closeDesktopMenu);
  } else if (
    !withinDesktopMenu &&
    otherBtn.classList.contains('has-active-button-inside')
  ) {
    dropDownContent.classList.add('category_hidden');
    otherBtn.classList.add('is-active-other-btn');
    catBtnIcon.classList.remove('rotate');
    document.removeEventListener('click', closeDesktopMenu);
  }
}

function onClickCatBtn(event) {
  if (
    event.target.classList.contains('category_btn') ||
    event.target.classList.contains('desk-btn-span') ||
    event.target.classList.contains('category_icon') ||
    event.target.tagName !== 'BUTTON'
  ) {
    return;
  }

  if (!dropDownContent.classList.contains('category_hidden')) {
    dropDownContent.classList.add('category_hidden');
    catBtnIcon.classList.remove('rotate');
  }

  const activeBtn = document.querySelector('.is-active-category-btn');
  if (activeBtn) {
    activeBtn.classList.remove('is-active-category-btn');
    otherBtn.classList.remove('is-active-other-btn');
    otherBtn.classList.remove('has-active-button-inside');
  }

  const activeBtnInOther = event.composedPath().includes(dropDownContent);

  if (activeBtnInOther) {
    event.target.classList.add('is-active-category-btn');
    otherBtn.classList.add('is-active-other-btn');
    otherBtn.classList.add('has-active-button-inside');
  } else {
    event.target.classList.add('is-active-category-btn');
  }

  document.removeEventListener('click', closeDesktopMenu);
  const query = event.target.dataset.section;

  currentNewsCount = 0;
  renderNewsCard(query);

  btnNext.addEventListener('click', () => {
    incrementNewsCard(query);
  });
  btnPrevious.addEventListener('click', () => {
    decrementNewsCard(query);
  });
}

//------------------------ Функція додавання картки новини в на сторінку read more --------------///

function readmoreHandler(e) {
  if (e.target.nodeName === 'A') {
    const readMoreLink = e.target;
    readMoreLink.setAttribute('data-is-read', true);

    const ulItem = e.target.parentElement.parentElement.parentElement;
    const read = document.createElement('p');
    read.innerText = 'Already read';
    read.classList.add('have-read');
    ulItem.appendChild(read);
    const ID = ulItem.getAttribute('data-id');
  }
  return;
}

newsList.addEventListener('click', readmoreHandler);

//-------------------------------- Відслідквання зміни data атрибуту на інпуті ------------------//

const config = {
  attributes: true,
  attributeFilter: ['data-date'],
};

const getFilterNewsByDate = function (el, observer) {
  const date = dateCalendarInput.dataset.date.split('.').join('/');
  weatherCard.style.display = 'none';

  const newsArray = Array.prototype.slice.call(newsList.childNodes);
  const filteredNewsArray = newsArray.filter(
    el => el.dataset.pub_date === date
  );
  if (filteredNewsArray.length > 0) {
    newsList.childNodes.forEach(el => {
      if (el.dataset.pub_date !== date) {
        el.style.display = 'none';
      } else {
        el.style.display = 'block';
      }
    });
  } else {
    newsList.childNodes.forEach(el => (el.style.display = 'none'));
    newsList.insertAdjacentHTML(
      'afterbegin',
      `<li style="margin:0 auto"><img src="${noNews}" alt="no news"></img></li>`
    );
  }
};
const observer = new MutationObserver(getFilterNewsByDate);

///-------------------------------  Відмалювання карток після отримання даних з беку ----------////

function renderNewsCard(query) {
  getNewsByCategory(query, newsPerPage, currentNewsCount).then(
    ({ results, num_results }) => {
      if (results === null) {
        newsList.innerHTML = '';
        emptyPage.style.display = 'block';
        weatherCard.style.display = 'none';
      } else {
        const cards = results.reduce((markup, card) => {
          return markup + createCard(card);
        }, '');
        emptyPage.style.display = 'none';
        weatherCard.style.display = 'block';
        newsList.innerHTML = cards;

        num_results - 450 < currentNewsCount
          ? (btnNext.disabled = true)
          : (btnNext.disabled = false);

        observer.observe(dateCalendarInput, config);
      }
    }
  );
}

//----------------------------------------- Пагінатор -------------------------------------///

function incrementNewsCard(query) {
  currentNewsCount += newsPerPage;
  btnPrevious.disabled = false;
  renderNewsCard(query);
  windowScrollUp();
}

function decrementNewsCard(query) {
  currentNewsCount -= newsPerPage;
  if (currentNewsCount === 0) {
    btnPrevious.disabled = true;
  }

  renderNewsCard(query);
  windowScrollUp();
}

//------------------------------- Створення розмітки картки новин ------------------------///

function createCard({
  title,
  multimedia,
  section,
  abstract,
  published_date,
  url,
}) {
  const id = uuidv4();
  const imageUrl = multimedia?.[2]?.url || noImage;
  const MAX_SNIPPET_LENGTH = 110;
  if (abstract.length > MAX_SNIPPET_LENGTH) {
    abstract = abstract.slice(0, MAX_SNIPPET_LENGTH - 3) + '...';
  }
  const date = new Date(published_date);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const formattedDate = `${day}/${month}/${year}`;
  return `<li class="list-news__item" data-id="${id}" data-pub_date="${formattedDate}" >
            <article class="item-news__article">
              <div class="item-news__wrapper-img">
                <img class="item-news__img" src="${imageUrl}" alt="photo">
                <p class="item-news__category">${section}</p>
                <div class="article_flag">
                  <button class="article_flag--add"><span class="article_flag_text">Add to favorite</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="#4440f7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3s-5 3-5 3s-2.239-3-5-3Z"/></svg>
                  </button>
                  <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#4b48da" stroke="#4b48da" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3s-5 3-5 3s-2.239-3-5-3Z"/></svg>
                  </button>
                </div>
              </div>
              <h2 class="item-news__title">${
                title === '' ? 'Title not found' : title
              }</h2>
              <p class="item-news__description">${
                abstract === '' ? 'Description not found' : abstract
              }</p>
              <div class="item-news__info">
                <span class="item-news__info-date">${formattedDate}</span>
                <a class="item-news__info-link" href="${url}" target="_blank" rel="noreferrer noopener">Read more</a>
              </div>
            </article>
          </li>`;
}

//------------------------------- Функція для скрола вгору сторінки при пагінації ------------------///

function windowScrollUp() {
  const { height: cardHeight } =
    newsList.firstElementChild.getBoundingClientRect();
  console.log(cardHeight);
  window.scrollBy({
    top: cardHeight * -4,
    behavior: 'smooth',
  });
}
