import KeywordView from './KeywordView.js';

class HistoryView extends KeywordView {
    constructor(el) {
        super(el);
        this.messages = {
            NO_KEYWORD: '검색 이력이 없습니다'
        }
    }

    getKeywordsHtml = function (data) {
        return data.reduce((html, item) => {
            html += `<li data-keyword="${item.keyword}">
            ${item.keyword} 
            <span class="date">${item.date}</span>
            <button class="btn-remove"></button>
            </li>`
            return html
        }, '<ul class="list">') + "</ul>"
    }

    bindRemoveBtnClickEvent() {
        Array.from(this.el.querySelectorAll('.btn-remove')).forEach(button => {
            button.addEventListener('click', (e) => { this.onClickRemoveBtn(e) })
        })
    }

    onClickRemoveBtn(e) {
        e.stopPropagation();
        this.emit('@remove', { keyword: e.target.parentElement.dataset.keyword })
    }
}

export default HistoryView;