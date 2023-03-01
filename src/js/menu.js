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
    refs.menu.classList.toggle('is-hidden');
    // refs.body.classList.toggle("no-scroll");
  }
})();

const svg = document.querySelector('.form-header__icon-search');
const inputEl = document.querySelector('.form-header__input');

svg.addEventListener('click', onSvgClick);

function onSvgClick() {
  if (document.documentElement.clientWidth < 768) {
    inputEl.classList.toggle('leaving-input');
    svg.style.position = 'absolute';
    svg.style.top = '5px';
    svg.style.left = '14px';
  }
  if (!inputEl.classList.contains('leaving-input')) {
    svg.style.position = '';
  }
}
