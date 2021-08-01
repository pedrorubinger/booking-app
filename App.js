/* eslint-disable no-undef */
import React from 'react';
import firebase from 'firebase/app';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import 'firebase/auth';
import 'firebase/firestore';

import { store } from './src/store';
import Routes from './src/routes';

const firebaseConfig = {};

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Routes />
    </Provider>
  );
}
