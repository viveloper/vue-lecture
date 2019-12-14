import React, { useState, useEffect } from 'react';

const SearchForm = props => {
  const { onSearch, onReset } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    if (value.length === 0) {
      onReset();
    }
  });

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  }

  const onClick = (e) => {
    setValue('');
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="검색어를 입력하세요" autoFocus value={value} onChange={onChange} />
      {(value.length > 0) && <button type="reset" className="btn-reset" onClick={onClick}></button>}
    </form>
  );
}

export default SearchForm;