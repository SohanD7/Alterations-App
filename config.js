import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBxe8pYhlWk6_fdFYiBo2ymJGgKNVFe9sQ",
  authDomain: "ia-test-2.firebaseapp.com",
  databaseURL: "https://ia-test-2-default-rtdb.firebaseio.com",
  projectId: "ia-test-2",
  storageBucket: "ia-test-2.appspot.com",
  messagingSenderId: "859308527012",
  appId: "1:859308527012:web:0361b3ff7fb08b40854531"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig) //initializes firebase
} else {
  firebase.app()
}

export default firebase.firestore()