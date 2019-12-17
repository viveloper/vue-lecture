import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tab from '../components/Tab';
import { setSelctedTab } from '../actions';

const TabContainer = () => {
  const { selectedTab, submitted } = useSelector(state => {
    return {
      selectedTab: state.selectedTab,
      submitted: state.submitted
    }
  });
  const dispatch = useDispatch();
  const changeTab = tab => {
    dispatch(setSelctedTab(tab));
  }
  return <Tab selectedTab={selectedTab} changeTab={changeTab} submitted={submitted} />
}

export default TabContainer;