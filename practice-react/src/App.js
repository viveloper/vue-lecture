import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Tab from './components/Tab';
import SearchKeyword from './components/SearchKeyword';
import SearchHistory from './components/SearchHistory';
import SearchResult from './components/SearchResult';

function App() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSearch = query => {
    console.log(query);
    setSubmitted(true);
    setQuery(query);
  }

  const onReset = () => {
    setSubmitted(false);
    setQuery('');
  }

  return (
    <>
      <Header />
      <div className="container">
        <SearchForm onSearch={onSearch} onReset={onReset} />
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
