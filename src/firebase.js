import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyDpBxvbRq6LcVIJPje-vmPjYpg6jR7iVPQ",
    authDomain: "react-slack-app-527c7.firebaseapp.com",
    databaseURL: "https://react-slack-app-527c7.firebaseio.com",
    projectId: "react-slack-app-527c7",
    storageBucket: "react-slack-app-527c7.appspot.com",
    messagingSenderId: "177865510781",
    appId: "1:177865510781:web:9e20529f013b888d664614",
    measurementId: "G-W8ZFB87PFQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase