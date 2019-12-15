import React from 'react';

const SearchKeyword = props => {
  const { keywords, onSearch } = props;

  const onClick = index => {
    onSearch(keywords[index].keyword);
  }

  console.log('SearchKeyword render()');
  return (
    <div id="search-keyword">
      {
        keywords.length > 0 &&
        <ul className="list">
          {
            keywords.map((item, index) => {
              return (
                <li key={item.keyword} onClick={(e) => onClick(index)}>
                  <span className="number">{index + 1}</span>{item.keyword}
                </li>
              );
            })
          }
        </ul>
      }
    </div>
  );
}

export default React.memo(SearchKeyword);