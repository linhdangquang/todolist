
const firebaseConfig = {
    apiKey: "AIzaSyAjPzndJEwn_vqYct6Lx8MoQXUW5armUv0",
    authDomain: "todolist-123c4.firebaseapp.com",
    projectId: "todolist-123c4",
    storageBucket: "todolist-123c4.appspot.com",
    messagingSenderId: "718677284327",
    appId: "1:718677284327:web:0ed3a4a3fcc48cb20e5942"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

