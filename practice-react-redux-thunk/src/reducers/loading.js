import { FETCH_RESULT, FETCH_RESULT_SUCCESS, FETCH_RESULT_FAILURE, FETCH_KEYWORD, FETCH_KEYWORD_SUCCESS, FETCH_KEYWORD_FAILURE, ADD_HISTORY, REMOVE_HISTORY, ADD_HISTORY_SUCCESS, ADD_HISTORY_FAILURE, REMOVE_HISTORY_SUCCESS, REMOVE_HISTORY_FAILURE } from "../constants";

const initialState = 'false';

const loadingReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case FETCH_RESULT:
    case FETCH_KEYWORD:
    case ADD_HISTORY:
    case REMOVE_HISTORY:
      return true;
    case FETCH_RESULT_SUCCESS:
    case FETCH_RESULT_FAILURE:
    case FETCH_KEYWORD_SUCCESS:
    case FETCH_KEYWORD_FAILURE:
    case ADD_HISTORY_SUCCESS:
    case ADD_HISTORY_FAILURE:
    case REMOVE_HISTORY_SUCCESS:
    case REMOVE_HISTORY_FAILURE:
      return false;
    default:
      return previousState;
  }
}

export default loadingReducer;