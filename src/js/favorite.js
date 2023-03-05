const objFromStorale = localStorage.getItem('cards');
const objParse = JSON.parse(objFromStorale);

const newsWrapper = document.querySelector('.card_list');

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
          <button checked="true" class="item-news__add-to-favorite">Add to favorite
            <!-- сердечко -->
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
function markupFavorite(objParse) {
  const markFav = objParse.map(el => createFavoriteMarkup(el));
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
  if (evt.target.tagName !== 'BUTTON') {
    return;
  }
  let btnAddtoStorage;
  btnAddtoStorage = evt.target;
  const btnDivID = evt.target.closest('li.list-news__item').dataset.id;

  if (evt.target.hasAttribute('checked')) {
    btnAddtoStorage.removeAttribute('checked');

    let storage = localStorage.getItem('cards');
    const parseStorage = JSON.parse(storage);
    updateStorageFavotite(parseStorage, btnDivID);
    return;
  }

  btnAddtoStorage.setAttribute('checked', true);

  const choosenCardID = evt.target.closest('li.list-news__item').dataset.id;
  const choosenCardImg = evt.target.closest('div');
  const imageUrl = choosenCardImg.childNodes[1].src;
  const section = choosenCardImg.childNodes[3].textContent;
  const titleDiv = evt.target.closest('article');
  const title = titleDiv.childNodes[3].textContent;
  const abstract = titleDiv.childNodes[5].textContent;
  const published_date = titleDiv.childNodes[7].childNodes[1].textContent;
  const url = titleDiv.childNodes[7].childNodes[3].href;

  let storage = localStorage.getItem('cards');

  // додаємо елемент
  const params = {
    id: choosenCardID,
    imageUrl: imageUrl,
    section: section,
    title: title,
    abstract: abstract,
    published_date: published_date,
    url: url,
  };

  const parseStorage = JSON.parse(storage);
  parseStorage.push(params);
  const strStorage = JSON.stringify(parseStorage);
  localStorage.setItem('cards', strStorage);
}
