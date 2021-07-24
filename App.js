/* eslint-disable no-undef */
import React from 'react';
import firebase from 'firebase/app';
import { Provider } from 'react-redux'
import 'firebase/auth';
import 'firebase/firestore';

import { store } from './src/store';
import Routes from './src/routes';

const firebaseConfig = {
  apiKey: "AIzaSyA4vZXgtanYbSxN7O00FCzNV5U9VpOsoNo",
  authDomain: "booking-app-ec35a.firebaseapp.com",
  projectId: "booking-app-ec35a",
  storageBucket: "booking-app-ec35a.appspot.com",
  messagingSenderId: "65218374195",
  appId: "1:65218374195:web:9309a4018df8da97d4d146",
  measurementId: "G-SWFPXSBELK",
};

export default function App() {
  firebase.initializeApp(firebaseConfig);
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
