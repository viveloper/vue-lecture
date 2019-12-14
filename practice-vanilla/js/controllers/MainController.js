import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';
import KeywordView from '../views/KeywordView.js';
import HistoryView from '../views/HistoryView.js';

import SearchModel from '../models/SearchModel.js';
import KeywordModel from '../models/KeywordModel.js';
import HistoryModel from '../models/HistoryModel.js';

class MainController {
  constructor() {
    this.formView = new FormView(document.querySelector('form'));
    this.resultView = new ResultView(document.querySelector('#search-result'));
    this.tabView = new TabView(document.querySelector('#tabs'));
    this.keywordView = new KeywordView(document.querySelector('#search-keyword'));
    this.historyView = new HistoryView(document.querySelector('#search-history'));
    this.selectedTab = '추천 검색어';

    this.init();
  }

  init() {
    this.formView.on('@submit', e => this.onSubmit(e.detail.query));
    this.formView.on('@reset', e => this.onReset(e));
    this.tabView.on('@click', e => this.onClickTab(e.detail.tabName));
    this.keywordView.on('@click', e => this.onClickKeyword(e.detail.keyword));
    this.historyView.on('@click', e => this.onClickKeyword(e.detail.keyword));
    this.historyView.on('@remove', e => this.onRemoveHistory(e.detail.keyword));

    this.renderView();
  }

  renderView() {
    this.resultView.hide();
    this.onClickTab(this.selectedTab);
  }

  onSubmit(query) {
    this.search(query);
  }

  onReset(e) {
    this.renderView();
  }

  onClickTab(tabName) {
    this.selectedTab = tabName;
    this.tabView.setActiveTab(tabName);
    if (tabName === '추천 검색어') {
      this.historyView.hide();
      this.fetchKeyword().then(data => {
        this.keywordView.render(data);
      });
    }
    else {
      this.keywordView.hide();
      this.fetchHistory().then(data => {
        this.historyView.render(data);
        this.historyView.bindRemoveBtnClickEvent();
      });
    }
  }

  onClickKeyword(keyword) {
    this.formView.setValue(keyword);
    this.search(keyword);
  }

  onRemoveHistory(keyword) {
    HistoryModel.remove(keyword);
    this.renderView();
  }

  search(query) {
    SearchModel.list(query).then(data => {
      this.onSearchResult(data);
    });
    HistoryModel.add(query);
  }

  onSearchResult(data) {
    this.tabView.hide();
    this.keywordView.hide();
    this.historyView.hide();
    this.resultView.render(data);
  }

  async fetchKeyword() {
    const data = await KeywordModel.list();
    return data;
  }

  async fetchHistory() {
    const data = await HistoryModel.list();
    return data;
  }
}

export default MainController;