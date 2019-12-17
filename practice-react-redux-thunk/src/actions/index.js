import { SET_QUERY, FETCH_RESULT, FETCH_RESULT_SUCCESS, FETCH_RESULT_FAILURE, SET_RESULT, SET_SUBMITTED, SET_SELCETED_TAB, FETCH_KEYWORD, FETCH_KEYWORD_SUCCESS, FETCH_KEYWORD_FAILURE, FETCH_HISTORY, FETCH_HISTORY_SUCCESS, FETCH_HISTORY_FAILURE, ADD_HISTORY, REMOVE_HISTORY, ADD_HISTORY_SUCCESS, ADD_HISTORY_FAILURE, REMOVE_HISTORY_SUCCESS, REMOVE_HISTORY_FAILURE } from "../constants";
import SearchModel from '../models/SearchModel';
import KeywordModel from '../models/KeywordModel';
import HistoryModel from '../models/HistoryModel';

export const setQuery = query => ({
  type: SET_QUERY,
  query
});

export const setResult = result => ({
  type: SET_RESULT,
  result
});

export const setSubmitted = isSubmitted => ({
  type: SET_SUBMITTED,
  isSubmitted
});

export const setSelctedTab = tab => ({
  type: SET_SELCETED_TAB,
  tab
});

export const fetchResult = query => dispatch => {
  dispatch({
    type: FETCH_RESULT
  });
  SearchModel.list(query)
    .then(result => {
      dispatch({
        type: FETCH_RESULT_SUCCESS,
        result
      })
    })
    .catch(err => {
      dispatch({
        type: FETCH_RESULT_FAILURE
      })
    })
}

export const fetchKeyword = () => dispatch => {
  dispatch({
    type: FETCH_KEYWORD
  });
  KeywordModel.list()
    .then(keywords => {
      dispatch({
        type: FETCH_KEYWORD_SUCCESS,
        keywords
      })
    })
    .catch(err => {
      dispatch({
        type: FETCH_KEYWORD_FAILURE
      })
    })
}

export const fetchHistory = () => dispatch => {
  dispatch({
    type: FETCH_HISTORY
  });
  HistoryModel.list()
    .then(history => {
      dispatch({
        type: FETCH_HISTORY_SUCCESS,
        history
      })
    })
    .catch(err => {
      dispatch({
        type: FETCH_HISTORY_FAILURE
      })
    })
}

export const addHistory = keyword => dispatch => {
  dispatch({
    type: ADD_HISTORY
  });
  HistoryModel.add(keyword);
  HistoryModel.list()
    .then(history => {
      dispatch({
        type: ADD_HISTORY_SUCCESS,
        history
      })
    })
    .catch(err => {
      dispatch({
        type: ADD_HISTORY_FAILURE
      })
    })
}

export const removeHistory = keyword => dispatch => {
  dispatch({
    type: REMOVE_HISTORY
  });
  HistoryModel.remove(keyword);
  HistoryModel.list()
    .then(history => {
      dispatch({
        type: REMOVE_HISTORY_SUCCESS,
        history
      })
    })
    .catch(err => {
      dispatch({
        type: REMOVE_HISTORY_FAILURE
      })
    })
}