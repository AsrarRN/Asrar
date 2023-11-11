import {FETCH_SUCCESS, HOME_DETAILS, FETCH_FAILED} from '../types';

export const INITIAL_STATE = {
  message: '',
  resData: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case HOME_DETAILS:
      return {...state, message: null, resData: null};
    case HOME_DETAILS + FETCH_SUCCESS:
      return {...state, message: null, resData: action.payload};
    case HOME_DETAILS + FETCH_FAILED:
      return {...state, message: action.payload, resData: null};

    default:
      return state;
  }
}
