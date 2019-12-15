import React from 'react';

const SearchForm = props => {
  const { onSearch, onReset, query, setQuery } = props;  

  // useEffect(() => {
  //   if (query.length === 0) {
  //     onReset();
  //   }    
  // }, [query.length, onReset]);

  const onChange = (e) => {
    setQuery(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  }

  const onClick = (e) => {
    onReset();
    // setQuery('');
  }

  console.log('SearchForm render()');
  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="검색어를 입력하세요" autoFocus value={query} onChange={onChange} />
      {(query.length > 0) && <button type="reset" className="btn-reset" onClick={onClick}></button>}
    </form>
  );
}

export default SearchForm;