import View from './View.js';

const tag = '[SearchResultView]';

const SearchResultView = Object.create(View);

SearchResultView.setup = function (el) {
  this.init(el);
  return this;
}

SearchResultView.render = function (data) {
  this.el.innerHTML = this.getResultHtml(data);
}

SearchResultView.getResultHtml = function (data) {
  if(data.length>0){
    return data.reduce((html, item) => {
      html += `<li>
        <img src="${item.image}" />
        <p>${item.name}</p>
      </li>`;
      return html;
    }, '<ul class="list">') + '</ul>';
  }
  else{
    return '<p>검색 결과가 없습니다</p>'
  }
}

export default SearchResultView;