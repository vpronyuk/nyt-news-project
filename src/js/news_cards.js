import axios from 'axios';

const BASE_URL = 'https://api.nytimes.com/svc/';
const MOST_POPULAR = 'mostpopular/v2/viewed/1.json'; //тягнеться на home при загрузці
const CATEGORY_LIST = 'news/v3/content/section-list.json'; //потрібно для відмальовки dropdown menu
const CATEGORY_NEWS = 'news/v3/content/inyt/automobiles.json'; //фідбек на запит з dropdown menu
const SEARCHED_QUERY = 'search/v2/articlesearch.json'; //фідбек на запит з input

const API_KEY = 'mc1GG2VGT2VGMPz3mpzlHGRmnyjAqbuI';

const newsWrapper = document.querySelector('.list-news');

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
  const imageUrl = media?.[0]?.['media-metadata']?.[2]?.url || '';
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

localStorage.setItem('cards', '[]');
