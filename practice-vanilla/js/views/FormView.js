import View from './View.js';

const FormView = function (el) {
  this.el = el;
  this.inputEl = el.querySelector('[type=text]');
  this.resetEl = el.querySelector('[type=reset]');
  this.bindEvents();
  this.showResetBtn(false);
}

FormView.prototype = new View();

FormView.prototype.showResetBtn = function (show) {
  this.resetEl.style.display = show ? 'block' : 'none';
}

FormView.prototype.bindEvents = function () {
  this.inputEl.addEventListener('keyup', (e) => { this.onKeyup(e) });
  this.on('submit', (e) => { this.onSubmit(e) });
  this.on('reset', (e) => { this.onReset(e) });
}

FormView.prototype.onKeyup = function (e) {
  this.showResetBtn(this.inputEl.value.length);
  if (!this.inputEl.value.length) {
    this.emit('@reset');
  }
}

FormView.prototype.setValue = function (value) {
  this.inputEl.value = value;
  this.showResetBtn(value.length);
}

FormView.prototype.onSubmit = function (e) {
  e.preventDefault();
  this.emit('@submit', { query: this.inputEl.value });
}

FormView.prototype.onReset = function (e) {
  this.inputEl.value = '';
  this.showResetBtn(false);
  this.emit('@reset');
}

export default FormView;