import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDK2ztI1n-H_mRnQ8WursP92Bo53fBTIZ8",
    authDomain: "to-do-vmbc.firebaseapp.com",
    databaseURL: "https://to-do-vmbc.firebaseio.com",
    projectId: "to-do-vmbc",
    storageBucket: "",
    messagingSenderId: "594057094676",
    appId: "1:594057094676:web:a740073433bd5ce697a901"
};

const fb = firebase.initializeApp(firebaseConfig);
const fs = firebase.firestore();
fs.settings({ timestampsInSnapshots: true });

export { fb, fs };