import React from 'react';

const SearchResult = props => {
  const { searchResult, submitted } = props;

  console.log('SearchResult render()');
  return (
    <div id="search-result">
      {
        searchResult.length === 0 && submitted === false ?
          '검색 결과가 없습니다'
          :
          <ul>
            {
              searchResult.map((item, index) => {
                return (
                  <li key={item.id}>
                    <img src={item.image} alt={item.image} />
                    <p>{item.name}</p>
                  </li>
                )
              })
            }
          </ul>
      }
    </div>
  );
}

export default SearchResult;