const tag = '[View]';

const View = {
  init(el) {
    if (!el) throw el;
    this.el = el;
    return this;
  },
  on(eventType, handler) {
    this.el.addEventListener(eventType, handler);
    return this;
  },
  emit(eventType, data) {
    const event = new CustomEvent(eventType, { detail: data });
    this.el.dispatchEvent(event);
    return this;
  },
  hide() {
    this.el.style.display = 'none';
    return this;
  },
  show() {
    this.el.style.display = '';
    return this;
  }
}

export default View;