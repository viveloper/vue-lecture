<template>
  <div>
    <header>
      <h2 class="container">검색</h2>
    </header>

    <div class="container">
      <search-form v-bind:value="query" v-on:@submit="onSubmit" v-on:@reset="onReset"></search-form>

      <div class="content">
        <div v-if="!submitted">
          <tab v-bind:tabs="tabs" v-bind:selected-tab="selectedTab" v-on:@click="onClickTab"></tab>
          <div v-if="selectedTab === tabs[0]" id="search-keyword">
            <list v-bind:list="keywords" type="keyword" v-on:@click="onClickKeyword"></list>
          </div>
          <div v-else id="search-history">
            <list v-bind:list="history" type="history" v-on:@click="onClickKeyword" v-on:@remove="onClickRemoveHistory"></list>
          </div>
        </div>
        <div v-else>
          <search-result v-bind:search-result="searchResult" v-bind:query="query"></search-result>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchModel from './models/SearchModel.js';
import KeywordModel from './models/KeywordModel.js';
import HistoryModel from './models/HistoryModel.js';

import FormComponent from './components/FormComponent';
import ResultComponent from './components/ResultComponent';
import ListComponent from './components/ListComponent';
import TabComponent from './components/TabComponent';

export default {
  name: 'app',
  data () {
    return {
      query: '',
      submitted: false,
      tabs: ['추천 검색어', '최근 검색어'],
      selectedTab: '',
      keywords: [],
      history: [],
      searchResult: [],
    }
  },
  components: {
    'search-form': FormComponent,
    'search-result': ResultComponent,
    'tab': TabComponent,
    'list': ListComponent,
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
      if(this.query.length>0){
        SearchModel.list(this.query).then(data => {
          this.submitted = true;
          this.searchResult = data;
        });
        HistoryModel.add(this.query);
        this.fetchHistory();
      }      
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
}
</script>

<style>

</style>
