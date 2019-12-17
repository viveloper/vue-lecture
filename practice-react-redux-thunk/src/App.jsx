import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SearchFormContainer from './containers/SearchFormContainer';
import SearchResultContainer from './containers/SearchResultContainer';
import TabContainer from './containers/TabContainer';
import SearchListContainer from './containers/SearchListContainer';
import { tabs } from './constants';
import { setQuery, fetchResult, setSubmitted, setResult, addHistory, removeHistory } from './actions';

function App() {
  const { selectedTab } = useSelector(state => ({
    selectedTab: state.selectedTab
  }));
  const dispatch = useDispatch();

  const search = keyword => {
    dispatch(setQuery(keyword));
    dispatch(fetchResult(keyword));
    dispatch(setSubmitted(true));
    dispatch(addHistory(keyword));
  }

  const reset = () => {
    dispatch(setQuery(''));
    dispatch(setResult([]));
    dispatch(setSubmitted(false));
  }

  const onClickHistoryRemove = keyword => {
    dispatch(removeHistory(keyword));
  }

  return (
    <>
      <header>
        <h2 className="container">검색</h2>
      </header>

      <div className="container">
        <SearchFormContainer search={search} reset={reset} />

        <div className="content">
          <TabContainer />
          {
            selectedTab === tabs[0] ?
              <SearchListContainer type="keyword" search={search} />
              :
              <SearchListContainer type="history" search={search} onClickHistoryRemove={onClickHistoryRemove} />
          }
          <SearchResultContainer />
        </div>
      </div>
    </>
  );
}

export default App;
