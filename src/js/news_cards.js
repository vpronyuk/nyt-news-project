import axios from 'axios';
import { addRemoveToLocalStorage, updateStorage } from './favorite_functions';
//import addRemoveToLocalStorageREAD from './read';

const BASE_URL = 'https://api.nytimes.com/svc/';
const MOST_POPULAR = 'mostpopular/v2/viewed/1.json'; //тягнеться на home при загрузці
const CATEGORY_LIST = 'news/v3/content/section-list.json'; //потрібно для відмальовки dropdown menu
const CATEGORY_NEWS = 'news/v3/content/inyt/automobiles.json'; //фідбек на запит з dropdown menu
const SEARCHED_QUERY = 'search/v2/articlesearch.json'; //фідбек на запит з input
const API_KEY = 'mc1GG2VGT2VGMPz3mpzlHGRmnyjAqbuI';
let btnAddtoStorage;

const newsWrapper = document.querySelector('.list-news');
function addReadMore(evt) {
  if (evt.target.nodeName !== 'A') {
    return;
  }

  const readMoreLink = evt.target;
  readMoreLink.setAttribute('data-is-read', true);

  const ulItem = evt.target.parentNode.parentNode.parentNode;
  console.log('li item', ulItem);
  const read = document.createElement('p');
  read.innerText = 'Already read';
  read.classList.add('have-read');
  ulItem.appendChild(read);
  ulItem.style.opacity = 0.22;
  const ID = ulItem.getAttribute('data-id');

  const choosenCardID = evt.target.closest('li.list-news__item').dataset.id;
  const choosenCardImg = evt.target.closest('div');
  const imageUrl =
    ulItem.childNodes[1].childNodes[1].childNodes[1].getAttribute('src');
  const section = choosenCardImg.childNodes[3].textContent;
  const titleDiv = evt.target.closest('article');
  const title = titleDiv.childNodes[3].textContent;
  const abstract = titleDiv.childNodes[5].textContent;
  const published_date = titleDiv.childNodes[7].childNodes[1].textContent;
  const url = titleDiv.childNodes[7].childNodes[3].href;
  const time = new Date().getTime();
  const date = new Date(time);

  let storage = localStorage.getItem('read-more');
  console.log(imageUrl);
  // додаємо елемент
  const params = {
    id: choosenCardID,
    imageUrl: imageUrl,
    section: section,
    title: title,
    abstract: abstract,
    published_date: published_date,
    url: url,
    time: date.toLocaleDateString('en-GB'),
  };

  const parseStorage = JSON.parse(storage);
  parseStorage.push(params);
  const strStorage = JSON.stringify(parseStorage);
  localStorage.setItem('read-more', strStorage);
}
newsWrapper.addEventListener('click', addRemoveToLocalStorage);
newsWrapper.addEventListener('click', addReadMore);

// standard
async function getPopularNews() {
  try {
    const url = `${BASE_URL}${MOST_POPULAR}?api-key=${API_KEY}`;

    const response = await axios.get(url);
    console.log(response.data.results);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function updateNewsList(markup) {
  newsWrapper.innerHTML = markup;
}

getPopularNews()
  .then(({ results }) => {
    return results.map(createMarkup).join('');
  })
  .then(updateNewsList);

function createMarkup({
  title,
  media,
  section,
  id,
  abstract,
  published_date,
  url,
}) {
  const imageUrl =
    media?.[0]?.['media-metadata']?.[2]?.url ||
    `https://source.unsplash.com/featured/?nature`;
  const MAX_SNIPPET_LENGTH = 110;
  if (abstract.length > MAX_SNIPPET_LENGTH) {
    abstract = abstract.slice(0, MAX_SNIPPET_LENGTH - 3) + '...';
  }
  const date = new Date(published_date);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const formattedDate = `${day}/${month}/${year}`;
  return `<li class="list-news__item" data-id="${id}" >
            <article class="item-news__article">
              <div class="item-news__wrapper-img">
                <img class="item-news__img" src="${imageUrl}" alt="photo">
                <p class="item-news__category">${section}</p>
                <div class="article_flag">
                  <button class="article_flag--add"><span class="article_flag_text">Add to favorite</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="#4440f7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3s-5 3-5 3s-2.239-3-5-3Z"/></svg>
                  </button>
                  <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#4b48da" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3s-5 3-5 3s-2.239-3-5-3Z"/></svg>
                  </button>
                </div>
              </div>
              <h2 class="item-news__title">${title}</h2>
              <p class="item-news__description">${abstract}</p>
              <div class="item-news__info">
                <span class="item-news__info-date">${formattedDate}</span>
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

if (!localStorage.getItem('read-more')) {
  localStorage.setItem('read-more', '[]');
}
if (!localStorage.getItem('cards')) {
  localStorage.setItem('cards', '[]');
}
