import View from './View.js';

const tag = 'SearchFormView';


const SearchFormView = Object.create(View);

SearchFormView.setup = function (el) {
  this.init(el);
  this.inputEl = el.querySelector('[type=text]');
  this.resetEl = el.querySelector('[type=reset]');
  this.bindEvents();
  this.showResetBtn(false);
  return this;
}

SearchFormView.bindEvents = function () {
  this.inputEl.addEventListener('keyup', () => this.onKeyup());
  this.el.addEventListener('submit', e => this.onSubmit(e))
  this.el.addEventListener('reset', e => this.onReset(e));
}

SearchFormView.onKeyup = function (e) {
  this.render();
  if (this.inputEl.value.length === 0) this.onReset();  
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
  this.render();
  this.emit('@reset');
}

SearchFormView.showResetBtn = function (isShow) {
  if (isShow)
    this.resetEl.style.display = 'block';
  else
    this.resetEl.style.display = 'none';
}

SearchFormView.render = function (){
  if (this.inputEl.value.length === 0) {
    this.showResetBtn(false);
  }
  else{
    this.showResetBtn(true);
  }
}

export default SearchFormView;