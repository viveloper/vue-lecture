import SearchModel from './models/SearchModel.js';
import KeywordModel from './models/KeywordModel.js';
import HistoryModel from './models/HistoryModel.js';

import FormComponent from './components/FormComponent.js';
import ResultComponent from './components/ResultComponent.js';
import ListComponent from './components/ListComponent.js';
import TabComponent from './components/TabComponent.js';

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
  components: {
    'search-form': FormComponent,
    'search-result': ResultComponent,
    'list': ListComponent,
    'tab': TabComponent,
  },
  created() {
    this.selectedTab = this.tabs[0];
    this.fetchKeyword();
    this.fetchHistory();
  },
  methods: {
    onSubmit(query) {
      this.query = query;
      this.search();
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
    onReset() {
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