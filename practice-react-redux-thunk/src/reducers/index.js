import { combineReducers } from 'redux';
import queryReducer from './query';
import resultReducer from './result';
import submittedReducer from './submitted';
import selectedTabReducer from './selectedTab';
import keywordReducer from './keyword';
import loadingReducer from './loading';
import historyReducer from './history';

const rootReducer = combineReducers({
  query: queryReducer,
  result: resultReducer,
  submitted: submittedReducer,
  selectedTab: selectedTabReducer,
  keywords: keywordReducer,
  history: historyReducer,
  loading: loadingReducer
});

export default rootReducer;