import { tabs, SET_SELCETED_TAB } from "../constants";

const selectedTabReducer = (previousState = tabs[0], action) => {
  if (action.type === SET_SELCETED_TAB) {
    return action.tab;
  }
  else {
    return previousState;
  }
}

export default selectedTabReducer;