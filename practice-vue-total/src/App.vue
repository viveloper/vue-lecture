<template>
  <div>
    <header>
      <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <search-form v-bind:query="query" v-on:@submit="onSubmit" v-on:@reset="onReset" />

      <div class="content">
        <div v-if="!submitted"> 
          <tab v-bind:tabs="tabs" v-bind:selected-tab="selectedTab" v-on:@click="onClickTab" />
          <div v-if="selectedTab===tabs[0]">
            <search-list type="keyword" v-bind:search-list="keywords" v-on:@onClickList="onClickList" />
          </div>
          <div v-else>
            <search-list type="history" v-bind:search-list="history" v-on:@onClickList="onClickList" v-on:@onClickHistoryRemove="onClickHistoryRemove" />
          </div>                    
        </div>
        <div v-else>
          <search-result v-bind:search-result="searchResult" v-bind:query="query" />
        </div>                
      </div>
    </div>
  </div>
</template>

<script>
import SearchModel from './models/SearchModel';
import KeywordModel from './models/KeywordModel';
import HistoryModel from './models/HistoryModel';

import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';
import Tab from './components/Tab';
import SearchList from './components/SearchList';

export default {
  name: 'app',
  data () {
    return {
      query: '',
      submitted: false,
      searchResult: [],
      tabs: ['추천 검색어', '최근 검색어'],
      selectedTab: '',
      keywords: [],
      history: [],
    }
  },
  created() {
    this.selectedTab = this.tabs[0];
    this.fetchKeywords();
    this.fetchHistory();
  },
  components: {
    'search-form': SearchForm,
    'search-result': SearchResult,
    'tab': Tab,
    'search-list': SearchList,
  },
  methods: {
    fetchKeywords() {
      KeywordModel.list().then(data =>{
        this.keywords = data;
      })
    },
    fetchHistory() {
      HistoryModel.list().then(data => {
        this.history = data;
      })
    },
    onSubmit(query) {
      this.query = query;      
      this.search();
    },
    onReset() {
      this.query = '';
      this.submitted = false;
      this.searchResult = [];
    },
    search() {
      this.submitted = true;
      SearchModel.list(this.query).then(data => {
        this.searchResult = data;
      })
      HistoryModel.add(this.query);
      this.fetchHistory();
    },
    onClickTab(tab){
      this.selectedTab = tab;
    },
    onClickList(keyword) {
      this.query = keyword;
      this.search();
    },
    onClickHistoryRemove(keyword) {
      HistoryModel.remove(keyword);
      this.fetchHistory();
    }
  }
}
</script>

<style>
body, ul {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
img {
  width: 100%;
}

.container {
  margin: 0 15px 0 15px;
}
header {
  border-bottom: 1px #ccc solid;
  padding: 15px 0  15px 0;
  text-align: center;
}
input[type=text] {
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 15px 0 15px 0;
  padding: 10px 15px;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid #cccccc;
 
}
.content {
  border: 1px solid #ccc;
}
ul.tabs {
  display: flex;
}
.tabs li {
  display: inline-block;
  width: 50%;
  padding: 15px;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc; 
  background-color: #eee;
  color: #999;
}
.tabs li.active {
  background-color: #2ac1bc;
  color: #fff;
}
.list li {
  box-sizing: border-box;
  display: block;
  padding: 15px;
  border-bottom: 1px solid #ccc; 
  position: relative;
}
.list li:last-child {
  border-bottom: none;
}
.list li .number{
  margin-right: 15px;
  color: #ccc;
}
.list li .date{
  position: absolute;
  right: 50px;
  top: 15px;
  margin-right: 15px;
  color: #ccc;
}
.list li .btn-remove{
  position: absolute;
  right: 0px;
  top: 15px;
  margin-right: 15px;
}

form {
  position: relative;
}
.btn-reset,
.btn-remove {
  border-radius: 50%;
  background-color: #ccc;
  color: white;
  border: none;
  padding: 2px 5px;
}
.btn-reset {
  position: absolute;
  top: 12px;
  right: 10px;
}
.btn-reset::before, 
.btn-remove::before {
  content: 'X'
}

#search-result li {
  display: flex;
  margin-bottom: 15px;
}
#search-result img {
  width: 30%;
  height: 30%;
}
</style>
