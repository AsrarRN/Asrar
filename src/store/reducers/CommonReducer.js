import {CURRENT_API, FETCH_FAILED} from '../types';

const INITIAL_STATE = {
  api_type: '',
  message: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_FAILED:
      return {
        ...state,
        message: action.payload,
      };
    case CURRENT_API:
      return {
        ...state,
        api_type: action.payload,
        message: null,
      };
    default:
      return state;
  }
}
