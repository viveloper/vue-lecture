import React from 'react';

const Header = () => {
  console.log('Header render()');
  return (
    <header>
      <h2 className="container">검색</h2>
    </header>
  );
}

export default React.memo(Header);