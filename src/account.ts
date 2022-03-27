

//Create App Connection
//import firebaseConfig from "../../env";
//import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore';

//const app = initializeApp(firebaseConfig);
//const DB = getFirestore(app);


//Auth
import { getAuth, signOut, EmailAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import type { Auth } from 'firebase/auth'

//const auth = getAuth(app);
//const providerEmail = new EmailAuthProvider();


function accountSignOut(auth:Auth):boolean{
    var status = null;
    signOut(auth)
    .then(() => {
        //Successful [Redirect to home]
        status = 1;
        location.href = "/";
    }).catch((error) => {
        //Display error
        status = 0;
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    return (status == 1);
}

function accountEmailCreate(auth:Auth, email:string, password:string):boolean{
    var status = null;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        //Signed in [Redirect to account]
        status = 1;
        const user = userCredential.user;
        location.href = "/account";
    })
    .catch((error) => {
        //Display Error
        status = 0;
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    return (status == 1); 
}

function accountEmailSignIn(auth:Auth, email:string, password:string):boolean{
    var status = null;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        //Signed in [Redirect to home]
        status = 1;
        const user = userCredential.user;
        location.href = "/";
        
    })
    .catch((error) => {
        //Display Error
        status = 0;
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    return (status == 1);
}

export { accountSignOut, accountEmailCreate, accountEmailSignIn }
