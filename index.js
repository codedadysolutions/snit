/**
 * @format
 */

import bgMessaging from './src/byMessaging';

import {AppRegistry} from 'react-native';
import App from './src/Router';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => byMessaging);
