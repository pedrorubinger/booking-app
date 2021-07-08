import * as React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SignIn from './screens/SignIn';
import Home from './screens/Home';

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

const Routes = () => {
  const isAuthenticated = false; // TO DO: Implement function here...

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen name="SignIn" component={SignIn} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default Routes;
