import View from './View.js';

class ResultView extends View {
    constructor(el) {
        super(el);
    }

    render(data = []) {
        this.el.innerHTML = data.length ? this.getSearchResultsHtml(data) : '검색 결과가 없습니다';
        this.show();
    }

    getSearchResultsHtml(data) {
        return data.reduce((html, item) => {
            html += this.getSearchItemHtml(item);
            return html;
        }, '<ul>') + '</ul>'
    }

    getSearchItemHtml(item) {
        return `<li>
          <img src="${item.image}" />
          <p>${item.name}</p>
        </li>`
    }
}

export default ResultView;