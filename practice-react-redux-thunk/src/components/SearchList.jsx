import React from 'react';

const SearchList = props => {
  const { type, list, submitted, loading, search, onClickHistoryRemove } = props;
  const onClickList = keyword => {
    search(keyword);
  }
  const onClickRemove = (e, keyword) => {
    e.stopPropagation();
    onClickHistoryRemove(keyword);
  }

  return (
    <div>
      {!submitted && (
        !loading ? (
          list.length ? (
            <ul className="list">
              {list.map((item, index) => (
                <li key={item.keyword} onClick={(e)=>onClickList(item.keyword)}>
                  {type === 'keyword' && <span className="number">{index + 1}</span>}
                  {item.keyword}
                  {type === 'history' && <span className="date">{item.date}</span>}
                  {type === 'history' && <button className="btn-remove" onClick={(e)=>onClickRemove(e, item.keyword)}></button>}
                </li>
              ))}
            </ul>
          ) : (<p>추천 검색어가 없습니다</p>)
        ) : (<div>Loading...</div>)
      )}
    </div>
  );
}

export default SearchList;