(() => {
  const refs = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),
    menu: document.querySelector('[data-menu]'),
    // body: document.querySelector("body"),
  };

  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);

  function toggleMenu() {
    refs.menu.classList.toggle('active');
    refs.menu.classList.toggle('is-hidden');
    document.body.classList.toggle('lock')
    // refs.body.classList.toggle("no-scroll");
  }
})();

////////////////додавання активного класу в моб меню //////////

// const currentUrl = window.location.href
// const menuLinks = document.querySelectorAll('.mob-menu__link')

// menuLinks.forEach(link => {
//   if (link.href === currentUrl) {
//     link.classList.add('selected-menu');
//   }
// })

const currentMobPage = window.location.pathname;

const homeMobLink = document.getElementById('mob-home__link');
const favoriteMobLink = document.getElementById('mob-favorite__link');
const readMobLink = document.getElementById('mob-read__link');

if (currentMobPage === '/index.html') {
  homeMobLink.classList.add('selected-menu');
} else if (currentMobPage === '/favorite.html') {
  favoriteMobLink.classList.add('selected-menu');
} else if (currentMobPage === '/read.html') {
  readMobLink.classList.add('selected-menu');
} else {
  homeMobLink.classList.add('selected-menu');
}
