import SearchKeywordView from './SearchKeywordView.js';

const tag = '[SearchHistoryView]';

const SearchHistoryView = Object.create(SearchKeywordView);

SearchHistoryView.getListHtml = function (data) {
  if (data.length > 0) {
    return data.reduce((html, item, index) => {
      html += `<li>      
        ${item.keyword}
        <span class="date">${item.date}</span>
        <button class="btn-remove"></button>
      </li>`
      return html;
    }, '<ul class="list">') + '</ul>'
  }
  else {
    return '최근 검색어가 없습니다'
  }
}

SearchHistoryView.bindEvents = function () {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
    li.addEventListener('click', () => this.onClickList(li.childNodes[0].textContent.trim()));
    li.querySelector('button').addEventListener('click', (e) => this.onClickRemoveHistory(e, li.childNodes[0].textContent.trim()));
  });
}

SearchHistoryView.onClickRemoveHistory = function (e, keyword) {
  e.stopPropagation();
  this.emit('@onClickRemoveHistory', { keyword });
}

SearchHistoryView.render = function (props) {
  const { list, selectedTab, submitted } = props;

  if (!submitted && selectedTab === '최근 검색어') {
    this.show();
  }
  else {
    this.hide();
  }

  this.el.innerHTML = this.getListHtml(list);
  this.bindEvents();
}

export default SearchHistoryView;