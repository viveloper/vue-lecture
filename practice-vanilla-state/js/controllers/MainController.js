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
      .on('@keyup', e => this.onKeyup(e.detail.value))
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

    this.state = {
      query: '',
      selectedTab: '추천 검색어',
      searchResult: [],
      recommendationKeywords: [],
      historyKeywords: [],
      submitted: false
    }

    this.fetchInitData().then(() => {
      this.renderViews();
    });
  },

  async fetchInitData() {
    this.state.recommendationKeywords = await KeywordModel.list();
    this.state.historyKeywords = await HistoryModel.list();
  },

  renderViews() {
    SearchFormView.render({
      value: this.state.query
    });

    TabView.render({
      selectedTab: this.state.selectedTab,
      submitted: this.state.submitted
    });

    SearchKeywordView.render({
      list: this.state.recommendationKeywords,
      selectedTab: this.state.selectedTab,
      submitted: this.state.submitted
    });

    SearchHistoryView.render({
      list: this.state.historyKeywords,
      selectedTab: this.state.selectedTab,
      submitted: this.state.submitted
    });

    SearchResultView.render({
      result: this.state.searchResult,
      submitted: this.state.submitted
    });
  },

  onKeyup(value) {
    this.state.query = value;
    this.renderViews();
    if (this.state.query.length === 0) {
      this.reset();
    }
  },

  search(query) {
    this.state.query = query;
    this.renderViews();
    SearchModel.list(query).then(data => {
      this.state.searchResult = data;
      this.state.submitted = true;
      this.renderViews();
    });
    HistoryModel.add(query);
    HistoryModel.list().then(data => {
      this.state.historyKeywords = data;
      this.renderViews();
    });
  },

  reset() {
    this.state.query = '';
    this.state.submitted = false;
    this.renderViews();
  },

  changeTab(tabName) {
    this.state.selectedTab = tabName;
    this.renderViews();
  },

  onClickList(keyword) {
    this.search(keyword);
  },

  onClickRemoveHistory(keyword) {
    HistoryModel.remove(keyword);
    HistoryModel.list().then(data => {
      this.state.historyKeywords = data;
      this.renderViews();
    });
  }
}

export default MainController;