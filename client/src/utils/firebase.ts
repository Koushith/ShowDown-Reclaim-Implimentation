// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtiZoTQU5xvlQ49hd7RGa2TYb5GVyxbP0",
  authDomain: "showdown-1107c.firebaseapp.com",
  projectId: "showdown-1107c",
  storageBucket: "showdown-1107c.appspot.com",
  messagingSenderId: "394667466057",
  appId: "1:394667466057:web:e5bc79ceac04d3bedb8e98",
  measurementId: "G-JK0HP1W07T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const { user } = await signInWithPopup(auth, provider);
  return user;
};

export const signOut = async () => {
  const auth = getAuth(app);
  const data = await auth.signOut();
  console.log("signed out", data);
};
