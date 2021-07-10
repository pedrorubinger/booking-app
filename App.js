import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Routes from './src/routes';

const firebaseConfig = {
};

export default function App() {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();

  db.collection("user").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
  });

  return <Routes />;
}
