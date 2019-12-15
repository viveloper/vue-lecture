import React, { useEffect, useState } from 'react';
import SearchModel from '../models/SearchModel';

const SearchResult = props => {
  const { query } = props;

  const [data, setData] = useState([]);

  useEffect(() => {        
    if (query) {            
      SearchModel.list(query).then(data => {                
        setData(data);        
      });
    }        
  }, [query]);

  console.log('SearchResult render()');
  return (
    <div id="search-result">
      {
        data.length > 0 ?
        <ul>
          {
            data.map((item, index) => {
              return (
                <li key={item.id}>
                  <img src={item.image} alt={item.image} />
                  <p>{item.name}</p>
                </li>
              )
            })
          }
        </ul>
        :
        '검색 결과가 없습니다'
      }      
    </div>
  );
}

export default SearchResult;