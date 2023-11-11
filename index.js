/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
LogBox.ignoreLogs([
  'Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders',
]);
