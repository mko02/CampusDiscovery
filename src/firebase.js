import {
    initializeApp
} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    getDatabase
} from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyCVBNJNQqsGTGIyxRgFwWwD9lnkZAMg5i8",
    authDomain: "gt-campus-discovery.firebaseapp.com",
    databaseURL: "https://gt-campus-discovery-default-rtdb.firebaseio.com",
    projectId: "gt-campus-discovery",
    storageBucket: "gt-campus-discovery.appspot.com",
    messagingSenderId: "139794595423",
    appId: "1:139794595423:web:89089ffe5740fe9e75e5ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        document.getElementById("loginstatus").textContent = err.message;
    }
}

export const registerWithEmailAndPassword = async (name, accountType, email, password) => {
    try {
        if (name == null || name.length < 1 || !(/^[A-z]+\s?[A-z]*$/).test(name)) {
            throw new Error("Invalid name.")
        }
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        console.log("Register successsful")
    } catch (err) {
        document.getElementById("registerstatus").textContent = err.message;
    }
}