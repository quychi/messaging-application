import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase
    .initializeApp({
        apiKey: 'AIzaSyCB4P75RkWAq9gXwd-Spv_DFZaydgikuEo',
        authDomain: 'messaging-application-cbe90.firebaseapp.com',
        projectId: 'messaging-application-cbe90',
        storageBucket: 'messaging-application-cbe90.appspot.com',
        messagingSenderId: '566431413954',
        appId: '1:566431413954:web:aaa458969611b6f2cb6d5b'
    })
    .auth();
