export { addRemoveToLocalStorage, updateStorage };

function addRemoveToLocalStorage(evt) {
  if (
    evt.target.tagName !== 'BUTTON' &&
    evt.target.tagName !== 'SPAN' &&
    evt.target.tagName !== 'SVG'
  ) {
    return;
  }

  let btnAddtoStorage = evt.target;
  const btnDiv = btnAddtoStorage.closest('div.article_flag');
  const btnDivID = evt.target.closest('li.list-news__item').dataset.id;

  const addButton = evt.target.closest('div').childNodes[1];
  const removeButton = evt.target.closest('div').childNodes[3];
  addButton.classList.toggle('is-hidden');
  removeButton.classList.toggle('is-hidden');

  let storage = localStorage.getItem('cards');
  let parseStorage = JSON.parse(storage);
  updateStorage(parseStorage, btnDivID);

  if (btnDiv.hasAttribute('checked')) {
    btnDiv.removeAttribute('checked');
    let storage = localStorage.getItem('cards');
    const parseStorage = JSON.parse(storage);
    updateStorage(parseStorage, btnDivID);
    return;
  }

  btnDiv.setAttribute('checked', true);

  const choosenCardID = evt.target.closest('li.list-news__item').dataset.id;
  const choosenCardImg = evt.target.closest('div.item-news__wrapper-img');
  const imageUrl = choosenCardImg.childNodes[1].src;
  const section = choosenCardImg.childNodes[3].textContent;
  const titleDiv = evt.target.closest('article');
  const title = titleDiv.childNodes[3].textContent;
  const abstract = titleDiv.childNodes[5].textContent;
  const published_date = titleDiv.childNodes[7].childNodes[1].textContent;
  const url = titleDiv.childNodes[7].childNodes[3].href;

  storage = localStorage.getItem('cards');

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

  parseStorage = JSON.parse(storage);
  parseStorage.push(params);
  const strStorage = JSON.stringify(parseStorage);
  localStorage.setItem('cards', strStorage);
}

// _____

function updateStorage(parseStorage, btnDivID) {
  const newStorage = parseStorage.reduce((acc, card) => {
    if (card.id === btnDivID) {
      return acc;
    }
    acc.push(card);
    return acc;
  }, []);
  const strStorage = JSON.stringify(newStorage);
  localStorage.setItem('cards', strStorage);
}
