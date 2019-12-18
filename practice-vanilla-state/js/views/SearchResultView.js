import View from './View.js';

const tag = '[SearchResultView]';

const SearchResultView = Object.create(View);

SearchResultView.setup = function (el) {
  this.init(el);
  return this;
}

SearchResultView.getResultHtml = function (data) {
  if (data.length > 0) {
    return data.reduce((html, item) => {
      html += `<li>
        <img src="${item.image}" />
        <p>${item.name}</p>
      </li>`;
      return html;
    }, '<ul class="list">') + '</ul>';
  }
  else {
    return '<p>검색 결과가 없습니다</p>'
  }
}

SearchResultView.render = function (props) {
  const { result, submitted } = props;
  if (submitted) {
    this.show();
  }
  else {
    this.hide();
  }
  this.el.innerHTML = this.getResultHtml(result);
}

export default SearchResultView;