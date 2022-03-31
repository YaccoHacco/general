
//Create App Connection
import firebaseConfig from "./env";
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);

//Auth
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import type { Auth } from "firebase/auth";
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);



async function makeAuth():Promise<Auth>{
    var auth:Auth = getAuth(app);
    await setPersistence(auth, browserLocalPersistence);
    return auth;
}

function createAuth():Auth{
    var R:Auth;
    makeAuth().then((r) => {R=r;})
    return R;
}


export { app, createAuth, makeAuth }