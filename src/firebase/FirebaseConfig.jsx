import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBb-49JMVlBUb43Ma6O_QvsbMcMfQPwt-0",
  authDomain: "ltm-test-e4d72.firebaseapp.com",
  projectId: "ltm-test-e4d72",
  storageBucket: "ltm-test-e4d72.appspot.com",
  messagingSenderId: "22653988520",
  appId: "1:22653988520:web:53438d992c9af981d69c9d",
  measurementId: "G-KZXCCFSJ2Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export default firebase;
export { db };