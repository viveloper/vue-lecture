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

  return (
    <div id="search-result">
      {
        data.length > 0 &&
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
      }
    </div>
  );
}

export default SearchResult;