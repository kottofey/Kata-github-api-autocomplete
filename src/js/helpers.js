const SEARCH_ITEMS_PER_PAGE = '5';

export function debounce (fn, debounceTime) {
  let timer;

  return function() {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, debounceTime);
  };
}

export function createRepoItem (repoBlock, item) {
  let newItem = document.createElement('div');
  newItem.classList.add('repositories__item');

  const span = document.createElement('span');
  span.classList.add('repositories__item--span');

  const name = span.cloneNode(true);
  const owner = span.cloneNode(true);
  const stars = span.cloneNode(true);
  const desc = span.cloneNode(true);

  name.textContent = `Name: ${item.name}`;
  owner.textContent = `Owner: ${item.owner.login}`;
  stars.textContent = `Stars: ${item.stargazers_count}`;
  desc.textContent = `Desc: ${item.description}`;

  const btn = document.createElement('button');
  btn.classList.add('repositories__deleteButton');
  newItem.append(name, owner, stars, desc, btn);
  repoBlock.append(newItem);
}

export function appendItemToBlock (block, item, id) {
  let newItem = document.createElement('li');
  newItem.className = 'results__item';
  newItem.textContent = item;
  newItem.id = 'item' + id;

  block.append(newItem);
}

export function clearBlock (items) {
  items.innerHTML = '';
}

export async function getRepositories (req) {
  if (!req) return [];

  const url = new URL('https://api.github.com/search/repositories');
  url.searchParams.set('q', encodeURIComponent(req));
  url.searchParams.set('per_page', SEARCH_ITEMS_PER_PAGE);

  const response = await fetch(url);
  if (!response.ok) {
    console.log(`Error! Response code: ${response.status}`);
    return [];
  }
  const items = await response.json();
  return items.items;
}
