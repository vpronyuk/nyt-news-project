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

const headerIconSearch = document.querySelector('.form-header__icon-search');
const headerInput = document.querySelector('.form-header__input');

headerIconSearch.addEventListener('click', onHeaderIconSearchClick);

function onHeaderIconSearchClick() {
  if (document.documentElement.clientWidth < 768) {
    headerInput.classList.toggle('leaving-input');
    headerIconSearch.style.position = 'absolute';
    headerIconSearch.style.top = '5px';
    headerIconSearch.style.left = '14px';
  }
  if (!headerInput.classList.contains('leaving-input')) {
    headerIconSearch.style.position = '';
  }
}

const checkbox = document.querySelector('.form-header__checkbox');
const checkboxInput = document.querySelector('.checkbox-header__input');
const headerIconSun = document.querySelector('.form-header__icon-sun');
const headerIconMoon = document.querySelector('.form-header__icon-moon');
const headerDark = document.querySelector('.form-header__dark');
const headerLight = document.querySelector('.form-header__light');

const iconMobMenu = document.querySelector('.icon-mob-menu');

checkboxInput.addEventListener('change', onCheckBoxClick);

function onCheckBoxClick() {
  const isDarkMode = checkboxInput.checked;
  if (isDarkMode) {
    document.body.classList.add('body--dark');
    headerIconSun.classList.add('form-header__icon-sun--dark');
    headerIconMoon.classList.add('form-header__icon-moon--dark');
    headerDark.classList.add('form-header__dark--dark');
    headerLight.classList.add('form-header__light--dark');
    headerInput.classList.add('form-header__input--dark');
    headerIconSearch.classList.add('form-header__icon-search--dark');
    iconMobMenu.classList.add('icon-mob-menu--dark');
  } else {
    document.body.classList.remove('body--dark');
    headerIconSun.classList.remove('form-header__icon-sun--dark');
    headerIconMoon.classList.remove('form-header__icon-moon--dark');
    headerDark.classList.remove('form-header__dark--dark');
    headerLight.classList.remove('form-header__light--dark');
    headerInput.classList.remove('form-header__input--dark');
    headerIconSearch.classList.remove('form-header__icon-search--dark');
    iconMobMenu.classList.remove('icon-mob-menu--dark');
  }

  checkboxInput.setAttribute('checked', 'checked');
  localStorage.setItem('isDarkMode', isDarkMode);
}

const isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));

if (isDarkMode) {
  checkboxInput.checked = true;
  document.body.classList.add('body--dark');
  headerIconSun.classList.add('form-header__icon-sun--dark');
  headerIconMoon.classList.add('form-header__icon-moon--dark');
  headerDark.classList.add('form-header__dark--dark');
  headerLight.classList.add('form-header__light--dark');
  headerInput.classList.add('form-header__input--dark');
  headerIconSearch.classList.add('form-header__icon-search--dark');
  iconMobMenu.classList.add('icon-mob-menu--dark');
} else {
  checkboxInput.checked = false;
  document.body.classList.remove('body--dark');
  headerIconSun.classList.remove('form-header__icon-sun--dark');
  headerIconMoon.classList.remove('form-header__icon-moon--dark');
  headerDark.classList.remove('form-header__dark--dark');
  headerLight.classList.remove('form-header__light--dark');
  headerInput.classList.remove('form-header__input--dark');
  headerIconSearch.classList.remove('form-header__icon-search--dark');
  iconMobMenu.classList.remove('icon-mob-menu--dark');
}

const mob = document.querySelector('.mob-menu__checkbox-input');
const menu = document.querySelector('.mob-menu');
const sun = document.querySelector('.mob-icon-sun');
const mobMoon = document.querySelector('.mob-icon-moon');

mob.addEventListener('click', onMobClick);

function onMobClick() {
  const isDarkModeMob = mob.checked;
  if (isDarkModeMob) {
    menu.classList.add('mob-menu--dark');
    sun.classList.add('mob-icon-sun--dark');
    mobMoon.classList.add('mob-icon-moon--dark');
  } else {
    menu.classList.remove('mob-menu--dark');
    sun.classList.remove('mob-icon-sun--dark');
    mobMoon.classList.remove('mob-icon-moon--dark');
  }
  mob.setAttribute('checked', 'checked');
  localStorage.setItem('isDarkMode', isDarkModeMob);
}

const isDarkModeMob = JSON.parse(localStorage.getItem('isDarkMode'));

if (isDarkModeMob) {
  mob.checked = true;
  menu.classList.add('mob-menu--dark');
  sun.classList.add('mob-icon-sun--dark');
  mobMoon.classList.add('mob-icon-moon--dark');
} else {
  mob.checked = false;
  menu.classList.remove('mob-menu--dark');
  sun.classList.remove('mob-icon-sun--dark');
  mobMoon.classList.remove('mob-icon-moon--dark');
}

const currentPage = window.location.pathname;

const homeLink = document.getElementById('home__link');
const favoriteLink = document.getElementById('favorite__link');
const readLink = document.getElementById('read__link');

if (currentPage === '/index.html') {
  homeLink.classList.add('current');
} else if (currentPage === './favorite.html') {
  favoriteLink.classList.add('current');
} else if (currentPage === './read.html') {
  readLink.classList.add('current');
}
