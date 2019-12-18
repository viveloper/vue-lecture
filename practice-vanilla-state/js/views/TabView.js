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

TabView.setActiveTab = function (tabName) {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
    li.className = li.innerHTML === tabName ? 'active' : null;
  });
}

TabView.render = function (props) {
  const { selectedTab, submitted } = props;
  if (submitted) {
    this.hide();
  }
  else {
    this.show();
  }
  this.setActiveTab(selectedTab);
}

export default TabView;