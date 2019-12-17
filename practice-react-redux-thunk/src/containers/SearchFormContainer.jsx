import React from 'react';
import { useSelector } from 'react-redux';
import SearchForm from '../components/SearchForm';

const SearchFormContainer = props => {
  const { search, reset } = props;
  const query = useSelector(state => state.query, []);

  return <SearchForm query={query} search={search} reset={reset} />
}

export default SearchFormContainer;