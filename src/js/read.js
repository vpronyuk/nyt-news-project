export { addRemoveToLocalStorageREAD };
const BASE_URL = 'https://api.nytimes.com/svc/';
const MOST_POPULAR = 'mostpopular/v2/viewed/1.json';
const API_KEY = 'mc1GG2VGT2VGMPz3mpzlHGRmnyjAqbuI';
import axios from 'axios';

const readContainer = document.querySelector('.container-read');

async function getPopularNewsREAD() {
  try {
    const url = `${BASE_URL}${MOST_POPULAR}?api-key=${API_KEY}`;

    const response = await axios.get(url);

    const datasOBJ = response.data.results.map(item => item.published_date);
    const datas = datasOBJ
      .filter((item, index, array) => array.indexOf(item) === index)
      .sort();
    console.log(datas);
    return datas;
  } catch (error) {
    console.error(error);
  }
}

function insertReadPage(markup) {
  readContainer.innerHTML = markup;
}

function renderAccordion(array) {
  const acordions = array
    .map(
      item =>
        `<div class="collapsible-accordion">
        <div class="collapsible-item">
        <input class="accordion-input" type="checkbox" id="tab1">
        <label class="collapsible-item-label"  for="tab1">${item}</label>
        <div class="collapsible-item-content">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!
        </div>
        </div>
     </div>
    `
    )
    .join('');
  readContainer.innerHTML = acordions;
}

// getPopularNewsREAD().then(results => renderAccordion(results));

function addRemoveToLocalStorageREAD(evt) {
  if (evt.target.tagName !== 'A') {
    return;
  }

  const readMoreLink = evt.target;
  readMoreLink.setAttribute('data-is-read', true);

  const ulItem = evt.target.parentElement.parentElement.parentElement;
  console.log(ulItem);
  const read = document.createElement('p');
  read.innerText = 'Already read';
  read.classList.add('have-read');
  ulItem.appendChild(read);
  ulItem.style.opacity = 0.22;
  const ID = ulItem.getAttribute('data-id');

  const choosenCardID = evt.target.closest('li.list-news__item').dataset.id;
  const choosenCardImg = evt.target.closest('div');
  const imageUrl = choosenCardImg.childNodes[1].src;
  const section = choosenCardImg.childNodes[3].textContent;
  const titleDiv = evt.target.closest('article');
  const title = titleDiv.childNodes[3].textContent;
  const abstract = titleDiv.childNodes[5].textContent;
  const published_date = titleDiv.childNodes[7].childNodes[1].textContent;
  const url = titleDiv.childNodes[7].childNodes[3].href;
  const time = Date.now();

  let storage = localStorage.getItem('read-more');

  // додаємо елемент
  const params = {
    id: choosenCardID,
    imageUrl: imageUrl,
    section: section,
    title: title,
    abstract: abstract,
    published_date: published_date,
    url: url,
    time: time,
  };

  const parseStorage = JSON.parse(storage);
  parseStorage.push(params);
  const strStorage = JSON.stringify(parseStorage);
  localStorage.setItem('read-more', strStorage);
}

const tabs = document.querySelectorAll('.collapsible-accordion');
console.log(tabs);

//  function readHandler(evt){
//     console.log(evt.target);
//     if(evt.target.nodeName !== 'LABEL' ){
//         console.log('neto');
//         return
//     }
//  }

// readContainer.addEventListener('click',readHandler);

/*<div class="list-news__item" data-id="${id}" >
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
                <span class="item-news__info-date">${formattedDate}</span>
                <a class="item-news__info-link" href="${url}" target="_blank" rel="noreferrer noopener">Read more</a>
              </div>
            </article>
          </div>

          <div class="collapsible-accordion">
            <div class="collapsible-item">
                <input type="radio" id="rad1" name="radio">
                <label class="collapsible-item-label" for="rad1">Item 1</label>
                <div class="collapsible-item-content">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!
                </div>
            </div>
        </div>
 */
