export function debounce (fn, debounceTime) {
  let timer;

  return function() {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, debounceTime);
  };
}

export function createRepoItem (item) {
  let newItem = document.createElement('div');
  newItem.className = 'repositories__item';

  const span = document.createElement('span');
  span.className = 'repositories__item--span';
  const name = span.cloneNode(true);
  const owner = span.cloneNode(true);
  const stars = span.cloneNode(true);
  name.textContent = `Name: ${item.name}`;
  owner.textContent = `Owner: ${item.owner.login}`;
  stars.textContent = `Stars: ${item.stargazers_count}`;

  const btn = document.createElement('button');
  btn.className = 'repositories__deleteButton';
  btn.id = 'repoDelete';
  newItem.append(name, owner, stars, btn);
  repositories.append(newItem);

  githubSearch.value = '';
}

export function createSearchItem (item, id) {
  let newItem = document.createElement('li');
  newItem.className = 'results__item';
  newItem.textContent = item;
  newItem.id = 'item' + id;

  results.append(newItem);
}

export function clearSearchItems () {
  results.innerHTML = '';
}

export async function getRepositories (req) {
  const url = new URL('https://api.github.com/search/repositories');
  url.search = 'q=' + req;

  const response = await fetch(url);
  if (!response.ok) {
    console.log('nothing found');
    return;
  } else if (response.status !== 200) {
    console.log('Error, status code ' + response.status);
  }
  const items = await response.json();
  return items.items;
}
