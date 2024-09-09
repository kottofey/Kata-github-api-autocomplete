import '../scss/style.scss';
import * as helper from './helpers.js';

// Remove added repo buttons
repositories.addEventListener('click', (e) => {
  if (e.target.classList.contains('repositories__deleteButton')) {
    e.target.closest('.repositories__item').remove();
  }
});

// Adding repos to list
results.addEventListener('click', (e) => {
  if (e.target.classList.contains('results__item')) {
    const item = sessionStorage.getItem(e.target.id);
    helper.createRepoItem(JSON.parse(item));
    helper.clearSearchItems();
  }
});

// Searching
async function search (event) {
  const searchString = await helper.getRepositories(event.target.value);
  helper.clearSearchItems();
  for (let i = 0; i < 5; i++) {
    sessionStorage.setItem('item' + i, JSON.stringify(searchString[i]));
    helper.createSearchItem(searchString[i].name, i);
  }
}

const searchDebounced = helper.debounce(search, 300);
githubSearch.addEventListener('keyup', searchDebounced);
