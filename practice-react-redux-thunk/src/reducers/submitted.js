import { SET_SUBMITTED } from "../constants"

const submittedReducer = (previousState = false, action) => {
  if (action.type === SET_SUBMITTED) {
    return action.isSubmitted;
  }
  else {
    return previousState;
  }
}

export default submittedReducer;