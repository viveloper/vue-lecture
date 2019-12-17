import React from 'react';
import { tabs } from '../constants';


const Tab = props => {
  const { selectedTab, changeTab, submitted } = props;
  const onClick = tab => {
    changeTab(tab);
  }

  if(!submitted){
    return (    
      <ul id="tabs" className="tabs">
        {
          tabs.map(tab => <li key={tab} className={tab === selectedTab ? 'active' : null} onClick={()=>onClick(tab)}>{tab}</li>)
        }
      </ul>
    );
  }
  else{
    return null;
  }
}

export default Tab;