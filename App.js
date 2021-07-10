import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import Routes from './src/routes';

const firebaseConfig = {
};

export default function App() {
  firebase.initializeApp(firebaseConfig);
  return <Routes />;
}
