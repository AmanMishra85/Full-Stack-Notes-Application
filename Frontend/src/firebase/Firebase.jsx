
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAjeBnGX1JPFsWTWIcNukpHprYiHwSd4fA",
  authDomain: "authen-1182e.firebaseapp.com",
  projectId: "authen-1182e",
  storageBucket: "authen-1182e.appspot.com",
  messagingSenderId: "174183611149",
  appId: "1:174183611149:web:5a2f8aaecd8a97be314e44",
  measurementId: "G-LYGG5NBPG2"
};


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider();

export const authenticateWithGoogle = ()=>{
    return signInWithPopup(auth,provider)
    .then((result)=>{
        const user = result.user;
        console.log(user);
        return user;
    })
    .catch((error)=>{
        console.log(error);
        throw error;
    })
}

export default firebaseApp;
