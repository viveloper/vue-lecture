import { FETCH_RESULT_SUCCESS, FETCH_RESULT_FAILURE, SET_RESULT } from "../constants";

const initialState = [];

const resultReducer = (previousState = initialState, action) => {
  if(action.type===FETCH_RESULT_SUCCESS) {
    return action.result;
  }
  else if(action.type===FETCH_RESULT_FAILURE) {
    return previousState;
  }
  else if(action.type===SET_RESULT) {
    return action.result;
  }
  else{
    return previousState;
  }
}

export default resultReducer;