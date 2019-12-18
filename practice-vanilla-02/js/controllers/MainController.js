import SearchFormView from '../views/SearchFormView.js';
import SearchResultView from '../views/SearchResultView.js';
import TabView from '../views/TabView.js';
import SearchKeywordView from '../views/SearchKeywordView.js';
import SearchHistoryView from '../views/SearchHistoryView.js';

import SearchModel from '../models/SearchModel.js';
import KeywordModel from '../models/KeywordModel.js';
import HistoryModel from '../models/HistoryModel.js';


const tag = '[MainController]';

const MainController = {
  init() {
    SearchFormView.setup(document.querySelector('form'))
      .on('@submit', e => this.search(e.detail.input))
      .on('@reset', () => this.reset());

    SearchResultView.setup(document.querySelector('#search-result'));

    TabView.setup(document.querySelector('#tabs'))
      .on('@click', e => this.changeTab(e.detail.tabName));

    SearchKeywordView.setup(document.querySelector('#search-keyword'))
      .on('@onClickList', e => this.onClickList(e.detail.keyword));

    SearchHistoryView.setup(document.querySelector('#search-history'))
      .on('@onClickList', e => this.onClickList(e.detail.keyword))
      .on('@onClickRemoveHistory', e => this.onClickRemoveHistory(e.detail.keyword));

    this.selectedTab = '추천 검색어';

    this.renderInitView();
  },

  renderInitView() {
    TabView.setActiveTab(this.selectedTab);
    this.fetchKeywords();
    SearchHistoryView.hide();
  },

  search(query) {
    SearchFormView.setInputValue(query);
    SearchFormView.showResetBtn(true);
    SearchModel.list(query).then(data => {
      SearchResultView.render(data);
      SearchResultView.show();
      TabView.hide();
      SearchKeywordView.hide();
      SearchHistoryView.hide();
    });
    HistoryModel.add(query);
    this.fetchHistory();
  },
  reset() {
    SearchResultView.render([]);
    SearchResultView.hide();
    TabView.show();
    if (this.selectedTab === '추천 검색어') {
      SearchKeywordView.show();
    }
    else {
      SearchHistoryView.show();
    }
  },
  changeTab(tabName) {
    this.selectedTab = tabName;
    if (tabName === '추천 검색어') {
      this.fetchKeywords();
      SearchKeywordView.show();
      SearchHistoryView.hide();
    }
    else {
      this.fetchHistory();
      SearchKeywordView.hide();
      SearchHistoryView.show();
    }
  },
  fetchKeywords() {
    KeywordModel.list().then(data => {
      SearchKeywordView.render(data);
    })
  },
  fetchHistory() {
    HistoryModel.list().then(data => {
      SearchHistoryView.render(data);
    })
  },
  onClickList(keyword) {
    this.search(keyword);
  },
  onClickRemoveHistory(keyword) {
    HistoryModel.remove(keyword);
    this.fetchHistory();
  }
}

export default MainController;