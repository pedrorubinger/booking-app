/* eslint-disable no-undef */
import React from 'react';
import firebase from 'firebase/app';
import { Provider } from 'react-redux'
import 'firebase/auth';
import 'firebase/firestore';

import { store } from './src/store';
import Routes from './src/routes';

const firebaseConfig = {
};

export default function App() {
  firebase.initializeApp(firebaseConfig);
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
