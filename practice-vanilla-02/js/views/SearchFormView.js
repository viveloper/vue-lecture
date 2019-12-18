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

SearchFormView.onKeyup = function (e) {
  if (this.inputEl.value.length === 0) {
    this.showResetBtn(false);
    this.onReset();
  }
  else{
    this.showResetBtn(true);
  }  
}

SearchFormView.onSubmit = function (e) {
  e.preventDefault();
  if(this.inputEl.value.length>0){
    this.emit('@submit', { input: this.inputEl.value })
  }  
}

SearchFormView.onReset = function (e) {
  if(e) e.preventDefault();
  this.inputEl.value = '';
  this.showResetBtn(false);
  this.emit('@reset');
}

SearchFormView.setInputValue = function(value) {
  this.inputEl.value = value;
}

export default SearchFormView;