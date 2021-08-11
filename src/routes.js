import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import DetalhesAmbiente from './screens/DetalhesAmbiente';
import DetalhesMorador from './screens/DetalhesMorador';
import DetalhesReserva from './screens/DetalhesReserva';
import DetalhesMinhaReserva from './screens/DetalhesMinhaReserva';
import FormularioAmbientes from './components/FormularioAmbientes';
import FormularioReserva from './components/FormularioReserva';
import Home from './screens/Home';
import Logout from './screens/Logout';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Sair" component={Logout} />
    </Drawer.Navigator>
  );
};

const Routes = () => {
  const { user } = useSelector((state) => state.Auth);
  const isAuthenticated = !!user?.token;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="DrawerNav"
              component={DrawerNav}
            />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="DetalhesAmbiente"
              component={DetalhesAmbiente}
            />
            <Stack.Screen
              name="FormularioAmbientes"
              component={FormularioAmbientes}
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
            <Stack.Screen
              name="FormularioReserva"
              component={FormularioReserva}
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
