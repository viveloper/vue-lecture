import { FETCH_KEYWORD_SUCCESS, FETCH_KEYWORD_FAILURE } from "../constants";

const initialState = [];

const keywordReducer = (previousState = initialState, action) => {
  if(action.type===FETCH_KEYWORD_SUCCESS) {
    return action.keywords;
  }
  else if(action.type===FETCH_KEYWORD_FAILURE) {
    return previousState;
  }  
  else{
    return previousState;
  }
}

export default keywordReducer;