import React, { useState } from 'react';
import { tabName } from '../constants';

const Tab = () => {
  const [selectedTab, setSelectedTab] = useState(tabName[0]);

  const onClick = e => {
    if (e.target.innerHTML === tabName[0]) {
      setSelectedTab(tabName[0]);
    }
    else {
      setSelectedTab(tabName[1]);
    }
  }

  return (
    <ul id="tabs" className="tabs">
      <li className={selectedTab === tabName[0] ? 'active' : null} onClick={onClick}>{tabName[0]}</li>
      <li className={selectedTab === tabName[1] ? 'active' : null} onClick={onClick}>{tabName[1]}</li>
    </ul>
  );
}

export default Tab;