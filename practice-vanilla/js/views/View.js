class View {
    constructor(el) {
        this.el = el;
    }

    on = function (type, handler) {
        this.el.addEventListener(type, handler);
    }

    emit = function (type, data) {
        const evt = new CustomEvent(type, { detail: data });
        this.el.dispatchEvent(evt);
    }

    hide() {
        this.el.style.display = 'none';
    }

    show() {
        this.el.style.display = '';
    }
}

export default View;