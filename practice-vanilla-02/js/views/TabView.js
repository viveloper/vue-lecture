import View from './View.js';

const tag = '[TabView]';

const TabView = Object.create(View);

TabView.setup = function (el) {
  this.init(el);
  this.bindEvents();
  return this;
}

TabView.bindEvents = function () {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
    li.addEventListener('click', () => this.onClick(li.innerHTML));
  });
}

TabView.onClick = function (tabName) {
  this.emit('@click', { tabName });
}

TabView.render = function (tabName) {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
    li.className = li.innerHTML === tabName ? 'active' : null;
  });  
}

export default TabView;