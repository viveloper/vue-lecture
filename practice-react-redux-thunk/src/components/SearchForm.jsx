import React, { useState, useEffect } from 'react';

const SearchForm = props => {
  const {query, search, reset} = props;
  const [value, setValue] = useState('');

  useEffect(()=>{
    setValue(query);
  }, [query]);

  const onChange = e => {
    setValue(e.target.value);
    if (!e.target.value.length) {
      reset();
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    search(value);
  }

  const onReset = e => {
    e.preventDefault();
    reset();
  }
  
  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      <input type="text" placeholder="검색어를 입력하세요" autoFocus value={value} onChange={onChange} />
      {value.length > 0 && <button type="reset" className="btn-reset"></button>}
    </form>
  );
}

export default SearchForm;