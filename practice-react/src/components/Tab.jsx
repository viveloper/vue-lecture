import React from 'react';
import { TAB_NAME } from '../constants';

const Tab = props => {
  const { selectedTab, onClickTab } = props

  const onClick = e => {
    onClickTab(e.target.innerHTML)
  }

  console.log('Tab render()');
  return (
    <ul id="tabs" className="tabs">
      <li className={selectedTab === TAB_NAME[0] ? 'active' : null} onClick={onClick}>{TAB_NAME[0]}</li>
      <li className={selectedTab === TAB_NAME[1] ? 'active' : null} onClick={onClick}>{TAB_NAME[1]}</li>
    </ul>
  );
}

export default React.memo(Tab);