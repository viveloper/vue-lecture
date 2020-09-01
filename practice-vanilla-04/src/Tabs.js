import Component from './Component.js';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.el = document.querySelector('.search-list-tab');
    this.keywordsTabEl = document.getElementById('recommend-tab');
    this.recentTabEl = document.getElementById('recent-tab');
    this.state = {
      tabName: 'keywords',
    };
    this.bindEvents();
    this.render();
    this.componentDidMount();
  }
  bindEvents() {
    this.onTabClick = this.onTabClick.bind(this);
    this.el.addEventListener('click', this.onTabClick);
  }
  onTabClick(e) {
    this.setState({
      tabName: e.target.dataset.name,
    });
    this.props.onTabClick(e.target.dataset.name);
  }
  render() {
    if (this.state.tabName === 'keywords') {
      this.recentTabEl.classList.remove('active');
      this.keywordsTabEl.classList.add('active');
    } else {
      this.keywordsTabEl.classList.remove('active');
      this.recentTabEl.classList.add('active');
    }
  }
}

export default Tabs;
