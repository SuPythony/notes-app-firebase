import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const firebaseConfig = {};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById("root"),
);
