import {Platform} from 'react-native';
import {HOME_API} from '../../services/ApiConfig';
import {HOME_DETAILS} from '../types';
import {HandleResponse, fetchFail} from './CommonAction';
import {getApi} from '../../services/ApiCallFunction';

const performAPi = (api, action) => {
  return async dispatch => {
    Promise.all([getApi(api, action)])
      .then(function (values) {
        /* Handle Response of all Apis */
        setTimeout(
          () => HandleResponse(dispatch, action, values[0]),
          Platform.OS === 'android' ? 0 : 1000,
        );
      })
      .catch(err => {
        /* Will be called in case of No internet or any error */
        fetchFail(dispatch, err);
        console.log(err);
      });
  };
};

export const GetHomeDetails = body => {
  return performAPi(HOME_API + body, HOME_DETAILS);
};
