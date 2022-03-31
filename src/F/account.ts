

//Auth
import { updateCurrentUser, signOut, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import type { Auth } from 'firebase/auth'
import { authStore } from "../stores/authStore"


//Providers
const googleProv = new GoogleAuthProvider();


//--Global
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


//--Email
async function accountEmailCreate(auth:Auth, email:string, password:string):Promise<boolean>{
    var status = null;
    await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        //Signed in [Redirect to account]
        status = true;
        await updateCurrentUser(auth, userCredential.user);
        authStore.set(auth);
    })
    .catch((error) => {
        //Display Error
        status = false;
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    return status; 
}

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
async function accountGoogleSignIn(auth:Auth):Promise<boolean>{
    var status = null;
    await signInWithPopup(auth, googleProv)
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
    return status
}

export { accountSignOut, accountEmailCreate, accountEmailSignIn, accountGoogleSignIn }
