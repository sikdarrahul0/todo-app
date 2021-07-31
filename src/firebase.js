import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBLxozk7FXDQWo0hcZTfUJsSrIxb7DPq5g",
    authDomain: "to-do-list9.firebaseapp.com",
    databaseURL: "https://to-do-list9.firebaseio.com",
    projectId: "to-do-list9",
    storageBucket: "to-do-list9.appspot.com",
    messagingSenderId: "817609111573",
    appId: "1:817609111573:web:3a66a1c74efb944823361c"
  };
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const db = firebaseApp.firestore();

export default db;
