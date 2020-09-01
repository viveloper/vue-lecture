import Component from './Component.js';
import { getRecentKeywords, removeRecentKeyword } from './api/keywords.js';

class Keywords extends Component {
  constructor(props) {
    super(props);
    this.el = document.getElementById('search-list');
    this.state = {
      keywords: [],
      recentKeywords: [],
      currentTab: 'keywords',
    };
    this.bindEvents();
    this.render();
    this.componentDidMount();
  }
  bindEvents() {
    this.onClick = this.onClick.bind(this);
    this.el.addEventListener('click', this.onClick);
  }
  async componentDidMount() {
    const recentKeywords = await getRecentKeywords();
    this.setState({
      recentKeywords,
    });
    this.render();
  }
  async onClick(e) {
    const keyword =
      e.target.tagName.toLowerCase() === 'li'
        ? e.target.dataset.name
        : e.target.parentElement.dataset.name;
    if (e.target.className === 'btn-delete') {
      await removeRecentKeyword(keyword);
      this.setState({
        recentKeywords: this.state.recentKeywords.filter(
          (item) => item.name !== keyword
        ),
      });
    } else {
      this.props.onKeyowrdClick(keyword);
    }
  }
  setKeywords(keywords) {
    this.setState({ keywords });
  }
  addRecentKeyword(keyword) {
    const newRecentKeywords = this.state.recentKeywords.filter(
      (item) => item.name !== keyword.name
    );
    newRecentKeywords.unshift(keyword);
    this.setState({
      recentKeywords: newRecentKeywords,
    });
  }
  setCurrentTab(tabName) {
    this.setState({ currentTab: tabName });
  }
  render() {
    let keywordListTemplate;
    if (this.state.currentTab === 'keywords') {
      keywordListTemplate = this.state.keywords
        .map(
          (keyword) => `
          <li class="search-item" data-name="${keyword}">
            <span class="search-term">${keyword}</span>
          </li>`
        )
        .join('');
    } else {
      keywordListTemplate = this.state.recentKeywords
        .map(
          (item) => `
          <li class="search-item" data-name="${item.name}">
            <span class="search-term">${item.name}</span><span class="date">${item.date}</span><span class="btn-delete">X</span>
          </li>`
        )
        .join('');
    }
    this.el.innerHTML = keywordListTemplate;
  }
}

export default Keywords;
