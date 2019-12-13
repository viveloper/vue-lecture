const FormView = function (el) {
  this.el = el;
  this.inputEl = el.querySelector('[type=text]');
  this.resetEl = el.querySelector('[type=reset]');
  this.bindEvents();
  this.showResetBtn(false);
}

FormView.prototype.showResetBtn = function (show) {
  this.resetEl.style.display = show ? 'block' : 'none';
}

FormView.prototype.bindEvents = function () {
  this.inputEl.addEventListener('keyup', (e) => { this.onKeyup(e) });
  this.el.addEventListener('submit', (e) => { this.onSubmit(e) });
  this.el.addEventListener('reset', (e) => { this.onReset(e) });
}

FormView.prototype.onKeyup = function (e) {
  this.showResetBtn(this.inputEl.value.length);
}

FormView.prototype.onSubmit = function (e) {
  e.preventDefault();
}

FormView.prototype.onReset = function (e) {
  this.inputEl.value = '';
  this.showResetBtn(false);
}

const formView = new FormView(document.querySelector('form'));