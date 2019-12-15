import React from 'react';

const SearchHistory = props => {
  const { history, onSearch, onRemoveHistory } = props;

  const onClickHistory = index => {
    onSearch(history[index].keyword);
  }

  const onClickRemoveBtn = (e, index) => {
    e.stopPropagation();
    onRemoveHistory(history[index].keyword);
  }

  console.log('SearchHistory render()');
  return (
    <div id="search-history">
      {
        history.length > 0 &&
        <ul className="list">
          {
            history.map((item, index) => {
              return (
                <li key={item.keyword} onClick={(e) => onClickHistory(index)}>
                  {item.keyword}
                  <span className="date">{item.date}</span>
                  <button className="btn-remove" onClick={(e) => onClickRemoveBtn(e, index)}></button>
                </li>
              );
            })
          }
        </ul>
      }
    </div>
  );
}

export default React.memo(SearchHistory);