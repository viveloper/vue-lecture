import React from 'react';
import SearchResult from '../components/SearchResult';
import { useSelector } from 'react-redux';

const SearchResultContainer = () => {
  const { result, submitted, loading } = useSelector(state => {
    return {
      result: state.result,
      submitted: state.submitted,
      loading: state.loading,
    };
  }, []);

  return (
    <>
      {
        submitted && (
          loading ? <div>Loading...</div> : <SearchResult result={result} />
        )
      }
    </>
  );
}

export default SearchResultContainer;