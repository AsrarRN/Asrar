import {FETCH_SUCCESS, CURRENT_API, FETCH_FAILED} from '../types';

export const fetchFail = (dispatch, err) => {
  dispatch({
    type: FETCH_FAILED,
    payload: err.message,
  });
};

export const HandleResponse = (dispatch, apiName, res) => {
  dispatch({
    type: CURRENT_API,
    payload: apiName,
  });
  if (res != null) {
    dispatch({
      type: apiName + FETCH_SUCCESS,
      payload: res,
    });
  } else {
    dispatch({
      type: FETCH_FAILED,
      /*  we can show the res error message here too  */
      payload: 'Internal server error',
    });
  }
};
