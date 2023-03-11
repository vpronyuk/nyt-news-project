import axios from 'axios';

const BASE_URL = 'https://api.nytimes.com/svc/';
const MOST_POPULAR = 'mostpopular/v2/viewed/1.json'; //тягнеться на home при загрузці
const CATEGORY_LIST = 'news/v3/content/section-list.json'; //потрібно для відмальовки dropdown menu
const CATEGORY_NEWS = 'news/v3/content/inyt/automobiles.json'; //фідбек на запит з dropdown menu
const SEARCHED_QUERY = 'search/v2/articlesearch.json'; //фідбек на запит з input
const API_KEY = 'mc1GG2VGT2VGMPz3mpzlHGRmnyjAqbuI';

async function getPopularNews() {
  try {
    const url = `${BASE_URL}${MOST_POPULAR}?api-key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch popular news');
  }
}

async function getNewsByCategory(category, newsPerPage, currentNewsCount) {
  try {
    const url = `${BASE_URL}${CATEGORY_NEWS}${query}.json?api-key=${API_KEY}&limit=${newsPerPage}&offset=${currentNewsCount}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch news by category: ${category}`);
  }
}

async function getCategoryList() {
  try {
    const url = `${BASE_URL}${CATEGORY_LIST}?api-key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch category list');
  }
}

async function getNewsByInput(searchKeyword, pubDate) {
  try {
    const url = `${BASE_URL}&${SEARCHED_QUERY}api-key=${API_KEY}&q=${searchKeyword}&fq=pub_date:(${pubDate})`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch news by keyword: ${searchKeyword}`);
  }
}

module.exports = {
  getPopularNews,
  getNewsByCategory,
  getCategoryList,
  getNewsByInput,
};
