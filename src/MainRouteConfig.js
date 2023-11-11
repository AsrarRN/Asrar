import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import TabScreen from './screens/TabScreen';
import {Image} from 'react-native';
import {Rnicon} from './assets/images';
import {normalize} from './Common/Normalize';

const Stack = createNativeStackNavigator();

const MainRouteConfig = () => {
  // eslint-disable-next-line react/no-unstable-nested-components
  function Icon() {
    return (
      <Image
        source={Rnicon}
        style={{
          height: normalize(25),
          width: normalize(25),
        }}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animationEnabled: true}}>
        <Stack.Screen
          options={{headerShown: false}}
          name={'Login'}
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: () => <Icon />,
            headerTitleAlign: 'center',
            //  we can also add the back arrow here
            headerBackVisible: false,
          }}
          name={'TabScreen'}
          component={TabScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouteConfig;
