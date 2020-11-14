import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDaVxaWeNQ8drV4aoG1igtrZWPRb9Dk5p0",
  authDomain: "synth-trainer.firebaseapp.com",
  databaseURL: "https://synth-trainer.firebaseio.com",
  projectId: "synth-trainer",
  storageBucket: "synth-trainer.appspot.com",
  messagingSenderId: "278946042578",
  appId: "1:278946042578:web:6e1e15e3cbdda35296930b",
  measurementId: "G-VZJ76FEXHN",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Configure FirebaseUI.
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  signInSuccessUrl: "/profilePage",
};

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const signOut = () => {
  auth.signOut();
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const generateUsernameDocument = async (user, displayName) => {
  if (!user) return;
  const usernameRef = firestore.doc(`usernames/${displayName}`);
  const snapshot = await usernameRef.get();
  if (!snapshot.exists) {
    const { uid } = user;
    try {
      await usernameRef.set({
        uid,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUsernameDocument(user.displayName);
};

const getUsernameDocument = async (displayName) => {
  if (!displayName) return null;
  try {
    const userDocument = await firestore.doc(`usernames/${displayName}`).get();
    return {
      displayName,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const changeEmail = async (uid, email) => {
  if (!uid) return;
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();
  if (snapshot.exists) {
    try {
      await userRef.update({
        email: email
      }) 
    } catch (error) {
      console.error(error)
    }
  }
}

export const changeDisplayName = async (uid, newDisplayName) => {
  if (!uid || !newDisplayName) return;
  const userRef = firestore.doc(`users/${uid}`)
  const snapshot = await userRef.get()
  if (snapshot.exists) {
    try {
      await userRef.update({
        displayName: newDisplayName
      })
    } catch (error) {
      console.error(error)
    }
  }
}
