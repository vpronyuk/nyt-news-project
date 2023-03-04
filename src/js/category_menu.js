const API_KEY = 'AKwAkjVAbzaYm1bK9yzcr2BnwjHsxavz';
const categoriesList = document.querySelector('.category_list');
const dropDownMenu = document.querySelector('.dropdown');
const dropDownContent = document.querySelector('.dropdown_content');
const mobileCatList = document.querySelector('.mobile_category_list');
const otherBtn = document.querySelector('.category_btn');
const mobCatBtn = document.querySelector('.mobile_category_btn');
const mobCatBtnIcon = document.querySelector('.category_mob_icon');
const mobBtnSpan = document.querySelector('.mob-btn-span');
const catBtnIcon = document.querySelector('.category_icon');
const deskSpanBtn = document.querySelector('.desk-btn-span');

const content = document.querySelector('.content');

//---------------------- Mobile categories menu -------------------------------------//

mobCatBtn.addEventListener('click', onClickMobileBtn);
mobileCatList.addEventListener('click', onClickMobileCat);

function onClickMobileBtn(event) {
  console.log(event.target);
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

// categoriesList.addEventListener('click', e => {
//   const query = e.target.dataset.section;

//   if (e.target.textContent === 'Other') {
//     fetch(
//       `https://api.nytimes.com/svc/news/v3/content/inyt/${query}.json?api-key=${API_KEY}`
//     )
//       .then(res => res.json())
//       .then(data => {
//         if (data.results === null) {
//           content.innerHTML = '';
//         } else {
//           const cards = data.results.reduce((markup, card) => {
//             return markup + createCard(card);
//           }, '');
//           content.innerHTML = cards;
//         }
//       });
//   }
// });

function createCard({ title, thumbnail_standard }) {
  return `
  <div class="card">
  <h2>${title}</h2>
  <img src="${thumbnail_standard}">
  </div>
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

  console.log(event.target);
  const query = event.target.dataset.section;
  const text = event.target.dataset.name;
  console.log(query);
}
