import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyD-wmckOxd4WGRqr7XzBjNwJA81C4Bz5kc",
    authDomain: "ecommerce-97d70.firebaseapp.com",
    projectId: "ecommerce-97d70",
    storageBucket: "ecommerce-97d70.appspot.com",
    messagingSenderId: "656178640403",
    appId: "1:656178640403:web:770fef55175e41617331e6"
  };
  // initialize firebase app
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }

    // export
    // export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();