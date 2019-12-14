import View from './View.js';

class KeywordView extends View {
    constructor(el) {
        super(el);
        this.messages = {
            NO_KEYWORD: '추천 검색어가 없습니다'
        }
    }

    render(data = []) {
        this.el.innerHTML = data.length ? this.getKeywordsHtml(data) : this.messages.NO_KEYWORD;
        this.show();
        this.bindClickEvent();
    }

    getKeywordsHtml(data) {
        return data.reduce((html, item, index) => {
            html += `<li data-keyword="${item.keyword}"><span class="number">${index + 1}</span>${item.keyword}</li>`
            return html
        }, '<ul class="list">') + "</ul>"
    }

    bindClickEvent() {
        Array.from(this.el.querySelectorAll('li')).forEach(li => {
            li.addEventListener('click', e => { this.onClick(e) });
        });
    }

    onClick(e) {
        this.emit('@click', { keyword: e.target.dataset.keyword });
    }
}

export default KeywordView;