

const readContainer = document.querySelector('.container-read');

const news = JSON.parse(localStorage.getItem("all")); 
const readStorage = JSON.parse(localStorage.getItem("read-more"));


function getDatesFromNews(arr){
  const result = [...new Set(arr.map(item => item.time.toString()))];
  return result;
}


function renderAccordion() {
  if(!localStorage.getItem('read-more') || localStorage.getItem('read-more') === '[]'){
    return;
  }
  const array = getDatesFromNews(readStorage)
  const acordions = array
    .map(
      item =>
        `<button class="accordion">${item}</button>
        <ul class="panel list-news">
          
        </ul>
    `
    )
    .join('');
  readContainer.innerHTML = acordions;
}

renderAccordion();

function addRemoveToLocalStorageREAD(evt) {
  if (evt.target.nodeName !== 'A' ) {
    return;
  }

  const readMoreLink = evt.target;
  readMoreLink.setAttribute('data-is-read', true);

  const ulItem = evt.target.parentElement.parentElement.parentElement;
  console.log('li item',ulItem);
  const read = document.createElement('p');
  read.innerText = 'Already read';
  read.classList.add('have-read');
  ulItem.appendChild(read);
  ulItem.style.opacity = 0.22;
  const ID = ulItem.getAttribute('data-id');

  const choosenCardID = evt.target.closest('li.list-news__item').dataset.id;
  const choosenCardImg = evt.target.closest('div');
  const imageUrl = ulItem.childNodes[1].childNodes[1].childNodes[1].getAttribute('src');
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
function createMarkup({
  title,
  media,
  section,
  id,
  abstract,
  published_date,
  url,
  imageUrl
}) {
  const imageUrL =
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
                    <svg width="16" height="16">
                      <use href="./images/symbol-defs.svg#icon-heart-empty" width="16" height="16"></use>
                    </svg>
                  </button>
                  <button class="article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
                    <svg width="16" height="16">
                      <use href="./images/symbol-defs.svg#icon-heart-fill" width="16" height="16"></use>
                    </svg>
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


function accordionHandler(e){
  this.classList.toggle("active");
  var panel = this.nextElementSibling;
  console.log(panel);
  const date = this.textContent;
  const filtred = readStorage.filter(item=>item.time === date);
  const liel = filtred.map(createMarkup).join("");
  panel.innerHTML = liel;
  if (panel.style.display === "flex") {
    panel.style.display = "none";
  } else {
    panel.style.display = "flex";
  }
  
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", accordionHandler);
}


export default addRemoveToLocalStorageREAD
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
