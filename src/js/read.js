const readContainer = document.querySelector('.container-read');

const news = JSON.parse(localStorage.getItem("all")); 
const readStorage = JSON.parse(localStorage.getItem("read-more"));
const uniqueStorage = [...new Map(readStorage.map((item)=> [item['id'],item])).values()]


function getDatesFromNews(arr){
  const result = [...new Set(arr.map(item => item.time.toString()))];
  return result;
}


function renderAccordion() {
  if(!localStorage.getItem('read-more') || localStorage.getItem('read-more') === '[]'){
    return;
  }
  const array = getDatesFromNews(uniqueStorage)
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
  const filtred = uniqueStorage.filter(item=>item.time === date);
  console.log(filtred);
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

