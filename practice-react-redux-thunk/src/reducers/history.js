import { FETCH_HISTORY_SUCCESS, FETCH_HISTORY_FAILURE, ADD_HISTORY_SUCCESS, ADD_HISTORY_FAILURE, REMOVE_HISTORY_SUCCESS, REMOVE_HISTORY_FAILURE } from "../constants";

const initialState = [];

const historyReducer = (previousState = initialState, action) => {
  if (action.type === FETCH_HISTORY_SUCCESS) {
    return action.history;
  }
  else if (action.type === ADD_HISTORY_SUCCESS) {
    return action.history;
  }
  else if (action.type === REMOVE_HISTORY_SUCCESS) {
    return action.history;
  }
  else if (action.type === FETCH_HISTORY_FAILURE) {
    return previousState;
  }
  else if (action.type === ADD_HISTORY_FAILURE) {
    return previousState;
  }
  else if (action.type === REMOVE_HISTORY_FAILURE) {
    return previousState
  }
  else {
    return previousState;
  }
}

export default historyReducer;