<template>
  <div id="app">
    <header>
      <h2 class="container">검색</h2>
    </header>    
    <div class="container">      
      <search-form v-bind:query="query" v-on:@onKeyup="onKeyup" v-on:@onReset="onReset" v-on:@onSubmit="search" />      
      <div class="content">
        <keyword-tab v-show="!submitted" v-bind:tabs="tabs" v-bind:selectedTab="selectedTab" v-on:@onClick="changeTab" />
        <keyword-list 
          v-show="!submitted && selectedTab===tabs[0]" 
          type="recommend" 
          v-bind:keyword-list="recommendKeywordList"
          v-on:@onClickList="onClickList"
        />
        <keyword-list 
          v-show="!submitted && selectedTab===tabs[1]" 
          type="recent" 
          v-bind:keyword-list="recentKeywordList" 
          v-on:@onClickList="onClickList"
          v-on:@onClickRemoveBtn="removeRecentKeyword"
        />
        <search-result v-show="submitted" v-bind:search-result="searchResult" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';
import KeywordTab from './components/KeywordTab';
import KeywordList from './components/KeywordList';

import SearchModel from './models/SearchModel';
import KeywordModel from './models/KeywordModel';
import HistoryModel from './models/HistoryModel';

export default {
  name: 'app',
  data () {
    return {
      query: '',
      searchResult: [],
      submitted: false,
      tabs: ['추천 검색어', '최근 검색어'],
      selectedTab: '추천 검색어',
      recommendKeywordList: [],
      recentKeywordList: [],
    }
  },
  created() {    
    this.fetchRecommendKeywordList();
    this.fetchRecentKeywordList();
  },
  components: {
    'search-form': SearchForm,
    'search-result': SearchResult,
    'keyword-tab': KeywordTab,
    'keyword-list': KeywordList,
  },
  methods: {
    onKeyup(query) {
      this.query = query;
    },
    onReset() {      
      this.query = '';
      this.submitted = false;
    },   
    search() {     
      if(this.query.length > 0) {
        SearchModel.list(this.query).then(data => {
          this.searchResult = data;
          this.submitted = true;
        });
        this.addKeywordToHistory(this.query);
      }
    },
    changeTab(tab) {
      this.selectedTab = tab;
    },
    onClickList(keyword) {
      this.query = keyword;
      this.search();
    },
    addKeywordToHistory(keyword){
      HistoryModel.add(keyword);
      this.fetchRecentKeywordList();
    },
    removeRecentKeyword(keyword){
      HistoryModel.remove(keyword);
      this.fetchRecentKeywordList();
    },
    fetchRecentKeywordList(){
      HistoryModel.list().then(data => {
        this.recentKeywordList = data;
      });
    },
    fetchRecommendKeywordList(){
      KeywordModel.list().then(data => {
        this.recommendKeywordList = data;
      });
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
