import '../scss/style.scss';
import * as helper from './helpers.js';

const repositories = document.querySelector('.repositories');
const results = document.querySelector('.results');
const githubSearch = document.querySelector('.search__input');

const repos = {};

// Buttons to remove added repos
repositories.addEventListener('click', (e) => {
  if (e.target.classList.contains('repositories__deleteButton')) {
    e.target.closest('.repositories__item').remove();
  }
});

// Adding repos to list
results.addEventListener('click', (e) => {
  if (e.target.classList.contains('results__item')) {
    const item = repos[e.target.id];
    helper.createRepoItem(repositories, JSON.parse(item));
    helper.clearBlock(results);
  }
  helper.clearBlock(results);
  githubSearch.value = '';
});

async function search (event) {
  const searchResultArray = await helper.getRepositories(event.target.value);
  helper.clearBlock(results);
  if (searchResultArray.length) {
    for (let i = 0; i < searchResultArray.length; i++) {
      repos['item' + i] = JSON.stringify(searchResultArray[i]);
      helper.appendItemToBlock(results, searchResultArray[i].name, i);
    }
  }
}

const searchDebounced = helper.debounce(search, 300);
githubSearch.addEventListener('input', searchDebounced);
