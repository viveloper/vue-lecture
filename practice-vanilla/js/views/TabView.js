import View from './View.js';

class TabView extends View {
    constructor(el) {
        super(el);
        this.bindEvents();
    }

    bindEvents() {
        Array.from(this.el.children).forEach(li => {
            li.addEventListener('click', e => this.onClick(li.innerHTML))
        });
    }

    onClick(tabName) {
        this.emit('@click', { tabName })
    }

    setActiveTab(tabName) {
        this.show();
        this.el.querySelectorAll('li').forEach(li => {
            li.className = li.innerHTML === tabName ? 'active' : ''
        });
    }
}

export default TabView;