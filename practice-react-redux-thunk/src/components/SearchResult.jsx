import React from 'react';

const SearchResult = props => {
  const { result } = props;
  
  return (
    <div>
      {
        result.length > 0 ?
        <ul>
          {
            result.map((item, index) => {
              return (
                <li key={item.id}>
                  <img src={item.image} alt={item.image} />
                  {item.name}
                </li>
              )
            })
          }
        </ul>
        :
        <p>검색 결과가 없습니다</p>
      }
    </div>
  );
}

export default SearchResult;