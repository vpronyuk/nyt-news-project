const API_KEY = 'AKwAkjVAbzaYm1bK9yzcr2BnwjHsxavz';
const categoriesList = document.querySelector('.category_list');
const dropDownMenu = document.querySelector('.dropdown');
const dropDownContent = document.querySelector('.dropdown_content');
const mobileCatList = document.querySelector('.mobile_category_list');
const otherBtn = document.querySelector('.category_other_btn');
const mobCatBtn = document.querySelector('.mobile_category_btn');
const catBtnIcon = document.querySelector('.category_icon');
const mobBtnSpan = document.querySelector('.mob-btn-span');

const content = document.querySelector('.content');
console.log(content);

mobCatBtn.addEventListener('click', onClickMobileBtn);
mobileCatList.addEventListener('click', onClickMobileCat);

function onClickMobileBtn(event) {
  console.log(event.target);
  mobileCatList.classList.toggle('category_hidden');

  if (mobBtnSpan.textContent === 'Categories') {
    mobCatBtn.classList.toggle('is-active');
    catBtnIcon.classList.toggle('rotate');
  } else {
    catBtnIcon.classList.toggle('rotate');
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
  catBtnIcon.classList.remove('rotate');
  catBtnIcon.style.fill = 'white';

  console.log(query);

  if (text != undefined && text.length < 11) {
    mobBtnSpan.textContent = text;
  } else {
    mobBtnSpan.textContent = `${text.substring(0, 9)}...`;
  }

  // fetch(
  //   `https://api.nytimes.com/svc/news/v3/content/inyt/${query}.json?api-key=${API_KEY}`
  // )
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //     if (data.results === null) {
  //       content.innerHTML = "We don't find any news";
  //     } else {
  //       const cards = data.results.reduce((markup, card) => {
  //         return markup + createCard(card);
  //       }, '');
  //       content.innerHTML = cards;
  //     }
  //   });
}

fetch(
  `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`
)
  .then(response => response.json())
  .then(response => {
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

categoriesList.addEventListener('click', e => {
  const query = e.target.dataset.section;

  fetch(
    `https://api.nytimes.com/svc/news/v3/content/inyt/${query}.json?api-key=${API_KEY}`
  )
    .then(res => res.json())
    .then(data => {
      if (data.results === null) {
        content.innerHTML = '';
      } else {
        const cards = data.results.reduce((markup, card) => {
          return markup + createCard(card);
        }, '');
        content.innerHTML = cards;
      }
    });
});

function createCard({ title, thumbnail_standard }) {
  return `
  <div class="card">
  <h2>${title}</h2>
  <img src="${thumbnail_standard}">
  </div>
  `;
}
