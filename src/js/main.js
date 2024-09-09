import '../scss/style.scss';
import './helpers.js';

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
    createRepoItem(JSON.parse(item));
    clearSearchItems();
  }
});

// Searching
async function search (event) {
  const searchString = await getRepositories(event.target.value);
  clearSearchItems();
  for (let i = 0; i < 5; i++) {
    sessionStorage.setItem('item' + i, JSON.stringify(searchString[i]));
    createSearchItem(searchString[i].name, i);
  }
}

const searchDebounced = debounce(search, 300);
githubSearch.addEventListener('keyup', searchDebounced);
