import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { isCompositeComponent } from "react-dom/test-utils";

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

  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
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
