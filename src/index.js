import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCcPh2TlhShi2S-fMQHgifo5qWmNLAWzoY",
  authDomain: "notesapp-958ed.firebaseapp.com",
  projectId: "notesapp-958ed",
  storageBucket: "notesapp-958ed.appspot.com",
  messagingSenderId: "317214101303",
  appId: "1:317214101303:web:66b9565e963c69540ad4b2",
  measurementId: "G-P6PR8HYTJB"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById("root"),
);
