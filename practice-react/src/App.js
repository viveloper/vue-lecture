import React, { useEffect, useState, useCallback } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Tab from './components/Tab';
import SearchKeyword from './components/SearchKeyword';
import SearchHistory from './components/SearchHistory';
import SearchResult from './components/SearchResult';

import SearchModel from './models/SearchModel';
import KeywordModel from './models/KeywordModel';
import HistoryModel from './models/HistoryModel';

import { TAB_NAME } from './constants';

function App() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedTab, setSelectedTab] = useState(TAB_NAME[0]);
  const [keywords, setKeywords] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchKeyword = () => {
    KeywordModel.list().then(data => {
      setKeywords(data);
    })
  }

  const fetchHistory = () => {
    HistoryModel.list().then(data => {
      setHistory(data);
    })
  }

  const addHistory = useCallback(keyword => {
    HistoryModel.add(keyword);
    fetchHistory();
  }, [])

  const removeHistory = useCallback(keyword => {
    HistoryModel.remove(keyword);
    fetchHistory();
  }, [])

  const onSearch = useCallback(query => {
    setSubmitted(true);
    setQuery(query);
    if (query) {
      SearchModel.list(query).then(data => {
        setSearchResult(data);
      });
    }
    addHistory(query);
  }, [addHistory])

  const onReset = useCallback(() => {
    setSubmitted(false);
    setQuery('');
  }, [])

  const onClickTab = useCallback(tabName => {
    setSelectedTab(tabName);
  }, [])



  const onRemoveHistory = useCallback(keyword => {
    removeHistory(keyword);
  }, [removeHistory])

  useEffect(() => {
    if (query.length === 0) {
      onReset();
    }
  }, [query.length, onReset]);

  useEffect(() => {
    if (selectedTab === TAB_NAME[0]) {
      fetchKeyword();
    }
    else {
      fetchHistory();
    }

  }, [selectedTab])

  console.log('App render()');
  return (
    <>
      <Header />
      <div className="container">
        <SearchForm query={query} setQuery={setQuery} onSearch={onSearch} onReset={onReset} />
        <div className="content">
          {
            submitted === false ?
              <>
                <Tab selectedTab={selectedTab} onClickTab={onClickTab} />
                {
                  selectedTab === TAB_NAME[0] ?
                    <SearchKeyword keywords={keywords} onSearch={onSearch} />
                    :
                    <SearchHistory history={history} onSearch={onSearch} onRemoveHistory={onRemoveHistory} />
                }
              </>
              :
              <SearchResult searchResult={searchResult} submitted={submitted} />
          }
        </div>
      </div>
    </>
  );
}

export default App;
