import React, { useState, useEffect } from 'react'

import Header from './components/Header'
import Main from './components/Main'
import SearchForm from './components/SearchForm'
import Content from './components/Content'
import Tab from './components/Tab'
import KeywordList from './components/KeywordList'
import SearchResult from './components/SearchResult'

import { tabs } from './constants'

import SearchModel from './models/SearchModel'
import RecommendKeywordModel from './models/KeywordModel'
import HistoryKeywordModel from './models/HistoryModel'

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [recommendKeywordList, setRecommendKeywordList] = useState([]);
  const [historyKeywordList, setHistoryKeywordList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecommendKeywordList();
  }, [])

  const submit = keyword => {
    setSubmitted(true);
    setQuery(keyword);
    fetchResult(keyword);
    addHistoryKeyword(keyword);
    fetchHistoryKeywordList();
  }

  const reset = () => {
    setSubmitted(false);
    setQuery('');
    setResult([]);
  }

  const changeTab = tab => {
    setSelectedTab(tab);
    if (tab === tabs[0]) {
      fetchRecommendKeywordList();
    }
    else {
      fetchHistoryKeywordList();
    }
  }

  const handleRemoveHistoryKeyword = keyword => {
    removeHistoryKeyword(keyword);
    fetchHistoryKeywordList();
  }

  const fetchResult = keyword => {
    setLoading(true);
    SearchModel.list(keyword).then(data => {
      setResult(data);
      setLoading(false);
    }).catch(err => console.log(err))
  }

  const fetchRecommendKeywordList = () => {
    RecommendKeywordModel.list().then(data => {
      setRecommendKeywordList(data);
    }).catch(err => console.log(err))
  }

  const fetchHistoryKeywordList = () => {
    HistoryKeywordModel.list().then(data => {
      setHistoryKeywordList(data);
    }).catch(err => console.log(err))
  }

  const addHistoryKeyword = keyword => {
    HistoryKeywordModel.add(keyword);
  }

  const removeHistoryKeyword = keyword => {
    HistoryKeywordModel.remove(keyword);
  }

  return (
    <>
      <Header />
      <Main>
        <SearchForm query={query} onSubmit={submit} onReset={reset} />
        <Content>
          {!submitted && <Tab selectedTab={selectedTab} onClick={changeTab} />}
          {!submitted && selectedTab === tabs[0] && <KeywordList type="recommend" list={recommendKeywordList} onClickList={submit} />}
          {!submitted && selectedTab === tabs[1] && <KeywordList type="history" list={historyKeywordList} onClickList={submit} onClickRemove={handleRemoveHistoryKeyword} />}
          {submitted && <SearchResult result={result} loading={loading} />}
        </Content>
      </Main>
    </>
  )
}

export default App
