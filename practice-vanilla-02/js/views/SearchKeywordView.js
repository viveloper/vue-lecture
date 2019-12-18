import View from './View.js';

const tag = '[SearchKeywordView]';

const SearchKeywordView = Object.create(View);

SearchKeywordView.setup = function (el) {
  this.init(el);
  return this;
}

SearchKeywordView.render = function (data) {
  this.el.innerHTML = this.getListHtml(data);
  this.bindEvents();
}

SearchKeywordView.getListHtml = function (data) {
  if (data.length > 0) {
    return data.reduce((html, item, index) => {
      html += `<li>
      <span class="number">${index + 1}</span>
      ${item.keyword}
    </li>`
      return html;
    }, '<ul class="list">') + '</ul>'
  }
  else {
    return '추천 검색어가 없습니다'
  }
}

SearchKeywordView.bindEvents = function () {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
    li.addEventListener('click', () => this.onClickList(li.childNodes[li.childNodes.length - 1].textContent.trim()))
  });
}

SearchKeywordView.onClickList = function (keyword) {
  this.emit('@onClickList', { keyword });
}

export default SearchKeywordView;