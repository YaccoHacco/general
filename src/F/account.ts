
//Auth
import { updateCurrentUser, signOut, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import type { Auth, User } from 'firebase/auth'
import { authStore } from '../stores/authStore'
const googleProv = new GoogleAuthProvider();

//Firestore
import { setDoc, doc } from 'firebase/firestore'
import { isDoc, DB } from "./fb"

//Data
import emptyData from '../F/emptyData.json'


//--Global
/**
 * Sign out of account
 * @param auth Firebase auth
 * @returns True if account is successfully signed out
 */
async function accountSignOut(auth:Auth):Promise<boolean>{
    var status = null;
    await signOut(auth)
    .then(async () => {
        //Successful [Redirect to home]
        status = true;
        await updateCurrentUser(auth, null);
        authStore.set(auth);
    })
    .catch((error) => {
        //Display error
        status = false;
        //const errorCode = error.code;
        //const errorMessage = error.message;
    });
    return status;
}

/**
 * Creates user data if it does not exist
 * @param user The possible new user
 */
async function onPossibleNewUser(user:User){
    if(!(await isDoc(doc(DB, "/users", user.uid)))){
        await setDoc(doc(DB, "/users", user.uid), emptyData);
    }
}


//--Email
/**
 * Create a new FIrebase email account
 * @param auth Firebase auth
 * @param email Email for account
 * @param password Password for account
 * @returns True if account is successfully created
 */
async function accountEmailCreate(auth:Auth, email:string, password:string):Promise<boolean>{
    var status = null;
    await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        //Signed in [Redirect to account]
        status = true;
        await updateCurrentUser(auth, userCredential.user);
        authStore.set(auth);
        await onPossibleNewUser(userCredential.user);
    })
    .catch((error) => {
        //Display Error
        status = false;
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    return status; 
}

/**
 * Log in to existing Firebase email account
 * @param auth Firebase auth
 * @param email Email of account
 * @param password Password of account
 * @returns True if account is successfully logged in
 */
async function accountEmailSignIn(auth:Auth, email:string, password:string):Promise<boolean>{
    var status = null;
    await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        //Signed in [Redirect to account]
        status = true;
        await updateCurrentUser(auth, userCredential.user);
        authStore.set(auth);
    })
    .catch((error) => {
        //Display Error
        status = false;
    });
    return status;
}


//--Google
/**
 * Create or log in to Firebase Google account (opens popup)
 * @param auth Firebase auth
 * @returns True if account is succesfully logged in and or created
 */
async function accountGoogleSignIn(auth:Auth):Promise<boolean>{
    var status = null;
    await signInWithPopup(auth, googleProv)
    .then(async (userCredential) => {
        //Signed in [Redirect to account]
        status = true;
        await updateCurrentUser(auth, userCredential.user);
        authStore.set(auth);
        await onPossibleNewUser(userCredential.user);
    })
    .catch((error) => {
        //Display Error
        status = false;
    });
    return status
}



export { accountSignOut, accountEmailCreate, accountEmailSignIn, accountGoogleSignIn }
