import SearchModel from './models/SearchModel.js';
import KeywordModel from './models/KeywordModel.js';
import HistoryModel from './models/HistoryModel.js';

new Vue({
  el: '#app',
  data: {
    query: '',
    submitted: false,
    tabs: ['추천 검색어', '최근 검색어'],
    selectedTab: '',
    keywords: [],
    history: [],
    searchResult: [],
  },
  created() {
    this.selectedTab = this.tabs[0];
    this.fetchKeyword();
    this.fetchHistory();
  },
  methods: {
    onSubmit(e) {
      this.search();
    },
    onKeyup(e) {
      if (this.query.length === 0) {
        this.onReset();
      }
    },
    search() {
      SearchModel.list(this.query).then(data => {
        this.submitted = true;
        this.searchResult = data;
      });
      HistoryModel.add(this.query);
      this.fetchHistory();
    },
    onClickTab(tab) {
      this.selectedTab = tab;
      if (this.selectedTab === this.tabs[0]) {
        this.fetchKeyword();
      }
      else {
        this.fetchHistory();
      }
    },
    onClickKeyword(keyword) {
      this.query = keyword;
      this.search();
    },
    onClickRemoveHistory(keyword) {
      HistoryModel.remove(keyword);
      this.fetchHistory();
    },
    onReset(e) {
      this.query = '';
      this.submitted = false;
      this.searchResult = [];
    },
    fetchKeyword() {
      KeywordModel.list().then(data => {
        this.keywords = data;
      })
    },
    fetchHistory() {
      HistoryModel.list().then(data => {
        this.history = data;
      })
    }
  }
})