import React from 'react';

const SearchHistory = () => {
  console.log('SearchHistory render()');
  return (
    <div id="search-history"></div>
  );
}

export default React.memo(SearchHistory);