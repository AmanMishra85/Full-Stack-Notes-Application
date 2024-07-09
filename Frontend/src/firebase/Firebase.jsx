
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth';


const firebaseConfig = {
  // your firebase configuration
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
