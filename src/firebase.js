import {
    initializeApp
} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    get,
    getDatabase,
    onValue,
    push,
    ref,
    remove,
    set
} from "firebase/database";
import {
    Title
} from "./components/Header/Header.styled";
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

export const getRSVPEvents = async (userID) => {
    return get(ref(db, `/users/${userID}/events/`))
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

export const addEvent = async (title, description, location, timeStart, timeEnd, host, inviteOnly, capacity) => {
    let actualTimeStart = new Date(timeStart).getTime() / 1000;
    let actualTimeEnd = new Date(timeEnd).getTime() / 1000;
    return set(ref(db, `/events/${randomID()}`), {
        description: description,
        title: title,
        timeStart: actualTimeStart,
        timeEnd: actualTimeEnd,
        host: host,
        location: location,
        inviteOnly: inviteOnly,
        capacity: parseInt(capacity)
    })
}

export const editEvent = async (id, title, description, location, timeStart, timeEnd, host, inviteOnly, capacity, users) => {
    let actualTimeStart = new Date(timeStart).getTime() / 1000;
    let actualTimeEnd = new Date(timeEnd).getTime() / 1000;
    if (users) {
        return set(ref(db, `/events/${id}`), {
            title: title,
            description: description,
            location: location,
            timeStart: actualTimeStart,
            timeEnd: actualTimeEnd,
            host: host,
            inviteOnly: inviteOnly,
            capacity: capacity,
            users: users
        })
    } else {
        return set(ref(db, `/events/${id}`), {
            title: title,
            description: description,
            location: location,
            timeStart: actualTimeStart,
            timeEnd: actualTimeEnd,
            host: host,
            inviteOnly: inviteOnly,
            capacity: capacity,
        })
    }
}

export const getUser = async (id) => {
    return get(ref(db, `/users/${id}`));
}


export const removeEvent = async (id) => {
    getRSVP(id).then((snap) => {
        const value = snap.val();
            for (let user in value.users) {
                remove(ref(db, `/users/${user}/events/${id}`))
            }
    })
    remove(ref(db, `/events/${id}`))
}
export const checkLoggedIn = async () => {
    auth.onAuthStateChanged(function (user) {
        if (!user) {
            window.location.replace("/#/account");
        } else {

        }
    })
}

export const checkEditPermission = async (eventID) => {
    auth.onAuthStateChanged(function (user) {
        if (!user) {
            window.location.replace("/#/account");
        }
        getUser(user.uid).then((snap) => {
            if (snap.exists()) {

                getEvent(eventID).then((eventSnap) => {
                    if (eventSnap.val().host === user.uid || snap.val().accountType === "Administrator") {

                    } else {
                        window.location.replace("/#/dashboard");
                    }

                })
            }
        });
    })
}

export const addRSVP = async (userID, eventID, status) => {
    set(ref(db, `/users/${userID}/events/${eventID}`), {
        rsvpStatus: status
    })
    return set(ref(db, `/events/${eventID}/users/${userID}`), {
        rsvpStatus: status
    })
}

export const addInvitedUser = async (userID, eventID) => {
    return set(ref(db, `/events/${eventID}/invitedList/${userID}`), true)
}

export const getInvited = async (eventID) => {
    return get(ref(db, `/events/${eventID}/invitedList`))
}

export const deleteInvitedUser = async (userId, eventID) => {
    remove(ref(db, `/users/${userId}/events/${eventID}`))
    return remove(ref(db, `/events/${eventID}/invitedList/${userId}`))
}

export const deleteRSVP = async (userID, eventID) => {
    remove(ref(db, `/users/${userID}/events/${eventID}`))
    return remove(ref(db, `/events/${eventID}/users/${userID}`))
}

export const getRSVP = async (eventID) => {
    return get(ref(db, `/events/${eventID}`));
}

export const getRSVPUser = async (eventID, userID) => {
    return get(ref(db, `/events/${eventID}/users/${userID}/rsvpStatus`));
}

export const logout = async () => {
    auth.signOut().then(() => {
        window.location.reload();
    })
}

export const getAllUsers = async() => {
    return get(ref(db, `users`))
}
