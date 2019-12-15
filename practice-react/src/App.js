import React, { useEffect, useState, useCallback } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Tab from './components/Tab';
import SearchKeyword from './components/SearchKeyword';
import SearchHistory from './components/SearchHistory';
import SearchResult from './components/SearchResult';

function App() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSearch = useCallback(query => {
    setSubmitted(true);
    setQuery(query);
  }, [])

  const onReset = useCallback(() => {
    setSubmitted(false);
    setQuery('');
  }, [])

  useEffect(() => {
    if (query.length === 0) {
      onReset();
    }    
  }, [query.length, onReset]);

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
                <Tab />
                <SearchKeyword onSearch={onSearch} />
                <SearchHistory />
              </>
              :
              <SearchResult query={query} />
          }
        </div>
      </div>
    </>
  );
}

export default App;
