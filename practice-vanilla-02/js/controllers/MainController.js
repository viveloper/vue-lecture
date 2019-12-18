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

    this.tabs = ['추천 검색어', '최근 검색어'];
    this.selectedTab = '추천 검색어';
    this.submitted = false;

    this.renderView();
  },
  renderView() {
    if(this.submitted) {
      SearchResultView.show();
      TabView.hide();
      SearchKeywordView.hide();
      SearchHistoryView.hide();
    }
    else {      
      TabView.render(this.selectedTab);
      TabView.show();
      if (this.selectedTab === this.tabs[0]) {
        this.fetchKeywords();
        SearchKeywordView.show();
        SearchHistoryView.hide();
      }
      else {
        this.fetchHistory();
        SearchHistoryView.show();
        SearchKeywordView.hide();
      }
    }    
  },
  search(query) {
    SearchModel.list(query).then(data => {
      SearchResultView.render(data);
    });
    HistoryModel.add(query);
    SearchFormView.inputEl.value = query;
    SearchFormView.showResetBtn(true);
    this.submitted = true;
    this.renderView();
  },
  reset() {
    SearchResultView.render([]);
    this.submitted = false;
    this.renderView();
  },
  changeTab(tabName) {
    this.selectedTab = tabName;        
    this.renderView();
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