import NetInfo from '@react-native-community/netinfo';
import {store} from '../../App';

/* GET Api Call */
export async function getFetch(apiUrl, actionType) {
  // checking Internet has been connected of not
  const state = await NetInfo.fetch();

  if (state.isConnected) {
    store.dispatch({type: actionType});
    return Promise.race([
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
    ])
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    console.log('Please connect to internet');
  }
}

/* Api wrapper for GET Request */
export var getApi = (apiUrl, actionType) => {
  return new Promise(async (resolve, reject) => {
    const resData = await getFetch(apiUrl, actionType);
    if (resData.code === 404) {
      reject(resData);
    } else {
      resolve(resData);
    }
  });
};
