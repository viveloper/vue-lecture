import SearchFormComponent from './SearchForm.js';
import KeywordsComponent from './Keywords.js';
import TabsComponent from './Tabs.js';
import SearchResultComponent from './SearchResult.js';
import * as keywordsApi from './api/keywords.js';
import * as productsApi from './api/products.js';

window.addEventListener('DOMContentLoaded', () => new App());

class App {
  constructor() {
    this.SearchForm = new SearchFormComponent({
      onSubmit: this.search.bind(this),
      onKeywordChange: this.getKeywords.bind(this),
      onDeleteClick: this.handleSearchFormDeleteClick.bind(this),
    });
    this.Keywords = new KeywordsComponent({
      onKeyowrdClick: this.search.bind(this),
    });
    this.Tabs = new TabsComponent({
      onTabClick: this.changeTab.bind(this),
    });
    this.SearchResult = new SearchResultComponent();
  }
  async search(keyword) {
    this.SearchForm.setInputValue(keyword);
    productsApi.getProducts().then((products) => {
      this.SearchResult.setProducts(products);
    });
    keywordsApi.addRecentKeyword(keyword).then((newKeyword) => {
      this.Keywords.addRecentKeyword(newKeyword);
    });
  }
  async getKeywords(keyword) {
    if (keyword.length === 0) {
      this.clearKeywords();
      this.clearResult();
      return;
    }
    const keywords = await keywordsApi.getKeywords(keyword);
    if (this.SearchForm.state.value === '') return;
    this.Keywords.setKeywords(keywords);
  }
  handleSearchFormDeleteClick(e) {
    this.clearKeywords();
    this.clearResult();
  }
  clearKeywords() {
    this.Keywords.setKeywords([]);
  }
  clearResult() {
    this.SearchResult.setProducts([]);
  }
  changeTab(tabName) {
    this.Keywords.setCurrentTab(tabName);
  }
}
