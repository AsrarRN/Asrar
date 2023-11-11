import {combineReducers} from 'redux';
import CommonReducer from './reducers/CommonReducer';
import HomeReducer from './reducers/HomeReducer';

export default combineReducers({
  CommonReducer: CommonReducer,
  HomeReducer: HomeReducer,
});
