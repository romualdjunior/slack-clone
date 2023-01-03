// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import "firebase/firestore"
import "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyDB_-oCYG3QinZUacLnofoCw72idNTzo4U",
    authDomain: "slack-clone-81ac6.firebaseapp.com",
    databaseURL: "https://slack-clone-81ac6-default-rtdb.firebaseio.com",
    projectId: "slack-clone-81ac6",
    storageBucket: "slack-clone-81ac6.appspot.com",
    messagingSenderId: "473866654572",
    appId: "1:473866654572:web:ed9edd2d88be8c6f049949",
    measurementId: "G-DCBCVWP7G6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore(firebaseApp)
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
// console.log("provider", provider)
export { auth, provider }
export default db;