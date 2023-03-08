const emptyPage = document.querySelector('.empty');
const container = document.querySelector('.favorite-container');

const objFromStorale = localStorage.getItem('cards');
if (objFromStorale === '[]') {
  emptyPage.style.display = 'block';
  container.style.padding = 0;
}
const objParse = JSON.parse(objFromStorale);

const newsWrapper = document.querySelector('.list-news');
newsWrapper.addEventListener('click', addRemoveToLocalStorage);

function updateNewsList(el) {
  newsWrapper.innerHTML = el;
}

function createFavoriteMarkup({
  title,
  imageUrl,
  section,
  id,
  abstract,
  published_date,
  url,
}) {
  return `<li class="list-news__item" data-id="${id}">
      <article class="item-news__article">
        <div class="item-news__wrapper-img">
          <img class="item-news__img" src="${imageUrl}" alt="photo">
          <p class="item-news__category">${section}</p>
           <div class="article_flag">
          <button class="article_flag--add is-hidden"><span class="article_flag_text">Add to favorite</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="#4440f7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3s-5 3-5 3s-2.239-3-5-3Z"/></svg>
                  </button>
                  <button class="article_flag--remove "><span class="article_flag_text">Remove from favorite</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#4b48da" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3s-5 3-5 3s-2.239-3-5-3Z"/></svg>
                  </button>
                  </div>
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
function markupFavorite(objParse) {
  const markFav = objParse.map(el => createFavoriteMarkup(el)).join('');
  return markFav;
}

const baseMArkUp = markupFavorite(objParse);
updateNewsList(baseMArkUp);

function updateStorageFavotite(parseStorage, btnDivID) {
  const newStorage = parseStorage.reduce((acc, card) => {
    if (card.id === btnDivID) {
      return acc;
    }
    acc.push(card);
    return acc;
  }, []);

  const strStorage = JSON.stringify(newStorage);
  localStorage.setItem('cards', strStorage);

  const updatedStorage = JSON.parse(localStorage.getItem('cards'));
  const markFromUpdStarage = markupFavorite(updatedStorage);
  updateNewsList(markFromUpdStarage);
}

function addRemoveToLocalStorage(evt) {
  if (
    evt.target.tagName !== 'BUTTON' &&
    evt.target.tagName !== 'SPAN' &&
    evt.target.tagName !== 'svg' &&
    evt.target.tagName !== 'path'
  ) {
    return;
  }
  let btnAddtoStorage = evt.target;
  const btnDivID = evt.target.closest('li.list-news__item').dataset.id;

  let storage = localStorage.getItem('cards');
  let parseStorage = JSON.parse(storage);
  updateStorageFavotite(parseStorage, btnDivID);
}
