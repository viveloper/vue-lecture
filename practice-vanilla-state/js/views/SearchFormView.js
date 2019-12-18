import View from './View.js';

const tag = 'SearchFormView';


const SearchFormView = Object.create(View);

SearchFormView.setup = function (el) {
  this.init(el);
  this.inputEl = el.querySelector('[type=text]');
  this.resetEl = el.querySelector('[type=reset]');
  this.bindEvents();
  return this;
}

SearchFormView.bindEvents = function () {
  this.inputEl.addEventListener('keyup', () => this.onKeyup());
  this.el.addEventListener('submit', e => this.onSubmit(e))
  this.el.addEventListener('reset', e => this.onReset(e));
}

SearchFormView.showResetBtn = function (isShow) {
  if (isShow)
    this.resetEl.style.display = 'block';
  else
    this.resetEl.style.display = 'none';
}

SearchFormView.onKeyup = function () {
  this.emit('@keyup', { value: this.inputEl.value });
}

SearchFormView.onSubmit = function (e) {
  e.preventDefault();
  if (this.inputEl.value.length > 0) {
    this.emit('@submit', { input: this.inputEl.value })
  }
}

SearchFormView.onReset = function (e) {
  e.preventDefault();
  this.emit('@reset');
}

SearchFormView.render = function (props) {
  const { value } = props;
  this.inputEl.value = value;
  this.showResetBtn(this.inputEl.value.length > 0)
}

export default SearchFormView;