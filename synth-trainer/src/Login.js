import React from "react";

function Login() {
  return (
    <div>
      <p>Testing</p>
    </div>
  );
}

var firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDaVxaWeNQ8drV4aoG1igtrZWPRb9Dk5p0",
  authDomain: "synth-trainer.firebaseapp.com",
  databaseURL: "https://synth-trainer.firebaseio.com",
  projectId: "synth-trainer",
  storageBucket: "synth-trainer.appspot.com",
  messagingSenderId: "278946042578",
  appId: "1:278946042578:web:6e1e15e3cbdda35296930b",
  measurementId: "G-VZJ76FEXHN",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
function handleLogin(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      //Handle Errors Here
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
}

export default Login;
