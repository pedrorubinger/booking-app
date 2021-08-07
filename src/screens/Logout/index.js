import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../../store/reducers/auth';

const Logout = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    AsyncStorage.clear();
    navigation.navigate('DrawerNav', { screen: 'SignIn' });
  }, []);

  return null;
};

export default Logout;
