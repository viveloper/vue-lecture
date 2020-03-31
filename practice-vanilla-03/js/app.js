import { products, recommendTerms, recentTerms } from './model.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const btnDelete = document.getElementById('btn-delete');
const recommendTab = document.getElementById('recommend-tab');
const recentTab = document.getElementById('recent-tab');
const searchList = document.getElementById('search-list');
const searchResult = document.getElementById('search-result');

const tabNames = {
  recommend: 'recommend',
  recent: 'recent'
};

let activeTab = tabNames.recommend;

searchForm.addEventListener('submit', e => {
  e.preventDefault();
});

searchInput.addEventListener('keyup', e => {
  if (e.target.value.length > 0) {
    btnDelete.classList.remove('btn-hide');
  } else {
    btnDelete.classList.add('btn-hide');
    clearResult();
  }

  if (e.keyCode === 13) {
    search(e.target.value);
  }
});

btnDelete.addEventListener('click', () => {
  searchInput.value = '';
  clearResult();
});

recommendTab.addEventListener('click', () => {
  activeTab = tabNames.recommend;
  toggleTab();
  showRecommendList();
});

recentTab.addEventListener('click', () => {
  activeTab = tabNames.recent;
  toggleTab();
  showRecentList();
});

function toggleTab() {
  if (activeTab === tabNames.recommend) {
    recommendTab.classList.add('active');
    recentTab.classList.remove('active');
  } else {
    recommendTab.classList.remove('active');
    recentTab.classList.add('active');
  }
}

function showRecommendList() {
  recommendTerms.getRecommendTerms().then(terms => {
    const template = terms
      .map(
        (term, index) => `
      <li class="search-item">
        <span class="search-term">${term}</span>
      </li>
    `
      )
      .join('');
    searchList.innerHTML = template;

    const items = searchList.querySelectorAll('li .search-term');
    items.forEach(item => {
      item.addEventListener('click', () => {
        searchInput.value = item.innerText;
        btnDelete.classList.remove('btn-hide');
        search(item.innerText);
      });
    });
  });
}

function showRecentList() {
  recentTerms.getRecentTerms().then(terms => {
    const reverseTerms = [...terms].reverse();
    const template = reverseTerms
      .map(
        (item, index) => `
    <li class="search-item">
      <span class="search-term">${item.name}</span><span class="date">${item.date}</span><span class="btn-delete">X</span>
    </li>
    `
      )
      .join('');
    searchList.innerHTML = template;

    const items = searchList.querySelectorAll('li .search-term');
    items.forEach(item => {
      item.addEventListener('click', () => {
        searchInput.value = item.innerText;
        btnDelete.classList.remove('btn-hide');
        search(item.innerText);
      });
    });
    const buttons = searchList.querySelectorAll('.btn-delete');
    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        recentTerms.removeRecentTerm(buttons.length - index - 1);
        showRecentList();
      });
    });
  });
}

function search(term) {
  console.log(term);
  showLoading();
  products.getProducts().then(products => showResult(products));
  recentTerms.addRecentTerm(term).then(res => {
    if (activeTab === tabNames.recent) showRecentList();
  });
}

function showLoading() {
  searchResult.innerHTML = [1, 2, 3]
    .map(
      () => `
  <li class="skeleton-item">
    <div class="skeleton-image"></div>
    <div class="skeleton-name"></div>
  </li>
`
    )
    .join('');
}

function showResult(products) {
  const template = products
    .map(
      product => `
    <li class="result-item">
      <img src="${product.img}" alt="item" class="item-image" />
      <p class="item-name">${product.name}</p>
    </li>
  `
    )
    .join('');
  searchResult.innerHTML = template;
}

function clearResult() {
  searchResult.innerHTML = '';
}

function init() {
  activeTab = tabNames.recommend;
  showRecommendList();
}

init();
