import React, { useEffect } from 'react';
import SearchList from '../components/SearchList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKeyword, fetchHistory } from '../actions';

const SearchListContainer = props => {
  const { type, search, onClickHistoryRemove } = props;
  const dispatch = useDispatch();
  const { keywords, history, submitted, loading } = useSelector(state => ({
    keywords: state.keywords,
    history: state.history,
    submitted: state.submitted,    
    loading: state.loading
  }));

  useEffect(() => {
    dispatch(fetchKeyword());
    dispatch(fetchHistory());
  }, [dispatch]);  

  if (type === 'keyword') {
    return (
      <>
        <SearchList type="keyword" list={keywords} submitted={submitted} loading={loading} search={search} />
      </>
    );
  }
  else {
    return <SearchList type="history" list={history} submitted={submitted} loading={loading} search={search} onClickHistoryRemove={onClickHistoryRemove} />
  }

}

export default SearchListContainer;