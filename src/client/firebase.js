// Import the functions you need from the SDKs you need
import {
  initializeApp
} from "firebase/app";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc
} from "firebase/firestore";
// import { User } from '@client/db';
const API_URL = 'http://localhost:9000';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLEAPIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGESENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export const ACCESS_TOKEN_KEY = 'accessToken';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const setToken = async (userId, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      password
    }),
  });
  if (response.ok) {
    const {
      token
    } = await response.json();
    console.log("tken = ", token)
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return {
      id: userId
    };
  }
  return null;

}
const logInWithEmailAndPassword = async (email, password) => {
  // console.log(email, password)
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const resultID = setToken(email, password)
    return {
      resultID
    };
  } catch (err) {
    console.error(err);
    alert(err.message);
    return null;
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    }),
  });
  if (response.ok) {
    try {
      await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
        console.log(err)
      );
      await sendEmailVerification(auth.currentUser).catch((err) =>
        console.log(err)
      );
      await updateProfile(auth.currentUser, {
        displayName: name
      }).catch(
        (err) => console.log(err)
      );
      await setToken(email, password);
    } catch (err) {
      console.log(err);
    }
  }
  return null;
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const fetchCollection = async (name, setFunction) => {
  await getDocs(collection(db, name)).then((querySnapshot) => {
    const newData = querySnapshot.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
    setFunction(newData);
  }, );
}


export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  fetchCollection,
};
