import * as React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import DetalhesAmbiente from './screens/DetalhesAmbiente';
import DetalhesMorador from './screens/DetalhesMorador';
import DetalhesReserva from './screens/DetalhesReserva';
import DetalhesMinhaReserva from './screens/DetalhesMinhaReserva';

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

const Routes = () => {
  const { user } = useSelector((state) => state.Auth);
  const isAuthenticated = !!user?.token;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="DetalhesAmbiente"
              component={DetalhesAmbiente}
            />
            <Stack.Screen
              name="DetalhesMorador"
              component={DetalhesMorador}
            />
            <Stack.Screen
              name="DetalhesReserva"
              component={DetalhesReserva}
            />
            <Stack.Screen
              name="DetalhesMinhaReserva"
              component={DetalhesMinhaReserva}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default Routes;
