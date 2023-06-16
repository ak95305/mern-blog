import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCP5Es9TZCdot5mcfGabQqpY04aIYlngzU",
    authDomain: "mern-blog-6c293.firebaseapp.com",
    projectId: "mern-blog-6c293",
    storageBucket: "mern-blog-6c293.appspot.com",
    messagingSenderId: "285810726651",
    appId: "1:285810726651:web:6fc6de852b59f2774c025e",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const signin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
};

export { signin, auth };
