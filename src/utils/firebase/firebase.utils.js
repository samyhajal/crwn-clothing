import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

// ssssFirebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-5fQzgjr-gfO3aimndJshfo-LBqBK-FQ",
  authDomain: "crwn-clothing-db-b71dd.firebaseapp.com",
  projectId: "crwn-clothing-db-b71dd",
  storageBucket: "crwn-clothing-db-b71dd.appspot.com",
  messagingSenderId: "1019842173952",
  appId: "1:1019842173952:web:e0715940ae8ce0ff53cce5",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createUserFromEmailPassword = async (
  displayName,
  email,
  password
) => {
  // Return if no email or password provided
  if (!email || !password) return;

  // Create auth
  const userAuth = await createUserWithEmailAndPassword(auth, email, password);
  updateProfile(userAuth.user, {
    displayName: displayName,
  });

  return userAuth;
};

export const signInWithEmailPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  return user;
};

export const signOutUser = async () => {
  signOut(auth);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
