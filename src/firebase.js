import {
    initializeApp
} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth, onAuthStateChanged, signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    get, getDatabase,
    push,
    ref, set
} from "firebase/database";
import { Title } from "./components/Header/Header.styled";
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
    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        window.location.replace("#/dashboard");
    }).catch((err) => {
        document.getElementById("loginstatus").textContent = err.message;
    });
}

export const registerWithEmailAndPassword = async (name, accountType, email, password) => {
    document.getElementById("registerstatus").textContent = "";
    try {
        if (name == null || name.length < 1) {
            throw new Error("Invalid name. Name cannot be blank.")
        }
        if (!(/^([A-z0-9]+\s?)+$/).test(name) || !(/[A-z]/).test(name)) {
            throw new Error("Invalid name. Name must only have alphanumeric characters and one space between words.")
        }
        if (accountType == null || accountType == "") {
            throw new Error("Please select an account type.")
        }
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        set(ref(db, `/users/${user.uid}`), {
            name: name,
            email: email,
            accountType: accountType
        });
        return 2;
    } catch (err) {
        document.getElementById("registerstatus").textContent = err.message;
    }
}

export const getEvent = async (id) => {
    return get(ref(db, `/events/${id}`));
}
export const getAnyEvent = async () => {
    return get(ref(db, "events/"));
}

export const createRandomEvent = async () => {
    let id = randomID();
    return set(ref(db, `/events/${randomID()}`), {
        description: "Description of " + id,
        title: "Free " + id,
        timeStart: 1666390555,
        timeEnd: 1666490555,
        host: "CGh2YpX6lAh9eS6UW5Q2aqPJxLo2",
        location: "Secret Location",
    })
}

function randomID() {
    return Math.random().toString(36).substring(2);
}

export const addEvent = async (title, description, location, timeStart, timeEnd, host) => {
    let actualTimeStart = new Date(timeStart).getTime()/1000;
    let actualTimeEnd = new Date(timeEnd).getTime() / 1000;
    return set(ref(db, `/events/${randomID()}`), {
        description: description,
        title: title,
        timeStart: actualTimeStart,
        timeEnd: actualTimeEnd,
        host: host,
        location: location,
    })
}

export const editEvent = async (id, title, description, location, timeStart, timeEnd, host) => {
    console.log(title);
    let actualTimeStart = new Date(timeStart).getTime()/1000;
    let actualTimeEnd = new Date(timeEnd).getTime() / 1000;
    return set(ref(db, `/events/${id}`), {
        title: title,
        description: description, 
        location: location,
        timeStart: actualTimeStart,
        timeEnd: actualTimeEnd,
        host: host
    })
}

export const getUser = async (id) => {
    return get(ref(db, `/users/${id}`));
}

export const checkLoggedIn = async () => { 
    auth.onAuthStateChanged(function(user) {
        if(!user) {
            window.location.replace("/#/account");
        } else {
            console.log(auth.currentUser)
        }
    })
}

export const getLoggedInUser = async() => {
    auth.onAuthStateChanged(function(user) {
        console.log(user);
        return user;
    })
}

export const logout = async() => {
    auth.signOut().then(() => {
        window.location.reload();
    })
}