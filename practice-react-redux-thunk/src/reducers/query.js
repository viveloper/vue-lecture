import { SET_QUERY } from "../constants";

const initialState = '';

const queryReducer = (previousState = initialState, action) => {
  if (action.type === SET_QUERY) {
    return action.query;
  }
  else {
    return previousState;
  }
}

export default queryReducer;