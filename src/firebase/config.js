import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCM4C1EwPmkiOcJ8NmPZSpcpP49jIHMQrU",
  authDomain: "movie-project-faee1.firebaseapp.com",
  projectId: "movie-project-faee1",
  storageBucket: "movie-project-faee1.firebasestorage.app",
  messagingSenderId: "183530877362",
  appId: "1:183530877362:web:38397f40642c34982df4ab"
};


// Start initialization
firebase.initializeApp(firebaseConfig)

// Service setup
const projectFirestore = firebase.firestore()

export { projectFirestore }