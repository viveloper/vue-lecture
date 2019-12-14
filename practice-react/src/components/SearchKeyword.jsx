import React, { useEffect, useState } from 'react';
import KeywordModel from '../models/KeywordModel';

const SearchKeyword = props => {
  const { onSearch } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    KeywordModel.list().then(data => {
      setData(data);
    })
  }, []);

  const onClick = index => {
    onSearch(data[index].keyword);    
  }

  return (
    <div id="search-keyword">
      {
        data.length > 0 &&
        <ul className="list">
          {
            data.map((item, index) => {
              return (
                <li key={item.keyword} onClick={() => onClick(index)}>
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

export default SearchKeyword;