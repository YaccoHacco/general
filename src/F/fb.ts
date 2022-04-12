
//Create App Connection
import firebaseConfig from "./env";
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);

//Auth
import type { Auth } from 'firebase/auth'

//Firestore
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import type { CollectionReference, DocumentReference, DocumentData } from 'firebase/firestore'
const DB = getFirestore(app);


//Firestore Functions

/**
 * Returns true if the firestore doc exists
 * @param d a firestore doc()
 * @returns true if the doc exists and false otherwise
 */
async function isDoc(d:DocumentReference<DocumentData>):Promise<boolean> {
    return (await getDoc(d)).exists();
}

async function getAccountData(auth:Auth, key:string):Promise<any> {
    
    return (await (await getDoc(doc(DB, "/users", auth.currentUser.uid))).get(key))
}

async function editAccountData(auth:Auth, key:string, value:any):Promise<boolean> {
    var change={}, status=false;change[key]=value;
    await updateDoc(doc(DB, "/users", auth.currentUser.uid), change).then(() => {
        status = true;
    }).catch(() => {
        status = false;
    });
    return status;
}


export { app, DB, collection, doc, getDoc, setDoc, isDoc, getAccountData, editAccountData }